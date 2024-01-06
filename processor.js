class Processor {
    constructor(id, xPos) {
        this.id = id;
        this.xPos = xPos;
        this.lastMessageSentToId = 0;
    }

    draw(context) {
        context.fillStyle = "black";
        context.strokeRect(this.xPos, 50, PROCESSOR_RECT_WIDTH, PROCESSOR_RECT_HEIGHT);
        context.fillStyle = "black";
        context.fillText(this.id, this.xPos + (PROCESSOR_RECT_WIDTH / 2), PROCESSOR_RECT_Y_POS + (PROCESSOR_RECT_HEIGHT / 2));
    }
}
