class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.w = 60;
        this.score = 0;
        this.coin = 0;
        this.lives = 3;
        this.gameOver = false;
        this.title = true;
        this.credits = false;
        this.level = null;
        this.loadLevel(levelOne, 2.5 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH, false);

        this.ground = new ground(this.game, this.x, this.y, this.w);
        this.MainChar = new MainChar(this.game, this.x, this.y); // Create an instance of MainChar
        this.Dragon = new Dragon(this.game, this.x, this.y); // Create an instance of Dragon
        this.loadLevel(2.5 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH, false, true);
       
        this.startMap = new Background(this.game, 0, 0);
        this.game.addEntity(this.MainChar);
        this.game.addEntity(this.ground);
        this.game.addEntity(this.startMap);
    }

    loadLevel(level, x, y, title){
        this.title = title;
        this.level = level;
        this.clearEntities();
        this.x = 0;
        

    }

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    update() {

        // Update MainChar and other entities
        this.MainChar.update();

        // Update camera position based on MainChar
        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        this.x = this.MainChar.x - midpoint;
        this.y = this.MainChar.y - midpoint;

        // Update other logic related to the level

        // Assuming you want to update the background position
        this.startMap.x = this.x; // Update background's x position
        this.startMap.y = this.y; // Update background's y position

        // Additional logic based on your game requirements
        this.ground.x = this.x+100;
        this.ground.y = this.y+100;
        
        if(this.startMap.x > this.MainChar.x){
            this.MainChar.x = this.startMap.x;
        }
    }

    draw(ctx) {
        // Draw entities, background, and other visuals
        this.MainChar.draw(ctx);
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
