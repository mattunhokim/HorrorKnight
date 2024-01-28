class Background {
    constructor(game, x, y, height, width) {
        Object.assign(this, { game, x, y, height, width});
        this.spritesheet = ASSET_MANAGER.getAsset("./maps/map1.png");
        this.zoomLevel = 1.5;
        this.x = 0;
        this.y = 0;
        this.height = 768;
        this.width = 1024;
        this.speed = 20;
    }

    update() {
        // You can add update logic specific to the background if needed
        this.x -= this.speed;
    }

    draw(ctx) {
        const sourceX = 0;
        const sourceY = 0;
        const sourceWidth = this.spritesheet.width;
       const sourceHeight = this.spritesheet.height;

       const destinationX = this.x - this.game.camera.x;
        const destinationY = this.y - this.game.camera.y; // Adjusted for camera's y position
        const destinationWidth = this.spritesheet.width * this.zoomLevel;
         const destinationHeight = this.spritesheet.height * this.zoomLevel;

        ctx.drawImage(this.spritesheet, sourceX, sourceY, sourceWidth, sourceHeight,
            destinationX,destinationY, destinationWidth, destinationHeight);
    }
}
