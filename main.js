var PROCESSOR_COUNT = 16;

let numberOfProcessorsElement = document.querySelector(".number_of_processors");

numberOfProcessorsElement.addEventListener("change", (event) => {
    PROCESSOR_COUNT = event.target.value;
});

init();