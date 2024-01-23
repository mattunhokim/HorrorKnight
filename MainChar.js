class MainChar {
	constructor(game, x, y) {
		Object.assign(this,{game, x, y});
		this.game.MainChar = this;

		// Sprite Sheet
		this.spritesheet = ASSET_MANAGER.getAsset("./movement1.png");
		//, 0, 0, 80, 90, 9, .2);
		
		// Main Char State
		this.size = 0;
		this.facing = 0;
		this.state = 0;
		this.dead = false;
		this.x = 0;
		this.y = 0;
	
		this.velocity = {x:0, y:0};
		this.fallAcc = 562.5;
		//	this.speed = 200;
		this.updateBB;

		this.animations = [];
		this.loadAnimations();
	};

	loadAnimations() {
		for (var i = 0; i < 6; i++){
			this.animations.push([]);
			for(var j = 0; j < 3; j++){
				this.animations[i].push([]);
				for(var k = 0; k < 2; k++){
					this.animations[i][j].push([]);
				}
			}
		}

		// [state][size][direction] 
		// state = standing = 0 walking, running, jumping, etc. 
		// size = version 
		// direction 0 = right

		//this.animations[state][size][direction] = 
		//	new Animator(this.spritesheet, postionx, positiony, 
		//      height, width, # of frames, frame duration, frane padding, reverse(boolean), loop(boolean));
		
		
		//testing walking right
		this.animations[1][0][0] = new Animator(this.spritesheet, 0, 0, 80, 90, 9, .2, 14, false, true);
		
		//death animation
		// this.deadAnim = new Animator()

	
	};

	updateBB(){
		this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
	};
	
	updateBB(){
		this.lastBB = this.BB;

	};

	die(){
		this.dead = true;
	}
	
	update() { // must fix
	};









	draw(ctx)	 {
 	if(this.dead)	 { 
 		this.deadAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE); 
 	} 
 	else	 { 
 		this.animations[this.state][this.size][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE	); 
	} 
 	if (PARAMS.DEBUG)	 { 
 		ctx.strokeStyle = 'Red	'; 
 		ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height	); 
 		}
	};
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