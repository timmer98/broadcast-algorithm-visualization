const COLORS = ["#0000FF", "#40E0D0", "#008000", "#ADFF2F", "#FFFF00", "#FFA500"];

class Processor {
    constructor(id, xPos, yPos = PROCESSOR_RECT_Y_POS) {
        this.id = id;
        this.xPos = xPos;
        this.sentMessages = 0;
        this.messages = [];
        this.yPos = yPos;
    }

    receiveMessage(message) {
        if (!this.messages.includes(message)) {
            this.messages.unshift(message);
        }

        if (this.messages.length > 5) {
            this.messages.pop();
        }
    }

    draw(context) {
        context.fillStyle = "black";
        context.strokeRect(this.xPos, this.yPos, PROCESSOR_RECT_WIDTH, PROCESSOR_RECT_HEIGHT);

        if (this.id == 0) {
            context.fillStyle = "grey";
            context.fillRect(this.xPos, this.yPos, PROCESSOR_RECT_WIDTH, PROCESSOR_RECT_HEIGHT);
            
            // Write processor id
            context.fillStyle = "black";
            context.fillText(this.id, this.xPos + (PROCESSOR_RECT_WIDTH / 2), this.yPos + (PROCESSOR_RECT_HEIGHT / 2));

            return;
        }
        
        if (PIPELINED) {
            for (let i = 0; i < this.messages.length; i++) {
                let yPos = this.yPos + PIPELINED_MESSAGE_HEIGHT * i;
                
                let message = this.messages[i];

                context.fillStyle = COLORS[message.label % COLORS.length];
                context.fillRect(this.xPos, yPos, PROCESSOR_RECT_WIDTH, PIPELINED_MESSAGE_HEIGHT);
            }
        } else if (this.messages.length > 0) {
            let message = this.messages[0]; // Newest message is pushed in on position 0

            context.fillStyle = COLORS[message.label % COLORS.length];
            context.fillRect(this.xPos, this.yPos, PROCESSOR_RECT_WIDTH, PROCESSOR_RECT_HEIGHT);
        }

        // Write processor id
        context.fillStyle = "black";
        context.fillText(this.id, this.xPos + (PROCESSOR_RECT_WIDTH / 2), this.yPos + (PROCESSOR_RECT_HEIGHT / 2));
    }
}
