var Vector2 = function()
{
    this.x = 0;
    this.y = 0;
};
Vector2.prototype.set = function(x, y)
{
    this.x = x;
    this.y = y;
};
Vector2.prototype.normalize = function()
{
    var dirLength = Math.sqrt((this.x * this.x) + (this.y * this.y));
    if(dirLength != 0)
    {
        this.x = this.x / dirLength;
        this.y = this.y / dirLength;
    }
};
Vector2.prototype.add = function(v2)
{
    this.x = this.x + v2.x;
    this.y = this.y + v2.y;
};
Vector2.prototype.subtract = function(v2)
{
    this.x = this.x - v2.x;
    this.y = this.y - v2.y;
};
Vector2.prototype.multiplyScalar = function(num)
{
    this.x *= num;
    this.y *= num;
};
Vector2.prototype.copy = function(){
    var temp = new Vector2();
    temp.set(this.x, this.y);
    return temp;
};