var PROCESSOR_COUNT = 16;
var PIPELINED = true;
var MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS = 1500;
var customScaleFactor = 1;

const ANIMATION_SPEED_MAX_VALUE = 5000;
const ZOOM_STEP = 0.05;

const numberOfProcessorsElement = document.querySelector(".number_of_processors");
const pipelinedCheckbox = document.getElementById("pipelined");
const animationTimeSlider = document.getElementById("animationTime");
const playButton =  document.getElementById("play");
const pauseButton = document.getElementById("pause");
const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut")

pipelinedCheckbox.checked = PIPELINED;
animationTimeSlider.value = MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS;

zoomInButton.addEventListener("click", (event) => {
    customScaleFactor += ZOOM_STEP;
});

zoomOutButton.addEventListener("click", (event) => {
    customScaleFactor -= ZOOM_STEP;
});

numberOfProcessorsElement.addEventListener("change", (event) => {
    PROCESSOR_COUNT = parseInt(event.target.value, 10);
    restart();
});

pipelinedCheckbox.addEventListener("change", (event) => {
    PIPELINED = event.target.checked;
    restart();
});

animationTimeSlider.addEventListener("change", (event) => {
    MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS = 5000 - parseInt(event.target.value, 10);
    restart();
});

playButton.addEventListener("click", (event) => {
    startAnimation();
});

pauseButton.addEventListener("click", (event) => {
    pauseAnimation();
});

init();