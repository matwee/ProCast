<?php

/*
	Functions.php
	Description: Add features to wordpress theme
*/



// creating function to include css stylesheets to wordpress 
function fn_theme_scripts(){
	wp_enqueue_style('style', get_stylesheet_directory_uri() . '/style.css', array(), 1.0, 'all');
}
add_action('wp_enqueue_scripts', 'fn_theme_scripts');

//adding new features to wordpress theme
function fn_theme_supports(){
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('html5', array('search-form'));
	add_theme_support('custom-logo');
	add_theme_support('custom-header');
	add_theme_support('custom-background');
	add_theme_support('post-formats', array('aside', 'image', 'video'));
	add_theme_support('menus');
}
add_action('after_setup_theme', 'fn_theme_supports');

//adding javascript files to wordpress
function custom_scripts(){
	wp_enqueue_script('app', get_stylesheet_directory_uri() . '/includes/app.js', false,  null, true );
}
add_action('wp_enqueue_scripts', 'custom_scripts');

//Menus
register_nav_menus(
	array(
		'top-menu' =>'Top Menu Location',
		'mobile-menu' => 'Mobile Menu Location',
	)
);

//custom post type
function custom_post_type(){
	$labels = array(
		'name' => 'Products',
		'singular_name' => 'Product',
		'add_new' => 'Add Product',
		'all_items' => 'All Products',
		'add_new_item' => 'Add Product',
		'edit_item' => 'Edit Product',
		'new_item' => 'New Product',
		'view_item' => 'View Product',
		'search_item' => 'Search Products',
		'not_found' => 'No Products Found',
		'not_found_in_trash' => 'No Products Found in Trash',
		'parent_item_colon' => 'Parent Item'
	);
	$args = array(
		'labels' => $labels,
		'public' => true,
		'has_archive' => true,
		'publicly_queryable' => true,
		'query_var' => true,
		'rewrite' => true,
		'capability_type' => 'post',
		'hierarchical' => false,
		'supports' => array(
			'title',
			'editor',
			'thumbnail',
			'revisions',
			'custom-fields',
		),
		'menu_position' => 6,
		'exclude_from_search' => false
	);
	register_post_type('products',$args);
}
add_action('init', 'custom_post_type');

function custom_taxonomies(){
	//add new hierarchical taxonomies
	$labels = array(
		'name' =>'Categories', 
		'singular_name' => 'Category',
		'search_items' => 'Search Categories',
		'all_items' => 'All Categories',
		'parent_item' => 'Parent Category',
		'parent_item_colon' => 'Parent Category:',
		'edit_item' => 'Edit Category',
		'update_item' => 'Update Category',
		'add_new_item' => 'Add New Category',
		'new_item_name' => 'New Category Name',
		'menu_name' => 'Categories'
	);
	$args = array(
		'hierarchical' => true,
		'labels' => $labels,
		'show_ui' => true,
		'show_admin_column' => true,
		'query_var' => true,
		'rewrite' => array('slug' => 'type')
	);
	register_taxonomy('category', array('products'), $args);
}
add_action('init', 'custom_taxonomies');

?>