var PROCESSOR_COUNT = 16;
var PIPELINED = true;
var MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS = 1500;

const ANIMATION_SPEED_MAX_VALUE = 5000;

const numberOfProcessorsElement = document.querySelector(".number_of_processors");
const pipelinedCheckbox = document.getElementById("pipelined");
const animationTimeSlider = document.getElementById("animationTime");
const playButton =  document.getElementById("play");
const pauseButton = document.getElementById("pause");

pipelinedCheckbox.checked = PIPELINED;
animationTimeSlider.value = MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS;

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