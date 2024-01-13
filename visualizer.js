const PROCESSOR_RECT_WIDTH = 60;
const PROCESSOR_RECT_HEIGHT = 60;
const INITIAL_PROCESSOR_Y_POS = 50;
const ROOT_NODE_X = 10 + PROCESSOR_RECT_WIDTH / 2;
const PIPELINED_MESSAGE_HEIGHT = PROCESSOR_RECT_HEIGHT / 5;
const MESSAGE_HEIGHT = PROCESSOR_RECT_HEIGHT / 2;
const NODE_RADIUS = 5;
const LEVEL_HEIGHT = PROCESSOR_RECT_HEIGHT;
var PROCESSOR_RECT_Y_POS;
var MESSAGE_Y_POS;

var timestamp = 0;
var lastTime = Date.now();
var controller;
var processors = [];
var intervalCallbackId;
var animationFrameRequestId;
var RUNNING;

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
    for (let i = 0; i < controller.messageCopies.length; i++) {
        controller.messageCopies[i].draw(context, timestamp);
    }
}

function calculateTree() {    
    let levels = Math.ceil(Math.log2(PROCESSOR_COUNT));

    PROCESSOR_RECT_Y_POS = INITIAL_PROCESSOR_Y_POS + levels * LEVEL_HEIGHT;
    MESSAGE_Y_POS = PROCESSOR_RECT_Y_POS + PROCESSOR_RECT_HEIGHT + 20;
}

function drawTree(context) {
    let initialStep = Math.pow(2, Math.ceil(Math.log2(PROCESSOR_COUNT)));
    
    let nodeY = LEVEL_HEIGHT - PIPELINED_MESSAGE_HEIGHT + 1;

    // Root node
    context.fillStyle = "grey";

    // Loop for levels
    for (let distance = initialStep; distance > 1; distance = distance / 2) {

        // Loop for nodes
        for (let i = 0; i < PROCESSOR_COUNT; i += distance) {
            let nodeX = ROOT_NODE_X + i * (PROCESSOR_RECT_WIDTH + 10);

            // Edges of tree
            context.beginPath();
            context.moveTo(nodeX, nodeY);
            context.lineTo(nodeX, nodeY + LEVEL_HEIGHT);
            context.stroke();

            if (i + distance / 2 < PROCESSOR_COUNT) {
                context.beginPath();
                context.moveTo(nodeX, nodeY);
                context.lineTo(nodeX + distance / 2 * (PROCESSOR_RECT_WIDTH + 10), nodeY + LEVEL_HEIGHT)
                context.stroke();    
            }

            // Circles of the tree nodes
            context.beginPath();
            context.arc(nodeX, nodeY, NODE_RADIUS, 0, 2 * Math.PI);
            context.fill();
        }

        nodeY += LEVEL_HEIGHT;
    }
}

function draw() {
    const canvas = document.getElementById("tutorial");
    if (canvas.getContext) {       
        const ctx = canvas.getContext("2d");
        ctx.font = "20px Arial";
        ctx.clearRect(0, 0, 1250, 500); // clear canvas
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        drawTree(ctx);
        drawPEs(processors, ctx);
        animateMessage(ctx);

        timestamp = Date.now() - lastTime;
        lastTime = Date.now();
        
        animationFrameRequestId = window.requestAnimationFrame(draw);
    }
}

function restart() {
    pauseAnimation();
    init();
}

function pauseAnimation() {
    cancelAnimationFrame(animationFrameRequestId);
    clearInterval(intervalCallbackId);
    RUNNING = false;
}

function startAnimation() {
    if (RUNNING) {
        return;
    }
    
    intervalCallbackId = setInterval(() => {
        let iterationResult = controller.iterate();
        if (iterationResult) {
            controller.newMessageIteration();
        }
    }, MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS);

    RUNNING = true;

    animationFrameRequestId = window.requestAnimationFrame(() => {draw();});
}

function init() {
    processors = [];

    buildProcessors();
    calculateTree();

    startTime = Date.now();

    controller = new MessagesController(processors);
    startAnimation();
}
