class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.MainChar = new MainChar(this.game, 100, 0); // Create an instance of MainChar
        this.game.addEntity(this.MainChar);
        this.Dragon = new Dragon(this.game, this.x, this.y); // Create an instance of Dragon   
        this.ground = new ground(this.game, 0, 200, 200, 100);
        this.game.addEntity(this.ground);
        this.ground = new ground(this.game, 300, 400, 200, 100);
        this.game.addEntity(this.ground);
        this.ground = new ground(this.game, 500, 600, 200, 100);
        this.game.addEntity(this.ground);



        //this.game.addEntity(this.Dragon);






        this.startMap = new Background(this.game);
        this.game.addEntity(this.startMap);
    }



    update() {
        // Update camera position based on MainChar
        let midpointX = PARAMS.CANVAS_WIDTH / 2 - 40;
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - 40;
        this.x = this.MainChar.x - midpointX;
        this.y = this.MainChar.y - midpointY;

        // Update other logic related to the level
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        } 
        if (this.x > 2250) { 
            this.x = 2250;
        }
        if (this.y > 950*1) {
            this.y = 950*1;
        }

    }

    draw(ctx) {
        // Draw entities, background, and other visuals
        this.MainChar.draw(ctx);
        this.Dragon.draw(ctx);
        this.startMap.draw(ctx);
        this.ground.draw(ctx);
        }
        

}






class MiniMap {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
    }

    update() {
        // Update logic related to the minimap
    }

    draw(ctx) {
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.x, this.y, this.w, PARAMS.BLOCKWWIDTH);
        for(var i = 0; i < this.game.entities.length; i++) {
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }
    };
};
