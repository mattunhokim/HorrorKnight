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
        this.height = 80;
        this.width = 80;

        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;
        this.speed = 200;
        this.updateBB();

        this.animator = [];
        this.loadAnimations();
        this.lastAttack = 0;
        this.canAttack = true;

    };
    // Matrix to store animations
    loadAnimations() { // not implemented yet
        // [state][facing]
        // state = standing = 0, walking = 1, running = 2 jumping = 3, etc.
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

        // Facing right idle
        this.animator[0][0] = new Animator(this.spritesheet, 1024, 639, 80, 80, 1, 1, true, false);
        
        // Facing left idle
        this.animator[0][1] = new Animator(this.spritesheet, 1024, 639, -80, 80, 1, 1, true, true);

        //walking to the right
        this.animator[1][0] = new Animator(this.spritesheet, 1024, 0, 80, 80, 9, .1, true, false);

        //walking to the left
        this.animator[1][1] = new Animator(this.spritesheet, 1024, 0, -80, 80, 9, .1, true, true);

        // running to the right 
        this.animator[2][0] = new Animator(this.spritesheet, 1024, 320, 80, 80, 6, .1, true, false);
        
        // running to the left 
        this.animator[2][1] = new Animator(this.spritesheet, 1024, 320, -80, 80, 6, .1, true, true);

        // jumping to the right 
        this.animator[3][0] = new Animator(this.spritesheet, 1120, 716, 80, 80, 11, .1, true, false);
        
        // jumping to the left 
        this.animator[3][1] = new Animator(this.spritesheet, 1120, 716, -80, 80, 11, .1, true, true);

        // attacking to the right 
        this.animator[5][0] = new Animator(this.spritesheet, 1570, 320, 80, 80, 5, .1, true, false);
        
        // attacking to the left 
        this.animator[5][1] = new Animator(this.spritesheet, 1570, 320, -80, 80, 5, .1, true, true);






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
        //  this.animator[5][0] = new Animator(this.spritesheet, 1264, 240, 80, 90, 9, .2, 14, false, true);
        //	this.animator[5][1] = new Animator(this.spritesheet, 784, 240, 80, 90, 9, .2, 14, true, true);


        //death animation
        this.deadAnim = new Animator(this.spritesheet, 1583, 640, 80, 90, 9, .2, 14, false, true);
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.height, this.width); //tried this.y = 90;
    };

    updateLastBB() {
        this.lastBB = this.BB;
    };

    die() {
        this.dead = true;
    }

    update() { // must fix
        const TICK = this.game.clockTick;
        const MIN_WALK = 5.453125*10;
        const MAX_WALK = 13.75*10;

        const MAX_RUN = 50.75*10;
        
        const ACC_WALK = 50.59375*10;
        const ACC_RUN = 100.390625*10;
        
        const DEC_REL = 182.8125*10;
        const DEC_SKID = 365.625*10;

        const MIN_SKID = 33.75*10;
        
        const STOP_FALL = 1000;
        const WALK_FALL = 1000;
        const RUN_FALL = 1000;
        
        const STOP_FALL_A = 500;
        const WALK_FALL_A = 1000;
        const RUN_FALL_A = 2000;
        
        const MAX_FALL = -110;

        const PUSH_BACK = .31;

        this.attack = 0;
        if(this.attack > 1){
            this.canAttack = false;
        }
        if(this.game.attack && !this.game.run){
            this.lastAttack += TICK;
            this.state = 5;
          if(this.facing === 0){
              if(this.velocity.x === 0){
                   this.x = this.x - PUSH_BACK;
                   
                }
            }
          else{
                if(this.velocity.x === 0){
                  this.x = this.x + PUSH_BACK;
              }
          }
        }         
        // Need to detect state and current user input
        // Ground physics
        // Jump Physics 
        // Not jumping  
        if (this.state < 3){ // 0 = idle, 1 = walking, 2 = running, 3 = jumping, 4 = falling, 5 = attacking, 6 = healing
                if (Math.abs(this.velocity.x) < MIN_WALK) {  // idle
                    this.velocity.x = 0;
                    this.state = 0;
                    if (this.game.left && !this.game.down) {
                        this.velocity.x -= MIN_WALK;
                    }
                    if (this.game.right && !this.game.down) {
                        this.velocity.x += MIN_WALK;
                    }
                }
                else if (Math.abs(this.velocity.x) >= MIN_WALK) {  // faster than a walk // accelerating or decelerating
                    if (this.facing === 0) {
                        if (this.game.right && !this.game.left && !this.game.down) {
                            if (this.game.run) {
                                this.velocity.x += ACC_RUN * TICK;
                            } else {
                                this.velocity.x += ACC_WALK * TICK;
                            }
                        } else if (this.game.left && !this.game.right && !this.game.down) {
                            this.velocity.x -= DEC_SKID * TICK;
                        } else {
                            this.velocity.x -= DEC_REL * TICK;
                        }
                    }
                    if (this.facing === 1) {
                        if (this.game.left && !this.game.right && !this.game.down) {
                            if (this.game.run) {
                                this.velocity.x -= ACC_RUN * TICK;
                            } else {
                                this.velocity.x -= ACC_WALK * TICK;
                            }
                        } else if (this.game.right && !this.game.left && !this.game.down) {
                            this.velocity.x += DEC_SKID * TICK;
                        } else {
                            this.velocity.x += DEC_REL * TICK;
                        }
                    }
                }

            
            ///Jumping physics
            if (this.game.jump && this.velocity.y === 0) { // Jump only when grounded
                if (Math.abs(this.velocity.x) < 16) { // Idle jump
                    this.velocity.y = -240;
                    this.fallAcc = STOP_FALL_A;
                }
                this.state = 3; // Set state to jumping
            }
            
                 // Apply gravity
                 this.velocity.y += this.fallAcc * TICK;

     
        } else{
            if (this.velocity.y < 0 && this.game.jump) { // holding n while jumping jumps higher
                if (this.fallAcc === STOP_FALL) this.velocity.y -= (STOP_FALL - STOP_FALL_A) * TICK;
                if (this.fallAcc === WALK_FALL) this.velocity.y -= (WALK_FALL - WALK_FALL_A) * TICK;
                if (this.fallAcc === RUN_FALL) this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;





            // horizontal physics
            if (this.game.right && !this.game.left) {
                if (Math.abs(this.velocity.x) > MAX_WALK) {
                    this.velocity.x += ACC_RUN * TICK;
                } else this.velocity.x += ACC_WALK * TICK;
            } else if (this.game.left && !this.game.right) {
                if (Math.abs(this.velocity.x) > MAX_WALK) {
                    this.velocity.x -= ACC_RUN * TICK;
                } else this.velocity.x -= ACC_WALK * TICK;
            } else {
                // do nothing
            }
        }
    }

    
                

    // Gravity
    this.y += this.velocity.y * this.game.clockTick;

    // max speed calculation
    if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
    if (this.velocity.y <= MAX_FALL) this.velocity.y = -MAX_FALL;   
    
    if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
    if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
    if (this.velocity.x >= MAX_WALK && !this.game.run) this.velocity.x = MAX_WALK;
    if (this.velocity.x <= -MAX_WALK && !this.game.run) this.velocity.x = -MAX_WALK;

    // update position
    this.x += this.velocity.x *  this.game.clockTick * PARAMS.SCALE;
    this.y += this.velocity.y *  this.game.clockTick * PARAMS.SCALE;
    this.updateLastBB();
    this.updateBB();






    











    //collision detection
    var that = this;
    this.game.entities.forEach(function (entity) {
        if (entity != that && entity.BB && that.BB.collide(entity.BB))  {
            if (that.velocity.y > 0) { // falling
                if ((entity instanceof borders) && (that.lastBB.bottom <= entity.BB.top)) { // was above last tick
                        that.y = entity.BB.top - 80;
                        that.velocity.y = 0;

                    if(that.state === 3) that.state = 0; // set state to idle
                    that.updateBB();
                }
            }
            if (that.velocity.x > 0){
                // if character right collides with border left
                if ((entity instanceof borders) && (that.lastBB.right <= entity.BB.left)) { 
                    that.x = entity.BB.left - 80;
                    that.velocity.x = 0;
                }
                that.updateBB();

                // if character left collides with border right
                // going left makes velocity negative 
            if ((entity instanceof borders) && (-that.lastBB.left >= entity.BB.right)) {
                    that.x = entity.BB.right + 80;
                    that.velocity.x = 0;
                }
                that.updateBB();

            }
        }
    });





    // update state
    if (this.state !== 3 && this.state !== 6) {
        if (Math.abs(this.velocity.x) > MAX_WALK) this.state = 2;
        else if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
        else this.state = 0;
    } 

    // update direction
    if (this.velocity.x < 0) this.facing = 1;
    if (this.velocity.x > 0) this.facing = 0;


    };

    draw(ctx) {
        if(!this.dead){
        // this.animator[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, .3);

        this.animator[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, 1);
       // this.animator[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camerax,this.y, PARAMS.SCALE);
        }



    }

// does an animation
// doesnt repeat.
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