class Background {
    constructor(game, x, y, height, width) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./maps/map1.png");
        this.zoomLevel = 4;
        this.x = 0;
        this.y = 0;
        this.height = 800;
        this.width = 2500;
        this.speed = 20;
    }

    update() {
        // You can add update logic specific to the background if needed
        this.x -= this.speed;
    }

    draw(ctx) {
   ///     const sourceX = 0;
   ///     const sourceY = 0;
   ///     const sourceWidth = this.spritesheet.width;
   ///     const sourceHeight = this.spritesheet.height;
///
   ///     const destinationX = this.x - this.game.camera.x;
   ///     const destinationY = this.y - this.game.camera.y; // Adjusted for camera's y position
   ///     const destinationWidth = this.spritesheet.width * this.zoomLevel;
   ///     const destinationHeight = this.spritesheet.height * this.zoomLevel;
///
        ctx.drawImage(this.spritesheet,
            0, 0, this.width, this.height);
        ctx.drawImage(this.spritesheet, 0 + this.width, 0, this.width, this.height);
    }
}
