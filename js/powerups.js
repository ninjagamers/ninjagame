
var ANIM_MAX = 6;

var PowerupInvincible = function(x, y) 
{
	this.sprite = new Sprite ("../images/powerups.png");
	this.sprite.buildAnimation(4, 3, 64, 64, 0.05, [4, 5, 6, 7]);
	this.sprite.setAnimationOffset(0, -35, -40);
	
	this.position = new Vector2 ();
	this.position.set (x, y);
};

PowerupInvincible.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
}

PowerupInvincible.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
	//context.save();
		//context.translate(this.position.x, this.position.y);
		//context.drawImage(this.image, -this.width/2, -this.height/2);
	//context.restore();
}


var PowerupLife = function(x, y) 
{
	this.sprite = new Sprite ("../images/powerups.png");
	this.sprite.buildAnimation(4, 3, 64, 64, 0.05, [8, 9, 10, 11]);
	this.sprite.setAnimationOffset(0, -35, -40);
	
	this.position = new Vector2 ();
	this.position.set (x, y);
};

PowerupInvincible.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
}

PowerupInvincible.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
	//context.save();
		//context.translate(this.position.x, this.position.y);
		//context.drawImage(this.image, -this.width/2, -this.height/2);
	//context.restore();
}


var PowerupCoins = function(x, y) 
{
	this.sprite = new Sprite ("../images/powerups.png");
	this.sprite.buildAnimation(4, 3, 64, 64, 0.05, [0, 1, 2, 3]);
	this.sprite.setAnimationOffset(0, -35, -40);
	
	this.position = new Vector2 ();
	this.position.set (x, y);
};

PowerupInvincible.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
}

PowerupInvincible.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
	//context.save();
		//context.translate(this.position.x, this.position.y);
		//context.drawImage(this.image, -this.width/2, -this.height/2);
	//context.restore();
}