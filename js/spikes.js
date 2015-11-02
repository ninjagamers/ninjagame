
var ANIM_SPIKES_FLOOR = 0;
var ANIM_SPIKES_ROOF = 1;
var ANIM_MAX = 2;

var Spike = function(x, y) 
{
	this.sprite = new Sprite ("images/sprites.png");
	this.sprite.buildAnimation(9, 4, 32, 32, 0.15, [0, 1, 2, 3]);
	this.sprite.buildAnimation(9, 4, 32, 32, 0.15, [13, 14, 15, 16]);
	this.sprite.setAnimationOffset(0, -35, -40);
	
	this.position = new Vector2 ();
	this.position.set (x, y);
};

Spike.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	
		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		this.position.x = Math.floor(this.position.x + deltaTime);
}

Spike.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
	//context.save();
		//context.translate(this.position.x, this.position.y);
		//context.drawImage(this.image, -this.width/2, -this.height/2);
	//context.restore();
}