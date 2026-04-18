<?php

/**
 * Custom Post Type registrations.
 *
 * @package    Drd_Custom_Plugin
 * @subpackage Drd_Custom_Plugin/includes
 */

class Drd_Custom_Plugin_Cpt {

	/**
	 * Register all custom post types.
	 */
	public function register_post_types(): void {
		$this->register_drd_res_acct();
	}

	/**
	 * Register the "Request Research Account" CPT.
	 */
	private function register_drd_res_acct(): void {
		$labels = array(
			'name'               => __( 'Research Account Requests', 'drd-custom-plugin' ),
			'singular_name'      => __( 'Research Account Request', 'drd-custom-plugin' ),
			'menu_name'          => __( 'SA Requests', 'drd-custom-plugin' ),
			'add_new'            => __( 'Add New', 'drd-custom-plugin' ),
			'add_new_item'       => __( 'Add New Request', 'drd-custom-plugin' ),
			'edit_item'          => __( 'Edit Request', 'drd-custom-plugin' ),
			'new_item'           => __( 'New Request', 'drd-custom-plugin' ),
			'view_item'          => __( 'View Request', 'drd-custom-plugin' ),
			'search_items'       => __( 'Search Requests', 'drd-custom-plugin' ),
			'not_found'          => __( 'No requests found', 'drd-custom-plugin' ),
			'not_found_in_trash' => __( 'No requests found in trash', 'drd-custom-plugin' ),
		);

		$args = array(
			'labels'       => $labels,
			'public'       => false,
			'show_ui'      => true,
			'show_in_menu' => true,
			'supports'     => array( 'title' ),
			'menu_icon'    => 'dashicons-id-alt',
		);

		register_post_type( 'drd_res_acct', $args );
	}

	/**
	 * Register meta boxes for the CPT.
	 */
	public function add_meta_boxes(): void {
		add_meta_box(
			'drd_res_acct_details',
			__( 'Request Details', 'drd-custom-plugin' ),
			array( $this, 'render_meta_box' ),
			'drd_res_acct',
			'normal',
			'high'
		);
	}

	/**
	 * Render the meta box fields.
	 *
	 * @param  WP_Post  $post
	 */
	public function render_meta_box( WP_Post $post ): void {
		wp_nonce_field( 'drd_res_acct_save', 'drd_res_acct_nonce' );
		echo '<input type="hidden" name="drd_approve_request" id="drd_approve_request" value="0" />';

		$fields = array(
			'_drd_ra_full_name'        => __( 'Full Name', 'drd-custom-plugin' ),
			'_drd_ra_business_address' => __( 'Business Address', 'drd-custom-plugin' ),
			'_drd_ra_email'            => __( 'Email Address', 'drd-custom-plugin' ),
			'_drd_ra_phone'            => __( 'Phone #', 'drd-custom-plugin' ),
			'_drd_ra_category'         => __( 'Research Category', 'drd-custom-plugin' ),
			'_drd_ra_plan'             => __( 'Research Plan', 'drd-custom-plugin' ),
		);

		echo '<table class="form-table"><tbody>';

		foreach ( $fields as $key => $label ) {
			$value = get_post_meta( $post->ID, $key, true );
			if ( $key === '_drd_ra_plan' ) {
				printf(
					'<tr><th><label for="%1$s">%2$s</label></th><td><textarea id="%1$s" name="%1$s" class="large-text" rows="5">%3$s</textarea></td></tr>',
					esc_attr( $key ),
					esc_html( $label ),
					esc_textarea( $value ),
				);
			} else {
				$type = ( '_drd_ra_email' === $key ) ? 'email' : 'text';
				printf(
					'<tr><th><label for="%1$s">%2$s</label></th><td><input type="%3$s" id="%1$s" name="%1$s" value="%4$s" class="regular-text" /></td></tr>',
					esc_attr( $key ),
					esc_html( $label ),
					esc_attr( $type ),
					esc_attr( $value )
				);
			}
		}

		echo '<tr>
				<th><label>Action</label></th>
				<td>
					<button type="button" class="button button-primary button-large" onclick="document.getElementById(\'drd_approve_request\').value=\'1\';document.getElementById(\'post\').submit();">
						Accept Request
					</button>
				</td>
			</tr>
			</tbody></table>';
	}

	/**
	 * Save meta box data.
	 *
	 * @param  int  $post_id
	 */
	public function save_meta_box( int $post_id ): void {
		if ( ! isset( $_POST['drd_res_acct_nonce'] ) ) {
			return;
		}

		if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['drd_res_acct_nonce'] ) ),
			'drd_res_acct_save' ) ) {
			return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$fields = array(
			'_drd_ra_full_name'        => 'sanitize_text_field',
			'_drd_ra_business_address' => 'sanitize_text_field',
			'_drd_ra_email'            => 'sanitize_email',
			'_drd_ra_phone'            => 'sanitize_text_field',
			'_drd_ra_category'         => 'sanitize_text_field',
			'_drd_ra_plan'             => 'sanitize_textarea_field',
		);

		foreach ( $fields as $key => $sanitize_fn ) {
			if ( isset( $_POST[ $key ] ) ) {
				update_post_meta( $post_id, $key, $sanitize_fn( wp_unslash( $_POST[ $key ] ) ) );
			}
		}
	}

	/**
	 * Add custom columns to the CPT list table.
	 *
	 * @param  array  $columns
	 *
	 * @return array
	 */
	public function set_columns( array $columns ): array {
		unset( $columns['date'] );

		$columns['_drd_ra_full_name'] = __( 'First Name', 'drd-custom-plugin' );
		$columns['_drd_ra_email']  = __( 'Last Name', 'drd-custom-plugin' );
		$columns['_drd_ra_phone']      = __( 'Email', 'drd-custom-plugin' );
		$columns['_drd_ra_category']   = __( 'Research Facility', 'drd-custom-plugin' );

		return $columns;
	}

	/**
	 * Populate custom columns.
	 *
	 * @param  string  $column
	 * @param  int  $post_id
	 */
	public function render_columns( string $column, int $post_id ): void {
		$meta_keys = array(
			'_drd_ra_full_name',
			'_drd_ra_email',
			'_drd_ra_phone',
			'_drd_ra_category',
		);

		if ( in_array( $column, $meta_keys, true ) ) {
			echo esc_html( get_post_meta( $post_id, $column, true ) );
		}
	}

	public function accept_research_account_req( int $post_id ): void {
		static $already_ran = false;

		if ( $already_ran ) {
			return;
		}

		if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}

		if ( isset( $_POST['drd_approve_request'] ) && '1' === $_POST['drd_approve_request'] ) {
			$already_ran             = true;
			$first_name              = get_post_meta( $post_id, '_drd_ra_first_name', true );
			$last_name               = get_post_meta( $post_id, '_drd_ra_last_name', true );
			$email                   = get_post_meta( $post_id, '_drd_ra_email', true );
			$auto_generated_password = wp_generate_password();

			if ( email_exists( $email ) ) {
				set_transient( 'drd_ra_user_email_taken', 'Email is already taken. Skipping account creation.', 10 );

				return;
			}

			$user = wp_insert_user( array(
				'user_login' => $email,
				'user_pass'  => $auto_generated_password,
				'user_email' => $email,
				'first_name' => $first_name,
				'last_name'  => $last_name,
				'role'       => 'subscriber',
			) );

			// Show admin notice on success/failure
			if ( is_wp_error( $user ) ) {
				set_transient( 'drd_ra_user_registation_failed', 'Failed to create user: ' . $user->get_error_message(),
					10 );

				return;
			}

			set_transient( 'drd_ra_user_registation_success', 'User account created successfully for ' . $first_name,
				10 );

			// Send email notification to the requester about the account status
			$email_sent = $this->send_acceptance_email( $email, $first_name, $last_name, $auto_generated_password );
			if ( ! $email_sent ) {
				set_transient( 'drd_ra_email_failed', 'Account created but welcome email could not be sent to ' . $email, 10 );
			}

			wp_trash_post( $post_id );
			wp_safe_redirect( admin_url( '/edit.php?post_type=drd_res_acct' ) );
			exit;
		}
	}

	private function send_acceptance_email( string $email, string $first_name, string $last_name, string $temp_password ): bool {
		$logo_url      = 'https://rejuvatidepeptides.com/wp-content/uploads/2025/07/mMTaxqSmDJFklqx2-e1752456965774.png';
		$reset_url     = 'https://rejuvatidepeptides.com/password-reset/';
		$full_name     = esc_html( $first_name . ' ' . $last_name );
		$display_email = esc_html( $email );
		$display_pass  = esc_html( $temp_password );

		$body = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#ffffff;padding:30px 40px;text-align:center;border-bottom:2px solid #f0f0f0;">
              <img src="' . $logo_url . '" alt="Rejuvatide Peptides" style="max-width:200px;height:auto;display:block;margin:0 auto 16px;" />
              <h1 style="margin:0;font-size:26px;color:#2c2c2c;">🎉 🎉 Welcome to Rejuvatide Peptides!!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;color:#444444;font-size:15px;line-height:1.7;">
              <p>Dear ' . $full_name . ',</p>
              <p>Congratulations! We are thrilled to let you know that your research account application has been <strong>approved</strong>. You are now an official member of the Rejuvatide Peptides research community.</p>
              <p>Your account has been created and you can log in right away using the credentials below:</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8f8;border:1px solid #e0e0e0;border-radius:6px;margin:20px 0;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 8px;"><strong>Username:</strong> ' . $display_email . '</p>
                    <p style="margin:0;"><strong>Temporary Password:</strong> ' . $display_pass . '</p>
                  </td>
                </tr>
              </table>

              <p>For your security, please reset your password as soon as you log in for the first time. You can do so by visiting the link below:</p>
              <p style="text-align:center;margin:24px 0;">
                <a href="' . $reset_url . '" style="background-color:#4a90d9;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:5px;font-size:15px;display:inline-block;">Reset Your Password</a>
              </p>
              <p>We look forward to supporting your research journey. If you have any questions or need assistance, do not hesitate to reach out to us.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f8f8;padding:24px 40px;text-align:center;border-top:2px solid #f0f0f0;color:#888888;font-size:13px;">
              <p style="margin:0 0 6px;">Thank you again and welcome!</p>
              <p style="margin:0;font-weight:bold;color:#555555;">Rejuvatide Peptides</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>';

		$subject = 'Welcome to Rejuvatide Peptides – Your Account is Ready';
		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		return wp_mail( $email, $subject, $body, $headers );
	}
}
