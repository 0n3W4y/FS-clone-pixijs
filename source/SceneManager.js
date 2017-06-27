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
		var sceneGraphics = new this.parent.Container();
		scene.sceneGraphics = sceneGraphics;
		this.scenesArray.push( scene );
		return scene;
	}

	this.addSceneToScreen = function( scene ){
		this.parent.world.addChild( scene.sceneGraphics );
		scene.onScreen = true;
		if( this.activeScene != null || this.activeScene != undefined )
			this.removeSceneFromScreen();

		this.activeScene = scene;
		this.parent.world.addChild( scene.sceneGraphics );
		scene.sceneGraphics.interactive = true;
		scene.sceneGraphics.on('mousedown', this.parent.onDragStart)
        .on('mouseup', this.parent.onDragEnd)
        .on('mouseupoutside', this.parent.onDragEnd)
        .on('mousemove', this.parent.onDragMove);
        this.parent.cetredCamera();
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
}