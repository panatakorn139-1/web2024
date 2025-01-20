// ค้นหาปุ่มและโมเดลในฉาก
const soundButton3 = document.getElementById('sound-button-3');
const carSound3 = document.getElementById('car-sound3');

// สถานะเสียง
let isSoundPlaying3 = false;

// Event listener สำหรับปุ่มเสียง
soundButton3.addEventListener('click', () => {
    if (isSoundPlaying3) {
        carSound3.pause();
        carSound3.currentTime = 0; // รีเซ็ตเสียง
        soundButton3.setAttribute('text', 'value: Play Sound');
        soundButton3.setAttribute('material', 'color', '#FF5722');
    } else {
        carSound3.play();
        soundButton3.setAttribute('text', 'value: Stop Sound');
        soundButton3.setAttribute('material', 'color', '#4CAF50');
    }
    isSoundPlaying3 = !isSoundPlaying3;
});

// เพิ่ม Event Listener ให้กับปุ่มแสดงข้อความ
const button_3 = document.getElementById('show-text-button-3');
const helloText3 = document.getElementById('hello-text-3');

// สถานะข้อความ
let isTextVisible3 = false;

const newMessage3 = `
//////////////////////////\n
Nissan Skyline GT-R (R34)\n
Type: Sports Coupe\n
Engine: 2.6L Inline-Six Twin-Turbo\n
Power: 276 hp\n
Torque: 392 Nm\n
Acceleration (0-100 km/h): ~5.2 sec\n
Top Speed: ~250 km/h\n
//////////////////////////
`;

button_3.addEventListener('click', () => {
    if (isTextVisible3) {
        // ซ่อนข้อความ
        helloText3.setAttribute('visible', false);
        button_3.setAttribute('text', 'value: Click Me; color: white');
        button_3.setAttribute('material', 'color', '#4CAF50');
    } else {
        // แสดงข้อความ
        helloText3.setAttribute('value', newMessage2);
        helloText3.setAttribute('visible', true);
        button_3.setAttribute('text', 'value: Hide Text; color: white');
        button_3.setAttribute('material', 'color', '#F44336');
    }
    isTextVisible3 = !isTextVisible3;
});

// ค้นหาปุ่มและ Wrapper ของโมเดลในฉาก
const rotateModelButton3 = document.getElementById('rotate-model-button-3');
const modelWrapper3 = document.getElementById('model-3');

// สถานะการหมุน
let isModelRotating3 = false;
let rotationInterval3;

// Event listener สำหรับปุ่มหมุนโมเดล
rotateModelButton3.addEventListener('click', () => {
    if (isModelRotating3) {
        // หยุดการหมุน
        clearInterval(rotationInterval3);
        rotateModelButton3.setAttribute('text', 'value: Rotate Car; color: white');
        rotateModelButton3.setAttribute('material', 'color', '#3F51B5');
    } else {
        // เริ่มการหมุน
        rotationInterval3 = setInterval(() => {
            if (modelWrapper3.object3D) {
                modelWrapper3.object3D.rotation.y += 0.03; // หมุนแกน Y
            }
        }, 16); // หมุนด้วยความถี่ประมาณ 60 FPS
        rotateModelButton3.setAttribute('text', 'value: Stop Rotation; color: white');
        rotateModelButton3.setAttribute('material', 'color', '#FF5722');
    }
    isModelRotating3 = !isModelRotating3;
});