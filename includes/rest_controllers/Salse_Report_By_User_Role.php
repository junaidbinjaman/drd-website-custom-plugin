<?php
/**
 * @package WordPress
 * @package Drd Custom Plugin
 *
 * Custom rest api endpoint that gives you sales report by user role
 */

namespace includes\rest_controllers;

use WP_REST_Controller;
use WP_REST_Server;
use WP_REST_Response;

defined( 'ABSPATH' ) || exit;

class Salse_Report_By_User_Role extends WP_REST_Controller {
	/**
	 * API version
	 *
	 * @var string
	 */
	private string $version;

	/**
	 * The api namespace
	 * @var string
	 */
	public $namespace;

	/**
	 * The rest api endpoint
	 * @var string
	 */
	public $rest_base;

	public function __construct() {
		$this->version   = 'v1';
		$this->namespace = 'drdcustomplugin/' . $this->version;
		$this->rest_base = 'salse-report-by-user-role';
	}

	/**
	 * Register custom routes.
	 * rest_api_init hook calls this method.
	 * @return void
	 */
	public function register_routes(): void {
		register_rest_route( $this->namespace, '/' . $this->rest_base, array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => array( $this, 'get_salse_report_by_user_role' ),
			'callback_permission' => array( $this, 'salse_report_by_user_role_permission' )
		) );

		register_rest_route( $this->namespace, '/' . $this->rest_base, array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => array( $this, 'user_selected_date' ),
			'callback_permission' => array( $this, 'salse_report_by_user_role_permission' )
		) );
	}

	/**
	 * This method return salses report within a selected date by user role
	 *
	 * TODO: The method return salse report of a selected date range.
	 * TODO: But it does not yet sorts the report by user role.
	 *
	 * @return array
	 * @throws \DateMalformedPeriodStringException
	 */
	public function get_salse_report_by_user_role(): array {
		$start    = new \DateTime();
		$start    = $start->modify( '- 31 days' );
		$interval = new \DateInterval( 'P1D' );

		$end    = new \DateTime();
		$end    = $end->add( new \DateInterval( 'P1D' ) );
		$period = new \DatePeriod( $start, $interval, $end );

		$start = $start->format( 'Y-m-d' );
		$end   = $end->format( 'Y-m-d' );

		$orders = wc_get_orders( [
			'date_paid' => $start . '...' . $end,
			'limit'     => - 1
		] );

		$order_data = [];

		foreach ( $period as $date ) {
			$order_total = $this->get_day_total( $date, $orders );

			$order_data[] = array(
				'date'  => $date,
				'total' => $order_total
			);
		}

		return $order_data;

//		return new WP_REST_Response( [
//			'message' => 'The rest response succeed',
//			'data'    => $order_data,
//		], 200 );
	}

	public function the_test( string $date, string $user_role ): array|string {
		if ( empty( $date ) ) {
			return 'Something went wrong';
		}

		$start    = new \DateTime( $date );
		$start    = $start->modify( '- 31 days' );
		$interval = new \DateInterval( 'P1D' );

		$end    = new \DateTime( $date );
		$end    = $end->add( new \DateInterval( 'P1D' ) );
		$period = new \DatePeriod( $start, $interval, $end );

		$start = $start->format( 'Y-m-d' );
		$end   = $end->format( 'Y-m-d' );

		$orders = wc_get_orders( [
			'date_paid' => $start . '...' . $end,
			'limit'     => - 1
		] );

		$order_data = [];

		foreach ( $period as $date ) {
			$order_total = $this->get_day_total( $date, $user_role, $orders );

			$order_data[] = array(
				'date'  => $date,
				'total' => $order_total
			);
		}

		return $order_data;
	}

	/**
	 * The method loop through the order in a selected date range and returns day total for the passed date
	 *
	 * @param \DateTime $date
	 * @param array $orders
	 *
	 * @return array
	 * @throws \Exception
	 */
	public function get_day_total( \DateTime $date, string $user_role, array $orders ): array {
		$date                     = $date->format( 'Y-m-d' );
		$order_total              = 0;
		$shipping_total           = 0;
		$tax_total                = 0;
		$formatted_order_total    = wc_price( $order_total );
		$formatted_shipping_total = wc_price( $shipping_total );
		$formatted_tax_total      = wc_price( $tax_total );

		foreach ( $orders as $order ) {
			$data_created = new \DateTime( $order->get_date_created() );
			$data_created = $data_created->format( 'Y-m-d' );
			$user_id      = $order->get_user_id();

			if ( $data_created === $date && $this->is_selected_user_role( $user_id, $user_role ) ) {
				$order_total    = $order_total + $order->get_subtotal();
				$shipping_total = $shipping_total + $order->get_shipping_total();
				$tax_total      = $tax_total + $order->get_total_tax();
			}
		}

		return array(
			'order_total'              => $order_total,
			'shipping_total'           => $shipping_total,
			'tax_total'                => $tax_total,
			'formatted_order_total'    => $formatted_order_total,
			'formatted_shipping_total' => $formatted_shipping_total,
			'formatted_tax_total'      => $formatted_tax_total
		);
	}

	public function is_selected_user_role( string $user_id, string $user_selected_user_role ): bool {
		$user_roles = get_userdata( $user_id )->roles;

		foreach ( $user_roles as $user_role ) {
			if ( $user_role === $user_selected_user_role ):
				return true;
			endif;
		}

		return false;
	}

	function user_selected_date( \WP_REST_Request $request ): WP_REST_Response {
		$user_selected_date = sanitize_text_field( $request->get_param( 'date' ) );
		$user_role          = sanitize_text_field( $request->get_param( 'user_role' ) );

		return new WP_REST_Response( [
			'message' => 'This is a test message',
			'data'    => [
				'date'  => $user_selected_date,
				'order' => $this->the_test( $user_selected_date, $user_role )
			]
		], 200 );
	}

	/**
	 * API reader permission
	 * @return string
	 */
	public function salse_report_by_user_role_permission(): string {
		return '__return_true';
	}
}
