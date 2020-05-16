const diamond = new Phaser.Game(1500, 700, Phaser.AUTO, 'diamond', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    diamond.load.spritesheet('start','assets/img/bri_big_anim_start.png', 392, 372, 4);
    diamond.load.spritesheet('middle','assets/img/bri_big_anim_middle.png', 449, 432, 4);
    diamond.load.spritesheet('finish','assets/img/bri_big_anim_finish.png', 326, 337, 4);
};

let start;
let middle;
let finish;
let finishStatus = false;
let end = false;
let timer;
let coord = {
    x: 550,
    y: 200
};

function create() {
    start = diamond.add.sprite(coord.x, coord.y, 'start', 4);
    start.animations.add('walk');
    start.animations.play('walk', 10, true);
    start.scale.x = 0;
    start.scale.y = 0;
    middle = diamond.add.sprite(coord.x, coord.y, 'middle', 4);
    middle.scale.x = 0;
    middle.scale.y = 0;
    middle.animations.add('walk');
    middle.animations.play('walk', 10, true);
    finish = diamond.add.sprite(coord.x, coord.y, 'finish', 4);
    finish.scale.x = 0;
    finish.scale.y = 0;
    finish.animations.add('walk');
    timer = setTimeout(function() {
        finishStatus = true;
        finish.scale.x = 1.3;
        finish.scale.y = 1.3;
        finish.animations.play('walk', 10, true);
    }, 3000);
};

function update() {
    
    if (start.scale.x < 1)
    {
        start.scale.x += 0.01;
        start.scale.y += 0.01;
    } 

    if (start.scale.x >= 1 && !finishStatus && !end) {
        start.destroy();
        middle.scale.x = 0.9;
        middle.scale.y = 0.9;
    }

    if (finishStatus) {
        if(timer) clearTimeout(timer);
        middle.destroy();
        finish.scale.x -= 0.01;
        finish.scale.y -= 0.01;
        if (coord.y >= 100) {
            coord.y -= 1;
            coord.x -= 1;
        } 
        diamond.add.tween(finish).to({ x: coord.x, y: coord.y }, 100, Phaser.Easing.Linear.None, true);
    }

    if (finish.scale.x <= 0.1 && finishStatus) {
        end = true;
        finish.animations.stop('walk');
        finish.destroy();
        middle = diamond.add.sprite(450, 100, 'middle', 4);
        middle.scale.x = 0.1;
        middle.scale.y = 0.1;
    }

};