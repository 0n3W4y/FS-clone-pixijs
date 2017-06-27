function Room( parent, id, type, interactive ){
	this.parent = parent;
	this.type = type;
	this.id = id;
	this.inited = false;
	this.graphics = undefined;
	this.interactiveObject = interactive; // 0, 1;

	this.width = undefined;
	this.height = undefined;
	this.positionX = undefined;
	this.positionY = undefined;

	this.imageSource = undefined;
	this.roomType = undefined;

	//methods
	this.init = function( params ){
		if( !this.inited ){
			this.inited = true;
		}
	}
}