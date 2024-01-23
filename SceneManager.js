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

        this.MainChar = new MainChar(this.game, 2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH); // Create an instance of MainChar
       // this.loadLevel(2.5 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH, false, true);
        this.startMap = new Background(this.game, 0, 0);


        this.game.addEntity(this.startMap);
    }

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(x, y, transtion, title) {
        this.title = title;
        this.clearEntities();
        this.x = 0;
//        if(transtion) { // if black screen 

//        }
//        else {  // else update background entities
//            if(level.MainChar){
//
//            }
//        }

    this.MainChar.x = x;
    this.MainChar.y = y;
    this.MainChar.removeFromWorld = false;
    this.MainChar.velocity = { x: 0, y: 0 };
    this.MainChar.state = 1; // mario enters level in falling state;

    var that = this;
    var mainChar = false;
    this.game.entities.forEach(function(entity) {
        if(that.mainChar === entity) mainChar = true;
    });
    if(!mainChar) this.game.addEntity(this.mainChar);

    this.time = 400;
    this.game.camera.paused = false;

    }

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
        this.startMap.draw(ctx);
        this.MainChar.draw(ctx);

        // Additional drawing logic based on your game requirements
    }
}