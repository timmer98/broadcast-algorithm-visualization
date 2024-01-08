var PROCESSOR_COUNT = 16;
var PIPELINED = true;
var MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS = 800;


const numberOfProcessorsElement = document.querySelector(".number_of_processors");
const pipelinedCheckbox = document.getElementById("pipelined");
const animationTimeSlider = document.getElementById("animationTime");

pipelinedCheckbox.checked = PIPELINED;
animationTimeSlider.value = MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS;

numberOfProcessorsElement.addEventListener("change", (event) => {
    PROCESSOR_COUNT = event.target.value;
    restart();
});

pipelinedCheckbox.addEventListener("change", (event) => {
    PIPELINED = event.target.checked;
    restart();
});

animationTimeSlider.addEventListener("change", (event) => {
    MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS = event.target.value;
    restart();
});

init();