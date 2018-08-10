<?php
  require_once ("db.php");
  if (isset($_GET['play'])) {
    if (!empty($_GET['name'])) {
      $sql = "INSERT INTO users(name) VALUES(:name)";
      $result = $conn->prepare($sql);
      $result->bindParam(':name', $_GET['name'], PDO::PARAM_STR);
      $a = $result->execute();
    }
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Enjoy</title>
  <script src="https://aframe.io/releases/0.7.0/aframe.min.js"></script>
  <script src="assets/components/cursor-listener.js"></script>
  <script src="assets/components/raycaster-autorefresh.js"></script>
  <script src="assets/components/game-manager.js"></script>
  <script src="https://unpkg.com/aframe-animation-component@4.0.0-beta8/dist/aframe-animation-component.min.js"></script>
</head>
<body data-name="<?php if (!empty($_GET['name'])) echo $_GET['name'] ?>">
  <a-scene raycaster-autorefresh>
    <a-assets>
        <img src="https://img.gs/bbdkhfbzkk/stretch/https://i.imgur.com/25P1geh.png" id="grid" crossorigin="anonymous">
        <img id="sky" src="https://img.gs/bbdkhfbzkk/2048x2048,stretch/http://i.imgur.com/WqlqEkq.jpg" crossorigin="anonymous" >
        <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" crossorigin="anonymous">
    </a-assets>
    <a-box game-manager="numberEnemies: 10"></a-box>
    <a-plane start widht="1" height="1" position="0.266 4.078 -6.856" material="opacity: 0.0">
    <a-text id="start" value="Start" position="-0.937 0 0" color="#e01a0f" width="20"></a-text>
    </a-plane>
    <a-camera>
      <a-entity id="weapon" cursor="downEvents: triggerdown; upEvents: triggerUp" 
                geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.03"
                material="color:  #ff0000; shader: flat"
                position="0 0 -1">
      </a-entity>
    </a-camera> 
    <a-entity
        geometry="primitive: plane; width: 10000; height: 10000;" rotation="-90 0 0"
        material="src: #grid; repeat: 10000 10000; transparent: true;metalness:0.6; roughness: 0.4; sphericalEnvMap: #sky;">
    </a-entity>
        <a-sky src="#sky" rotation="0 -90 0"></a-sky>
  </a-scene>
  <script type="text/javascript">
    window.onload = () => {
      var sceneEl = document.querySelector('a-scene')
      var score = document.createElement('a-text');
      score.id = "score-num";
      sceneEl.appendChild(score);
  }
  </script>
</body>
</html>
