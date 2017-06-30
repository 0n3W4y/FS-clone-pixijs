function Scene( parent, id ){
	this.id = id;
	this.parent = parent;
	this.sceneGraphics = undefined;
	this.onScreen = undefined;

	this.staticObjectsArray = undefined;
	this.interactiveObjectsArray = undefined;

	this.staticObjectsGraphic = undefined;
	this.interactiveObjectsGraphic = undefined;


	//methods
	this.init = function(){
		this.onScreen = false;
		this.staticObjectsArray = new Array();
		this.interactiveObjectsArray = new Array();
	}

	this.addObject = function( object ){
		var container = this.staticObjectsArray;
		if( object.interactiveObject == 1)
			container = this.interactiveObjectsArray;

		var objectSprite = object.graphics;
		container.push( object );
		this

	}
}