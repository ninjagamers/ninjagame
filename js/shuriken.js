var Shuriken = function (x, y)
{
    this.sprite = new Sprite ("images/shuriken_sprite.png");
    this.sprite.buildAnimation (2, 1, 64, 64, 0.05, [0,1]);
    this.sprite.setAnimationOffset(0, 0, 0);

    this.position = new Vector2();
    this.position.set(x,y);

    this.velocity = new Vector2();
};

Shuriken.prototype.update = function(deltaTime)
{
    this.sprite.update(deltaTime);
    this.position.x = Math.floor(this.position.x + (deltaTime * -this.velocity.x))
};

Shuriken.prototype.draw = function()
{
    this.position.x = Enemy.position.x;
    this.position.y = Enemy.position.y;
    var screenX = this.position.x - worldOffsetX;
    this.sprite.draw(context, screenX, this.position.y);
};