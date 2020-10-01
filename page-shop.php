<!-- 
Template Name: Shop Page
-->
<?php
	get_header();
?>


<!-- FILTER -->
<section class="filter">
	<div class="filter-wrapper">
		<div class="close-filter-wrapper">
			<button class="close-filter" aria-label="close-filter-button">
				<i class="fas fa-window-close"></i>
			</button>
		</div>
		<h2>Filter By:</h2>
		<div class="filter-options">
			<div>
				<input type="checkbox" name="Rods" id="Rods" checked/>
				<label for="Rods">Rods</label>
			</div>
			<div>
				<input type="checkbox" name="Reels" id="Reels" checked/>
				<label for="Reels">Reels</label>
			</div>
			<div>
				<input type="checkbox" name="Lures" id="Lures" checked/>
				<label for="Lures">Lures</label>
			</div>
			<div>
				<input type="checkbox" name="Fishing-Tackle" id="Fishing-Tackle" checked/>
				<label for="Fishing-Tackle">Fishing Tackle</label>
			</div>
		</div>
	</div>
</section>
<!-- PRODUCTS -->
<section class="products">
	<div class="section-title">
		<h2>Our Products</h2>
	</div>
	<div class="filter-btn-wrapper">
		<button class="filter-btn" aria-label="open-filter-button">
			<p>Filter</p>
			<i class="fas fa-filter"></i>
		</button>
	</div>
	<div class="products-center"> 
	</div>	
</section> 

<?php
	get_footer();
?>

