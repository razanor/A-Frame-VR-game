AFRAME.registerComponent('game-manager', {
    schema: {
        numberEnemies: { type: 'int' }
    },
    init: function () {
        var numEnemies = this.data['numberEnemies'];
        var sceneEl = document.querySelector('a-scene');
        var newEnemies = [];
        for (var i = 0; i < numEnemies; i++) {
            newEnemies.push(GameManagerUtils.createEnemy());
        }
        sceneEl.addEventListener('loaded', function () {
            newEnemies.forEach(function (enemy) {
                sceneEl.appendChild(enemy);
            });
        });
    }
});

var GameManagerUtils = {
    generateRandomNumber: function (min, max) {
        return Math.floor(Math.random() * max + min);
    },
    chooseRandomPosition: function () {
        var xPos = GameManagerUtils.generateRandomNumber(-20, 100);
        var yPos = 1.6;
        var zPos = GameManagerUtils.generateRandomNumber(-5, -16);
        return { 'x': xPos, 'y': yPos, 'z': zPos};
    },
    // Create a new enemy entity.
    createEnemy: function () {
        console.log('createEnemy');
        var newEnemy = document.createElement('a-box');
        newEnemy.setAttribute('color', '#ff9900');
        newEnemy.setAttribute('width', '0.6');
        newEnemy.setAttribute('rotation', '0 45 0');
        newEnemy.setAttribute('cursor-listener', '');
        var position = GameManagerUtils.chooseRandomPosition();
        var positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString();
        newEnemy.setAttribute('position', position);
        var destinationStr = '0 ' + position.y.toString() + ' 0';
        newEnemy.setAttribute('animation', { 'property': 'position',
                                        'to': destinationStr,
                                        'autoplay': true,
                                        dur: 10000});
        return newEnemy;
    }
};