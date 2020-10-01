<!-- 
Template Name: Update Product List Template

this page will take all of the products (aka custom posts) and retrieve their title, id, price, filename, categories, and permalinks and place them into an object. It is then converted to JSON format and saved as a sepererate file. You must view this page on the WP admin site when you want to update the product list of ProCast 

-->

<?php

function get_data(){

	$args = array(  
	    'post_type' => 'products',
	    'post_status' => 'publish',
	    'posts_per_page' => 29, 
	);

	$post_data = array();

	$my_query = new WP_Query( $args );
	if ( $my_query->have_posts() ) {
	    while ( $my_query->have_posts() ) {
	        $my_query->the_post();
	        $post_data[] = array(
	            'title' => get_the_title(),
	            'id'      => get_post_meta( get_the_ID(), 'id', true ),
	            'price'     => get_post_meta( get_the_ID(), 'price', true ),
	            'filename'     => get_post_meta( get_the_ID(), 'filename', true ),
	            'category1'     => get_the_category()[0]->name,
	            'category2'     => get_the_category()[1]->name,
	            'link'     => get_permalink(),
	        );
	    }
	}

	return json_encode($post_data);
}

$file_name = 'wp-content/themes/project2/includes/productsTEST.json';

if(file_put_contents($file_name, get_data())){
	echo $file_name.'file created';
}else{
	echo 'Error';
};

?>