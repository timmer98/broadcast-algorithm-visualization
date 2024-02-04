class Message {
    constructor(label, startProcessor, endProcessor, color) {
        this.label = label;
        this.startProcessor = startProcessor;
        this.endProcessor = endProcessor;
        this.xPos = startProcessor.xPos;
        this.positionDifferenceX = endProcessor.xPos - startProcessor.xPos;
        this.color = color;
        this.visible = false;
        this.scaleFactor = 1;
        this.passedTime = 0;

        let startLevel = Math.ceil(Math.log2(endProcessor.id - startProcessor.id));
        this.yPos = LEVEL_HEIGHT * (numberOfLevels - startLevel) - LEVEL_HEIGHT * 0.75;
        this.positionDifferenceY = LEVEL_HEIGHT;

        if (startProcessor === endProcessor) {
            this.visible = false;
        } else {
            this.visible = true;
        }
    }

    draw(context, timestep) {
        if (!this.visible) {
            return;
        }

        if (this.xPos < this.endProcessor.xPos) {
            let stepX = timestep / MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS * this.positionDifferenceX;
            let stepY = timestep / MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS * this.positionDifferenceY;

            this.scaleFactor = this.calculateScaleFactor(timestep); 
            this.xPos += stepX;
            this.yPos += stepY;
        } else {
            this.xPos = this.endProcessor.xPos;
            this.yPos = LEVEL_HEIGHT * numberOfLevels;
            this.endProcessor.receiveMessage(this);
            this.visible = false;
        }

        context.save();
        context.translate(this.xPos + PROCESSOR_RECT_WIDTH / 2, this.yPos + MESSAGE_HEIGHT / 2);
        context.scale(this.scaleFactor, this.scaleFactor);
        context.fillStyle = this.color;
        context.fillRect(0, 0, PROCESSOR_RECT_WIDTH, MESSAGE_HEIGHT);
        context.fillStyle = "black";
        context.fillText(this.label, PROCESSOR_RECT_WIDTH / 2, MESSAGE_HEIGHT / 2);
        context.restore();
    }

    calculateScaleFactor(timestep) {
        this.passedTime += timestep;

        // Creates a smooth curve from 0 to 1 and back to 0
        return Math.sin((this.passedTime * Math.PI) / MESSAGE_ANIMATION_SPEED_IN_MILLISECONDS);
    }
}