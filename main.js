var PROCESSOR_COUNT = 16;
var PIPELINED = false;

const numberOfProcessorsElement = document.querySelector(".number_of_processors");
const pipelinedCheckbox = document.querySelector("#pipelined");

PIPELINED = pipelinedCheckbox.value;

numberOfProcessorsElement.addEventListener("change", (event) => {
    PROCESSOR_COUNT = event.target.value;
    restart();
});

pipelinedCheckbox.addEventListener("change", (event) => {
    PIPELINED = event.target.checked;
    restart();
});

init();