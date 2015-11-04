var ANIM_MAX = 6;

var PowerupInvincible = function(x, y)
{
	this.sprite = new Sprite ("images/sprites.png");
	this.sprite.buildAnimation(9, 4, 32, 32, 0.15, [17, 18, 19, 20]);
	this.sprite.setAnimationOffset(0, 0, 0);

	this.position = new Vector2();
	this.position.set (x, y);
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
	this.sprite = new Sprite ("images/sprites.png");
	this.sprite.buildAnimation(9, 4, 32, 32, 0.15, [21, 22, 23, 24]);
	this.sprite.setAnimationOffset(0, 0, 0);

	this.position = new Vector2();
	this.position.set (x, y);
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
	this.sprite = new Sprite ("images/sprites.png");
	this.sprite.buildAnimation(9, 4, 32, 32, 0.15, [9, 10, 11, 12]);
	this.sprite.setAnimationOffset(0, -35, -40);

	this.position = new Vector2();
	this.position.set (x, y);
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
	this.sprite = new Sprite ("images/sprites.png");
	this.sprite.buildAnimation(9, 3, 32, 32, 0.15, [7, 8, 9]);
	this.sprite.setAnimationOffset(0, -35, -40);

	this.position = new Vector2();
	this.position.set (x, y);
};

RegularCoins.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
};

RegularCoins.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
};
