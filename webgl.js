const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");


const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1.0);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();

  // Setup your scene
  const scene = new THREE.Scene();

  const box = new THREE.BoxGeometry(1, 1, 1);
  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(
      box,
      new THREE.MeshBasicMaterial({
        color: "red"
      })
    );
    mesh.position.set(
      // random.range() - get a random nr between a min-max
      // 3 coordinates
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    mesh.scale.multiplyScalar(0.1);
    scene.add(mesh);
  }

  // draw each frame 
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 2;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reload
    upload() {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);

/*
// Setup a geometry
const geometry = new THREE.SphereGeometry(1, 32, 16);

// Setup a material
const material = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true
});

// Setup a mesh with geometry + material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// draw each frame
return {
  // Handle resize events here
  resize({ pixelRatio, viewportWidth, viewportHeight }) {
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(viewportWidth, viewportHeight, false);
    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();
  },
  // Update & render your scene here
  render({ time }) {
    controls.update();
    renderer.render(scene, camera);
  },
  // Dispose of events & renderer for cleaner hot-reloading
  unload() {
    controls.dispose();
    renderer.dispose();
  }
};
};

canvasSketch(sketch, settings);
*/