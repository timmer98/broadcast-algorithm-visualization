class MessagesController {
    self;

    constructor(processors) {
        self = this;

        let initialStep = Math.pow(2, Math.ceil(Math.log2(PROCESSOR_COUNT) - 1)); 

        self.currentStep = initialStep;
        self.processors = processors;
        self.messages = [];
        self.messages.push(new Message("M", processors[0], processors[0]));

    }

    iterate() {
        if (self.currentStep < 1) {
            return;
        }
    
        var messagesCount = self.messages.length;

        for (let i = 0; i < messagesCount; i++) {
            let message = self.messages[i];
            let receiverProcessorIndex = message.endProcessor.id + self.currentStep;
            if (receiverProcessorIndex < processors.length) {
                self.messages.push(new Message("M", message.endProcessor, self.processors[receiverProcessorIndex]));
            }
        }

        self.currentStep = self.currentStep / 2;
    }
}