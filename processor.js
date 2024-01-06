class Processor {
    constructor(id, xPos) {
        this.id = id;
        this.xPos = xPos;
        this.message = null;
        this.lastMessageSentToId = 0;
    }

    receiveMessage(message) {
        this.message = message.copy();
        var sendTo = this.id + (this.id - message.startProcessor.id) / 2;
        
        if (sendTo > PROCESSOR_COUNT) {
            this.message.endProcessor = this.id;
        } else {
            this.messsage.endProcessor = sendTo;
        }

        

    }

    draw(context) {
        context.fillStyle = "black";
        context.fillRect(this.xPos, 50, PROCESSOR_RECT_WIDTH, PROCESSOR_RECT_HEIGHT);
        context.fillStyle = "white";
        context.fillText(this.id, this.xPos + (PROCESSOR_RECT_WIDTH / 2), PROCESSOR_RECT_Y_POS + (PROCESSOR_RECT_HEIGHT / 2));
    }
}
