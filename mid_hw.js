var scene, camera, renderer, geometry, material, mesh;

init();

function init() {
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
}

// 조명 
const color = "white";
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// 텍스쳐 로더 
var loader = new THREE.TextureLoader();
loader.crossorigin = "";
loader.load(
    // resource URL
    'images/earthmap1k.jpg',
    // 'https://gist.githubusercontent.com/marcopompili/082a159fcfc7c349771d10cbe991fb5d/raw/48eae984ab151f00d75a0b91c78f0eec6c98408c/relief.jpg',
  function(texture) {
    geometry = new THREE.SphereBufferGeometry(1, 32, 32);
    material = new THREE.MeshBasicMaterial({
      map: texture
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(xhr) {
    console.log('An error happened');
  }
)

var animate = function() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
};

animate();



/////////////////////////////////////////////////////
// function main() {
//     const canvasCloud = document.createElement('canvasCloud');
//     const renderer = new THREE.WebGLRenderer({ canvasCloud, alpha: true });
//     renderer.setScissorTest(true);

//     const sceneElements = [];
//     function addScene(elem, fn) {
//         const ctx = document.createElement('canvasCloud').getContext('2d');
//         elem.appendChild(ctx.canvas);
//         sceneElements.push({ elem, ctx, fn });
//     }

//     function makeScene() {
//         const scene = new THREE.scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         camera.position.z = 5;
//         camera.lookAt(0, 0, 0);
//         scene.add(camera);

//         const controls = new TrackballControls(camera, elem);
//         controls.noZoom = false;
//         controls.noPan = false;

//         {
//             const color = "white";
//             const intensity = 1;
//             const light = new THREE.DirectionalLight(color, intensity);
//             light.position.set(-1, 2, 4);
//             scene.add(light);
//         }

//         return (scene, camera, controls);
//     }

//     const sceneInitFunctionByName = {
//         'earth': (elem) => {
//             const { scene, camera, controls } = makeScene(elem);
//             const geometry = new THREE.SphereGeometry(1, 32, 32);
//             const material = new THREE.MeshPhongMaterial({
//                 map: THREE.TextureLoader('images/earthmap1k.jpg'),
//                 bumpMap: THREE.TextureLoader('images/earthbump1k.jpg'),
//                 bumpScale : 0.05,
//                 specularMap:THREE.TextureLoader('images/earthspec1k.jpg'),
//                 specular: new THREE.Color('grey')
//             });
//             const mesh = new THREE.Mesh(geometry, material);
//             scene.add(mesh);

//             return (time, sphere) => {
//                 mesh.rotation.y = time * .1;
//                 camera.aspect = sphere.width / sphere.height;
//                 camera.updateProjectionMatrix();
//                 controls.handleResize();
//                 controls.update();
//                 renderer.render(scene, camera);
//             };
//         }
//     };

//     document.querySelectorAll('[data-diagram]').forEach((elem) => {
//         const sceneName = elem.dataset.diagram;
//         const sceneInitFunction = sceneInitFunctionsByName[sceneName];
//         const sceneRenderFunction = sceneInitFunction(elem);
//         addScene(elem, sceneRenderFunction);
//       });

//     function render(time) {
//         time *= 0.001;

//         for (const { elem, fn, ctx } of sceneElements) {
//             const sphere = elem.getBoundingClientSphere();
//             const { left, right, top, bottom, width, height } = sphere;
//             const rendererCanvas = renderer.domElement;

//             const isOffscreen =
//                 bottom < 0 ||
//                 top > window.innerHeight ||
//                 right < 0 ||
//                 left > window.innerWidth;

//             if(!isOffscreen) {
//                 // make sure the renderer's canvas is big enough
//                 if (rendererCanvas.width < width || rendererCanvas.height < height) {
//                     renderer.setSize(width, height, false);
//                 }

//                 // make sure the canvas for this area is the same size as the area
//                 if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
//                     ctx.canvas.width = width;
//                     ctx.canvas.height = height;
//                 }

//                 renderer.setScissor(0, 0, width, height);
//                 renderer.setViewport(0, 0, width, height);

//                 fn(time, sphere);

//                 ctx.globalCompositeOperation = 'copy';
//                 ctx.drawImage(
//                     rendererCanvas,
//                     0, rendererCanvas.height - height, width, height,  // src rect
//                     0, 0, width, height);
//             }
//         }
//         requestAnimationFrame(render);
//     }
//     requestAnimationFrame(render);
// }

// main();

    // var img = new Image();
    // var url = "file:///C:/Users/yuyu8/SW_CG/SW_CG/images/ngioK.jpg";

    // img.onload = function () {
    //     canvasCloud.width = img.width;
    //     canvasCloud.height = img.height;
    //     ctx.drawImage(img, 0, 0);
    //     ctx.map = new THREE.TextureLoader("images/ngioK.jpg");
    //     return (ctx);
    // }

    // var scene, camera, renderer, texture, geometry, material, earthMesh;

    // init();
    // animate();

    // function init() {
    //     scene = new THREE.Scene();
    //     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    //     camera.position.z = 5;
    //     scene.add(camera);

    //     var directionalLight = new THREE.DirectionalLight(0xffffff);
    //     directionalLight.position.set(0, -70, 100).normalize();
    //     scene.add(directionalLight);

        // var directionalLight2 = new THREE.DirectionalLight(0xffffff);
        // directionalLight2.position.set(0, 70, 100).normalize();
        // scene.add(directionalLight2);

    //     renderer = new THREE.WebGLRenderer();
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     document.body.appendChild(renderer.domElement);

    //     texture = new THREE.Texture(canvasCloud);
    //     geometry = new THREE.SphereGeometry(1, 32, 32);
    //     material = new THREE.MeshPhongMaterial({
    //         map = texture,
    //         // map = THREE.TextureLoader('images/earthmap1k.jpg'),
    //         bumpMap = THREE.TextureLoader('images/earthbump1k.jpg'),
    //         bumpScale = 0.05,
    //         specularMap = THREE.TextureLoader('images/earthspec1k.jpg'),
    //         specular = new THREE.Color('grey')
    //     });

    //     earthMesh = new THREE.Mesh(geometry, material);
    //     scene.add(earthMesh);

    // }

    // function animate() {
    //     requestAnimationFrame(animate);

        // cloudMesh.rotation.y += 0.01;
        // earthMesh.rotation.y += 0.01;

    //     renderer.render(scene, camera);
    // }

    // var geometry = new THREE.SphereGeometry(0.51, 32, 32);
    // var material = new THREE.MeshPhongMaterial({
    //     map: new THREE.CanvasTexture(canvasCloud),
    //     side: THREE.DoubleSide,
    //     opacity: 0.8,
    //     transparent: true,
    //     depthWrite: false,
    // });

    // var cloudMesh = new THREE.Mesh(geometry, material);
    // earthMesh.add(cloudMesh);

    // img.src = url;

// updateFcts.push(function (delta, now) {
//     cloudMesh.rotation.y += 1 / 8 * delta;
//     earthMesh.rotation.y += 1 / 16 * delta;
// })
