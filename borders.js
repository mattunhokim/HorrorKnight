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
