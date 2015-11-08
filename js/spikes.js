var ANIM_SPIKES_FLOOR = 0;
var ANIM_SPIKES_ROOF = 1;
var ANIM_SPIKES_MAX = 2;

var TOP_SPIKE = 0;
var BOTTOM_SPIKE = 1;

var Spike = function(x, y, spikePos)
{
    this.sprite = new Sprite ("images/sprites.png");
    this.sprite.buildAnimation(9, 4, 32, 32, 0.10, [0, 1, 2, 3]);
    this.sprite.buildAnimation(9, 4, 32, 32, 0.10, [13, 14, 15, 16]);

    this.sprite.setAnimationOffset(ANIM_SPIKES_FLOOR, 0, -16);
    this.sprite.setAnimationOffset(ANIM_SPIKES_ROOF, 0, 16);

    this.position = new Vector2();
    this.position.set(x, y);

    if(spikePos == BOTTOM_SPIKE)
    {
        this.sprite.setAnimation(ANIM_SPIKES_FLOOR);
    }
    else
    {
        this.sprite.setAnimation(ANIM_SPIKES_ROOF);
    }
};

Spike.prototype.update = function(deltaTime)
{
    this.sprite.update(deltaTime);
};

Spike.prototype.draw = function()
{
    this.sprite.draw(context, this.position.x - stageOffsetX, this.position.y);
};

Spike.prototype.draw = function(x, y)
{
    this.sprite.draw(context, x, y);
};