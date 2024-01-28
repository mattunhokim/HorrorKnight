class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.coin = 0;
        this.lives = 3;
        this.gameOver = false;
        this.title = true;
        this.credits = false;
        this.level = null;
        this.MainChar = new MainChar(this.game, this.x, this.y); // Create an instance of MainChar
       // this.loadLevel(2.5 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH, false, true);
        this.startMap = new Background(this.game, 0, 0);
        this.game.addEntity(this.MainChar);
        this.game.addEntity(this.startMap);


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
    }

    draw(ctx) {
        // Draw entities, background, and other visuals
 
        this.MainChar.draw(ctx);
        this.startMap.draw(ctx);

        // Additional drawing logic based on your game requirements
    }
}