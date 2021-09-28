import Phaser from "phaser";

class playGame extends Phaser.Scene {
  constructor()
  {
    super("PlayGame");
    this.state = {
      pauseGame:	false
    };
    this.yellowLine = [];     //int array
    this.blueLine   = [];     //int array
  }
  preload()
  {
    // load images
    this.load.image('arena', 'src/assets/tron_arena_800x600.png');
    this.load.image('yellowCycle', 'src/assets/yellowLegacyCycle_21x50.png');
    this.load.image('blueCycle', 'src/assets/blueLegacyCycle_21x50.png');
  }
  create()
  {
    console.log(this);
    console.log(this.game);
    console.log(this.scene);

    // set up game objects
    this.arena = this.physics.add.image(400, 300, 'arena');
    this.yellowCycle = this.physics.add.image(400, 470, 'yellowCycle');
    this.blueCycle = this.physics.add.image(400, 30, 'blueCycle');
    this.cursors = this.input.keyboard.createCursorKeys();

    // set up wall group
    this.outerWall = this.physics.add.staticGroup({});
    Phaser.Actions.PlaceOnRectangle(this.outerWall.getChildren(), new Phaser.Geom.Rectangle(400, 300, 1, 1));
    this.outerWall.refresh();
    this.yellowCycle.setVelocity(0, 0).setBounce(1, 1).setCollideWorldBounds(true).setGravityY(0);
    this.blueCycle.setVelocity(0, 0).setBounce(1, 1).setCollideWorldBounds(true).setGravityY(0);

    // add for collision detection
    this.physics.add.collider(this.yellowCycle, this.outerWall);
    this.physics.add.collider(this.blueCycle, this.outerWall);

    // check to see if cycle crashed into cycle
    this.physics.add.overlap(this.blueCycle, this.yellowCycle, function () {
      // callback funciton
      return null;
    }, function () {
      // contact function
      this.onCollision('BothCycles');
    }, this);


  }
  update()
  {
    // pause game
    //this.scene.pause();

    // set up direction buttons
    this.downKeyObj = this.input.keyboard.addKey('S');
    this.upKeyObj = this.input.keyboard.addKey('W');
    this.leftKeyObj = this.input.keyboard.addKey('A');
    this.rightKeyObj = this.input.keyboard.addKey('D');

    // up arrow for yellowCycle //
    if (this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
      // move cycle direction
      this.yellowCycle.angle = 0;
      this.yellowCycle.y -= 5;

      // get cycle coords.
      this.yellowLine1 = this.add.rectangle(this.yellowCycle.x, this.yellowCycle.y, 5, 5, 0xFFEB3B).getCenter();

      // add them to array
      this.yellowLine.push(this.yellowLine1);

      // check to see if crash with self wall
      this.onCollisionYellowSelf();

      // check to see if crash with blue cycle or blue wall
      this.onCollisionYellowCycleBlueWall();

      //detect when outerwall is hit
      if (this.yellowCycle.y <= 15) {
        this.onCollision('YellowCycle');
      }
    }

    // down arrow for yellowCycle //
    if (this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
      // move cycle direction
      this.yellowCycle.angle = 180;
      this.yellowCycle.y += 5;

      // get cycle coords.
      this.yellowLine2 = this.add.rectangle(this.yellowCycle.x, this.yellowCycle.y, 5, 5, 0xFFEB3B).getCenter();

      // add them to array
      this.yellowLine.push(this.yellowLine2);

      // check to see if crash with self wall
      this.onCollisionYellowSelf();

      // check to see if crash with blue cycle or blue wall
      this.onCollisionYellowCycleBlueWall();

      //detect when outerwall is hit
      if (this.yellowCycle.y >= 485) {
        this.onCollision('YellowCycle');
      }
    }

    // left arrow for yellowCycle //
    if (this.cursors.left.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown) {
      // move cycle direction
      this.yellowCycle.angle = 270;
      this.yellowCycle.x -= 5;

      // get cycle coords.
      this.yellowLine3 = this.add.rectangle(this.yellowCycle.x, this.yellowCycle.y, 5, 5, 0xFFEB3B).getCenter();

      // add them to array
      this.yellowLine.push(this.yellowLine3);

      // check to see if crash with self wall
      this.onCollisionYellowSelf();

      // check to see if crash with blue cycle or blue wall
      this.onCollisionYellowCycleBlueWall();

      //detect when outerwall is hit
      if (this.yellowCycle.x <= 1) {
        this.onCollision('YellowCycle');
      }
    }

    // right arrow for yellowCycle //
    if (this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown) {
      // move cycle direction
      this.yellowCycle.angle = 90;
      this.yellowCycle.x += 5;

      // get cycle coords.
      this.yellowLine4 = this.add.rectangle(this.yellowCycle.x, this.yellowCycle.y, 5, 5, 0xFFEB3B).getCenter();

      // add them to array
      this.yellowLine.push(this.yellowLine4);

      // check to see if crash with self wall
      this.onCollisionYellowSelf();

      // check to see if crash with blue cycle or blue wall
      this.onCollisionYellowCycleBlueWall();

      //image is 2x as big as pixesl defined
      ////detect when outerwall is hit
      if ((parseInt(this.yellowCycle.x) / 2) + 1 >= this.arena.x) {
        this.onCollision('YellowCycle');
      }
    }

    // up arrow for blueCycle //
    if (this.upKeyObj.isDown && !this.leftKeyObj.isDown && !this.rightKeyObj.isDown) {
      // move cycle direction
      this.blueCycle.angle = 0;
      this.blueCycle.y -= 5;

      // get cycle coords.
      this.blueLine1 = this.add.rectangle(this.blueCycle.x, this.blueCycle.y, 5, 5, 0x1A237E).getCenter();

      // add them to array
      this.blueLine.push(this.blueLine1);

      // check to see if crash with self wall
      this.onCollisionBlueSelf();

      // check to see if crash with yellow cycle or yellow wall
      this.onCollisionBlueCycleYellowWall();

      //detect when outerwall is hit
      if (this.blueCycle.y <= 15) {
        this.onCollision('BlueCycle');
      }
    }

    // down arrow for blueCycle //
    if (this.downKeyObj.isDown && !this.leftKeyObj.isDown && !this.rightKeyObj.isDown) {
      // move cycle direction
      this.blueCycle.angle = 180;
      this.blueCycle.y += 5;

      // get cycle coords.
      this.blueLine2 = this.add.rectangle(this.blueCycle.x, this.blueCycle.y, 5, 5, 0x1A237E).getCenter();

      // add them to array
      this.blueLine.push(this.blueLine2);

      // check to see if crash with self wall
      this.onCollisionBlueSelf();

      // check to see if crash with yellow cycle or yellow wall
      this.onCollisionBlueCycleYellowWall();

      //detect when outerwall is hit
      if (this.blueCycle.y >= 485) {
        this.onCollision('BlueCycle');
      }
    }

    // left arrow for blueCycle //
    if (this.leftKeyObj.isDown && !this.upKeyObj.isDown && !this.downKeyObj.isDown) {
      // move cycle direction
      this.blueCycle.angle = 270;
      this.blueCycle.x -= 5;

      // get cycle coords.
      this.blueLine3 = this.add.rectangle(this.blueCycle.x, this.blueCycle.y, 5, 5, 0x1A237E).getCenter();

      // add them to array
      this.blueLine.push(this.blueLine3);

      // check to see if crash with self wall
      this.onCollisionBlueSelf();

      // check to see if crash with yellow cycle or yellow wall
      this.onCollisionBlueCycleYellowWall();

      //detect when outerwall is hit
      if (this.blueCycle.x <= 1) {
        this.onCollision('BlueCycle');
      }
    }

    // right arrow for blueCycle //
    if (this.rightKeyObj.isDown && !this.upKeyObj.isDown && !this.downKeyObj.isDown) {
      // move cycle direction
      this.blueCycle.angle = 90;
      this.blueCycle.x += 5;

      // get cycle coords.
      this.blueLine4 = this.add.rectangle(this.blueCycle.x, this.blueCycle.y, 5, 5, 0x1A237E).getCenter();

      // add them to array
      this.blueLine.push(this.blueLine4);

      // check to see if crash with self wall
      this.onCollisionBlueSelf();

      // check to see if crash with yellow cycle or yellow wall
      this.onCollisionBlueCycleYellowWall();

      //detect when outerwall is hit
      if (this.blueCycle.x >= 799) {
        this.onCollision('BlueCycle');
      }
    }

  }

  onCollision(cycle)
  {
    console.log('Crash ' + cycle);
    this.yellowLine = [];
    this.blueLine   = [];
    this.scene.restart();
  }
  onCollisionYellowSelf()
  {
    // Check if the head of the snake overlaps with any part of the snake.
    for(let i = 0; i < this.yellowLine.length - 1; i++){
      if(this.yellowCycle.x == this.yellowLine[i].x && this.yellowCycle.y == this.yellowLine[i].y){
        this.onCollision('YellowCycle');
      }
    }
  }
  onCollisionBlueSelf()
  {
    // Check if the head of the snake overlaps with any part of the snake.
    for(let i = 0; i < this.blueLine.length - 1; i++){
      if(this.blueCycle.x == this.blueLine[i].x && this.blueCycle.y == this.blueLine[i].y){
        this.onCollision('BlueCycle');
      }
    }
  }
  onCollisionYellowCycleBlueWall()
  {
    // Check if the head of the snake overlaps with any part of the snake.
    for(let i = 0; i < this.yellowLine.length - 1; i++){
      if(typeof this.blueLine[i] !== 'undefined')
      {
        this.blueLineXval = this.blueLine[i].x;
        this.blueLineYval = this.blueLine[i].y;
      }
      else
      {
        this.blueLineXval = 0;
        this.blueLineYval = 0;
      }
      if(this.yellowCycle.x == this.blueLineXval && this.yellowCycle.y == this.blueLineYval)
      {
        this.onCollision('YellowCycle');
      }
    }
  }
  onCollisionBlueCycleYellowWall()
  {
    // Check if the head of the snake overlaps with any part of the snake.
    for(let i = 0; i < this.blueLine.length - 1; i++){
      if(typeof this.yellowLine[i] !== 'undefined')
      {
        this.yellowLineXval = this.yellowLine[i].x;
        this.yellowLineYval = this.yellowLine[i].y;
      }
      else
      {
        this.yellowLineXval = 0;
        this.yellowLineYval = 0;
      }
      if(this.blueCycle.x == this.yellowLineXval && this.blueCycle.y == this.yellowLineYval)
      {
        this.onCollision('BlueCycle');
      }
    }
  }
  
}

export default playGame;
