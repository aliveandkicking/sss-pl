<?php
	$servername = "localhost";
	$username = "id1172221_admin";
	$password = "9293709b13B";
	$dbname = "id1172221_data";

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	$entityBody = file_get_contents('php://input');
	
	$stmt = $conn->prepare("SELECT process_data(?, ?) as res");
	$stmt->bind_param('ss', $_REQUEST['operation'], $entityBody);	
	$stmt->execute();	
    $stmt->bind_result($result);	
	$stmt->fetch();
	
    echo stripslashes($result);

	$stmt->close();	
	$conn->close();
?>