var newEnemies = [];

AFRAME.registerComponent('game-manager', {
    schema: {
        numberEnemies: { type: 'int' }
    },
    init: function () {
        var numEnemies = this.data['numberEnemies'];
        var sceneEl = document.querySelector('a-scene');
        for (var i = 0; i < numEnemies; i++) {
            newEnemies.push(GameManagerUtils.createEnemy());
        }       
        // sceneEl.addEventListener('loaded', function () {
        //     newEnemies.forEach(function (enemy) {
        //         sceneEl.appendChild(enemy);
        //     });
        // });
    }
});

AFRAME.registerComponent('start', {
    init: function() {
        var sceneEl = document.querySelector('a-scene');
        var el = this.el;
        el.addEventListener('mouseenter', function () {
            newEnemies.forEach(function (enemy) {
            sceneEl.appendChild(enemy);
        });
        el.parentNode.removeChild(el);
    })
}
});

var GameManagerUtils = {
    generateRandomNumber: function (min, max) {
        return Math.floor(Math.random() * max + min);
    },

    generateRandomColor: function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    chooseRandomPosition: function () {
        var xPos = GameManagerUtils.generateRandomNumber(-20, 100);
        var yPos = GameManagerUtils.generateRandomNumber(1.6, 4);
        var zPos = GameManagerUtils.generateRandomNumber(-5, -16);
        return { 'x': xPos, 'y': yPos, 'z': zPos};
    },
    // Create a new enemy entity.
    createEnemy: function () {
        console.log('createEnemy');
        var yToStart = 1.6;
        var newEnemy = document.createElement('a-box');
        newEnemy.setAttribute('color', GameManagerUtils.generateRandomColor());
        newEnemy.setAttribute('width', '0.6');
        newEnemy.setAttribute('rotation', '0 '+ GameManagerUtils.generateRandomNumber(20, 70)+'0');
        newEnemy.setAttribute('cursor-listener', '');
        var position = GameManagerUtils.chooseRandomPosition();
        var positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString();
        newEnemy.setAttribute('position', position);
        var destinationStr = '0 ' + yToStart.toString() + ' 0';
        newEnemy.setAttribute('animation', { 'property': 'position',
                                        'to': destinationStr,
                                        'autoplay': true,
                                        dur: GameManagerUtils.generateRandomNumber(4000, 10000)});

        return newEnemy;
    }
};