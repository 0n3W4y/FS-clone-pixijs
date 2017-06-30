var game;
var gameWidth = 1280;
var gameHeight = 768;
var scriptPathArray = [ "source/Game.js", "source/Room.js", "source/Scene.js", "source/SceneManager.js", "source/ObjectManager.js" ];
importScripts();

function prepareApplication(){
	//importScripts();
	prepareCanvas();
	gameInit( gameWidth, gameHeight );
}

function prepareCanvas(){
    //console.log("body loaded");

    var width = window.innerWidth - gameWidth;
    var height = window.innerHeight - gameHeight;

    if( width <= 0 )
      width = 0;
    if( height <= 0 )
      height = 0;

    document.body.style.paddingLeft = width/2 + "px";
    document.body.style.paddingTop = height/2 + "px";
}

function importScripts(){
    for( var i = 0; i < scriptPathArray.length; i++ ){
		var imported = document.createElement('script');
		imported.src = scriptPathArray[i];
		document.head.appendChild( imported );
	}
}


function gameInit( gameWidth, gameHeight ){
	game = new Game( {w:gameWidth, h:gameHeight} );
    game.init();
    game.start();
        
    var texture1 = new PIXI.Texture.fromImage('images/cat.png');

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

    var scene = game.sceneManager.createScene( "some scene" );
    scene.init();
    var array = [ { name: 'backgroundTexture', url: 'images/background-sand-rocks.png' }, {  name: 'foregroundTexture', url: 'images/foreground-sand.png' } ];
    game.sceneManager.loadImages( scene, array );
    game.sceneManager.addSceneToScreen( scene );
    //var room = game.objectManager.createObject( "Room" );


}