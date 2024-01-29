class MainChar {
	constructor(game, x, y) {
		Object.assign(this,{game, x, y});
		this.game.MainChar = this;

		// Sprite Sheet
		this.spritesheet = ASSET_MANAGER.getAsset("./movement1.png");
		this.idle = ASSET_MANAGER.getAsset("./movement1.png");
		//, 0, 0, 80, 90, 9, .2);
		
		// Main Char State
		this.size = 0;
		this.facing = 0;
		this.state = 0;
		this.dead = false;
		this.x = 0;
		this.y = 0;
		this.height =  768;
		this.width = 1024;
	
		this.velocity = {x:0, y:0};
		this.fallAcc = 562.5;
		this.speed = 200;
		this.updateBB;

		this.animator = new Animator(this.spritesheet, 0, 0, 80, 90, 9, .2, 14, false, true);
		this.loadAnimations();
	
	};
	// Matrix to store animations
	loadAnimations() {
	};
	
	updateBB(){
		this.lastBB = this.BB;
	};

	die(){
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

        const STOP_FALL = 1575;
        const WALK_FALL = 1800;
        const RUN_FALL = 2025;
        const STOP_FALL_A = 450;
        const WALK_FALL_A = 421.875;
        const RUN_FALL_A = 562.5;

        const MAX_FALL = 270;

          // update velocity
            
            if (this.state !== 4) { // not jumping
                    // ground physics
                    if (Math.abs(this.velocity.x) < MIN_WALK) {  // slower than a walk // starting, stopping or turning around
                        this.velocity.x = 0;
                        this.state = 0;
                        if (this.game.left && !this.game.down) {
                            this.velocity.x -= MIN_WALK;
                        }
                        if (this.game.right && !this.game.down) {
                            this.velocity.x += MIN_WALK;
                        }
                  
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

            // update state
            if (this.state !== 4 && this.state !== 6) {
                if (this.game.down) this.state = 5;
                else if (Math.abs(this.velocity.x) > MAX_WALK) this.state = 2;
                else if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
                else this.state = 0;
            } else {

            }
		}
  
	}
	};

	draw(ctx)	 {
		this.animator.drawFrame(this.game.clockTick, ctx, 0, 0, 2);
		ctx.drawImage(this.idle,
			0, 0,                // source coordinates (x, y) on the sprite sheet
			80, 90,               // width and height of the source frame on the sprite sheet
			0, 0,                 // destination coordinates (x, y) on the canvas
			80 * 2, 90 * 2        // width and height of the destination frame on the canvas, scaled by 2
		);

		
}

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