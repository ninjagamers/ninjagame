var POWERUP_COIN = 1;
var POWERUP_COINS = 2;
var POWERUP_INV = 3;
var POWERUP_LIFE = 4;

var PowerupInvincible = function(x, y)
{
    this.sprite = new Sprite("images/sprites.png");
    this.sprite.buildAnimation(9, 4, 32, 32, 0.1, [18, 19, 20, 21]);
    this.sprite.setAnimationOffset(0, 0, 0);

    this.position = new Vector2();
    this.position.set(x, y);

    this.power = POWERUP_INV;
};

PowerupInvincible.prototype.update = function(deltaTime)
{
    this.sprite.update(deltaTime);
};

PowerupInvincible.prototype.draw = function()
{
    this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
};

var PowerupLife = function(x, y)
{
    this.sprite = new Sprite("images/sprites.png");
    this.sprite.buildAnimation(9, 4, 32, 32, 0.1, [27, 28, 29, 30]);
    this.sprite.setAnimationOffset(0, 0, 0);

    this.position = new Vector2();
    this.position.set(x, y);

    this.power = POWERUP_LIFE;
};

PowerupLife.prototype.update = function(deltaTime)
{
    this.sprite.update(deltaTime);
};

PowerupLife.prototype.draw = function()
{
    this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
};

var PowerupCoins = function(x, y)
{
    this.sprite = new Sprite("images/sprites.png");
    this.sprite.buildAnimation(9, 4, 32, 32, 0.1, [9, 10, 11, 12]);
    this.sprite.setAnimationOffset(0, 0, 0);

    this.position = new Vector2();
    this.position.set(x, y);

    this.power = POWERUP_COINS;
};

PowerupCoins.prototype.update = function(deltaTime)
{
    this.sprite.update(deltaTime);
};

PowerupCoins.prototype.draw = function()
{
    this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
};

var RegularCoins = function(x, y)
{
    this.sprite = new Sprite("images/sprites.png");
    this.sprite.buildAnimation(9, 3, 32, 32, 0.1, [6, 7, 8]);
    this.sprite.setAnimationOffset(0, 0, 0);

    this.position = new Vector2();
    this.position.set(x, y);

    this.power = POWERUP_COIN;
};

RegularCoins.prototype.update = function(deltaTime)
{
    this.sprite.update(deltaTime);
};

RegularCoins.prototype.draw = function()
{
    this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
};

// need to check if sounds are working
// Run when collected a Power-up
function power(powerType)
{
    if(powerType == POWERUP_COIN)
	{
        addOneCoin();
		sfxCoin.play();
    }
    else if(powerType == POWERUP_COINS)
    {
        addManyCoins();
		sfxCoin.play();
		sfxPowerup.play();
    }
    else if(powerType == POWERUP_INV)
    {
        invincibility();
		sfxPowerup.play();
    }
    else if(powerType == POWERUP_LIFE)
    {
        addLife();
		sfxPowerup.play();
    }
}

function addOneCoin()
{
    money += 1;
}

function addManyCoins()
{
    money += 15;
	coinPower= true;
	showPower = true;
}

function invincibility(deltaTime)
{
	// can change if wanted
	invincibilityTimer = 5;
	ninjaInvincible = true;
	showPower = true;
}

function addLife()
{
    if(lives <3)
    {
        lives += 1;
    }
	lifePower = true;
	showPower = true;
}