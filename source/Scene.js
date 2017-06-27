function Scene( parent, id ){
	this.id = id;
	this.parent = parent;
	this.sceneGraphics = undefined;
	this.onScreen = undefined;

	this.backgroundSrc = undefined;	
	this.foregroundSrc = undefined;	

	this.staticObjectsArray = undefined;
	this.interactiveObjectsArray = undefined;

	this.staticObjectsGraphic = undefined;
	this.interactiveObjectsGraphic = undefined;
	this.backGroundGraphics = undefined;
	this.foregroundGraphics = undefined;


	//methods
	this.init = function( backgroundSrc, foregroundSrc ){
		this.onScreen = false;
		this.staticObjectsArray = new Array();
		this.interactiveObjectsArray = new Array();
		this.backgroundSrc = backgroundSrc;
		this.foregroundSrc = foregroundSrc;
		this.createLayerGraphics();
	}

	this.addObject = function( object ){
		var container = this.staticObjectsArray;
		if( object.interactiveObject == 1)
			container = this.interactiveObjectsArray;
	}

	this.createLayerGraphics = function(){
		var backgroundTexture = new PIXI.Texture.fromImage( this.backgroundSrc ); 
    	this.backGroundGraphics = new PIXI.Sprite( backgroundTexture );
    	this.sceneGraphics.addChild( this.backGroundGraphics );

    	var foregroundTexture = new PIXI.Texture.fromImage( this.foregroundSrc );
    	this.foregroundGraphics = new PIXI.Sprite( foregroundTexture );
    	this.foregroundGraphics.y = 1000;
    	this.sceneGraphics.addChild( this.foregroundGraphics );
	}
}