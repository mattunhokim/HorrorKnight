class Background {
    constructor(game) {
        Object.assign(this, {game});
        this.spritesheet = ASSET_MANAGER.getAsset("./maps/map1.png");
    }

    update() {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 1510, 633, -this.game.camera.x, -this.game.camera.y, 2250*2, 950*2);
    }
};




