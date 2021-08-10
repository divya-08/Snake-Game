
function init() {
    var canvas = document.getElementById("mycanvas");
    H = canvas.height = 480;
    W = canvas.width = 500;
    pen = canvas.getContext("2d");
    cs = 30;
    food = getRandomFood();
    game_over = false;
    food_image = new Image();
    food_image.src = "food.png"
    trophy_image = new Image();
    trophy_image.src = "trophy.png"
    score = 5;
    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",
        createSnake: function() {
            for(var i=this.init_len;i>0;i--) {
                this.cells.push({x:i, y:0});
            }
        },
        drawSnake: function() {
            for(var i=0;i<this.cells.length;i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-2, cs-2)
            }
        },
        updateSnake: function() {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y) {
                food = getRandomFood();
                score++;
            }
            else {
                this.cells.pop()
            }
            
            var nextX, nextY;
            if(this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            else {
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({x:nextX, y:nextY});

            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y < 0 || this.cells[0].y > last_y) {
                game_over = true;
            }
        }
    };

    snake.createSnake();

    function keyPressed(e) {
        console.log("key", e.key);
        if(e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if(e.key == "ArrowDown") {
            snake.direction = "down";
        }
        else {
            snake.direction = "up";
        }

    }

    document.addEventListener('keydown', keyPressed);
}  


function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_image, food.x*cs, food.y*cs, cs+12, cs+12);
    pen.drawImage(trophy_image, 18, 20, cs+10, cs+10);
    pen.fillStyle = "black";
    pen.font = "15px Roboto"
    pen.fillText(score, 32, 38);
}


function update() {
    snake.updateSnake();
}

function getRandomFood() {
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(W-cs)/cs);
    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    }
    return food;
}


function gameloop() {
    if(game_over == true) {
        clearInterval(f);
        alert("Game Over!")
        return;
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);