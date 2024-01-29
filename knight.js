class knight {

    constructor(game) {
        this.game = game;
        this.animator = new animator(ASSET_MANAGER.getAsset("./knight.webp"), 46, 0, 21, 44, 8, 1.25);

        this.x = 0;
        this.y = 0;
        this.speed = 20;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
        if (this.x > 1024) this.x = 0;
    };

    draw(ctx) {
        //ctx.drawImage(ASSET_MANAGER.getAsset("./movement1.png"),0,0);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };

}