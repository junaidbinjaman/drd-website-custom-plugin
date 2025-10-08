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
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_orders' ),
				'args'     => [
					'start_date' => [
						'required'          => true,
						'sanitize_callback' => 'sanitize_text_field',
					],
					'end_date'   => [
						'required'          => true,
						'sanitize_callback' => 'sanitize_text_field'
					]
				],
				'permission_callback' => array($this, 'permission_callback')
			),
		);
	}

	public function get_orders( \WP_REST_Request $request ): \WP_REST_Response {
		$start_date = date( 'Y-m-d', strtotime( $request->get_param( 'start_date' ) ) );
		$end_date   = date( 'Y-m-d', strtotime( $request->get_param( 'end_date' ) ) );

		$orders = wc_get_orders( array(
			'date_completed' => "{$start_date}...{$end_date}",
			'limit'          => - 1
		) );

		$formatted_order_data = [];

		foreach ( $orders as $order ) {
			$formatted_order_data[] = [
				'order_id'             => $order->get_id(),
				'order_date_created'   => $order->get_date_created(),
				'order_date_completed' => $order->get_date_completed(),
				'order_subtotal'       => $order->get_subtotal(),
				'order_fee'            => $order->get_total_fees(),
				'order_shipping_total' => $order->get_shipping_total(),
				'discount_total'       => $order->get_total_discount(),
				'order_total'          => $order->get_total(),
			];
		}

		return new \WP_REST_Response( [
			'status'     => 'success',
			'start-date' => $start_date,
			'end-date'   => $end_date,
			"count"      => count( $orders ),
			"orders"     => $formatted_order_data,
			'message'    => 'The response is successful'
		] );
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