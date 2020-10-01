<?php
	/* Template Name: Front-Page*/	
	get_header();
?>

<!-- HERO -->
<header class="hero">
	<div class="banner">
		<h1 class="banner-title">Pro Gear For Any Situation</h1>
		<a href="http://localhost/wp2/shop/"><button class="banner-btn" tabindex="-1">Shop Now</button></a>
	</div>
</header>
<!-- TRENDING ITEMS-->
<section class="trending">
		<div class="section-title">
			<h2>Trending Now</h2>
		</div>
		<div class="trending-center"> 
		</div>	
</section> 
<!-- RODS BANNER -->
<section class="rods">
	<div class="section-title">
		<h2>Looking to make the perfect cast?</h2>
		<p>Check out our rod selection today for the latest in fishing rod tech.</p>
		<a href="http://localhost/wp2/shop/"><button class="banner-btn" tabindex="-1">Discover Now</button></a>
	</div>
</section>
<!-- NEW ITEMS -->
<section class="new">
		<div class="section-title">
			<h2>New Products</h2>
		</div>
		<div class="new-center"> 
		</div>	
</section> 
<!-- NEWSLETTER -->
<section class='newsletter'>
	<div>
		<p>BE THE FIRST TO KNOW ABOUT SALES & NEW RELEASES.</p>
		<span><p>SUBSCRIBE TO OUR NEWSLETTER</p></span>
		<button class="banner-btn">SIGN ME UP</button>
	</div>
</section>
<form class='signup' action="<?php bloginfo('template_directory');?>/signup.php" method="post">
	<div class="signup-wrapper">
		<div class="close-wrapper">
			<button class="close-cart" aria-label="close-signup-button">
				<i class="fas fa-window-close"></i>
			</button>
		</div>
		<p>Subscribe To Our Newsletter</p>
		<input class='text' type="text" name="name" placeholder="Name" required/>
		<input class='text' type="text" name="email" placeholder="Email" required/>
		<input type="submit" class="banner-btn" value="SUBSCRIBE"/>
	</div>
</form>

<?php
	get_footer();
?>