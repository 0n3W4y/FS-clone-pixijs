function SceneManager( parent ){
	this.parent = parent;
	this.scenesArray = undefined;
	this.activeScene = undefined;
	this.sceneIdNumber = 0;

	//nethod
	this.init = function(){
		this.scenesArray = new Array();
		this.activeScene = null;
	}

	this.createScene = function( sceneName ){
		var id = this.createId();
		var scene = new Scene( this, id );
		var sceneGraphics = new PIXI.DisplayObjectContainer();
		scene.sceneGraphics = sceneGraphics;
		this.scenesArray.push( scene );
		return scene;
	}

	this.addSceneToScreen = function( scene ){
		scene.onScreen = true;
		if( this.activeScene != null || this.activeScene != undefined )
			this.removeSceneFromScreen();

		this.activeScene = scene;
		this.parent.world.addChild( scene.sceneGraphics );

		//make scene scrollable by mouse( up, down, left, right );
		scene.sceneGraphics.interactive = true;
		scene.sceneGraphics.on('mousedown', this.parent.onDragStart)
        .on('mouseup', this.parent.onDragEnd)
        .on('mouseupoutside', this.parent.onDragEnd)
        .on('mousemove', this.parent.onDragMove);
        this.parent.centredCamera();
        
	}

	this.removeSceneFromScreen = function(){
		var activeScene = this.activeScene;
		this.activeScene = null;
		activeScene.onScreen = false;
	}

	this.createId = function(){
		var id = this.sceneIdNumber;
		this.sceneIdNumber++;
		return id;
	}

	this.loadImages = function( scene, imagesArray ){
		PIXI.loader.reset();
		PIXI.loader.add( imagesArray ).load(setup);
		var self = this;

		function setup() {
			// параметры сцены будут задвать 2 спрайта, передний план и задний план
			scene.backGroundGraphics = new PIXI.Sprite(PIXI.loader.resources.backgroundTexture.texture);
			scene.foregroundGraphics = new PIXI.Sprite(PIXI.loader.resources.foregroundTexture.texture);
			scene.foregroundGraphics.y = 1000;

			scene.sceneGraphics.addChild( scene.backGroundGraphics );
			scene.sceneGraphics.addChild( scene.foregroundGraphics );
			self.parent.centredCamera();
  			console.log( "images loaded!" );
		}
	}

}