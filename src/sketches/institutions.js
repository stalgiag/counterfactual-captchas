const institutions = (s) => {
    let tex;
    let term;
    let bg;
    let grid;

    let gridArr = [];

    let pg;
    
    let k;
    
    let gridOffsetX = 70;
    let gridOffsetY = 59;
    let gridSize = 219;

    s.preload = () => {
        k = s.loadFont('./fonts/kar.otf');
        tex = s.loadImage('./images/care-com-texture.jpg');
        bg = s.loadImage('./images/care-com-bg.jpg');
        grid = s.loadImage('./images/care-com-grid.jpg');
    }

    s.setup = () => {
        s.createCanvas(800, 800, s.WEBGL);
        s.angleMode(s.DEGREES);
        
        pg = s.createGraphics(800, 800);
        s.textSize(40);
        s.textAlign(s.CENTER, s.TOP);
        s.textFont(k);
    }

    s.draw = () => {
        s.background(255);

        //BG
        s.push();
        s.resetShader();
        s.texture(bg);
        s.rect(-s.width / 2, -s.width / 2, s.width, s.width);
        s.pop();
        s.fill(0);
        
        s.push();
        let rotY = s.map(s.mouseX, 0, pg.width, -10, 10, true);
        let rotX = s.map(s.mouseY, 0, pg.width, -10, 10, true);
        s.rotateX(rotX)
        s.rotateY(rotY);

        s.push();
        s.translate(rotY * 3, rotX * 3, -40);
        s.texture(tex);
        s.rect(-300, -300, 600, 600);
        s.pop();

        pg.background(255);
        pg.image(grid, 62, 50, pg.width - 125, pg.height - 125);
        pg.fill(0);
        s.checkGrid();
        s.texture(pg);
        s.rect(-250, -250, 500, 500);

        if (s.mouseIsPressed) {
            s.colorMode(s.HSB);
            let str = s.color(s.frameCount % 360, 5, 10);
            pg.stroke(str);
            pg.strokeWeight(10);
            pg.line(s.pmouseX - 150, s.pmouseY - 150, s.mouseX - 150, s.mouseY - 150);
        }
        s.pop();
        
        // s._renderer.GL.disable(s._renderer.GL.DEPTH_TEST);
        // s.text('We share power differently now.\n Who influences who?', 0, -s.height / 2);
    }

    s.checkGridPosition = () => {
        let pos = {
            row: 0,
            column: 0,
            width: gridSize,
            height: gridSize,
            inRow: false,
            inColumn: false,
        }
        // ROW 1
        if (s.mouseY > 180 && s.mouseY < 320) {
            pos.inRow = true;
            pos.row = 0;
        } else if (s.mouseY > 320 && s.mouseY < 460) {
            pos.inRow = true;
            pos.row = 1;
        } else if (s.mouseY > 460 && s.mouseY < 600) {
            pos.inRow = true;
            pos.row = 2;
        }

        if (s.mouseX > 180 && s.mouseX < 320) {
            pos.inColumn = true;
            pos.column = 0;
        } else if (s.mouseX > 320 && s.mouseX < 460) {
            pos.inColumn = true;
            pos.column = 1;
        } else if (s.mouseX > 460 && s.mouseX < 600) {
            pos.inColumn = true;
            pos.column = 2
        }
        return pos;
    }

    s.checkGrid = () => {
        pg.fill(200, 0, 0, 100);
        for (const r of gridArr) {
            pg.rect(gridOffsetX + r[1] * gridSize, gridOffsetY + r[0] * gridSize, gridSize, gridSize);
        }
        pg.stroke(200, 0, 0, 100);
        pg.strokeWeight(5);
        pg.noFill();
        let pos = s.checkGridPosition();
        if (pos.inRow && pos.inColumn) {
            pg.rect(gridOffsetX + pos.column * pos.width, gridOffsetY + pos.row * pos.height, pos.width, pos.height);
        }
    }

    s.mousePressed = () => {
        let pos = s.checkGridPosition();
        if (!pos.inRow || !pos.inColumn) {
            return;
        }
        let index = -1;
        for (let i = 0; i < gridArr.length; i++) {
            if (gridArr[i][0] === pos.row && gridArr[i][1] === pos.column) {
                index = i;
            }
        }
        if (index >= 0) {
            gridArr.splice(index, 1);
        } else {
            gridArr.push([pos.row, pos.column]);
        }
    }
}

export default institutions;