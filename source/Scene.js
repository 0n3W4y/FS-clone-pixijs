function Scene( parent, id ){
	this.id = id;
	this.parent = parent;
	this.sceneGraphics = undefined;
	this.onScreen = undefined;

	this.objectIdNumber = undefined;

	this.staticObjectsArray = undefined;
	this.interactiveObjectsArray = undefined;


	//methods
	this.init = function(){
		this.objectIdNumber = 0;
		this.onScreen = false;
		this.staticObjectsArray = new Array();
		this.interactiveObjectsArray = new Array();
	}

	this.addObjectOnScene - function( objectName, params ){
		var obj = this.createObject( objectname );
		var id = this.createId();
		obj.init( this, id, params );
	}

	this.createObject( objectName ){
		var result;
		if( objectName == "Room" )
			result = new Room( this, objectName );
		else
			console.log( "Error in Scene/createObject. no object with name: " + objectName + "." );
	}

	this.createId(){
		var id = this.objectIdNumber;
		this.objectIdNumber++;
		return id;
	}
}