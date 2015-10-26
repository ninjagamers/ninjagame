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

// Debug
var DEBUG_MODE = false;

// Canvas settings.
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;


//load HUD image
var HUD = document.createElement("img");
HUD.src = "images/HUD.png";

//load hearts for HUD
var heartImage = document.createElement("img");
heartImage.src = "images/heartImage.png";

//HUD variables
var lives = 3;
var money = 0;
var distance = 0;

// Load the image to use for level tiles.
var tileset = document.createElement("img");
tileset.src = "tiles/TMX/tiles2.png";

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

// Gamestate constants.
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
// Setting gamestate to splash
var gameState = STATE_SPLASH;

// Loading splash screen image #splashimage
var splashImage = document.createElement("img");
// splash.src = "filename.png"

// Background variables
var backnear = document.createElement("img");
backnear.src = "images/back_near.png";
var backnearX = 0;
var backfar = document.createElement("img");
backfar.src = "images/back_far.png";
var backfarX = 0;

// Level position
var stageOffsetX = 0;

// Input
var wasSpacePressed = false;

// Other
var ninja = new Ninja();
var keyboard = new Keyboard();
var courses = []; // levels
var levelSpeed = 150;
var lifeLostTimer = 2;
var dieSpriteTimer = 2;
var returnToRun = false;

// Hit Ninja
var shakeScreen = false;
var shakeScreenTimer = 0;

// speed should delete later
var kph = 0;
var totalTime = 0;


function init()
{
    // Main constructor.
    addEmptyCourse();
    addRandomCourse();

}

function gameStateSplash(deltaTime)
{
	// Need to get a splash screen image #splashimage to find code
	// context.drawImage(splashImage, 0, 0);
	context.fillStyle = "#000000";
	context.font = "50px Arial";
	context.fillText("Press Space", 175, 250);
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
	{
		gameState = STATE_GAME;
	}
}

function gameStateGame(deltaTime)
{
	// no longer needed var deltaTime = getDeltaTime(); // Get Delta.
	
	//switch states if lives are out
	if (lives <= 0)
	{
		gameState = STATE_GAMEOVER;
	}
	
    if (shakeScreen)
    {
        makeScreenShake(deltaTime);
		if (lifeLostTimer <= 0)
				{
					lives -= 1;
					lifeLostTimer = 1;
					dieSpriteTimer -=1;
				}
    }
	
	if (dieSpriteTimer <= 0)
	{
		returnToRun = true;
	}

	
    if (shakeScreen)
    {
        context.fillStyle = "red"; // Clear Screen.
    }
    else
    {
        context.fillStyle = "#ccc"; // Clear Screen.
    }

    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    drawBackground(deltaTime)
    // Handle Input
    checkForClicks();


    // Add Game logic here:


    // Move the level.
    stageOffsetX = stageOffsetX + (deltaTime * levelSpeed);

    // Handle levels

    // Draw ALL the maps.
    destroyCourses();

    var index;
    for (index = 0; index < courses.length; ++index) {
        drawMap(courses[index], 0, Math.floor(stageOffsetX - (index * (20 * TILE))), false);
        drawMap(courses[index], 1, Math.floor(stageOffsetX - (index * (20 * TILE))), true);
    }

    // Handle Ninja.
    ninja.update(deltaTime);
    ninja.draw();
	
    if (shakeScreen)
    {
        restoreScreen();
    }
	
	//calculate distance
	for (var i=0; i< (deltaTime *levelSpeed)/TILE ; i++)
	{
		distance +=1;
	}
	
	//calculating speed delete later
	totalTime += deltaTime;
	kph = distance / totalTime * 3600 / 1000;
	
	//countdown invincibility from life loss
	lifeLostTimer -= deltaTime;
	
		//draw HUD
	context.drawImage (HUD, 505, 2)
	
	//draw lives
	for (var i=0; i<lives; i++)
	{
		context.drawImage(heartImage, 555 + ((heartImage.width + 2) *i), 7);
	}
	
	//draw distance
	context.fillStyle = "#800000";
	context.font="23px Amerigo";
	context.fillText(distance + "m", 540, 57);
	
	//draw kph
	context.fillStyle = "#800000";
	context.font="23px Amerigo";
	context.fillText(Math.round(kph) + " kph", 540, 110);
	
	//draw money
	context.fillStyle = "#800000";
	context.font="23px Amerigo";
	context.fillText("$" + money, 540, 87);
}

function gameStateGameover(deltaTime)
{
	context.fillStyle = "#9ACD32";
	context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	 
	context.fillStyle = "#008000";
	context.font = "50px Arial";
	context.fillText("Game Over", 175, 250);
}

function run()
{
	var deltaTime = getDeltaTime(); // Get Delta.
	
	switch(gameState)
	{
		case STATE_SPLASH:
			gameStateSplash(deltaTime);
		break;
		case STATE_GAME:
			gameStateGame(deltaTime);
		break;
		case STATE_GAMEOVER:
			gameStateGameover(deltaTime)
		break;
	} 
}


function makeScreenShake(deltaTime) {

    //console.log(shakeScreenTimer);

    if(shakeScreenTimer > 0.2)
    {
        shakeScreen = false;
        shakeScreenTimer = 0;
    }
    else
    {
        shakeScreenTimer += deltaTime;
        context.save();
        var dx = Math.random()*10;
        var dy = Math.random()*1;
        context.translate(dx, dy);
    }
}

function restoreScreen(){
    context.restore();
}

// Draw a parallax scrolling background.\
function drawBackground(deltaTime)
{
    context.drawImage(backfar, backfarX, 50);
    context.drawImage(backfar, backfarX + 640, 50);
    context.drawImage(backnear, backnearX, 50);
    context.drawImage(backnear, backnearX + 640, 50);

    backfarX = backfarX - (deltaTime * levelSpeed /4);
    backnearX = backnearX - (deltaTime * levelSpeed /3);

    if (backfarX < -640)
    {
      backfarX = backfarX + 640;
    }
    if (backnearX < -640)
    {
      backnearX = backnearX + 640;
    }
}


function drawMap(test, drawlayer, curStageOffsetX, checkCollision)
{
    // Scrolling the level.
    var maxTiles = 20;

    var count = 0;

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

                // Handle Collisions

                var dx = x * TILE - curStageOffsetX;
                var dy = y * TILE;

                if (checkCollision && dx < 64 && dx > 0)
                {
                    count++;
                    //console.log(count);

                    handleCollisions(dx, dy);
                }


                // Draw Image: context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                context.drawImage(tileset, sx, sy, TILE, TILE, dx, dy, TILE, TILE);
            }
            idx++;
        }
    }
}

function handleCollisions(dx, dy)
{
    // Trap -
    var rect1 = {x: dx, y: dy, width: TILE, height: TILE};

    // Ninja -
    var rect2 = {x: ninja.position.x - (ninja.width*0.8), y: ninja.position.y - (ninja.height*1.5), width: ninja.width - (ninja.width/3), height: ninja.height + 1};

    if (DEBUG_MODE)
    {
        context.rect(rect2.x,rect2.y,rect2.width,rect2.height);
        context.fill();
        context.strokeStyle="green";
        context.stroke();
    }

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) 
		{

			// Collision Detected
			shakeScreen = true;
			
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
function addEmptyCourse()
{
    // Randomly select a course from the all courses array and add it to the courses array.
    courses.push(l00);
}
function checkForClicks()
{
    // Check for spacebar
    if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
    {
		//tweaked code to flip on keydown to reduce delay
		if(wasSpacePressed == false)
		{
			ninja.flip();
		}
	    wasSpacePressed = true;
	}
    else
    wasSpacePressed = false;
}

// Check if ninja is colliding with a trap



// Adds a course.
function destroyCourses()
{
    if (stageOffsetX >= 640)
    {
        courses.shift();
        stageOffsetX = stageOffsetX - 640;
        addRandomCourse();


        if (levelSpeed < 450)
        {
            levelSpeed = levelSpeed + 25; // increase speed.
        }
        else
        {
            levelSpeed = 450;
        }

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
