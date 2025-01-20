// ค้นหาปุ่มและโมเดลในฉาก
const soundButton2 = document.getElementById('sound-button-2');
const carSound2 = document.getElementById('car-sound2');

// สถานะเสียง
let isSoundPlaying2 = false;

// Event listener สำหรับปุ่มเสียง
soundButton2.addEventListener('click', () => {
    if (isSoundPlaying2) {
        carSound2.pause();
        carSound2.currentTime = 0; // รีเซ็ตเสียง
        soundButton2.setAttribute('text', 'value: Play Sound');
        soundButton2.setAttribute('material', 'color', '#FF5722');
    } else {
        carSound2.play();
        soundButton2.setAttribute('text', 'value: Stop Sound');
        soundButton2.setAttribute('material', 'color', '#4CAF50');
    }
    isSoundPlaying2 = !isSoundPlaying2;
});

// เพิ่ม Event Listener ให้กับปุ่มแสดงข้อความ
const button_2 = document.getElementById('show-text-button-2');
const helloText2 = document.getElementById('hello-text-2');

// สถานะข้อความ
let isTextVisible2 = false;

const newMessage2 = `
//////////////////////////\n
Porsche 911 GT4\n
Type: Sports Car\n
Engine: 4.0L Flat-Six\n
Power: 420 hp\n
Torque: 420 Nm\n
Acceleration (0-100 km/h): 4.4 sec\n
Top Speed: 304 km/h\n
//////////////////////////
`;

button_2.addEventListener('click', () => {
    if (isTextVisible2) {
        // ซ่อนข้อความ
        helloText2.setAttribute('visible', false);
        button_2.setAttribute('text', 'value: Click Me; color: white');
        button_2.setAttribute('material', 'color', '#4CAF50');
    } else {
        // แสดงข้อความ
        helloText2.setAttribute('value', newMessage2);
        helloText2.setAttribute('visible', true);
        button_2.setAttribute('text', 'value: Hide Text; color: white');
        button_2.setAttribute('material', 'color', '#F44336');
    }
    isTextVisible2 = !isTextVisible2;
});

// ค้นหาปุ่มและ Wrapper ของโมเดลในฉาก
const rotateModelButton2 = document.getElementById('rotate-model-button-2');
const modelWrapper2 = document.getElementById('model-2-wrapper');

// สถานะการหมุน
let isModelRotating2 = false;
let rotationInterval2;

// Event listener สำหรับปุ่มหมุนโมเดล
rotateModelButton2.addEventListener('click', () => {
    if (isModelRotating2) {
        // หยุดการหมุน
        clearInterval(rotationInterval2);
        rotateModelButton2.setAttribute('text', 'value: Rotate Car; color: white');
        rotateModelButton2.setAttribute('material', 'color', '#3F51B5');
    } else {
        // เริ่มการหมุน
        rotationInterval2 = setInterval(() => {
            if (modelWrapper2.object3D) {
                modelWrapper2.object3D.rotation.y += 0.03; // หมุนแกน Y
            }
        }, 16); // หมุนด้วยความถี่ประมาณ 60 FPS
        rotateModelButton2.setAttribute('text', 'value: Stop Rotation; color: white');
        rotateModelButton2.setAttribute('material', 'color', '#FF5722');
    }
    isModelRotating2 = !isModelRotating2;
});