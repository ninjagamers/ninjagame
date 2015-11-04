var ANIM_MAX = 6;

var PowerupInvincible = function(x, y) 
{
	this.sprite = new Sprite ("images/sprites.png");
	this.sprite.buildAnimation(4, 3, 32, 32, 0.05, [4, 5, 6, 7]);
	this.sprite.setAnimationOffset(0, 0, 0);
	
	this.position = new Vector2 ();
	this.position.set (x, y);
};

PowerupInvincible.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
};

PowerupInvincible.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
};

var PowerupLife = function(x, y) 
{
	this.sprite = new Sprite ("images/sprites.png");
	this.sprite.buildAnimation(4, 3, 32, 32, 0.05, [8, 9, 10, 11]);
	this.sprite.setAnimationOffset(0, 0, 0);

	this.position = new Vector2 ();
	this.position.set (x, y);
};

PowerupLife.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
};

PowerupLife.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
};

var PowerupCoins = function(x, y) 
{
	this.sprite = new Sprite ("images/sprites.png");
	this.sprite.buildAnimation(4, 3, 32, 32, 0.05, [0, 1, 2, 3]);
	this.sprite.setAnimationOffset(0, -35, -40);

	this.position = new Vector2 ();
	this.position.set (x, y);
};

PowerupCoins.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
};

PowerupCoins.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
};