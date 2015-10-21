var Ninja = function(){

  this.sprite = new Sprite("tiles/ninjasprites.png");
  this.sprite.buildAnimation(5, 3, 32, 32, 0.05,
    [5, 6]);

  this.position = new Vector2();
  this.position.set(TILE * 2, TILE * 5);

  this.width = TILE;
  this.height = TILE;

  this.gravityDown = true;
  this.lives = 3;
}

Ninja.prototype.update = function(deltaTime)
{
    // If ninja is falling down.
    if (this.gravityDown)
    {
        ninja.position.y += GRAVITY * 2 * deltaTime;

        // prevent going through floor.
        if (ninja.position.y > TILE * 13)
        {
            ninja.position.y = TILE * 13;
        }
    }
    else
    // If ninja is jumping up.
    {
        ninja.position.y -= GRAVITY * 2 * deltaTime;

        // prevent going through roof.
        if (ninja.position.y < TILE * 2)
        {
            ninja.position.y = TILE * 2;
        }
    }
};

Ninja.prototype.draw = function()
{
    this.sprite.draw(context, this.position.x, this.position.y);
};

Ninja.prototype.flip = function()
{
    if (this.gravityDown == true)
    {
        this.gravityDown = false;
    }
    else
    {
        this.gravityDown = true;
    }
};
