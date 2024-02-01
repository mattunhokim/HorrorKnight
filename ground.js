class ground {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/floor1.png");



    }
}