var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./movement1.png"); // copy for each entity full sprite sheet
ASSET_MANAGER.queueDownload("./knight.webp"); // copy for each entity full sprite sheet
ASSET_MANAGER.queueDownload("./maps/map1.png");
ASSET_MANAGER.queueDownload("./assets/floor1.png");
ASSET_MANAGER.queueDownload("./assets/floor2.png");
ASSET_MANAGER.queueDownload("./assets/floor3.png");
ASSET_MANAGER.queueDownload("./assets/floor4.png");
ASSET_MANAGER.queueDownload("./assets/wall1.png");
ASSET_MANAGER.queueDownload("./assets/float1.png");
ASSET_MANAGER.queueDownload("./assets/dragon.png");
ASSET_MANAGER.queueDownload("./assets/catfighter.png");

ASSET_MANAGER.downloadAll(() => {
    var gameEngine = new GameEngine();
    
    PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
    
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
    gameEngine.init(ctx);
    new SceneManager(gameEngine);
    gameEngine.start();
});
