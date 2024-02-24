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


//bottom: 187
//height: 97
//left: 0
//right: 845
//top: 90
//width: 845
//x: 0
//y: 90
//
//
//bottom: 767.6603749999812
//height: 48
//left: 0
//right: 48
//top: 719.6603749999812
//width: 48
//x: 0
//y: 719.6603749999812

class Floor {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.velocity = 0;
        this.startTime = 0;

        this.animation = [];

        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/floor1.png"), 0, 0, 32, 32, 1, 1, 0, false, true));
        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/floor2.png"), 32, 0, 32, 32, 1, 1, 0, false, true));
        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/floor3.png"), 64, 0, 32, 32, 1, 1, 0, false, true));
        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/floor4.png"), 96, 0, 32, 32, 1, 1, 0, false, true));

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.topBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.bottomBB = new BoundingBox(this.x, this.y + this.w - PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    update() {
        const TICK = this.game.clockTick;
        this.velocity = 0;
        this.startTime += TICK;
        if (this.startTime > 1) {
            this.startTime = 0;
            this.type = Math.floor(Math.random() * 4);
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Brown";
        ctx.fillRect(mmX + this.x, mmY + this.y, this.w, PARAMS.BLOCKWIDTH);
    };

    draw(ctx) {
        this.animation[this.type].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = "Blue";
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeStyle = "Green";
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeStyle = "Yellow";
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeStyle = "Purple";
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
    }
    };
        
}

class Float {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.velocity = 0;
        this.startTime = 0;

        this.animation = [];

        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/float1.png"), 0, 0, 32, 32, 1, 1, 0, false, true));
        

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.topBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.bottomBB = new BoundingBox(this.x, this.y + this.w - PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    update() {
        const TICK = this.game.clockTick;
        this.velocity = 0;
        this.startTime += TICK;
        if (this.startTime > 1) {
            this.startTime = 0;
            this.type = Math.floor(Math.random() * 4);
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Brown";
        ctx.fillRect(mmX + this.x, mmY + this.y, this.w, PARAMS.BLOCKWIDTH);
    };

    draw(ctx) {
        this.animation[this.type].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = "Blue";
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeStyle = "Green";
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeStyle = "Yellow";
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeStyle = "Purple";
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
    };
}

class Wall {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.velocity = 0;
        this.startTime = 0;

        this.animation = [];

        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/wall1.png"), 0, 0, 32, 32, 1, 1, 0, false, true));
        

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.topBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.bottomBB = new BoundingBox(this.x, this.y + this.w - PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    update() {
        const TICK = this.game.clockTick;
        this.velocity = 0;
        this.startTime += TICK;
        if (this.startTime > 1) {
            this.startTime = 0;
            this.type = Math.floor(Math.random() * 4);
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Brown";
        ctx.fillRect(mmX + this.x, mmY + this.y, this.w, PARAMS.BLOCKWIDTH);
    };

    draw(ctx) {
        this.animation[this.type].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = "Blue";
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeStyle = "Green";
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeStyle = "Yellow";
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeStyle = "Purple";
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
    };
}