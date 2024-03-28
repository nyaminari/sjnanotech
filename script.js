import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
    antialias: true
});

renderer.outputEncoding = THREE.sRGBEncoding;

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

//배경
scene.background = new THREE.Color('black');

//조명
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-10, -5, -5);
scene.add(light2);

//3D모델
const loader = new GLTFLoader();
let model;

loader.load('assamble.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);

    //마우스 컨트롤
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // 반응형 처리
    function animate() {
        requestAnimationFrame(animate);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        controls.update();
    }
    animate();
});

//돌아가는 효과
let isRotating = true; // 애니메이션 동작 여부를 제어할 변수

function rotateModel() {
    if (isRotating && model) {
        model.rotation.y -= 0.003;
        renderer.render(scene, camera);
    }
    requestAnimationFrame(rotateModel);
}

rotateModel(); // 초기에 애니메이션 시작

// 버튼 클릭 이벤트 핸들러
const rotateButton = document.getElementById('rotateButton');
rotateButton.addEventListener('click', function() {
    isRotating = !isRotating; // 애니메이션 동작 여부를 토글
});