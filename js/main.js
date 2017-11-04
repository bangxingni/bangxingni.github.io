/**
 * Created by nxb 魔改
 */

 var audio = document.querySelector('#miku-music');
 var battery = document.querySelector('#battery');
 var play = true;
 var mute = false;
 var music = false;
 var dance = false;
 var container;

 var mesh, camera, scene, renderer;

 var directionalLight;



 var windowWidth  = window.innerWidth;
 var windowHeight = window.innerHeight;

 var windowHalfY = window.innerHeight / 2;

 var clock = new THREE.Clock();
 init();
 animate();
 function init() {

    container = document.createElement( 'div' );
    battery.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 35;

    // scene

    scene = new THREE.Scene();

    camera.lookAt(scene.position);


    var ambient = new THREE.AmbientLight( 0x444444 );
    scene.add( ambient );

    directionalLight = new THREE.DirectionalLight( 0xFFEEDD );
    directionalLight.position.set( -1, 1, 1 ).normalize();
    scene.add( directionalLight );

    //加载mmd模型
    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };
    helper = new THREE.MMDHelper();
    var loader = new THREE.MMDLoader();
    loader.load( 'blackmiku/blackmiku.pmx', ['jljt.vmd'], function ( object ) {audio.play();
        audio.loop = true;
        mesh = object;
        mesh.position.y = -10;
        scene.add( mesh );
        for ( var i = 0, il = mesh.material.length; i < il; i ++ ) {
            var material = mesh.material[ i ];
            material.emissive.multiplyScalar( 0.2 );
        }
        helper.add( mesh );
        helper.setAnimation( mesh );
    }, onProgress, onError );

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );//防变形
    renderer.setSize( windowWidth, windowHeight );
    container.appendChild( renderer.domElement );
}
function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    render(delta);
}

function render(delta) {

    if( mesh && play ) {                
        /*
         * 将getDelta的调用放在if判定的外部很重要哦
         * */
        //var delta = clock.getDelta();
        helper.animate( delta ); 
    }
    camera.updateProjectionMatrix();
    renderer.render( scene, camera );
}


