// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        // Information on the input
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.A = false;
        this.B = false;
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        var that = this;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        }
        gameLoop();
    };
    
    startInput() {
        this.keyboardActive = false;
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y, radius: 0 };
        }

        this.ctx.canvas.addEventListener("keydown", function (e) {
            console.log(e);
            that.keyboardActive = true;
            switch (e.key) {
                case "ArrowLeft":
                case "a":
                    that.left = true;
                    break;
        
                case "ArrowRight":
                case "d":
                    that.right = true;
                    break;
        
                case "ArrowUp":
                case "w":
                    that.up = true;
                    break;
        
                case "ArrowDown":
                case "s":
                    that.down = true;
                    break;
        
                case "z":
                    that.B = true;
                    break;
        
                case "x":
                    that.A = true;
                    break;
            }
        }, false);
        
        this.ctx.canvas.addEventListener("keyup", function (e) {
            that.keyboardActive = false;
            switch (e.key) {
                case "ArrowLeft":
                case "a":
                    that.left = false;
                    break;
        
                case "ArrowRight":
                case "d":
                    that.right = false;
                    break;
        
                case "ArrowUp":
                case "w":
                    that.up = false;
                    break;
        
                case "ArrowDown":
                case "s":
                    that.down = false;
                    break;
        
                case "z":
                    that.B = false;
                    break;
        
                case "x":
                    that.A = false;
                    break;
            }
        }, false);


    };
    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();
        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
        
   
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();
        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)