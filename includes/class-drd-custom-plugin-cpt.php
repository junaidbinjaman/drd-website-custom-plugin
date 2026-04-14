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
			'_drd_ra_first_name' => __( 'First Name', 'drd-custom-plugin' ),
			'_drd_ra_last_name'  => __( 'Last Name', 'drd-custom-plugin' ),
			'_drd_ra_email'      => __( 'Email Address', 'drd-custom-plugin' ),
			'_drd_ra_phone'      => __( 'Phone #', 'drd-custom-plugin' ),
			'_drd_ra_facility'   => __( 'Research Facility', 'drd-custom-plugin' ),
		);

		echo '<table class="form-table"><tbody>';

		foreach ( $fields as $key => $label ) {
			$value = get_post_meta( $post->ID, $key, true );
			$type  = ( '_drd_ra_email' === $key ) ? 'email' : 'text';
			printf(
				'<tr><th><label for="%1$s">%2$s</label></th><td><input type="%3$s" id="%1$s" name="%1$s" value="%4$s" class="regular-text" /></td></tr>',
				esc_attr( $key ),
				esc_html( $label ),
				esc_attr( $type ),
				esc_attr( $value )
			);
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
			'_drd_ra_first_name' => 'sanitize_text_field',
			'_drd_ra_last_name'  => 'sanitize_text_field',
			'_drd_ra_email'      => 'sanitize_email',
			'_drd_ra_phone'      => 'sanitize_text_field',
			'_drd_ra_facility'   => 'sanitize_text_field',
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

		$columns['_drd_ra_first_name'] = __( 'First Name', 'drd-custom-plugin' );
		$columns['_drd_ra_last_name']  = __( 'Last Name', 'drd-custom-plugin' );
		$columns['_drd_ra_email']      = __( 'Email', 'drd-custom-plugin' );
		$columns['_drd_ra_facility']   = __( 'Research Facility', 'drd-custom-plugin' );

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
			'_drd_ra_first_name',
			'_drd_ra_last_name',
			'_drd_ra_email',
			'_drd_ra_facility',
		);

		if ( in_array( $column, $meta_keys, true ) ) {
			echo esc_html( get_post_meta( $post_id, $column, true ) );
		}
	}

	public function accept_research_account_req(): void {
		if ( isset( $_POST['drd_approve_request'] ) && '1' === $_POST['drd_approve_request'] ) {
			$post_id = get_the_ID();
			if ( ! $post_id ) {
				return;
			}

			// Register a new user if no user exists with the provided email
			// Show admin notice on success/failure
			// trash the post after processing
			// Send email notification to the requester about the account status
		}
	}
}
