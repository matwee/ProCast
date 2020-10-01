<!DOCTYPE html>
<html <?php language_attributes();?>>
	<head>
		<meta charset="<?php bloginfo('charset');?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
		<script src="https://kit.fontawesome.com/5e00f9aa1e.js" crossorigin="anonymous"></script>
		<link rel="shortcut icon" href="">
		
		<?php wp_head();?>

	</head>
	<body>
		<!-- NAVBAR -->
		<section class="nav-wrapper">
			<div class="main-nav">
				<button class="btn-nav" aria-label="open-navigation-button" tabindex="1">
					<div class="line1"></div>
					<div class="line2"></div>
					<div class="line3"></div>
				</button> 
					<?php
					//wp function to add in logo from wp, allowing managers to change it themselves
					if (function_exists('the_custom_logo')){
						the_custom_logo();
					}else{
						bloginfo('name');
					}
				?>
				<div class="rightside-btns">
					<button class="search-btn" aria-label="open-search-button">
						<span class="search-icon">
							<i class="fas fa-search"></i>
						</span>
					</button>
					<button class="cart-btn" aria-label="open-cart-button">
						<span class="nav-icon">
							<i class="fas fa-cart-plus"></i>
						</span>
						<div class="cart-items">0</div>
					</button>
				</div>
			</div>
			<?php
				//wp function to add the corresponding menu to this location
				wp_nav_menu(
					array(
						'theme_location' => 'top-menu',
						'menu_class' => 'top-bar'
					)
				)
			?>
		</section>
		<section class="search-window">
			<div class="search-box">
				<div class="close-wrapper">
					<button class="close-cart" aria-label="close-cart-button">
						<i class="fas fa-window-close"></i>
					</button>
				</div>
				<p>What Are You Looking For?</p>
				<div class="search-inputs">
					<input type="text" name="seach-bar" placeholder="Enter Product Name Here" class="search-bar" autocomplete="off">
					<div class="search-inputs-btns">
						<button class="clear-search" aria-label="clear-searchbar-button">
							<i class="fas fa-times-circle"></i>
						</button>
						<button class="voice-search" aria-label="voice-search-button">
							<i class="fas fa-microphone"></i>
						</button>
					</div>
				</div>
				<ul class="search-results">
				</ul>
			</div>
		</section>
		<!-- CART -->
		<div class="cart-overlay">
			<div class="cart">
				<button class="close-cart" aria-label="close-cart-button">
					<i class="fas fa-window-close"></i>
				</button>
				<h2> Your Cart</h2>
				<div class="cart-content"> 
				</div>
				<div class="cart-footer">
					<h3>Your Total : $ <span class="cart-total">0</span></h3>
					<button class="clear-cart banner-btn">Clear cart</button>
				</div>
			</div>
		</div>

