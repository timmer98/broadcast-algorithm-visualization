const PROCESSOR_RECT_WIDTH = 30;
const PROCESSOR_RECT_HEIGHT = 30;
const INITIAL_PROCESSOR_Y_POS = 25;
const ROOT_NODE_X = 10 + PROCESSOR_RECT_WIDTH / 2;
const PIPELINED_MESSAGE_HEIGHT = PROCESSOR_RECT_HEIGHT / 5;
const MESSAGE_HEIGHT = PROCESSOR_RECT_HEIGHT;
const NODE_RADIUS = 5;
const LEVEL_HEIGHT = PROCESSOR_RECT_HEIGHT;
var PROCESSOR_RECT_Y_POS;
var MESSAGE_Y_POS;

var numberOfLevels;

var timestamp = 0;
var lastTime = Date.now();
var treeStrategy;
var intervalCallbackId;
var animationFrameRequestId;
var RUNNING;

function animateMessage(context) {
    for (let i = 0; i < treeStrategy.messageCopies.length; i++) {
        treeStrategy.messageCopies[i].draw(context, timestamp);
    }
}

function calculateTree() {    
    numberOfLevels = Math.ceil(Math.log2(PROCESSOR_COUNT));

    PROCESSOR_RECT_Y_POS = INITIAL_PROCESSOR_Y_POS + numberOfLevels * LEVEL_HEIGHT;
    MESSAGE_Y_POS = PROCESSOR_RECT_Y_POS + PROCESSOR_RECT_HEIGHT + 20;
}

function clearCanvas(ctx) {
    // Store the current transformation matrix
    ctx.save();

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Restore the transform
    ctx.restore();
}

function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {       
        const ctx = canvas.getContext("2d");
        
        // to scale to window
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight - 136;

        // Set user's chosen scale factor
        ctx.scale(customScaleFactor, customScaleFactor);

        ctx.font = "20px Arial";
        clearCanvas(ctx);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        treeStrategy.drawTree(ctx);
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
        let iterationResult = treeStrategy.iterate();
        if (iterationResult) {
            treeStrategy.newMessageIteration();
        }
    }, MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS);

    RUNNING = true;

    animationFrameRequestId = window.requestAnimationFrame(() => {draw();});
}

function init() {
    calculateTree();

    startTime = Date.now();

    if (!SHOW_BINARY_TREE) {
        treeStrategy = new BinomialTreeStrategy();
    } else {
        treeStrategy = new BinaryTreeStrategy();
    }

    startAnimation();
}
