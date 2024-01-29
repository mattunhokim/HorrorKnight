const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./movement1.png"); // copy for each entity full sprite sheet
ASSET_MANAGER.queueDownload("./knight.webp"); // copy for each entity full sprite sheet
ASSET_MANAGER.queueDownload("./maps/map1.png"); 

ASSET_MANAGER.downloadAll(() => {
    const gameEngine = new GameEngine();
    
    PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
    
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
    gameEngine.init(ctx);
    gameEngine.addEntity(new SceneManager(gameEngine));
    gameEngine.start();
});
