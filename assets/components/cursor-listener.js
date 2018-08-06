var count = 0;
var loseFlag = 0;
AFRAME.registerComponent('cursor-listener', {
    init: function () {
        var el = this.el;
        el.addEventListener('mouseenter', function (evt) {
            count++;
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
    console.log(x, z, y);
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
    var num = cubes[0].getAttribute('game-manager');
    console.log(num);
     for (var i = 0; i < num.numberEnemies - count; i++) {
        var position = cubes[i].getAttribute('position');
        if (under_line(position)) {
            loseFlag++;
        }
    }
    if (loseFlag >= 3) {
        count--;
        game_over();
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

