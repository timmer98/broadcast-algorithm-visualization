const PROCESSOR_RECT_WIDTH = 60;
const PROCESSOR_RECT_HEIGHT = 60;
const PROCESSOR_RECT_Y_POS = 50;
const MESSAGE_Y_POS = PROCESSOR_RECT_Y_POS + PROCESSOR_RECT_HEIGHT + 20;
const MESSAGE_HEIGHT = PROCESSOR_RECT_HEIGHT / 2;
const MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS = 2000;
var timestamp = 0;
var lastTime = Date.now();
var controller;
var processors = [];
var intervalCallbackId;

function buildProcessors() {
    for (let i = 0; i < PROCESSOR_COUNT; i++) {
        var rectX = i * 70 + 10;
        processors.push(new Processor(i, rectX));
    }
}

function drawPEs(processors, context) {
    for (let i = 0; i < processors.length; i++) {
        processors[i].draw(context);
    }
}

function animateMessage(context) {
    for (let i = 0; i < controller.messages.length; i++) {
        controller.messages[i].draw(context, timestamp);
    }
}

function draw() {
    const canvas = document.getElementById("tutorial");
    if (canvas.getContext) {       
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 1250, 500); // clear canvas
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        drawPEs(processors, ctx);
        animateMessage(ctx);

        timestamp = Date.now() - lastTime;
        lastTime = Date.now();
        
        if (PROCESSOR_COUNT == processors.length) {
            window.requestAnimationFrame(draw);
        } else {
            clearInterval(intervalCallbackId);
            init();
        }
    }
}

function init() {
    processors = [];

    buildProcessors();

    startTime = Date.now();

    controller = new MessagesController(processors);
    intervalCallbackId = setInterval(controller.iterate, MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS);

    window.requestAnimationFrame(draw);
}
