// ค้นหาปุ่มและโมเดลในฉาก
const soundButton4 = document.getElementById('sound-button-4');
const carSound4 = document.getElementById('car-sound4');

// สถานะเสียง
let isSoundPlaying4 = false;

// Event listener สำหรับปุ่มเสียง
soundButton4.addEventListener('click', () => {
    if (isSoundPlaying4) {
        carSound4.pause();
        carSound4.currentTime = 0; // รีเซ็ตเสียง
        soundButton4.setAttribute('text', 'value: Play Sound');
        soundButton4.setAttribute('material', 'color', '#FF5722');
    } else {
        carSound4.play();
        soundButton4.setAttribute('text', 'value: Stop Sound');
        soundButton4.setAttribute('material', 'color', '#4CAF50');
    }
    isSoundPlaying4 = !isSoundPlaying4;
});

// เพิ่ม Event Listener ให้กับปุ่มแสดงข้อความ
const button_4 = document.getElementById('show-text-button-4');
const helloText4 = document.getElementById('hello-text-4');

// สถานะข้อความ
let isTextVisible4 = false;

const newMessage4 = `
//////////////////////////\n
Nissan GT-R (R35)\n
Type: Supercar\n
Engine: 3.8L V6 Twin-Turbo\n
Power: 565 hp (600 hp for Nismo)\n
Torque: 633 Nm\n
Acceleration (0-100 km/h): ~2.7 sec\n
Top Speed: 315 km/h\n
//////////////////////////
`;

button_4.addEventListener('click', () => {
    if (isTextVisible4) {
        // ซ่อนข้อความ
        helloText4.setAttribute('visible', false);
        button_4.setAttribute('text', 'value: Click Me; color: white');
        button_4.setAttribute('material', 'color', '#4CAF50');
    } else {
        // แสดงข้อความ
        helloText4.setAttribute('value', newMessage2);
        helloText4.setAttribute('visible', true);
        button_4.setAttribute('text', 'value: Hide Text; color: white');
        button_4.setAttribute('material', 'color', '#F44336');
    }
    isTextVisible4 = !isTextVisible4;
});

// ค้นหาปุ่มและ Wrapper ของโมเดลในฉาก
const rotateModelButton4 = document.getElementById('rotate-model-button-4');
const modelWrapper4 = document.getElementById('model-4');

// สถานะการหมุน
let isModelRotating4 = false;
let rotationInterval4;

// Event listener สำหรับปุ่มหมุนโมเดล
rotateModelButton4.addEventListener('click', () => {
    if (isModelRotating4) {
        // หยุดการหมุน
        clearInterval(rotationInterval4);
        rotateModelButton4.setAttribute('text', 'value: Rotate Car; color: white');
        rotateModelButton4.setAttribute('material', 'color', '#3F51B5');
    } else {
        // เริ่มการหมุน
        rotationInterval4 = setInterval(() => {
            if (modelWrapper4.object3D) {
                modelWrapper4.object3D.rotation.y += 0.03; // หมุนแกน Y
            }
        }, 16); // หมุนด้วยความถี่ประมาณ 60 FPS
        rotateModelButton4.setAttribute('text', 'value: Stop Rotation; color: white');
        rotateModelButton4.setAttribute('material', 'color', '#FF5722');
    }
    isModelRotating4 = !isModelRotating4;
});