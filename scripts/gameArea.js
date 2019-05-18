var myGamePiece = [];
var myEnemy = [];
var myObstruction = [];
var pause = false;

//must replace speedX & speedY with speed. move only horiz., vetic., diag. 
//need to amke more universal

var page_width,page_height;
var tile_size=40;
var mapTiles = [];

var url = new URL(window.location);
const urlParams = new URLSearchParams(url.search);
const myParam = urlParams.get('myParam');

var myGameArea = {
    canvas: null,
    context: null,
    frameNo: 0,
    interval: null,
    setting: {
        
    }
};
function start() {
    myGameArea.canvas = document.createElement("canvas");
    myGameArea.canvas.width = page_width;                         
    myGameArea.canvas.height = page_height;
    myGameArea.context = myGameArea.canvas.getContext("2d");
    document.body.insertBefore(myGameArea.canvas, document.body.childNodes[0]);
    myGameArea.frameNo = 0;
    myGameArea.interval = setInterval(updateGameArea, 20);
}
function resize() {
    page_width=$(window).width();
    page_height=$(window).height();
    myGameArea.canvas.width = page_width;                         
    myGameArea.canvas.height = page_height;
}
function clear() {
    myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
}
window.addEventListener('resize', resize, true); 

function startGame() {
    page_width=$(window).width();
    page_height=$(window).height();
    start();
}

function updateGameArea() {
    if(pause==false){
       	
    }
}
