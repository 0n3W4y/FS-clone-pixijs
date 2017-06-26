var game;
function gameInit(){
	game = new Game( {x:1280, y:768} );
    game.init();
    game.start();

    
        
    var texture1 = new PIXI.Texture.fromImage('images/cat.png');
    var texture2 = new PIXI.Texture.fromImage('images/crab.png');

    var cat = new PIXI.Sprite( texture1 );
    var cat2 = new PIXI.Sprite( texture1 );
    var cat3 = new PIXI.Sprite( texture1 );
    var cat4 = new PIXI.Sprite( texture1 );

    cat3.x = 1280 - 64;
    cat3.y = 768 - 64;

    cat2.x = 1280 - 64;
    cat4.y = 768 - 64;

    game.camera.addChild( cat );
    game.camera.addChild( cat2 );
    game.camera.addChild( cat3 );
    game.camera.addChild( cat4 );

    var crabX = 0;
    var crabY = 0;
    while( true ){
      var crab = new PIXI.Sprite( texture2 );
      game.world.addChild( crab );
      crab.x = crabX;
      crab.y = crabY;

      crabX += 256;
      if( crabX >= 2560 ){
        crabX = 0;
        crabY += 256;
        if( crabY >= 2560 ){
          break;
        }
      }
    }
}