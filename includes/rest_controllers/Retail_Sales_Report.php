<?php

namespace includes\rest_controllers;

class Retail_Sales_Report {
	protected string $version;
	protected string $namespace;
	protected string $rest_base;

	public function __construct() {
		$this->version   = 'v1';
		$this->rest_base = 'retail-sales-report';
		$this->namespace = ( new \Drd_Custom_Plugin() )->get_api_namespace() . '/' . $this->version;
	}

	public function register_endpoints(): void {
		register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_orders' ),
				'args'                => [
					'start_date' => [
						'required'          => true,
						'sanitize_callback' => 'sanitize_text_field',
					],
					'end_date'   => [
						'required'          => true,
						'sanitize_callback' => 'sanitize_text_field'
					]
				],
				'permission_callback' => array( $this, 'permission_callback' )
			),
		);
	}

	public function get_orders( \WP_REST_Request $request ): \WP_REST_Response {
		$start_date = date( 'Y-m-d', strtotime( $request->get_param( 'start_date' ) ) );
		$end_date   = date( 'Y-m-d', strtotime( $request->get_param( 'end_date' ) ) );

		$orders = wc_get_orders( [
			'date_completed' => "{$start_date}...{$end_date}",
			'limit'          => -1,
		] );

		if ( empty( $orders ) ) {
			return new \WP_REST_Response( [
				'status'  => 'success',
				'message' => 'No retail customer orders found within the selected date range.',
				'data'    => [],
			], 200 );
		}

		$total_orders = 0;
		$summary = [
			'subtotals'       => 0.0,
			'fees'            => 0.0,
			'shipping_totals' => 0.0,
			'discount_total'  => 0.0,
			'order_totals'    => 0.0,
		];

		foreach ( $orders as $order ) {
			$user = $order->get_user();

			if ( ! $user instanceof \WP_User || empty( $user->roles ) ) {
				continue;
			}

			if ( ! in_array( 'customer', (array) $user->roles, true ) ) {
				continue;
			}

			$total_orders++;
			$summary['subtotals']       += floatval( $order->get_subtotal() );
			$summary['fees']            += floatval( $order->get_total_fees() );
			$summary['shipping_totals'] += floatval( $order->get_shipping_total() );
			$summary['discount_total']  += floatval( $order->get_total_discount() );
			$summary['order_totals']    += floatval( $order->get_total() );
		}

		// Format values for output
		foreach ( $summary as $key => $value ) {
			$summary[ $key ] = [
				'raw'       => $value,
				'formatted' => wc_price( $value ),
			];
		}

		return new \WP_REST_Response( [
			'status'       => 'success',
			'message'      => 'Retail customer sales report generated successfully.',
			'start-date'   => $start_date,
			'end-date'     => $end_date,
			'total_orders' => $total_orders,
			'data'         => $summary,
		], 200 );
	}


	public function permission_callback(): bool {
		if ( ! is_user_logged_in() ) {
			return false;
		}

		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			return false;
		}

		return true;
	}
}
