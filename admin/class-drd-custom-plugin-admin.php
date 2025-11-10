<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://junaidbinjaman.com
 * @since      1.0.0
 *
 * @package    Drd_Custom_Plugin
 * @subpackage Drd_Custom_Plugin/admin
 */

use includes\rest_controllers\Return_User_Role;
use includes\rest_controllers\Get_Salse_Report_By_User_Role;
use includes\rest_controllers\Retail_Sales_Report;
use includes\rest_controllers\Wholesale_Sales_Report;

require_once plugin_dir_path( __FILE__, ) . '../includes/rest_controllers/Return_User_Role.php';
require_once plugin_dir_path( __FILE__, ) . '../includes/rest_controllers/Get_Salse_Report_By_User_Role.php';
require_once plugin_dir_path( __FILE__, ) . '../includes/rest_controllers/Retail_Sales_Report.php';
require_once plugin_dir_path( __FILE__, ) . '../includes/rest_controllers/Wholesale_Sales_Report.php';

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Drd_Custom_Plugin
 * @subpackage Drd_Custom_Plugin/admin
 * @author     Junaid Bin Jaman <junaid@allnextver.com>
 */
class Drd_Custom_Plugin_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string $plugin_name The ID of this plugin.
	 */
	private string $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string $version The current version of this plugin.
	 */
	private string $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param string $plugin_name The name of this plugin.
	 * @param string $version The version of this plugin.
	 *
	 * @since    1.0.0
	 */
	public function __construct( string $plugin_name, string $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	/**
	 * Get the action screen on admin panel
	 * @return string|WP_Screen|null
	 */
	private function screen(): string|WP_Screen|null {
		return get_current_screen();
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles(): void {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Drd_Custom_Plugin_Loader as all the hooks are defined
		 * in that particular class.
		 *
		 * The Drd_Custom_Plugin_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/drd-custom-plugin-admin.css', array(), $this->version, 'all' );

		/**
		 * Enqueue react style
		 */
		if ( $this->screen() && $this->screen()->id === 'toplevel_page_sales-report-by-user-role' ) {
			wp_enqueue_style(
				'drd-admin-react-ui-styles',
				plugin_dir_url( __DIR__ ) . 'includes/react/index.css',
				array(),
				filemtime( plugin_dir_path( __DIR__ ) . 'includes/react/index.css' ),
				'all'
			);
		}
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts(): void {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Drd_Custom_Plugin_Loader as all the hooks are defined
		 * in that particular class.
		 *
		 * The Drd_Custom_Plugin_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/drd-custom-plugin-admin.js', array( 'jquery' ), $this->version, false );

		/**
		 * Enqueue the react ui scripts
		 */
		if ( $this->screen() && $this->screen()->id === 'toplevel_page_sales-report-by-user-role' ) {
			wp_enqueue_script(
				'drd-admin-react-ui-screen',
				plugin_dir_url( __DIR__ ) . 'includes/react/index.js',
				array(),
				filemtime( plugin_dir_path( __DIR__ ) . 'includes/react/index.js' ),
				true
			);

			wp_localize_script( 'drd-admin-react-ui-screen', 'drdData', [
				'rootUrl' => esc_url_raw( rest_url() ),
				'nonce'   => wp_create_nonce( 'wp_rest' ),
			] );
		}
	}

	/**
	 * Admin menu initializer function
	 *
	 * @return void
	 */
	public function admin_menu_initializer(): void {
		add_menu_page(
			__( 'Sales report by user role' ),
			__( 'Sales report by user role' ),
			'manage_woocommerce',
			'sales-report-by-user-role',
			array( $this, 'salse_report_by_user_role' ),
			'dashicons-chart-pie'
		);
	}

	public function salse_report_by_user_role(): void {
		$date = new \DateTime();
		echo '<div id="drd-admin-interface"></div>';

		$startDate = new \DateTime();
		$formattedStartDate = $startDate->format('Y-m-d');

		$endDate = new \DateTime();
		$endDate = $startDate->modify('- 30 days');
		$formattedEndDate = $endDate->format('Y-m-d');
	}

	public function init_custom_rest_api(): void {
		$get_user_roles = new Return_User_Role();
		$get_salse_report_by_user_role = new Get_Salse_Report_By_User_Role();
		$retial_sales_report = new Retail_Sales_Report();
		$wholesale_sales_report = new Wholesale_Sales_Report();

		$get_user_roles->register_endpoints();
		$get_salse_report_by_user_role->register_endpoints();
		$retial_sales_report->register_endpoints();
		$wholesale_sales_report->register_endpoints();
	}
}
