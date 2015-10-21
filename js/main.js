var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
// This function will return the time in seconds since the function
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();
    // Find the delta time (dt) - the change in time since the last drawFrame
    // We need to modify the delta time to something we can use.
    // We want 1 to represent 1 second, so if the delta is in milliseconds
    // we divide it by 1000 (or multiply by 0.001). This will make our
    // animations appear at the right speed, though we may need to use
    // some large values to get objects movement and rotation correct
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
    // validate that the delta is within range
    if(deltaTime > 1)
        deltaTime = 1;
    return deltaTime;
}
//-------------------- Don't modify anything above here

// Canvas settings.
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

// Tile set constants.
var TILE = 32; // Width/height of tile.
var MAP = {tw:20, th:15};
var TILESET_COUNT_X = 5; // Columns in the tileset.
var TILESET_COUNT_Y = 3; // Rows in the tileset.
var TILESET_TILE = TILE *2;

// Forces constants.
var METER = TILE; // 1m.
var GRAVITY = METER * 9.8; // Default gravity.
var INIT_SCREEN_MOVEMENT_SPEED = TILE;

// Other
var ninja = new Ninja();
var keyboard = new Keyboard();


function init()
{
  // Main constructor.
}

function run()
{
    var deltaTime = getDeltaTime();
    context.fillStyle = "#ccc";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // Add Game logic here.

    // Handle Ninja.
    // ninja.update();
    ninja.draw();

}

function drawMap()
{
}

// Util Functions.
function pixelToTile(pixel)
{
    return Math.floor(pixel/TILE);
}

init(); // Run the constructor.

//-------------------- Don't modify anything below here
// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);
