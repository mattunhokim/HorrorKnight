class Dragon {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.velocity = { x: -PARAMS.BITWIDTH, y: PARAMS.BITWIDTH * 3 };

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/dragon.png");
        this.animation = new Animator(this.spritesheet, 0, 160, 100, 100, 1, 0.5, 0, false, true);
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    update() {
        if (this.dead) {
            this.deadCounter++;
            if (this.deadCounter > 50) {
                this.removeFromWorld = true;
            }
        } else {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.updateBB();
        }
    };

    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
    };

}

class catfighter {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.velocity = { x: -PARAMS.BITWIDTH, y: PARAMS.BITWIDTH * 3 };

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/catfighter.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 64, 64, 1, 0.5, 0, false, true);
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;
        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    update() {
        if (this.dead) {
            this.deadCounter++;
            if (this.deadCounter > 50) {
                this.removeFromWorld = true;
            }
        } else {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.updateBB();
        }
    };

    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
    };
}


