const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
const no_audio = document.getElementsByClassName('no-audio');
const main = document.getElementById('main');
const ring_slider = document.getElementById('ring-slider');
const no_audio_icon = document.getElementById('no-audio-icon');
const no_audio_text = document.getElementById('no-audio-text');
const slider_value = document.getElementById('slider-value');
let canvas_width = document.getElementById('canvas').offsetWidth;
let canvas_height = document.getElementById('canvas').offsetHeight;
let number_of_circles = 11;
let margin = 40;
let point_size = 5;
let soundEnabled = false;
let audio_volume = 0;
let circle_radius_difference = (canvas_width - margin * 2) / 2 / number_of_circles;
main.style.top = canvas_height/2 + 50 + "px";
ring_slider.style.top = canvas_height/2 + 30+ "px";
no_audio_icon.style.top = canvas_height/2 - canvas_height/2.8 + "px";
no_audio_text.style.top = canvas_height/2 - canvas_height/6 + "px";

function init() {
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    pen.lineCap = "round";
    pen.strokeStyle = "#1f1f1f";
    pen.fillStyle = "#1f1f1f";
    pen.lineWidth = canvas_width/65;
    slider_value.style.opacity = 0;
    draw();
    handleRingSliderChange();
}

ring_slider.addEventListener('mouseover', function(){
    slider_value.style.transition = "0.1s";
    slider_value.style.opacity = 1;
});

ring_slider.addEventListener('mouseout', function(){
    slider_value.style.transition = "1s";
    slider_value.style.opacity = 0;
});

window.addEventListener('resize', function(){
    canvas_width = document.getElementById('canvas').offsetWidth;
    canvas_height = document.getElementById('canvas').offsetHeight;
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    circle_radius_difference = (canvas_width - margin * 2) / 2 / number_of_circles;
    pen.lineWidth = canvas_width/65;
    pen.lineCap = "round";
    main.style.top = canvas_height/2 + 50 + "px";
    ring_slider.style.top = canvas_height/2 + 30+ "px";
    no_audio_icon.style.top = canvas_height/2 - canvas_height/2.8 + "px";
    no_audio_text.style.top = canvas_height/2 - canvas_height/6 + "px";
    slider_value.style.top = canvas_height/2 - canvas_height/20 + "px";
    slider_value_number = document.getElementById('slider-value-number');
    changeSliderNumberMargin(number_of_circles);
});

function handleSoundToggle(){  
    if (soundEnabled == true) {
        soundEnabled = false;
        audio_volume = 0;
        for (let i = 0; i < 2; i++) {
            no_audio[i].style.display = "block";
        }
    } else if (soundEnabled == false){
        soundEnabled = true;
        audio_volume = 1;
        for (let i = 0; i < 2; i++) {
            no_audio[i].style.display = "none";
        }
    }
}

function handleRingSliderChange(){
    number_of_circles = document.getElementById('ring-slider').value;
    circle_radius_difference = (canvas_width - margin * 2) / 2 / number_of_circles;
    if (number_of_circles > 9) {
        slider_value.innerHTML = '<h1 id="slider-value-number">' +  number_of_circles + '</h1>';
    } else {
        slider_value.innerHTML = '<h1 id="slider-value-number"> &nbsp;' +  number_of_circles + '&nbsp;</h1>';
    }
    slider_value_number = document.getElementById('slider-value-number');
    slider_value.style.top = canvas_height/2 - canvas_height/20 + "px";
    changeSliderNumberMargin(number_of_circles);
    let circles = Array.from({ length: number_of_circles }, (_, i) => {
        let speed = ((number_of_circles + i) * (2 *  Math.PI)) / totalTime;
        return {
            angle: 0,
            speed: speed,
            direction: 1,
            audio: audios[i % audios.length],
            color: colors[i % colors.length],
        };
    });
}

function changeSliderNumberMargin(number_of_circles){
    slider_value_element = document.getElementById('slider-value');
    slider_value_width = window.getComputedStyle(slider_value_element).getPropertyValue('width');
    slider_value_number_element = document.getElementById('slider-value-number');
    slider_value_number_width = window.getComputedStyle(slider_value_number_element).getPropertyValue('width');
    slider_value_number_width = parseInt(slider_value_number_width.substring(0, slider_value_number_width.length - 2));
    slider_value_number_width = slider_value_number_width + 10;
    slider_value_width = parseInt(slider_value_width.substring(0, slider_value_width.length - 2));
    slider_value_number.style.marginLeft = (((slider_value_width - slider_value_number_width) / 10) * number_of_circles - (slider_value_width - slider_value_number_width) / 10) + 'px';
}

const audios = [
    new Audio('./Audio/audio1.mp3'),
    new Audio('./Audio/audio2.mp3'),
    new Audio('./Audio/audio3.mp3'),
    new Audio('./Audio/audio4.mp3'),
    new Audio('./Audio/audio5.mp3'),
    new Audio('./Audio/audio6.mp3'),
    new Audio('./Audio/audio7.mp3'),
    new Audio('./Audio/audio8.mp3'),
    new Audio('./Audio/audio9.mp3'),
    new Audio('./Audio/audio10.mp3'),
    new Audio('./Audio/audio1.mp3'),
];

const colors = [
  "#fc1703",
  "#fcba03",
  "#a5fc03",
  "#03fc80",
  "#03f8fc",
  "#038cfc",
  "#0f03fc",
  "#5e03fc",
  "#a103fc",
  "#fc03e7",
  "#a83262",
];

let totalTime = 60; // Gesamtzeit in Sekunden, anpassbar an Ihre Anforderungen

const calculateVelocity = index => {  
    const numberOfCycles = number_of_circles - index,
          distancePerCycle = 2 * Math.PI;
  
  return (numberOfCycles * distancePerCycle) / settings.duration;
}

let circles = Array.from({ length: number_of_circles }, (_, i) => {
    let speed = ((number_of_circles + i) * (2 *  Math.PI)) / totalTime;
    return {
        angle: 0,
        speed: speed,
        direction: 1,
        audio: audios[i % audios.length],
        color: colors[i % colors.length],
        hit: false,
    };
});

function drawPoint(angle, radius, color, draw, hit){
    if (draw) {
        pen.beginPath();
        if (hit) {
            pen.fillStyle = "white";
            pen.strokeStyle = "white";
            pen.lineWidth = canvas_width/65+15;
        } else {            
            pen.fillStyle = color;
            pen.strokeStyle = color;
            pen.lineWidth = canvas_width/65+7;
        }
        var x = canvas_width / 2 + radius * Math.cos(-angle*Math.PI/180);
        var y = canvas_height / 2 + radius * Math.sin(-angle*Math.PI/180);
    
        pen.arc(x, y, point_size, 0, 2 * Math.PI);
        pen.fill();
        pen.stroke();
        pen.strokeStyle = "#1f1f1f";
        pen.fillStyle = "#1f1f1f";
        pen.lineWidth = canvas_width/65;
    } else {
        pen.beginPath();
        pen.fillStyle = "rgb(122, 122, 122)";
        pen.strokeStyle = "rgb(122, 122, 122)";
        var x = canvas_width / 2 + radius * Math.cos(-angle*Math.PI/180);
        var y = canvas_height / 2 + radius * Math.sin(-angle*Math.PI/180);
    
        pen.arc(x, y, point_size, 0, 2 * Math.PI);
        pen.fill();
        pen.stroke();
        pen.strokeStyle = "#1f1f1f";
        pen.fillStyle = "#1f1f1f";
    }
}

function drawArc(radius){
    pen.beginPath();
    pen.arc(canvas_width / 2, canvas_height / 2, radius, 1 * Math.PI, 2 * Math.PI);
    pen.stroke();
}

function draw() {
    pen.clearRect(0, 0, canvas_width, canvas_height);
    pen.beginPath();
    pen.moveTo(margin, canvas_height / 2);
    pen.lineTo(canvas_width - margin, canvas_height / 2);
    pen.stroke();
    for (let i = 0; i < number_of_circles; i++) {
        let circle = circles[i];
        drawArc((i + 1) * circle_radius_difference);
        circle.angle += circle.speed * circle.direction;
        if (circle.angle > 180) {
            circle.angle = 180;
            circle.direction = -1;
            circle.audio.volume = audio_volume;
            circle.audio.play();
            circle.hit = true;
        } else if (circle.angle < 0) {
            circle.angle = 0;
            circle.direction = 1;
            circle.audio.volume = audio_volume;
            circle.audio.play();
            circle.hit = true;
        }
        drawPoint(circle.angle, (i + 1) * circle_radius_difference, circle.color, true, circle.hit);
        if (circle.hit) {
            setTimeout(() => {
                circle.hit = false;
            }, 250);
        }
    }
    for (let i = number_of_circles; i < 11; i++) {
        let circle = circles[i];
        pen.strokeStyle = "rgb(122, 122, 122)";
        drawArc((i + 1) * circle_radius_difference);
        circle.angle += circle.speed * circle.direction;
        if (circle.angle > 180) {
            circle.angle = 180;
            circle.direction = -1;
        } else if (circle.angle < 0) {
            circle.angle = 0;
            circle.direction = 1;
        }
        drawPoint(circle.angle, (i + 1) * circle_radius_difference, circle.color, false, circle.hit);
    }
    requestAnimationFrame(draw);
}

init();