<?php
/**
 * An API that accepts user role and reference date from the client
 * and returns 30 days salse report based on client input.
 */

namespace includes\rest_controllers;

use WP_REST_Server;
use WP_REST_Response;
use WP_REST_Request;

class Get_Salse_Report_By_User_Role {
	/**
	 * The api version
	 * @var string
	 */
	protected string $version;

	/**
	 * The namespace for custom api endpoints that this plugin registers
	 * @var string
	 */
	protected string $namespace;

	/**
	 * The rest api base/end point
	 * @var string
	 */
	protected string $rest_base;

	public function __construct() {
		$namespace = new \Drd_Custom_Plugin();
		$namespace = $namespace->get_api_namespace();

		$this->version   = 'v1';
		$this->namespace = $namespace . '/' . $this->version;
		$this->rest_base = 'salse-report-by-user-role';
	}

	/**
	 * The method registers a new custom end point
	 *
	 * @return void
	 */
	public function register_endpoints(): void {
		register_rest_route( $this->namespace, '/' . $this->rest_base, array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => array( $this, 'get_salse_report' ),
			'permission_callback' => array( $this, 'get_salse_report__permission' )
		) );
	}

	protected function get_ordes_of_the_day( \DateTime $date, string $requested_user_role ): array {
		$orders = wc_get_orders( array(
			'date_created' => $date->format( 'Y-m-d' )
		) );

		$net_salse      = 0;
		$total_shipping = 0;

		foreach ( $orders as $order ) {
			$user      = get_userdata( $order->get_user_id() );
			$user_role = $user->roles;

			if ( $requested_user_role == $user_role[0] ) {
				$net_salse      = $net_salse + $order->get_subtotal();
				$total_shipping = $total_shipping + $order->get_shipping_total();
			}
		}

		return array(
			'net_sales'      => $net_salse,
			'shipping_total' => $total_shipping
		);
	}

	/**
	 * The method returns last 30 days salses report starting from reference day
	 * The reference day is passed by the client
	 *
	 * @param WP_REST_Request $request the api request
	 *
	 * @return WP_REST_Response
	 * @throws \Exception
	 */
	public function get_salse_report( WP_REST_Request $request ): WP_REST_Response {
		$reference_date = sanitize_text_field( $request->get_param( 'referenceDate' ) );
		$user_role      = sanitize_text_field( $request->get_param( 'userRole' ) );

		$end_date      = new \DateTime( $reference_date );
		$end_date      = $end_date->add(new \DateInterval( 'P1D' ));
		$start_date    = new \DateTime( $reference_date );
		$start_date    = $start_date->sub( new \DateInterval( 'P29D' ) );
		$date_interval = new \DateInterval( 'P1D' );
		$date_period   = new \DatePeriod( $start_date, $date_interval, $end_date );

		$order_data_by_day = [];

		foreach ( $date_period as $date ) {
			$order_data_by_day[] = array(
				'date'       => $date->format( 'Y-m-d' ),
				'order_data' => $this->get_ordes_of_the_day( $date, $user_role ),
			);
		}

		return new WP_REST_Response( array(
			'message' => 'The response succeeded...',
			'data'    => array(
				'end_date'   => $end_date->format( 'Y-m-d' ),
				'start_date' => $start_date->format( 'Y-m-d' ),
				'userRole'   => $user_role,
				'orders'     => $order_data_by_day
			)
		) );
	}

	/**
	 * The method return true or false depending on the user access permission level
	 *
	 * @return bool
	 */
	public function get_salse_report__permission(): bool {
		return current_user_can('manage_woocommerce');
	}
}