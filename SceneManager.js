class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        // Official starting spot is 100, 0
        this.MainChar = new MainChar(this.game, 100, 0); // Create an instance of MainChar
        this.game.addEntity(this.MainChar);
        this.addDragons();
        this.addBorders();
        this.goal = new goal(this.game, 4300, 110, 80, 300);
        this.game.addEntity(this.goal);
        this.winScreen = null; 
        this.startMap = new Background(this.game);
        this.game.addEntity(this.startMap);
    }

    update() {
        //ASSET_MANAGER.playAsset("./music/Enter Hallownest.mp3");

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
        if (this.y > 950) {
            this.y = 950;
        }
        
        if(this.MainChar.win === true){
            this.clearEntities();
            this.winScreen = new winScreen(this.game);
            this.game.addEntity(this.winScreen);
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.y < 0) {
                this.y = 0;
            } 
            if (this.x > 1920) { 
                this.x = 1920;
            }
            if (this.y > 1080) {
                this.y = 1080;
            }
        }
        if(this.MainChar.lose == true){
            this.clearEntities();
            this.loseScreen = new loseScreen(this.game);
            this.game.addEntity(this.loseScreen);
        }

        
        var that = this;
        var MainChar = false;
        this.game.entities.forEach(function(entity) {
            if(that.MainChar === entity) MainChar = true;
        });
        if(!MainChar) this.game.addEntity(this.MainChar);
    }
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };
    addDragons(){
        this.Dragon = new Dragon(this.game, 295, 0, 0); // Create an instance of Dragon
        this.game.addEntity(this.Dragon);
        this.Dragon = new Dragon(this.game, 1400, 0, 1);
        this.game.addEntity(this.Dragon);
        this.Dragon = new Dragon(this.game, 3400, 0, 1);
        this.game.addEntity(this.Dragon);
        this.Dragon = new Dragon(this.game, 2400, 80, 0);
        this.game.addEntity(this.Dragon);
        this.Dragon = new Dragon(this.game, 2600, 80, 1);
        this.game.addEntity(this.Dragon);
    }
    
    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    addBorders(){

        this.borders = new borders(this.game, 0, 0, 4500, 10);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 4490, 0, 10, 1900);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3, 0, 50, 1620);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 0, 810 * 2, 3150, 340);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 840, 0, 200, 100);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 856, 100, 200, 100);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 860, 200, 340, 330);
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
        this.borders = new borders(this.game, 3435, 1452, 60, 30);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3303, 1352, 70, 20);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3161, 1375, 50, 80);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3150, 1710, 150, 280);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3298, 1755, 310, 200);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2970, 1341, 130, 130);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2890, 1248, 80, 223);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2228, 1150, 660, 300);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1740, 1243, 490, 200);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1460, 1266, 280, 120);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3475, 1646, 55, 55);
       // this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3610, 1730, 225, 230);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3833, 1525, 215, 430);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 4030, 1476, 230, 553);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1365, 1180, 55, 55);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1365, 1180, 55, 55);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1400, 1005, 65, 20);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1505, 1105, 93, 88);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1775, 1155, 60, 20);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1895, 1065, 55, 65);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2028, 990, 55, 81);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2118, 920, 60, 20);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1940, 870, 98, 25);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1810, 780, 100, 65);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1710, 730, 100, 115);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1110, 0, 1200, 265);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2310, 0, 1500, 100);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1625, 650, 115, 78);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1585, 560, 55, 90);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1455, 495, 135, 70);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1200, 505, 252, 70);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1740, 475, 102, 60);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1840, 465, 142, 130);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1980, 415, 121, 90);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2099, 390, 570, 120);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2395, 600, 310, 380);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2705, 775, 255, 180);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2960, 850, 105, 200);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3070, 930, 82, 30);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3295, 935, 72, 25);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3493, 925, 34, 25);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3573, 825, 74, 110);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3650, 715, 138, 180);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3590, 595, 30, 55);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3288, 525, 302, 150);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2988, 410, 302, 150);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3488, 410, 302, 20);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 3790, 410, 709, 420);
        this.game.addEntity(this.borders);
        this.spikes = new spikes(this.game, 3068, 1010, 1362, 100);
        this.game.addEntity(this.spikes);
        this.borders = new borders(this.game, 4250, 1385, 310, 520);
        this.game.addEntity(this.borders);
        this.spikes = new spikes(this.game, 1300, 1305, 160, 80);
        this.game.addEntity(this.spikes);
        this.borders = new borders(this.game, 0, 0, 4500, 1);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1980, 500, 412, 100);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 2280, 600, 112, 380);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1280, 800, 200, 50);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1510, 890, 100, 100);
        this.game.addEntity(this.borders);
        this.borders = new borders(this.game, 1770, 1010, 42, 30);
        this.game.addEntity(this.borders);
    }

    draw(ctx) {
        // Draw entities, background, and other visuals
        this.MainChar.draw(ctx);
        this.Dragon.draw(ctx);
        this.startMap.draw(ctx);
        this.borders.draw(ctx);
        this.goal.draw(ctx);
        this.winScreen.draw(ctx);
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
        //ctx.strokeRect(this.x, this.y, this.w, PARAMS.BLOCKWWIDTH);
        for(var i = 0; i < this.game.entities.length; i++) {
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }
    };
};
