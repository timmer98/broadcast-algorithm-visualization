class Message {
    constructor(label, startProcessor, endProcessor) {
        this.label = label;
        this.startProcessor = startProcessor;
        this.endProcessor = endProcessor;
        this.xPos = startProcessor.xPos;
        this.positionDifference = endProcessor.xPos - startProcessor.xPos;
        this.done = false;
    }

    draw(context, timestep) {
        context.fillStyle = "black";
        context.fillRect(this.xPos, MESSAGE_Y_POS, PROCESSOR_RECT_WIDTH, MESSAGE_HEIGHT);
        context.fillStyle = "white";
        context.fillText(this.label, this.xPos + (PROCESSOR_RECT_WIDTH / 2), MESSAGE_Y_POS + (MESSAGE_HEIGHT / 2));

        if (this.xPos < this.endProcessor.xPos && !this.done) {
            let step = timestep / MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS * this.positionDifference;
            this.xPos += step;
        } else {
            this.xPos = this.endProcessor.xPos;
            this.done = true;
        }
    }
}