<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://junaidbinjaman.com
 * @since             1.0.0
 * @package           Drd_Custom_Plugin
 *
 * @wordpress-plugin
 * Plugin Name:       Drd Custom Plugin
 * Plugin URI:        https://allnextver.com
 * Description:       This is a custom plugin developed for drd website. The purpose behind this plugin development is to develop custom features and functionalities for drd website.
 * Version:           1.0.0
 *
 * Author:            Junaid Bin Jaman
 * Author URI:        https://junaidbinjaman.com/
 *
 *  Developer:         All Next Ver
 *  Developer URI:     https://allnextver.com
 *
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Text Domain:       drd-custom-plugin
 * Domain Path:       /languages
 * Requires Plugins:  woocommerce
 */

// If this file is called directly, abort.
use includes\salse_report_by_user_role;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
const DRD_CUSTOM_PLUGIN_VERSION = '1.0.0';

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-drd-custom-plugin-activator.php
 */
function activate_drd_custom_plugin(): void {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-drd-custom-plugin-activator.php';
	Drd_Custom_Plugin_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-drd-custom-plugin-deactivator.php
 */
function deactivate_drd_custom_plugin(): void {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-drd-custom-plugin-deactivator.php';
	Drd_Custom_Plugin_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_drd_custom_plugin' );
register_deactivation_hook( __FILE__, 'deactivate_drd_custom_plugin' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-drd-custom-plugin.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_drd_custom_plugin(): void {

	if ( ! class_exists( 'WooCommerce' ) ) {
		echo '<div class="error">I require WooCommerce. So get back to me after having woocommerce.</div>';
	}

	Drd_Custom_Plugin::getInstance()->run();
}

add_action( 'plugins_loaded', 'run_drd_custom_plugin' );

require_once plugin_dir_path( __FILE__ ) . 'includes/rest_controllers/Salse_Report_By_User_Role.php';

add_action( 'rest_api_init', function () {
	$controller = new \includes\rest_controllers\Salse_Report_By_User_Role();
	$controller->register_routes();
} );



