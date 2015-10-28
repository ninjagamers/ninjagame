
var Fire = function (x, y)
{
	this.sprite = new Sprite ("..images/sprites.png");
	this.sprite.buildAnimation (9, 4, 32, 32, 0.15, [32, 33, 34, 35]);
	this.sprite.setAnimationOffset(0, 0, 0);
	
	this.position = new Vector2();
	this.position.set(x,y);
	
	this.velocity = new Vector2();
}

Fire.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	this.position.x = Math.floor(this.position.x + (deltaTime * -this.velocity.x))
}

Fire.prototype.draw = function()
{
	this.sprite.draw(context, screenX, this.position.y);
}