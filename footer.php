	<section class="footer">
		<div class="footer-wrapper">			
			<div class="info">
				<?php
					if (function_exists('the_custom_logo')){
						the_custom_logo();
					}else{
						bloginfo('name');
					}
				?>
				<a href='https://www.google.com/maps/place/2850+Victoria+Park+Ave,+North+York,+ON+M2J+4A9/@43.7888421,-79.3320347,17z/data=!3m1!4b1!4m5!3m4!1s0x89d4d3ab81ca523f:0x7668673163feeb19!8m2!3d43.7888421!4d-79.329846' target="_blank"><p>2850 Victoria Park Ave | Toronto | ON | M2J 3T7</p></a>
				<a href="tel:+4167916475"><p>416-791-6475</p>
				<a href="mailto:shopatprocast@procast.ca"><p>shopatprocast@procast.ca</p></a>
				<div class="socials">
					<a href="" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
					<a href="" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
					<a href="" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
					<a href="" aria-label="LinkdIn"><i class="fab fa-linkedin-in"></i></a>
				</div>
			</div>
		</div>
		<div class="copyright">
			<p>Copyright © 2020 ProCast. All rights reserved.</p>
		</div>
	</section>
		<?php wp_footer(); ?>
	</body>
</html>