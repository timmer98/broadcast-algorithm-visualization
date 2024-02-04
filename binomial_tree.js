class BinomialTreeStrategy {

    constructor(processors) {
        this.initialStep = Math.pow(2, Math.ceil(Math.log2(PROCESSOR_COUNT) - 1)); 
        this.currentStep = this.initialStep;
        this.processors = [];
        this.messageCopies = [];
        this.buildProcessors();

        this.messageCopies.push(new Message(0, this.processors[0], this.processors[0], COLORS[0]));
    }

    buildProcessors() {
        for (let i = 0; i < PROCESSOR_COUNT; i++) {
            var rectX = i * (PROCESSOR_RECT_WIDTH + 10) + 10;
            this.processors.push(new Processor(i, rectX));
        }
    }
    
    newMessageIteration() {
        let lastMessage = this.messageCopies[0];
        this.messageCopies = [];
        let newId = lastMessage.label + 1;
        this.messageCopies.push(new Message(newId, this.processors[0], this.processors[0], COLORS[newId % COLORS.length]));
        this.currentStep = this.initialStep;
    }

    iterate() {
        var messagesCount = this.messageCopies.length;

        for (let i = 0; i < messagesCount; i++) {
            let message = this.messageCopies[i];
            this.processors[message.endProcessor.id].receiveMessage(message);
        }

        if (this.currentStep < 1) {
            return true;
        }
    
        for (let i = 0; i < messagesCount; i++) {
            let message = this.messageCopies[i];
            let receiverProcessorIndex = message.endProcessor.id + this.currentStep;
            if (receiverProcessorIndex < this.processors.length) {
                this.messageCopies.push(new Message(message.label, message.endProcessor, this.processors[receiverProcessorIndex], COLORS[message.label % COLORS.length]));
            }
        }

        this.currentStep = this.currentStep / 2;
    
        return false;
    }

    drawProcessors(context) {
        for (let i = 0; i < this.processors.length; i++) {
            this.processors[i].draw(context);
        }
    }

    drawTree(context) {
        this.drawProcessors(context);

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
}
