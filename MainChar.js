class MainChar {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.MainChar = this;

        // Sprite Sheet
        //	this.spritesheet = ASSET_MANAGER.getAsset("./movement1.png");
        //	this.idle = ASSET_MANAGER.getAsset("./movement1.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./knight.webp");
        this.idle = ASSET_MANAGER.getAsset("./knight.webp");
        //, 0, 0, 80, 90, 9, .2);

        // Main Char State
        //this.size = 0; // this will most likely be removed
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = jumping, 4 = falling, 5 = attacking, 6 = healing
        this.dead = false;
        this.x = 0;
        this.y = 0;
        this.height = 768;
        this.width = 1024;

        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;
        this.speed = 200;
        this.updateBB();

        this.animator = [];
        this.loadAnimations();

    };
    // Matrix to store animations
    loadAnimations() { // not implemented yet
        // [state][facing]
        // state = standing = 0 walking, 1 running, 2 jumping, etc.
        // size = version
        // direction 0 = right
        // this.animator[this.state][this.facing] = new Animator(this.spritesheet, this.x, this.y, this.height, this.width, 9, .2, 14, this.reverse, this.loop);

        // for loop goes here
        for (var i = 0; i < 6; i++) { // five states
            this.animator.push([i]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animator[i].push([j]);
            }
        }

        //testing walking right

        //testing being idle
        this.animator[0][0] = new Animator(this.spritesheet, 1024, 639, 80, 90, 1, 1, 14, false, true);
        //	this.animator[0][1] = new Animator(this.spritesheet, 1024, 639, 80, 90, 9, .2, 14, true, true);

        //test moving to the right
        this.animator[1][0] = new Animator(this.spritesheet, 1024, 639, 80, 90, 7, .2, 14, false, true);

        //test moving to the left
        this.animator[1][1] = new Animator(this.spritesheet, 1024, 0, 80, 90, 9, 1, 14, true, true);

        //test jumping
        //    this.animator[2][0] = new Animator(this.spritesheet, 1024, 721, 80, 90, 9, .2, 14, false, true);
        //	this.animator[2][1] = new Animator(this.spritesheet, 1024, 721, 80, 90, 9, .2, 14, true, true);

        //test falling
        //	this.animator[3][0] = new Animator(this.spritesheet, 1744, 721, 80, 90, 9, .2, 14, false, true);
        //	this.animator[3][1] = new Animator(this.spritesheet, 304, 721, 80, 90, 9, .2, 14, true, true);

        //test attacking
        //	this.animator[4][0] = new Animator(this.spritesheet, 1024, 320, 80, 90, 9, .2, 14, false, true);
        //	this.animator[4][1] = new Animator(this.spritesheet, 1024, 320, 80, 90, 9, .2, 14, true, true);

        //test healing
        //    this.animator[5][0] = new Animator(this.spritesheet, 1264, 240, 80, 90, 9, .2, 14, false, true);
        //	this.animator[5][1] = new Animator(this.spritesheet, 784, 240, 80, 90, 9, .2, 14, true, true);


        //death animation
        this.deadAnim = new Animator(this.spritesheet, 1583, 640, 80, 90, 9, .2, 14, false, true);
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    die() {
        this.dead = true;
    }

    update() { // must fix
        const TICK = this.game.clockTick;
        const MIN_WALK = 4.453125;
        const MAX_WALK = 93.75;
        const MAX_RUN = 153.75;
        const ACC_WALK = 133.59375;
        const ACC_RUN = 200.390625;
        const DEC_REL = 182.8125;
        const DEC_SKID = 365.625;
        const MIN_SKID = 33.75;
        const STOP_FALL = 1000;
        const WALK_FALL = 1000;
        const RUN_FALL = 1000;
        const STOP_FALL_A = 450;
        const WALK_FALL_A = 421.875;
        const RUN_FALL_A = 562.5;
        const MAX_FALL = 110;

                  
        // Need to detect state and current user input
        // Ground physics
        // Jump Physics 
        
        // Not jumping  
        if (this.state < 3){ // 0 = idle, 1 = walking, 2 = running, 3 = jumping, 4 = falling, 5 = attacking, 6 = healing
            // idle
            if (Math.abs(this.velocity.x) < MIN_WALK){
                this.velocity.x = 0;
                this.state = 0;
            }
            // if walking right
            if (this.game.left){
                this.velocity.x -= MIN_WALK;
            }

            if (this.game.right){
                this.velocity.x += MIN_WALK;
            }

            else if (Math.abs(this.velocity.x) >= MIN_WALK){
                if(this.facing == 0){
                    if(this.game.right && !this.game.left){
                        if(this.game.B){
                            this.velocity.x += ACC_RUN * TICK;
                        } 
                        else{
                         this.velocity += ACC_WALK * TICK;
                        }
                    } 
                    else if (this.game.left && !this.game.right){
                        this.velocity.x -= DEC_SKID * TICK;
                    } 
                    else {
                        this.velocity.x -= DEC_REL * TICK;
                    }
                 }
                 if(this.facing == 1){
                    if(this.game.right && !this.game.left){
                        if(this.game.B){
                            this.velocity.x -= ACC_RUN * TICK;
                        } 

                        else{
                         this.velocity += ACC_WALK * TICK;
                        }
                    } 
                    else if (this.game.left && !this.game.right){
                        this.velocity.x += DEC_SKID * TICK;
                    } 
                    else {
                        this.velocity.x += DEC_REL * TICK;
                    }
                 }
            }

            this.velocity.y += this.fallAcc * this.game.clockTick;
            ///Jumping physics
            if (this.game.A) { // jump
                if (Math.abs(this.velocity.x) < 16) {
                    this.velocity.y = -240;
                    this.fallAcc = STOP_FALL_A;
                }
                else if (Math.abs(this.velocity.x) < 40) {
                    this.velocity.y = -240;
                    this.fallAcc = WALK_FALL_A;
                }
                else {
                    this.velocity.y = -300;
                    this.fallAcc = RUN_FALL_A;
                }
            }

        } else{
            if (this.velocity.y < 0 && this.game.A) { // holding A while jumping jumps higher
                if (this.fallAcc === STOP_FALL) this.velocity.y -= (STOP_FALL - STOP_FALL_A) * TICK;
                if (this.fallAcc === WALK_FALL) this.velocity.y -= (WALK_FALL - WALK_FALL_A) * TICK;
                if (this.fallAcc === RUN_FALL) this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
            
        }
    }
        // max speed calculation
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
        if (this.velocity.x >= MAX_WALK && !this.game.B) this.velocity.x = MAX_WALK;
        if (this.velocity.x <= -MAX_WALK && !this.game.B) this.velocity.x = -MAX_WALK;

        // Gravity
        this.y += this.velocity.y * this.game.clockTick;


         // update position
        this.x += this.velocity.x *  this.game.clockTick * PARAMS.SCALE;
        this.y += this.velocity.y *  this.game.clockTick * PARAMS.SCALE;
        this.updateBB();

        //collision detection
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if(that.velocity.y > 0){
                if ((entity instanceof ground || entity instanceof Float) && (that.lastBB.bottom <= entity.BB.top)) {
                        that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
                }
                        that.velocity.y = 0;
                        that.updateBB();
                    }
            }
        })


    if (this.state !== 4 && this.state !== 6) {
        if (Math.abs(this.velocity.x) > MAX_WALK) this.state = 2;
        
        else if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
        
        else this.state = 0;
    } 

    };

    draw(ctx) {
        //this.animator[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x,this.y, PARAMS.SCALE);
        if(!this.dead){
        this.animator[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x+250, this.y, 1);
        }
        ctx.drawImage(this.idle,
            1024, 0,                // source coordinates (x, y) on the sprite sheet
            80, 90,               // width and height of the source frame on the sprite sheet
            this.x+250, this.y,                 // destination coordinates (x, y) on the canvas
            80, 90        // width and height of the destination frame on the canvas, scaled by 2
        );



    }


    ///

}










//class Nail {
//	constructor(game) {
//		this.game = game;
//		this.animator = new Animator(ASSET_MANAGER.getAsset("./movement1.png"), 0, 0, 80, 90, 9, .2);
//		this.x = 0;
//		this.y = 0;
//		this.speed = 200;
//	};
//
//	update() {
//		this.x += this.speed * this.game.clockTick;
//		if (this.x > 1024) this.x = 0;
//	};
//
//	draw(ctx) {
//		this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
//	};
//}