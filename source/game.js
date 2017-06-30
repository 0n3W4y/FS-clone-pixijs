function Game( resolution ){
	//variables;
	this.width = resolution.w;
	this.height = resolution.h;
	
	this.renderer = undefined;
	this.stage = undefined;
	this.camera = undefined;
	this.world = undefined;

	this.paused = false;
	this.inited = false;

	this.sceneManager = undefined;
	this.objectManager = undefined;

	//PIXI
	this.Container = undefined;
	this.loader = undefined;
	this.resources = undefined;
	this.Sprite = undefined;
	this.Text = undefined;

	//methods;
	this.init = function() {
		if( !this.inited ){
			this.Container = PIXI.Container;
	    	this.loader = PIXI.loader;
	    	this.resources = PIXI.loader.resources;
	    	this.Sprite = PIXI.Sprite;
	    	this.Text = PIXI.Text;
	    	this.initRenderer();
	    	this.initStage();
	    	this.createWorld();
	    	this.createCamera();
	    	this.sceneManager = new SceneManager( this );
	    	this.objectManager = new ObjectManager( this );
	    	this.sceneManager.init();
	    	this.inited = true;
	    }
	}

	this.start = function() {
		this.gameLoop();
		console.log( "Game started!" );
	}

	this.stop = function() {
		cancelAnimationFrame( this.gameLoop );
		console.log( "Game stopped!" );
	}

	this.pause = function() {
		if( this.paused )
			this.paused = false;
		else
			this.paused = true;
	}

	this.gameLoop = function( time ) {
		if( !this.paused ){
			requestAnimationFrame( this.gameLoop.bind( this ) );
			this.renderer.render( this.stage );
		}
	}

	this.initRenderer = function() {
		this.renderer = PIXI.autoDetectRenderer( this.width, this.height, {antialias: false, transparent: false, resolution: 1} );
    	this.renderer.backgroundColor = 0x061639;
   	 	this.renderer.view.style.position = "absolute";
    	this.renderer.view.style.display = "block";
    	document.body.appendChild( this.renderer.view );
	}

	this.initStage = function() {
		this.stage = new this.Container();
	}

	this.resize = function( width, height ){
		this.renderer.autoResize = true;
    	this.renderer.resize( width, height );
	}

	this.createCamera = function() {
		this.camera = new PIXI.DisplayObjectContainer();
		this.camera.on( 'mousedown', this.clickFunction );
		this.camera.width = this.width;
		this.camera.height = this.height;
		this.stage.addChild( this.camera );		
	}

	this.createWorld = function(){
		this.world = new PIXI.DisplayObjectContainer();
		this.stage.addChild( this.world );
	}

	this.centredCamera = function(){
		var width = this.sceneManager.activeScene.sceneGraphics.width;
		var height = this.sceneManager.activeScene.sceneGraphics.height;
		this.sceneManager.activeScene.sceneGraphics.x = this.width/2 - width/2;
		this.sceneManager.activeScene.sceneGraphics.y = this.height/2 - height/2;
		
	}

	this.onDragStart = function( event ) {
	    if (!this.dragging) {
	        this.data = event.data;
	        //this.oldGroup = this.displayGroup;
	        //this.displayGroup = dragLayer;
	        this.dragging = true;

	        this.dragPoint = event.data.getLocalPosition(this.parent);
	        this.dragPoint.x -= this.x;
	        this.dragPoint.y -= this.y;
	    }
	}

	this.onDragEnd = function() {
	    if (this.dragging) {
	        this.dragging = false;
	        //this.displayGroup = this.oldGroup;
	        // set the interaction data to null
	        this.data = null;
	    }
	}

	this.onDragMove = function() {
	    if (this.dragging) {
	        var newPosition = this.data.getLocalPosition( this.parent );
	        this.x = newPosition.x - this.dragPoint.x;
	        this.y = newPosition.y - this.dragPoint.y;
	        if( this.x >= 0 )
	        	this.x = 0;
	        if( this.y >= 0 )
	        	this.y = 0;
	        if( this.x <= -this.width/2 )
	        	this.x = -this.width/2;
	        if( this.y <= -this.height/2 )
	        	this.y = -this.height/2;

	        console.log( this.x + '; ' + this.y );
	    }
	}

	this.clickFunction = function(){
		console.log( "click!" );
	}
}

/*
    //Use Pixi's built-in `loader` object to load an image

    loader
      .add( "catImage", "images/cat.png" )
      .on( "progress", loadProgressHandler )
      .load( setup );

    //This "loadProgressHandler" function will run when images loading, before "setup";
    function loadProgressHandler( loader, resource ) {
      console.log( "loading: " + resource.url ); 
      console.log( "progress: " + loader.progress + "%" );  
    }

    //This `setup` function will run when the image has loaded
    function setup() {

      //Create the `cat` sprite from the texture
      var cat = new Sprite( PIXI.loader.resources.catImage.texture );
      cat.x = 100;
      cat.y = 100;
      //cat.position.set( 100, 100 );
      cat.width = 80;
      cat.height = 120;
      //cat.scale.set( 0.5, 0.5 );
      //cat.anchor.x = 0.5;
      //cat.anchor.y = 0.5;
      cat.rotation = 0;
      //cat.pivot.set(32, 32)
      stage.addChild(cat);
      //Tell the `renderer` to `render` the `stage`
      renderer.render( stage );
      console.log( "All files loaded" );
      loader.reset();
    }

    loader
      .add( "images/mem.png" )
      .load( setupAtlas );

    function setupAtlas(){
      //Create the `tileset` sprite from the texture
      //var texture = PIXI.utils.TextureCache["images/mem.png"];
      var mySpriteSheetImage = PIXI.BaseTexture.fromImage( "images/mem.png" );

      //Create a rectangle object that defines the position and
      //size of the sub-image you want to extract from the texture
      //var rectangle = new PIXI.Rectangle( 0, 0, 64, 64 );
      var spriteTexture1 = new PIXI.Texture( mySpriteSheetImage, new PIXI.Rectangle( 0, 0, 64, 64 ) );
      var spriteTexture2 = new PIXI.Texture( mySpriteSheetImage, new PIXI.Rectangle( 0, 64, 64, 64 ) );
      
      //Tell the texture to use that rectangular section
      //texture.frame = rectangle;

      //Create the sprite from the texture
      var rocketSprite = new Sprite( spriteTexture1 );
      var rocketSprite2 = new Sprite( spriteTexture2 );

      rocket = new Container();
      rocket2 = new Container();

      rocket.addChild( rocketSprite );
      rocket2.addChild( rocketSprite2 );

      var rocketName = new PIXI.Text(
        "Hello Pixi!",
        {fontFamily: "Arial", fontSize: 14, fill: "white"}
      );

      //Create the health bar
        healthBar = new PIXI.DisplayObjectContainer();
        rocket.addChild(healthBar);
        healthBar.y = -32;

        //Create the black background rectangle
        var innerBar = new PIXI.Graphics();
        innerBar.beginFill(0x000000);
        innerBar.drawRect(0, 0, 64, 8);
        innerBar.endFill();
        healthBar.addChild(innerBar);

        //Create the front red rectangle
        var outerBar = new PIXI.Graphics();
        outerBar.beginFill(0xFF3300);
        outerBar.drawRect(0, 0, 64, 8);
        outerBar.endFill();
        healthBar.addChild(outerBar);

        healthBar.outer = outerBar;
      
      rocket.addChild( rocketName );
      rocketName.y = -18;
      rocketName.x = 0;
      //Add the rocket to the stage
      stage.addChild( rocket );
      stage.addChild( rocket2 );
      
      //Render the stage   
      renderer.render(stage);
    }

 

function play(){
  if( rocket != undefined && rocket2 != undefined ){
    rocket.x += 1;
    rocket.y += 1;
    rocket2.x += 1.2;
    rocket2.y += 0.2;
    if( healthBar.outer.width > 0 )
      healthBar.outer.width -= 0.1;
  }
}

//Start the game loop
gameLoop();
  
*/