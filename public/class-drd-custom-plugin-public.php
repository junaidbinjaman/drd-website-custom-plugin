<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://junaidbinjaman.com
 * @since      1.0.0
 *
 * @package    Drd_Custom_Plugin
 * @subpackage Drd_Custom_Plugin/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Drd_Custom_Plugin
 * @subpackage Drd_Custom_Plugin/public
 * @author     Junaid Bin Jaman <junaid@allnextver.com>
 */
class Drd_Custom_Plugin_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Drd_Custom_Plugin_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Drd_Custom_Plugin_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/drd-custom-plugin-public.css', array(), $this->version, 'all' );

		/**
		 * Enqueue reactjs styles
		 */
		wp_enqueue_style(
			'react-js-styles',
			plugins_url('/drd-custom-plugin', dirname(__DIR__, 1)) . '/includes/react/index.css',
			[],
			'1.0.0',
			'all',
		);

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Drd_Custom_Plugin_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Drd_Custom_Plugin_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/drd-custom-plugin-public.js', array( 'jquery' ), $this->version, false );

		/**
		 * Enqueue react js scripts
		 */
		wp_enqueue_script(
			'react-js-scripts',
			plugins_url('/drd-custom-plugin', dirname(__DIR__, 1)) . '/includes/react/index.js',
			[],
			'1.0.0',
			true
		);

		echo '<div id="drd-user-interface"></div>';

	}

}
