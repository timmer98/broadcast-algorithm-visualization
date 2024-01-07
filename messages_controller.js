class MessagesController {
    constructor(processors) {
        let initialStep = Math.pow(2, Math.ceil(Math.log2(PROCESSOR_COUNT) - 1)); 

        this.currentStep = initialStep;
        this.processors = processors;
        this.messages = [];
        this.messages.push(new Message(1, processors[0], processors[0]));

    }

    iterate() {
        if (this.currentStep < 1) {
            return;
        }
    
        var messagesCount = this.messages.length;

        for (let i = 0; i < messagesCount; i++) {
            let message = this.messages[i];
            let receiverProcessorIndex = message.endProcessor.id + this.currentStep;
            if (receiverProcessorIndex < processors.length) {
                this.processors[message.endProcessor.id].receiveMessage(message);
                this.messages.push(new Message(message.label, message.endProcessor, this.processors[receiverProcessorIndex]));
            }
        }

        this.currentStep = this.currentStep / 2;
    }
}