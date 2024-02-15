class Dragon {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.velocity = { x: -PARAMS.BITWIDTH, y: PARAMS.BITWIDTH * 3 };

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/dragon.png");
        this.animation = new Animator(this.spritesheet, 0, 160, 100, 100, 1, 0.5, 0, false, true);
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = flying right, 1 = flying left
        this.flickerFlag = true;
        this.updateBB();
    };

    loadAnimations() {

        for (var i = 0; i < 3; i++) { // two states :(
            this.animator.push([i]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animator[i].push([j]);
            }
        }

        //test moving to the right
        this.animator[1][0] = new Animator(this.spritesheet, 0, 159, 175, 129, 7, .2, 14, false, true);

        //test moving to the left
        this.animator[1][1] = new Animator(this.spritesheet, 0, 479, 175, 129, 9, 1, 14, true, true);
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

        // collision detection will be implemented later
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
        this.state = 0; // 0 = idle, 1 = walking, 2 = attacking, 3 = kicking, 4 = kicking2
        this.deadCounter = 0;
        this.flickerFlag = true;
        this.updateBB();
    }

    loadAnimations() {

        for (var i = 0; i < 5; i++) { // five states
            this.animator.push([i]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animator[i].push([j]);
            }
        }

        
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


