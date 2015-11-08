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
var sfxFirePlaying = false;

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
var sfxCoinPlaying = false;

// collisions with walls
sfxCollision = new Howl(
{
    urls: ["sounds/collision.ogg"],
    buffer: true,
    volume: .5, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});
var sfxCollisionPlaying = false;

// damage from spikes / stars
sfxDamage = new Howl(
{
    urls: ["sounds/damage.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});
var sfxDamagePlaying = false;

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
var sfxDeathPlaying = false;

// bgm choice 1
bgmV1 = new Howl(
{
    urls: ["sounds/Firescape.ogg"],
    buffer: true,
    volume: .5, // may need tweaking
    loop: true,
    onend: function()
    {
        isSfxPlaying = false;
    }
});
var bgmV1Playing = false;

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
var bgmV2Playing = false;

// footsteps v1
sfxFootstepsV1 = new Howl(
{
    urls: ["sounds/footsteps_forest.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
    rate: 10.0, // may need tweaking
    loop: true,
    onend: function()
    {
        isSfxPlaying = false;
    }
});
var sfxFootstepsV1Playing = false;


// footsteps v2
sfxFootstepsV2 = new Howl(
{
    urls: ["sounds/footsteps_leaves.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
    rate: 5.0, // may need tweaking
    loop: true,
    onend: function()
    {
        isSfxPlaying = false;
    }
});
var sfxFootstepsV2Playing = false;


sfxJump = new Howl(
{
    urls: ["sounds/jump.ogg"],
    buffer: true,
    volume: .1, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});
var sfxJumpPlaying = false;

sfxPowerup = new Howl(
{
    urls: ["sounds/powerup.ogg"],
    buffer: true,
    volume: 1, // may need tweaking
    onend: function()
    {
        isSfxPlaying = false;
    }
});
var sfxPowerupPlaying = false;