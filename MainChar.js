class MainChar {
	constructor(game, x, y) {
		Object.assign(this,{game, x, y});
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
		this.height =  768;
		this.width = 1024;
	
		this.velocity = {x:0, y:0};
		this.fallAcc = 562.5;
		this.speed = 200;
		this.updateBB;

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
		for(var i = 0; i < 6; i++){ // five states
            this.animator.push([i]);
           for(var j = 0; j < 2; j++){ // two directions
             this.animator[i].push([j]);
           }
       }

		//testing walking right

		//testing being idle
		this.animator[0][0] = new Animator(this.spritesheet, 1024, 639, 80, 90, 9, 1, 14, false, true);
	//	this.animator[0][1] = new Animator(this.spritesheet, 1024, 639, 80, 90, 9, .2, 14, true, true);

		//test moving to the right
		this.animator[1][0] = new Animator(this.spritesheet, 1024, 0, 80, 90, 9, .2, 14, false, true);

		//test moving to the left
		this.animator[1][1] = new Animator(this.spritesheet, 1024, 0, 80, 90, 9, .2, 14, true, true);

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
	this.velocity.x = 50;
	this.velocity.y = 10;

 	 this.y += this.velocity.y * this.game.clockTick;
	  if(this.game.right){
        this.x += this.velocity.x * this.game.clockTick;
	  }
    
	};

	draw(ctx)	 {
		//this.animator[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x,this.y, PARAMS.SCALE);
		this.animator[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x,this.y, 1);
		ctx.drawImage(this.idle,
			1024, 0,                // source coordinates (x, y) on the sprite sheet
			80, 90,               // width and height of the source frame on the sprite sheet
			this.x, this.y,                 // destination coordinates (x, y) on the canvas
			80 , 90        // width and height of the destination frame on the canvas, scaled by 2
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