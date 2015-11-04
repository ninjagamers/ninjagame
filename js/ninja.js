// SPRITES
// running on floor
var ANIM_RUN_FLOOR = 0;
// running on roof
var ANIM_RUN_ROOF = 1;
// die/ live lost - on floor
var ANIM_DIE_FLOOR = 2;
// die/ live lost - on roof
var ANIM_DIE_ROOF = 3;
var ANIM_MAX = 4;

var Ninja = function(){

	this.sprite = new Sprite("images/player_sprite.png");

	this.sprite.buildAnimation(5, 10, 64, 64, 0.05,[0, 1, 2, 3, 4]);
	this.sprite.buildAnimation(5, 10, 64, 64, 0.05,[45, 46, 47, 48, 49]);
	this.sprite.buildAnimation(5, 10, 64, 64, 0.05,[16]);
	this.sprite.buildAnimation(5, 10, 64, 64, 0.05,[31]);

	for (var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, - 55, -87);
	}

	this.position = new Vector2();
	this.position.set(TILE * 2, TILE * 5);

	this.width = 64;
	this.height = 64;

	this.gravityDown = true;
	this.lives = 3;
};

Ninja.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);

	if (shakeScreen)
	{
		dieSpriteTimer -= 1;
		if (this.gravityDown == false)
		{
			this.sprite.setAnimation(ANIM_DIE_ROOF);
		}
			
		if (this.gravityDown == true)
		{
			this.sprite.setAnimation(ANIM_DIE_FLOOR);
		}
	}

	if (returnToRun == true)
	{
		if (this.gravityDown == true)
		{
			this.sprite.setAnimation(ANIM_RUN_FLOOR);
		}
		if (this.gravityDown == false)
		{
			this.sprite.setAnimation(ANIM_RUN_ROOF);
		}
	}

	if(restoreScreen)
	{
		if (dieSpriteTimer <= 0 && this.gravityDown == true)
		{
			this.sprite.setAnimation (ANIM_RUN_FLOOR);
			dieSpriteTimer = 2;
		}
		else if (dieSpriteTimer <= 0 && this.gravityDown == false)
		{
			this.sprite.setAnimation (ANIM_RUN_ROOF);
			dieSpriteTimer = 2;
		}
	}

    // If ninja is falling down.
    if (this.gravityDown == true)
    {
		ninja.position.y += GRAVITY * 2 * deltaTime;
					
        // prevent going through floor.
        if (ninja.position.y > FLOOR_LIMIT)
        {
            ninja.position.y = FLOOR_LIMIT;
        }		
    }
    else 
    // If ninja is jumping up.
    {
        ninja.position.y -= GRAVITY * 2 * deltaTime;
		
        // prevent going through roof.
        if (ninja.position.y < ROOF_LIMIT)
        {
            ninja.position.y = ROOF_LIMIT;
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
		this.sprite.setAnimation(ANIM_RUN_ROOF);
    }
    else
    {
        this.gravityDown = true;
		this.sprite.setAnimation(ANIM_RUN_FLOOR);
    }
};