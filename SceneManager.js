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
        // you gotta give values to this.x and this.y for dragon 
        this.Dragon = new Dragon(this.game, this.x, this.y); // Create an instance of Dragon   
        this.addBorders();

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

    addBorders(){
        this.borders = new borders(this.game, 3, 0, 50, 1620);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 0, 810 * 2, 3150, 340);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 840, 0, 200, 100);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 856, 100, 200, 100);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 860, 200, 200, 330);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 950, 530, 200, 100);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 975, 630, 200, 200);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1000, 830, 250, 200);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1050, 1030, 250, 350);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3193, 1592, 92, 30);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3350, 1545, 50, 50);
        this.game.addEntity(this.borders);
    }

    draw(ctx) {
        // Draw entities, background, and other visuals
        this.MainChar.draw(ctx);
        this.Dragon.draw(ctx);
        this.startMap.draw(ctx);
        this.borders.draw(ctx);
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
