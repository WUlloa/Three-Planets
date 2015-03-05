/* Author:William Ulloa following Bjorn Sandvik's tutorial.
The following code was written for Dr.Chu's Computer Graphics course, as well as a means to learn more about WebGL
*/
(function () { 

	var webglSetup = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglSetup); 
		return;
	}

	var width  = window.innerWidth,  //Set up window
		height = window.innerHeight;
		
 /*---Define Parameters of the Planet object--*/
	var radius   = 0.5,
		segments = 32,// Make 3 to create diamond
		rotation = 6;   		
	
/*---Define Scene--*/	
	var scene = new THREE.Scene();
	
/*---Define Camera and Perspective--*/	    
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	//camera.position.x = 1.5; //Change the view on X-axis
	//camera.position.y = .05; //Change the view on Y-axis
	camera.position.z = 3.5;
	
	

/*---Define Render--*/
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

/*---Define Ambient Light--*/
    scene.add(new THREE.AmbientLight(0x333333));//This will illuminate the planet.

/*---Define Directional Light--*/
    var light = new THREE.DirectionalLight(0xFFFFFF, 1);//This will provide directional lighting to represent a Sun 0x00BFFF. 
	light.position.set(15,3,14); //This will position the light.
	scene.add(light);

/*---Add Sphere, our planet, to the created scene --*/
	var sphere = createSphere(radius, segments); //createSphere object that will house parameters.
	var sphere2 = createSphere2(radius, segments); //Create a second Sphere
	var sphere3 = createSphere3(radius, segments); //Create a third Sphere
	sphere.rotation.y = rotation; //Give the sphere free rotation.
	sphere2.rotation.y = rotation; //Give the second sphere rotation.
	sphere3.rotation.y = rotation; //Give the third sphere rotation.
    sphere2.position.y += 0.5; //Move second sphere away from first on the y-axis.
	sphere2.position.x += 1.5; //Move second sphere away from first on the x-axis.
	sphere3.position.y -= 0.5; //Move second sphere away from first on the y-axis.
	sphere3.position.x -= 1.5; //Move second sphere away from first on the x-axis.
	scene.add(sphere, sphere2, sphere3)

/*---Add clouds to our planet/scene --*/    
	var clouds = createClouds(radius, segments); //createClouds object that will house parameters.
	var clouds2 = createClouds2(radius, segments); //createClouds object for second Sphere.
	var clouds3 = createClouds3(radius, segments); //createClouds object for third Sphere.
	clouds.rotation.y = rotation; //Give clouds free rotation that == sphere rotation.
	clouds2.rotation.y = rotation; //Give clouds free rotation that == sphere rotation.
	clouds3.rotation.y = rotation; //Give clouds free rotation that == sphere rotation.
	clouds2.position.y += 0.5;
	clouds2.position.x += 1.5;
	clouds3.position.y -= 0.5; //Move second sphere away from first on the y-axis.
	clouds3.position.x -= 1.5; //Move second sphere away from first on the x-axis.
	scene.add(clouds, clouds2, clouds3)

/*---Add stars to scene --*/ 	
	var stars = createStars(65, 64); //createStars object that will house parameters.
	scene.add(stars);
    webglSetup.appendChild(renderer.domElement);
    render();


/*---Render scene and camera --*/ 	
	function render() {
		sphere3.rotation.y += 0.005; //Control rotation speed.
		sphere2.rotation.y += 0.0008;//Control Sphere2 rotation.
		sphere.rotation.y += 0.005; //Control rotation speed.
		clouds3.rotation.y += 0.015;
		clouds2.rotation.y += 0.0015;
		clouds.rotation.y += 0.009;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		
	}

//------------------------------Mars Planet Functions------------------------//
	/*---createSphere Object Defined --*/ 
function createSphere(radius, segments) {
		return new THREE.Mesh( 
			new THREE.SphereGeometry(radius + 0.1, segments, segments), //Defines Sphere.
			new THREE.MeshPhongMaterial({ //Gives Sphere a smooth surface.
				map:         THREE.ImageUtils.loadTexture('images/marsmap1kRed.jpg'),//Pins image onto sphere.
				bumpmap:     THREE.ImageUtils.loadTexture('images/marsbump1k.jpg'), //Pins bump image onto sphere.
				bumpScale:   0.1,//Gives the sphere bumps to simulate mountains.
											
			})
		);
	}

	function createClouds(radius, segments) {//Currently not being used.
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.03, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);		
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}
//------------------------------Alejandro's Planet Functions------------------------//

function createSphere2(radius, segments) {
		return new THREE.Mesh( 
			new THREE.SphereGeometry(radius, segments, segments), //Defines Sphere.
			new THREE.MeshPhongMaterial({ //Gives Sphere a smooth surface.
				map:         THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),//Pins image onto sphere.
				bumpmap:     THREE.ImageUtils.loadTexture('images/earthbump1k.jpg'), //Pins bump image onto sphere.
				bumpScale:   0.09,//Gives the sphere bumps to simulate mountains.							
			})
		);
	}

	function createClouds2(radius, segments) { 
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);		
	}

//------------------------------Blue Cloud Planet Functions------------------------//
	
	function createSphere3(radius, segments) {
		return new THREE.Mesh( 
			new THREE.SphereGeometry(radius - 0.09, segments, segments), //Defines Sphere.
			new THREE.MeshPhongMaterial({ //Gives Sphere a smooth surface.
				map:         THREE.ImageUtils.loadTexture('images/plutomap1kblue.jpg'),//Pins image onto sphere.
				bumpmap:     THREE.ImageUtils.loadTexture('images/plutobump1k.jpg'), //Pins bump image onto sphere.
				bumpScale:   0.9,//Gives the sphere bumps to simulate mountains.
											
			})
		);
	}

	function createClouds3(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius - 0.06, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);		
	}
}());
