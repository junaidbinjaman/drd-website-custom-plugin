<?php
/**
 * @package Drd_Custom_Plugin
 * @author Junaid Bin Jaman<junaid@allnextver.com>
 * @since 1.0.0
 */

namespace includes\rest_controllers;

class Return_User_Role {
	/**
	 * The api version
	 * @var string
	 */
	private string $version;

	/**
	 * The plugin rest api namespace
	 * @var string
	 */
	private string $namespace;

	/**
	 * The rest api end point
	 * @var string
	 */
	private string $rest_base;

	public function __construct() {
		$api_namespace = new \Drd_Custom_Plugin();
		$api_namespace = $api_namespace->get_api_namespace();

		$this->version   = 'v1';
		$this->namespace = $api_namespace . '/' . $this->version;
		$this->rest_base = 'user_roles';
	}

	public function register_endpoints(): void {
		register_rest_route( $this->namespace, '/' . $this->rest_base, array(
			'methods'             => \WP_REST_Server::READABLE,
			'callback'            => array( $this, 'retrieve_available_user_roles' ),
			'permission_callback' => array( $this, 'read_action_permission' )
		) );
	}

	public function retrieve_available_user_roles(): \WP_REST_Response {
		global $wp_roles;

		return new \WP_REST_Response( array(
			'message'    => 'The rest succeeded..',
			'user_roles' => $wp_roles->get_names()
		), 200 );
	}

	public function read_action_permission(): bool {
		return current_user_can( 'manage_woocommerce' );
	}
}