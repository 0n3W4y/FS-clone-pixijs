function Room( parent, type ){
	this.parent = parent;
	this.type = type;
	this.id = id;
	this.inited = false;
	this.graphics = undefined;

	this.width = undefined;
	this.height = undefined;
	this.positionX = undefined;
	this.positionY = undefined;

	this.imageSource = undefined;
	this.roomType = undefined;

	//methods
	this.init = function(){
		if( !this.inited ){
			this.inited = true;
		}
	}
}