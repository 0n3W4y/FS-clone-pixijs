function SceneManager( parent ){
	this.parent = parent;
	this.scenesArray = undefined;
	this.activeScene = undefined;
	this.sceneIdNumber = 0;

	//nethod
	this.init = function(){
		this.sceneArray = new Array();
		this.activeScene = null;
	}

	this.createScene = function( sceneName ){
		var id = this.createId();
		var scene = new Scene( this, id );
		var sceneGraphics = new this.parent.Container();
		scene.sceneGraphics = sceneGraphics;
		this.sceneArray.push( scene );
		return scene;
	}

	this.addSceneToScreen = function( scene ){
		this.parent.world.addChild( scene.SceneGraphics );
		scene.onScreen = true;
		if( this.activeScene != null || this.activeScene != undefined )
			this.removeSceneFromScreen();

		this.activeScene = scene;
	}

	this.removeSceneFromScreen(){
		var activeScene = this.activeScene;
		this.activeScene = null;
		activeScene.onScreen = false;
	}

	this.createId(){
		var id = this.sceneIdNumber;
		this.sceneIdNumber++;
		return id;
	}
}