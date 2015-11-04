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

// Debug (if true, show hit boxes)
var DEBUG_MODE = false;

// Canvas settings.
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

// Load HUD image
var HUD = document.createElement("img");
HUD.src = "images/HUD.png";

// Load hearts for HUD
var heartImage = document.createElement("img");
heartImage.src = "images/heartImage.png";

// Load for sprites
var SPRITES = document.createElement("img");
SPRITES.src = "images/sprites.png"

// HUD variables
var lives = 3;
var money = 0;
var distance = 0;

var overallTotal = (distance + money)
var highScore = 0;

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

// Drawing spikes and others
var spikes = [];

var LAYER_COUNT = 3;
var LAYER_FLOORS = 0;
var LAYER_WALLS = 1;
var LAYER_OBJECT_SPIKES = 2;

// Gamestate constants.
var STATE_SPLASH = 0;
var STATE_INTRO = 1;
var STATE_GAME = 2;
var STATE_GAMEOVER = 3;
// Setting gamestate to splash
var gameState = STATE_SPLASH;

// Making roof and floor limit constants for easier recall
var FLOOR_LIMIT = TILE * 14;
var ROOF_LIMIT = TILE * 4.45;

// Loading splash screen image #splashimage
var splashImage = document.createElement("img");
// splash.src = "filename.png"

// Load intro screen image
var introImage = document.createElement("img");
introImage.src = "images/introGrass.png"

// Background variables
var backnear = document.createElement("img");
backnear.src = "images/back_near.png";
var backnearX = 0;
var backfar = document.createElement("img");
backfar.src = "images/back_far.png";
var backfarX = 0;

// Sounds
var sfxFootstepsRoofPlaying = false;
var sfxFootstepsFloorPlaying = false;

// Level position
var stageOffsetX = 0;

// Input
var wasSpacePressed = false;

// Other
var ninja = new Ninja();
var keyboard = new Keyboard();
var courses = []; // levels
var levelSpeed = 150;
var returnToRun = false;

//timers
var lifeLostTimer = 2;
var dieSpriteTimer = 2;
var distanceTimer = 150;

// Hit Ninja
var shakeScreen = false;
var shakeScreenTimer = 0;

// Spikes
var spikeTop = new Spike(100, 100, 0);
var spikeBottom = new Spike(100, 100, 1);

// Collectables
var allCollectables = [];
var allLevelCollect = [];

function init()
{
    // Main constructor.
    addEmptyCourse();
    addRandomCourse();

	// Draw spikes
	idx = 0;

	for(var index = 0; index < allcourses.length; index++)
	{
		for(var y = 0; y < allcourses[index].layers[LAYER_OBJECT_SPIKES].height; y++)
		{
			for(var x = 0; x < allcourses[index].layers[LAYER_OBJECT_SPIKES].width; x++)
			{
				if(allcourses[index].layers[LAYER_OBJECT_SPIKES].data[idx] != 0)
				{
					var px = x/32;
					var py = y/32;
					var e = new Spike(px, py);
					spikes.push(e);
				}
				idx++;
			}
		}
	}
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
		gameState = STATE_INTRO;
	}
}

function gameStateIntro (deltaTime)
{
	context.fillStyle = "#202020";
	context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    context.drawImage (introImage, 435, 280);

	ninja.update(deltaTime);
	ninja.draw();

	context.fillStyle = "#800000"
	context.font = "30px Candara";
	context.fillText("Trouble comes when you least expect it...", 10, 30);

	context.fillStyle = "#D2691E"
	context.font = "20px Candara";
	context.fillText("As the ninja was enjoying the serenity in the forest one day,", 8, 100);
	context.fillText("he recognised what seemed to be the smell of smoke...", 8, 130);
	context.fillText("Soon enough the ninja was racing for survival through the forest,", 8, 175);
	context.fillText("away from the fire, but must be careful to avoid all obstacles!", 8, 200);

	context.fillText("Be sure to grab all collectables to get the help you can receive for the ninja,", 8, 250);
	context.fillText("and help him survive as long as possible!", 8, 275);

	context.fillStyle = "#FFFFFF"
	context.fillText("PRESS SHIFT TO BEGIN!", 200, 400);

	if(keyboard.isKeyDown(keyboard.KEY_SHIFT) == true)
	{
		gameState = STATE_GAME;
	}

	ninja.draw ();
}

function gameStateGame(deltaTime)
{
    console.log(allCollectables[0].length);

	// No longer needed var deltaTime = getDeltaTime(); // Get Delta.

	// Switch states if lives are out
	if (lives <= 0)
	{
		gameState = STATE_GAMEOVER;
	}

    if (shakeScreen)
    {
        makeScreenShake(deltaTime);
		if (lifeLostTimer <= 0)
        {
            levelSpeed = levelSpeed - 10;
            if (levelSpeed < 150)
            {
                levelSpeed = 150;
            }
            lives -= 1;
            lifeLostTimer = 1;
            dieSpriteTimer -= 1;
        }
    }

    // Update spikes
    spikeTop.update(deltaTime);
    spikeBottom.update(deltaTime);

    // Updates Sounds
	updateSounds();

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
		//drawMap(courses[index], 2, Math.floor(stageOffsetX - (index * (20 * TILE))), true);
    }

    // Collectables.
    drawPowerUps(deltaTime);


    // Handle Ninja.
    ninja.update(deltaTime);
    ninja.draw();

	// Updates spikes
	for(var i=0; i<spikes.length; i++)
	{
		spikes[i].update(deltaTime);
	}

	for (var i=0; i<spikes.length; i++)
	{
		spikes[i].draw()
	}

    if (shakeScreen)
    {
        restoreScreen();
    }

	// Calculate distance
	distanceTimer -= deltaTime * levelSpeed;
	if (distanceTimer <= 0)
	{
		distance += 1;
		distanceTimer = 150;
	}
	
	// Countdown invincibility from life loss
	lifeLostTimer -= deltaTime;
	
	
    // Draw HUD
	context.drawImage(HUD, 505, 2);

	// Draw lives
	for (var i=0; i<lives; i++)
	{
		context.drawImage(heartImage, 555 + ((heartImage.width + 2) * i), 7);
	}

	// Draw distance
	context.fillStyle = "#800000";
	context.font="23px Amerigo";
	context.fillText(distance + "m", 540, 57);

	// Draw money
	context.fillStyle = "#800000";
	context.font="23px Amerigo";
	context.fillText("$" + money, 540, 87);
}

function gameStateGameover(deltaTime)
{
	overallTotal = distance + money
	findHighScore();
	
	context.fillStyle = "#9ACD32";
	context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	context.fillStyle = "#008000";
	context.font = "50px Arial";
	context.fillText("Game Over", 175, 250);
	
	context.font = "24px Arial";
	context.fillText("Distance:" + distance, 175, 300);
	
	context.font = "24px Arial";
	context.fillText("Money:" + money, 175, 340);
	
	context.font = "24px Arial";
	context.fillText("Overall score total:" + overallTotal, 175, 380);
	
	context.font = "26px Arial";
	context.fillText("HIGH SCORE:" + highScore, 175, 30);
}

function run()
{
	var deltaTime = getDeltaTime(); // Get Delta.

	switch(gameState)
	{
		case STATE_SPLASH:
			gameStateSplash(deltaTime);
		break;
		case STATE_INTRO:
			gameStateIntro(deltaTime);
		break;
		case STATE_GAME:
			gameStateGame(deltaTime);
		break;
		case STATE_GAMEOVER:
			gameStateGameover(deltaTime);
		break;
	}
}


function findHighScore ()
{
	if (overallTotal <= highScore)
	{
		highScore = highScore
	}
	if (overallTotal > highScore)
	{
		highScore = overallTotal
	}
}

// Sound update
function updateSounds()
{
	// bgms
	if(gameState == STATE_GAME && bgmV1Playing == false)
	{
		bgmV1Playing = true;
		bgmV1.play();
	}
	else if( gameState !== STATE_GAME)
	{
		bgmV1Playing = false;
		bgmV1.stop();
	}

	// running sounds
	// running on roof
	if(ninja.position.y == ROOF_LIMIT && sfxFootstepsV1Playing == false)
	{
		sfxFootstepsV1Playing = true;
		sfxFootstepsV1.play();
	}
	else if(ninja.position.y != ROOF_LIMIT || gameState !== STATE_GAME)
	{
		sfxFootstepsV1Playing = false;
		sfxFootstepsV1.stop();
	}
	// running on floor
	if(ninja.position.y == FLOOR_LIMIT && sfxFootstepsV2Playing == false)
	{
		sfxFootstepsV2Playing = true;
		sfxFootstepsV2.play();
	}
	else if(gameState !== STATE_GAME || ninja.position.y != FLOOR_LIMIT)
	{
		sfxFootstepsV2Playing = false;
		sfxFootstepsV2.stop();
	}
}

function makeScreenShake(deltaTime) {

    if(shakeScreenTimer > 0.2)
    {
        shakeScreen = false;
        shakeScreenTimer = 0;
    }
    else
    {
        shakeScreenTimer += deltaTime;
        context.save();
        var dx = Math.random() * 10;
        var dy = Math.random() * 1;
        context.translate(dx, dy);
    }
}

function restoreScreen(){
    context.restore();
}

// Draw a parallax scrolling background.
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

                    handleCollisions(dx, dy);
                }

                // Draw Image: context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);


                // if upspike then then animate it
                if ((tileIndex + 1) == 7)
                {

                    spikeTop.draw(dx, dy);
                }
                else if ((tileIndex + 1) == 3)
                {
                    spikeBottom.draw(dx, dy);
                }
                else
                {
                    context.drawImage(tileset, sx, sy, TILE, TILE, dx, dy, TILE, TILE);
                }
            }
            idx++;
        }
    }
}


function makeMapCollectables(level)
{
    // Scrolling the level.
    var maxTiles = 20;
    var count = 0;

    allLevelCollect = [];

    // Draw the platform Map.
    for(var y = 0; y < 15; y++)
    {
        var idx = y * level.layers[2].width;
        for(var x = 0; x < maxTiles; x++)
        {
            if(level.layers[2].data[idx] != 0)
            {
                // Tiled map are base 1, so subtract one from the tileset id to get the correct tile.
                var tileIndex = level.layers[2].data[idx] - 1;
                var dx = x * TILE - Math.floor(stageOffsetX - (1 * (20 * TILE)));  // TODO: think this should be one.
                var dy = y * TILE;

                if ((tileIndex + 1) == 1)
                {
                    // Randomly pick a powerup (50 percent chance of powerup.)
                    var draw = getRandomInt(1,2);
                    if (draw == 2)
                    {
                        var rand = getRandomInt(1,3);
                        if (rand == 1)
                        {
                            var pui = new PowerupInvincible(dx, dy);
                        }
                        else if (rand == 2)
                        {
                            var pui = new PowerupLife(dx, dy);
                        }
                        else
                        {
                            var pui = new PowerupCoins(dx, dy);
                        }
                        allLevelCollect.push(pui);
                    }

                }
                else if ((tileIndex + 1) == 5)
                {
                    // 50 percent chance of powerup.
                    var draw = getRandomInt(1,2);
                    if (draw == 2)
                    {
                        var pui = new RegularCoins(dx, dy);
                        allLevelCollect.push(pui);
                    }
                }
            }
            idx++;
        }
    }
}

function updateCollectables(level)
{



}


function drawPowerUps(deltaTime)
{
    for(var i = 0; i < allCollectables.length; i++)
    {

        for(var j = 0; j < allCollectables[i].length; j++)
        {
            //console.log(allCollectables[i][j].position.x );
            allCollectables[i][j].update(deltaTime);
            allCollectables[i][j].draw();
        }

    }
}



function movePowerUpsbyOneScreen()
{
    for(var i = 0; i < allCollectables.length; i++)
    {

        for(var j = 0; j < allCollectables[i].length; j++)
        {
            console.log(allCollectables[i][j].position.x );

            allCollectables[i][j].position.x -= 640;

        }

    }
}


function handleCollisions(dx, dy)
{
    // Trap
    var rect1 = {x: dx, y: dy, width: TILE, height: TILE};

    // Ninja
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
			sfxCollision.play();
		}
}

// Adds a course.
function addRandomCourse()
{
    // Randomly select a course from the all courses array and add it to the courses array.
    var newcourse = allcourses[Math.floor(Math.random() * allcourses.length)];
    courses.push(newcourse);

    // Add new collectables.
    makeMapCollectables(newcourse);
    allCollectables.push(allLevelCollect);

}

// Adds a course.
function addEmptyCourse()
{
    // Randomly select a course from the all courses array and add it to the courses array.
    courses.push(l00);

    // Collectables
    var emptyArray = [];
    allCollectables.push(emptyArray);
    allCollectables.push(emptyArray);
}

// Collectables
//function

function checkForClicks()
{
    // Check for spacebar
    if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
    {
		//tweaked code to flip on keydown to reduce delay
		if(wasSpacePressed == false)
		{
			ninja.flip();
			sfxJump.play();
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
        // remove collectables
        allCollectables.shift();
        movePowerUpsbyOneScreen();



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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
