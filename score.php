<?php
require_once ("db.php");
if (!empty($_POST['name'])) {
	$sql = "UPDATE users SET score = :score WHERE name = :name";
	$result = $conn->prepare($sql);
	$result->bindParam(':name', $_POST['name'], PDO::PARAM_STR);
	$result->bindParam(':score', $_POST['score'], PDO::PARAM_STR);
	$a = $result->execute();
}