function random(min, max)
{
    var num = Math.random();
    return min + (max - min) * num;
}

var Particle = function() 
{
    this.position = new Vector2();
    this.size = new Vector2();

    this.velocity = new Vector2();
    this.acceleration = new Vector2();

    this.rotation = 0;
    this.life = 0;

    this.alpha = 0;
};


var Emitter = function(imageFilename, positionX, positionY) 
{
    this.particles = [];
    this.elapsedEmittionTime = 0;

    this.texture = document.createElement("img");
    this.texture.src = imageFilename;

    this.position = new Vector2();
    this.position.set(positionX, positionY);

    this.emissionSize = new Vector2();
    this.emissionSize.set(5, 5);
    this.emissionRate = 1000;

    this.minLife = 0.25;
    this.maxLife = 5;
    this.minSize = 8;
    this.maxSize = 32;
    this.minVelocity = new Vector2();
    this.minVelocity.set(-50, -50);
    this.maxVelocity = new Vector2();
    this.maxVelocity.set(50, 50);
    this.gravity = 0;
    this.wind = 0;
    this.transparency = 0;
};

Emitter.prototype.update = function(dt) 
{
    this.elapsedEmittionTime += dt;

    while(this.elapsedEmittionTime > (1.0 / this.emissionRate))
    {
        this.spawnParticle();
        this.elapsedEmittionTime -= (1.0 / this.emissionRate);
    }

    for(var i = this.particles.length - 1; i >= 0; i--)
    {
        var p = this.particles[i];

        p.life -= dt;
        if (p.life <= 0.0)
        {
            this.particles.splice(i, 1);
        }

        p.acceleration.y += this.gravity * dt;
        p.acceleration.x += this.wind * dt;

        p.velocity.set( p.velocity.x + p.acceleration.x * dt, p.velocity.y + p.acceleration.y );
        p.position.x += p.velocity.x * dt;
        p.position.y -= p.velocity.y * dt;

        if (p.life <= 1.0)
            p.alpha = p.life * this.transparency;
    }
};

Emitter.prototype.draw = function(x) 
{
    var origin = new Vector2();
    origin.set(this.texture.width / 2, this.texture.height / 2);
	
	if(x == 1)
	{
		for(var i=0; i<this.particles.length; i++)
		{
			var p = this.particles[i];

			var scale = new Vector2();
			scale.set( p.size.x / this.texture.width, p.size.y / this.texture.height);

			context.save();
			context.translate(p.position.x, p.position.y);
			context.rotate(p.rotation);
			context.globalAlpha = p.alpha;
			// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
			// link above for types
			context.globalCompositeOperation = ('screen');
			context.drawImage(this.texture, origin.x * scale.x, origin.y * scale.y, p.size.x, p.size.y);
			context.restore();
		}
	}
	else
	{
		for(var i=0; i<this.particles.length; i++)
		{
			var p = this.particles[i];

			var scale = new Vector2();
			scale.set( p.size.x / this.texture.width, p.size.y / this.texture.height);

			context.save();
			context.translate(p.position.x, p.position.y);
			context.rotate(p.rotation);
			context.globalAlpha = p.alpha;
			// context.globalCompositeOperation = ('screen');
			context.drawImage(this.texture, origin.x * scale.x, origin.y * scale.y, p.size.x, p.size.y);
			context.restore();
		}		
	}
};

Emitter.prototype.spawnParticle = function()
{
    var p = new Particle();

    p.life = random(this.minLife, this.maxLife);
    p.rotation = 0;
    p.acceleration.set(this.wind, -this.gravity);
    p.velocity.set(
        random(this.minVelocity.x, this.maxVelocity.x),
        random(this.minVelocity.y, this.maxVelocity.y));

    p.position.set(
        random(-this.emissionSize.x/2, this.emissionSize.x/2) + this.position.x,
        random(-this.emissionSize.y/2, -this.emissionSize.y/2) + this.position.y);

    p.size.set(random(this.minSize, this.maxSize), random(this.minSize, this.maxSize));

    p.alpha = this.transparency;

    this.particles.push(p);
};


function createBurstEmitter(particleTexture, posX, posY)
{
    var emitter = new Emitter(particleTexture, posX, posY);
    return emitter;
}

function createFireEmitter(particleTexture, posX, posY)
{
    var e = new Emitter(particleTexture, posX, posY);
    e.gravity = 0.0;

    e.minLife = 0.25;
    e.maxLife = 2;

    e.minVelocity.set(0.0, 0.0);
    e.maxVelocity.set(0.0, 100.0);

    e.emissionRate = 1000.0;

    e.emissionSize.set(10.0, 1.0);
    e.transparency = .15;

    return e;
}

function createFlyingStarsEmitter(particleTexture, posX, posY)
{
    var e = new Emitter(particleTexture, posX, posY);
    e.emissionSize.set(SCREEN_WIDTH/2, 0);
    e.emissionRate = 100.0;
    e.minLife = 2.0;
    e.maxLife = 7.0;
    e.transparency = 0.20;
    e.minVelocity.x = 0.0;
    e.maxVelocity.x = 0.0;
    e.minVelocity.y = 75.0;
    e.maxVelocity.y = 100.0;
    e.transparency = 0.5;
    return e;
}