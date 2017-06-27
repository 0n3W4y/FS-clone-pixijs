function ObjectManager( parent ){
	this.parent = parent;
	this.objectIdNumber = undefined;
	this.objectContainer = undefined;

	this.init = function(){
		this.objectContainer = new Array();
		this.objectIdNumber = 0;
	}

	this.addObjectOnScene = function( scene, newObject ){
		scene.addObject( newObject );
		this.removeObjectFromContainer( newObject );
	}

	this.createObject = function( objectName, params ){
		var result;
		var id = this.createId();
		if( objectName == "Room" )
			result = new Room( this, id, objectName, 0 );
		else
			console.log( "Error in Scene/createObject. no object with name: " + objectName + "." );
		result.init( params );
		this.objectContainer.push( result );
		return result;
	}

	this.removeObjectFromContainer = function( object ){
		var id = object.id;
		for( var i = 0; i < this.objectContainer.length; i++ ){
			var arrayObjectId = this.objectContainer[i].id;
			if( id == arrayObjectId ){
				this.objectContainer.splice( i, 1 );
				break;
			}
		}
	}

	this.createId = function(){
		var id = this.objectIdNumber;
		this.objectIdNumber++;
		return id;
	}
