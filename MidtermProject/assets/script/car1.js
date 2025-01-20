// ค้นหาปุ่มและโมเดลในฉาก
const soundButton = document.getElementById('sound-button');
const carSound = document.getElementById('car-sound');

// สถานะเสียง
let isSoundPlaying = false;

// Event listener สำหรับปุ่มเสียง
soundButton.addEventListener('click', () => {
    if (isSoundPlaying) {
        carSound.pause();
        carSound.currentTime = 0; // รีเซ็ตเสียง
        soundButton.setAttribute('text', 'value: Play Sound');
        soundButton.setAttribute('material', 'color', '#FF5722');
    } else {
        carSound.play();
        soundButton.setAttribute('text', 'value: Stop Sound');
        soundButton.setAttribute('material', 'color', '#4CAF50');
    }
    isSoundPlaying = !isSoundPlaying;
});

// เพิ่ม Event Listener ให้กับปุ่มแสดงข้อความ
const button = document.getElementById('show-text-button');
const helloText = document.getElementById('hello-text');

// สถานะข้อความ
let isTextVisible = false;

const newMessage = `
//////////////////////////\n
Bugatti Chiron\n
Type: Hypercar\n
Engine: 8.0L W16 Quad-Turbo\n
Power: 1,479 hp\n
Torque: 1,600 Nm\n
Acceleration (0-100 km/h): 2.4 sec\n
Top Speed: 420 km/h\n
Production: 500 unit\n
//////////////////////////
`;

button.addEventListener('click', () => {
    if (isTextVisible) {
        // ซ่อนข้อความ
        helloText.setAttribute('visible', false);
        button.setAttribute('text', 'value: Click Me; color: white');
        button.setAttribute('material', 'color', '#4CAF50');
    } else {
        // แสดงข้อความ
        helloText.setAttribute('value', newMessage);
        helloText.setAttribute('visible', true);
        button.setAttribute('text', 'value: Hide Text; color: white');
        button.setAttribute('material', 'color', '#F44336');
    }
    isTextVisible = !isTextVisible;
});

// ค้นหาปุ่มและ Wrapper ของโมเดลในฉาก
const rotateModelButton = document.getElementById('rotate-model-button');
const modelWrapper = document.getElementById('model-1-wrapper');

// สถานะการหมุน
let isModelRotating = false;
let rotationInterval;

// Event listener สำหรับปุ่มหมุนโมเดล
rotateModelButton.addEventListener('click', () => {
    if (isModelRotating) {
        // หยุดการหมุน
        clearInterval(rotationInterval);
        rotateModelButton.setAttribute('text', 'value: Rotate Car; color: white');
        rotateModelButton.setAttribute('material', 'color', '#3F51B5');
    } else {
        // เริ่มการหมุน
        rotationInterval = setInterval(() => {
            if (modelWrapper.object3D) {
                modelWrapper.object3D.rotation.y += 0.03; // หมุนแกน Y
            }
        }, 16); // หมุนด้วยความถี่ประมาณ 60 FPS
        rotateModelButton.setAttribute('text', 'value: Stop Rotation; color: white');
        rotateModelButton.setAttribute('material', 'color', '#FF5722');
    }
    isModelRotating = !isModelRotating;
});