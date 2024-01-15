class MessagesController {
    constructor(processors) {
        this.initialStep = Math.pow(2, Math.ceil(Math.log2(PROCESSOR_COUNT) - 1)); 
        this.currentStep = this.initialStep;
        this.processors = processors;
        this.messageCopies = [];
        this.messageCopies.push(new Message(0, processors[0], processors[0], COLORS[0]));
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
            if (receiverProcessorIndex < processors.length) {
                this.messageCopies.push(new Message(message.label, message.endProcessor, this.processors[receiverProcessorIndex], COLORS[message.label % COLORS.length]));
            }
        }

        this.currentStep = this.currentStep / 2;
    
        return false;
    }
}