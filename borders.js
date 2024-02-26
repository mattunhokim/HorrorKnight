class borders {
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height}); 
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height); 
    };

    update() {
    }
    draw(ctx) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);

    }
}
