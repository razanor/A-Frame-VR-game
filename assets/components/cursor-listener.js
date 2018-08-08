var count = 0;
var loseFlag = 0;
var count_tmp = 0;
var numEnemies = 15;
var round = 2;

AFRAME.registerComponent('cursor-listener', {
    init: function () {
        var el = this.el;
        el.addEventListener('mouseenter', function (evt) {
            count++;
            count_tmp++;
            check_cubes();
            tell();
            ajax();
            el.parentNode.removeChild(el);
        });
    }
});

function under_line(pos) {
    var x = parseInt(pos.x);
    var z = parseInt(pos.z);
    var y = parseInt(pos.y);
    return (x === 0 && z === 0 && y === 1);
}

function game_over() {
    var again = confirm("Game over! Press OK to start again or CANCEL to display leaderboard", "");
    if (again) {
        window.location.href = window.location;
    }
    else {
        window.location.href = 'leaderboard.php';
    }
}

function check_cubes() {
    var cubes = document.getElementsByTagName('a-box');
    console.log(cubes);
    var num = cubes[0].getAttribute('game-manager');
     for (var i = 1; i <= num.numberEnemies - count_tmp + 1 - loseFlag; i++) {
        var position = cubes[i].getAttribute('position');
        if (under_line(position)) {
            loseFlag++;
            cubes[i].removeAttribute('position');
            cubes[i].parentNode.removeChild(cubes[i]);
        }

    }
    if (loseFlag >= 3) {
        count--;
        game_over();
    }
    if (loseFlag < 3 && cubes.length == 2) {
        console.log("here " + numEnemies);
        alert("Get's ready! Level " + round++ + "!");
        count_tmp = 0;
        cubes[0].setAttribute('game-manager', "numberEnemies:"+ numEnemies);
        var sceneEl = document.querySelector('a-scene');
        var newEnemies = [];
        for (var i = 0; i < numEnemies; i++) {
            newEnemies.push(GameManagerUtils.createEnemy());
        }
        newEnemies.forEach(function (enemy) {
                sceneEl.appendChild(enemy);
            });
        numEnemies += 5;
    }
}

function tell() {
	var elem = document.getElementById('score-num');
	elem.setAttribute('value', "Score: " + count);
	elem.setAttribute('position', "-1.384 2.935 -6.856");
	elem.setAttribute('color', "#269900");
	elem.setAttribute('width', '20');
}

function ajax() {

    let data = new FormData();
    data.append('name', document.getElementsByTagName('body')[0].getAttribute('data-name'));
    data.append('score', count);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "score.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
        }
   }
    xhr.send(data);
}

