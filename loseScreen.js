class loseScreen {
    constructor(game) {
        Object.assign(this, {game});
        this.spritesheet = ASSET_MANAGER.getAsset("./loseScreen.png");
    }

    update() {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 1920, 1080, 0, 0, 2250, 950);
    }
};




