var count = 0;
AFRAME.registerComponent('cursor-listener', {
    init: function () {
        var el = this.el;
        el.addEventListener('mouseenter', function (evt) {
            count++;
            tell();
            ajax();
            el.parentNode.removeChild(el);
        });
    }
});

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

