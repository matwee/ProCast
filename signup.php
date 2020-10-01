<!-- the php file that the submit button leads to, which uploads the submitted info to the database using the database connection created in dbh.php-->

<?php
	include_once 'includes/dbh.inc.php';

	$name = $_POST['name'];
	$email = $_POST['email'];

	$sql = "INSERT INTO newsletter (name, email) VALUES ('$name','$email');";
	mysqli_query($conn, $sql);

	header("Location: /wp2/?signup=success");
