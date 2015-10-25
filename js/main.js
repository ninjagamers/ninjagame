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

// Load the image to use for level tiles.
var tileset = document.createElement("img");
tileset.src = "tiles/tiles2.png";

// Tile set constants.
var TILE = 32; // Width/height of tile.
var MAP = {tw:20, th:15};
var TILESET_COUNT_X = 4; // Columns in the tileset.
var TILESET_COUNT_Y = 2; // Rows in the tileset.
var TILESET_TILE = TILE *2;

// Forces constants.
var METER = TILE; // 1m.
var GRAVITY = METER * 9.8; // Default gravity.
var INIT_SCREEN_MOVEMENT_SPEED = TILE;

// Level position
var stageOffsetX = 0;

// Other
var ninja = new Ninja();
var keyboard = new Keyboard();
var courses = []; // levels


function init()
{
    // Main constructor.
    addRandomCourse();
    addRandomCourse();
}

function run()
{
    var deltaTime = getDeltaTime(); // Get Delta.
    context.fillStyle = "#ccc"; // Clear Screen.
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // Add Game logic here:


    // Move the level.
    stageOffsetX = stageOffsetX + (deltaTime * 150);

    // Handle levels

    // Draw ALL the maps.
    destroyCourses();

    var index;
    for (index = 0; index < courses.length; ++index) {
        drawMap(courses[index], 0, Math.floor(stageOffsetX - (index * (20 * TILE))));
        drawMap(courses[index], 1, Math.floor(stageOffsetX - (index * (20 * TILE))));
    }

    // Handle Ninja.
    // ninja.update();
    ninja.draw();
}

function drawMap(test, drawlayer, stageOffsetXx)
{
    // Scrolling the level.
    var maxTiles = 20;

    // Draw the platform Map.
    for(var y = 0; y < 15; y++)
    {
        var idx = y * test.layers[drawlayer].width;
        for(var x = 0; x < maxTiles; x++)
        {
            if(test.layers[drawlayer].data[idx] != 0)
            {
                // Tiled map are base 1, so subtract one from the tileset id to get the correct tile.
                var tileIndex = test.layers[drawlayer].data[idx] - 1;
                var sx = (tileIndex % TILESET_COUNT_X) * TILE;
                var sy = (Math.floor(tileIndex / TILESET_COUNT_X)) * TILE;

                // Draw Image: context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                context.drawImage(tileset, sx, sy, TILE, TILE, x * TILE - stageOffsetXx, (y) * TILE, TILE, TILE);
            }
            idx++;
        }
    }
}

// Adds a course.
function addRandomCourse()
{
    // Randomly select a course from the all courses array and add it to the courses array.
    var newcourse = allcourses[Math.floor(Math.random() * allcourses.length)];
    courses.push(newcourse);
}

// Adds a course.
function destroyCourses()
{
    if (stageOffsetX >= 640)
    {
        courses.shift();
        stageOffsetX = stageOffsetX - 640;
        addRandomCourse();
    }

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
