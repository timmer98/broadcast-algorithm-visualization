const COLORS = ["Red", "Orange", "Yellow", "Green", "Blue"];

class Processor {
    constructor(id, xPos) {
        this.id = id;
        this.xPos = xPos;
        this.lastMessageSentToId = 0;
        this.messages = [];
    }

    receiveMessage(message) {
        if (!this.messages.includes(message)) {
            this.messages.push(message);
        }

        if (this.messages.length > 5) {
            this.messages.pop();
        }
    }

    draw(context) {
        context.fillStyle = "black";
        context.strokeRect(this.xPos, PROCESSOR_RECT_Y_POS, PROCESSOR_RECT_WIDTH, PROCESSOR_RECT_HEIGHT);
        context.fillStyle = "black";
        context.fillText(this.id, this.xPos + (PROCESSOR_RECT_WIDTH / 2), PROCESSOR_RECT_Y_POS + (PROCESSOR_RECT_HEIGHT / 2));

        for (let i = 0; i < this.messages.length; i++) {
            let yPos = PROCESSOR_RECT_Y_POS + PIPELINED_MESSAGE_HEIGHT * i;

            context.fillStyle = COLORS[i];
            context.fillRect(this.xPos, yPos, PROCESSOR_RECT_WIDTH, PIPELINED_MESSAGE_HEIGHT);
        }
    }
}
