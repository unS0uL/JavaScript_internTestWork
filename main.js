var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var btn = document.querySelectorAll('button');
var domScor = document.getElementById('score');

var startBtn = btn[0];
var stopBtn = btn[1];
var requestId = 0;

var colors = ['red', 'orange', 'blue', 'green', 'grey', 'black', 'white', 'brown', 'pink'];
var randRound = 1;
var rand = -1;
var randHeight = 0;
var randWidth = 320;
var currentScore = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    ctx.fillRect(randWidth - 10, randHeight, 20, 20);
    domScor.innerHTML = currentScore;

    if (rand !== -1 && randRound > 1) {
        randHeight += 10 * rand;
        ctx.fillStyle = colors[randRound];
    } else {
        randHeight += 1;
    }
     if(randHeight >= canvas.clientHeight) {
        rand = Math.random();
        randRound = Math.round(rand * 9);
        ctx.fillStyle = colors[randRound];
        randHeight = 0;
        randWidth = canvas.clientWidth * rand;
    }
    requestId = requestAnimationFrame(animate);
}

canvas.addEventListener('click', function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    if ((x >= randWidth - 10 && x <= randWidth + 10) && (y >= randHeight - 5 && y <= randHeight + 25)) {
        currentScore += 1;
        cancelAnimationFrame(requestId);
        rand = Math.random();
        randRound = Math.round(rand * 9);
        randWidth = canvas.clientWidth * rand;
        randHeight = 0;
        animate();
    }
});

startBtn.addEventListener('click', function() {
    cancelAnimationFrame(requestId);
    rand = Math.random();
    randRound = Math.round(rand * 9);
    randWidth = canvas.clientWidth * rand;
    randHeight = 0;
    currentScore = 0;
    animate();
});

stopBtn.addEventListener('click', function() {
    cancelAnimationFrame(requestId);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    ctx.closePath();
    currentScore = 0;
});

// document.body.onload = animate;


