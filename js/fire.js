
var Fire = function(){

  this.sprite = new Sprite("images/sprites.png");
  
  this.sprite.buildAnimation(9, 4, 32, 64, 0.15, [31, 32, 33, 34, 35]);
  
  this.position = new Vector2();
  this.position.set(x, y);

  this.width = 32;
  this.height = 64;
};

Fire.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
}

Fire.prototype.draw = function(x, y)
{
    this.sprite.draw(context, this.position.x, this.position.y);
}