class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.MainChar = new MainChar(this.game, this.x, this.y); // Create an instance of MainChar
        this.Dragon = new Dragon(this.game, this.x, this.y); // Create an instance of Dragon
       
       
       

        
       
       
       

       
       
        this.ground = new ground(this.game, this.x,this.y, this.width, this.height);
       
       
        this.startMap = new Background(this.game);

        this.game.addEntity(this.MainChar);
        this.game.addEntity(this.Dragon);
        this.game.addEntity(this.ground);







        this.game.addEntity(this.startMap);
    }



    update() {

        // Assuming you want to update the background position
        this.startMap.x = this.x; // Update background's x position
        this.startMap.y = this.y; // Update background's y position

        // Update MainChar and other entities
        this.MainChar.update();


        // Update camera position based on MainChar
        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        this.x = this.MainChar.x - midpoint;
        this.y = this.MainChar.y - midpoint;

        // Update other logic related to the level

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
