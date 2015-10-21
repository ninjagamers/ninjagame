
var ANIM_MAX = 6;

var Spikes = function(x, y) 
{
	this.sprite = new Sprite ("../images/spikes_sprite.png");
	this.sprite.buildAnimation(4, 1, 128, 32, 0.05, [0, 1, 2, 3]);
	this.sprite.setAnimationOffset(0, -35, -40);
	
	this.position = new Vector2 ();
	this.position.set (x, y);
};

Spikes.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
}

Spikes.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
	//context.save();
		//context.translate(this.position.x, this.position.y);
		//context.drawImage(this.image, -this.width/2, -this.height/2);
	//context.restore();
}