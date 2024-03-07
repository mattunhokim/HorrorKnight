class Dragon {
    constructor(game, x, y, facing) {
        Object.assign(this, { game, x, y , facing});
        this.game.Dragon = this;
        //this.velocity = { x: -PARAMS.BITWIDTH, y: PARAMS.BITWIDTH * 3 };

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/dragon.png");
        this.idle = ASSET_MANAGER.getAsset("./assets/dragon.png");
        //this.animation = new Animator(this.spritesheet, 0, 160, 100, 100, 1, 0.5, 0, false, true);
       this.dead = false;
       // this.deadCounter = 0;
        //this.state = 0; // 0 = idle, 1 = flying
        this.facing = facing; // 0 = right, 1 = left, 2 = up, 3 = down
        //this.flickerFlag = true;
        // this.updateBB();

        this.height = 80;
        this.width = 80;

        this.fallAcc = 562.5;
        this.speed = 200;
        this.updateBB();
        this.velocity = { x: 0, y: 0 }

        this.animator = [];
        this.loadAnimations();
    };

    loadAnimations() {

        for (var i = 0; i < 4; i++) { // four states
            this.animator.push([i]);
        }
        //test moving to the right
        this.animator[0] = new Animator(this.spritesheet, 0, 159, 175, 129, 7, .01, true, false);

        //test moving to the left
        this.animator[1] = new Animator(this.spritesheet, 572, 479, -175, 129, 7, .01, true, true);

        //test moving up
        this.animator[2] = new Animator(this.spritesheet, 0, 0, 175, 129, 7, .01, false, true);

        //test moving down
        this.animator[3] = new Animator(this.spritesheet, 0, 319, -175, 129, 7, .01, false, true);


    }

    updateBB() {
        if (this.facing === 0) {
            this.BB = new BoundingBox(this.x, this.y, this.height, this.width);
        } else {
            // Adjust bounding box position for left-facing character
            this.BB = new BoundingBox(this.x - this.width, this.y, this.height, this.width);
        }
    };

    updateLastBB() {
        this.lastBB = this.BB;
    };

    update() {
        
           // this.x += this.velocity.x;
        // this.y += this.velocity.y;
        //this.x += this.velocity.x * TICK * PARAMS.SCALE;
        //this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.updateLastBB();
        this.updateBB();

        if (this.facing == 0) {
            this.x += this.speed * this.game.clockTick;

            this.y += this.speed * this.game.clockTick;
        } else if (this.facing == 1) {
            this.x -= this.speed * this.game.clockTick;
            this.y += this.speed * this.game.clockTick;
        } else if (this.facing == 2) {
            this.y -= this.speed * this.game.clockTick;
        } else if (this.facing == 3) {
            this.y += this.speed * this.game.clockTick;
        }

        
    };

    draw(ctx) {
        if (!this.dead) {
            this.animator[this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, .5);
            
        }
       
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
        this.state = 0; // 0 = idle, 1 = walking, 2 = attacking 3 = kicking, 4 = kicking2
        this.facing = 0; // 0 = right, 1 = left
        this.deadCounter = 0;
        this.flickerFlag = true;
        this.updateBB();

        this.animator = [];
        this.loadAnimations();
    }

    loadAnimations() {

        for (var i = 0; i < 5; i++) { // five states
            this.animator.push([i]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animator[i].push([j]);
            }
        }

        // test being idle
        this.animator[0][0] = new Animator(this.spritesheet, 0, 0, 47, 47, 1, 0.5, 0, false, true);

        // test walking
        this.animator[1][0] = new Animator(this, 145, 0, 47, 47, 4, 0.2, 0, false, true);

        // test attacking to the left
        this.animator[2][1] = new Animator(this, 400, 151, 47, 47, 4, 0.2, 0, false, true);

        // test attacking to the right
        this.animator[2][0] = new Animator(this, 304, 151, 47, 47, 4, 0.2, 0, false, true);

        // test kicking
        this.animator[3][0] = new Animator(this, 0, 200, 47, 47, 4, 0.2, 0, false, true);

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

        // collision detection
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity != that && entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { // falling
                    if ((entity instanceof ground) // landing
                        && (that.lastBB.bottom) <= entity.BB.top) { // was above last tick
                        that.y = entity.BB.top - 80;
                        that.velocity.y = 0;

                        if (that.state === 3) that.state = 0; // set state to idle
                        that.updateBB();
                    }
                }
            }
        });
    };

    draw(ctx) {
        this.animatior[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
    };
}


