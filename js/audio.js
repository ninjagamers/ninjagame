sfxFire = new Howl(
{
    urls: ["sounds/fire.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});

sfxCoin = new Howl(
{
    urls: ["sounds/coin.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});

// collisions with walls
sfxCollision = new Howl(
{
    urls: ["sounds/collision.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});

// damage from spikes / stars
sfxDamage = new Howl(
{
    urls: ["sounds/"],
    buffer: true,
    volume: 1, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});

sfxDeath = new Howl(
{
    urls: ["sounds/death.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});

// bgm choice 1
bgmV1 = new Howl(
{
    urls: ["sounds/Firescape.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
	loop: true,
    onend: function()
    {
        isSfxPlaying = false;
    }
});

// bgm choice 2
bgmV2 = new Howl(
{
    urls: ["sounds/Rise_of_spirit.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
	loop: true,
    onend: function()
    {
        isSfxPlaying = false;
    }
});

// footsteps v1
sfxFootstepsV1 = new Howl(
{
    urls: ["sounds/footsteps_forest.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
	rate: 2.0, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});

// footsteps v2
sfxFootstepsV2 = new Howl(
{
    urls: ["sounds/footsteps_leaves.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
	rate: 2.0, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});