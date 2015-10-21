
var ANIM_MAX = 6;

var Coin = function(x, y) 
{
	this.sprite = new Sprite ("../images/coin_sprite.png");
	this.sprite.buildAnimation(3, 1, 32, 32, 0.05, [0, 1, 2]);
	this.sprite.setAnimationOffset(0, -35, -40);
	
	this.position = new Vector2 ();
	this.position.set (x, y);
};

Coin.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
}

Coin.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
	//context.save();
		//context.translate(this.position.x, this.position.y);
		//context.drawImage(this.image, -this.width/2, -this.height/2);
	//context.restore();
}