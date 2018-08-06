<?php
require_once ("db.php");
$sql = "SELECT name, score FROM users ORDER BY score DESC";
 $result = $conn->prepare($sql);
 $result->execute();
 $data = $result->fetchAll();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Leaderboard</title>
	<link rel="stylesheet" type="text/css" href="css/leaderboard.css">
</head>
<body>
	<table id="leaderboard">
		<tr>
			<th>Name</th>
			<th>Score</th>
		</tr>
		<?php foreach ($data as $key): ?>
			<?php echo "<tr>"; ?>
				<?php echo "<td>".$key['name']."</td>"; ?>
				<?php echo "<td>".$key['score']."</td>"; ?>
			<?php echo "</tr>"; ?>
		<?php endforeach; ?>
	</table>
</body>
</html>