sfxFire = new Howl(
{
    urls: [''], // add link to sound file here.
    buffer: true,
    volume: 1,
    onend: function()
    {
        isSfxPlaying = false;
    }
});
