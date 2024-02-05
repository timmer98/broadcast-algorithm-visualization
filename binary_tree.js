class BinaryTreeStrategy {
    constructor() {
        this.processors = [];
        this.edges = [];
        this.messageCopies = [];
    }

    buildTree(context) {
        let treeDepth = Math.floor(Math.log2(PROCESSOR_COUNT)) + 1;
        let yPos = LEVEL_HEIGHT - PIPELINED_MESSAGE_HEIGHT + 1;
        let middle = context.canvas.width;
        let levelDrawingStart = middle;
        let nodesDistance = middle;
        let nodeCount = 0;

        context.fillStyle = "grey";

        // So that's quite not that easy.
        // Loop for the levels
        for (let level = 0; level < treeDepth; level++) {
            let nodesPerLevel = Math.pow(2, level);

            // Loop for nodes
            for (let j = -nodesPerLevel / 2; j < nodesPerLevel / 2; j++) {
                if (nodeCount == PROCESSOR_COUNT) {
                    return;
                }
                
                let xPos = levelDrawingStart + j * nodesDistance;

                // Calculate index of parent node
                if (nodeCount > 0 && nodeCount <= PROCESSOR_COUNT) {
                    let parentIndex = Math.floor((nodeCount - 1) / 2);
                    let parent = this.processors[parentIndex];

                    let edgeStartX = parent.xPos + PROCESSOR_RECT_WIDTH / 2;
                    let edgeStartY = parent.yPos + PROCESSOR_RECT_HEIGHT;
                    let edgeEndX = xPos + PROCESSOR_RECT_WIDTH / 2;

                    this.edges.push(new Edge(edgeStartX, edgeStartY, edgeEndX, yPos));
                }

                this.processors.push(new Processor(nodeCount, xPos, yPos));

                nodeCount++;
            }

            levelDrawingStart = levelDrawingStart - nodesDistance / 4;
            nodesDistance = nodesDistance / 2;
            yPos += LEVEL_HEIGHT + LEVEL_HEIGHT;
        }
    }


    newMessageIteration() {
        // let lastMessage = this.messageCopies[0];
        // // this.messageCopies = [];
        // let newId = lastMessage.label + 1;
        // this.messageCopies.push(new Message(newId, this.processors[0], this.processors[0], COLORS[newId % COLORS.length]));
    }

    iterate() {
        this.messageCopies.forEach((m) => {
            m.endProcessor.receiveMessage(m);
        });

        for (let i = 0; i < PROCESSOR_COUNT; i++) {
            let currentProcessor = this.processors[i];

            if (currentProcessor.messages.length != 0) {
                let message = currentProcessor.messages[0]; // Position 0 always has the newest received message
                let receiverProcessorIndex = i * 2 + 1;

                if (currentProcessor.sentMessages % 2 == 1) {
                    receiverProcessorIndex ++; // Add 1 for right child, otherwise left child
                }

                if (receiverProcessorIndex < PROCESSOR_COUNT) {
                    if (currentProcessor.sentMessages != 2) {
                        let receiveProcessor = this.processors[receiverProcessorIndex];
                        this.messageCopies.push(new Message(message.label, currentProcessor, receiveProcessor, message.color, currentProcessor.yPos));
                        currentProcessor.sentMessages++;
                    }
                }
            }
        }

        if (this.processors[0].sentMessages == 2) {
            return true;
        }

        return false;
    }

    drawTree(context) {
        if (this.processors.length == 0) {
            this.buildTree(context);
            let newMessage = new Message(0, this.processors[0], this.processors[0], COLORS[0], this.processors[0].yPos);
            this.processors[0].receiveMessage(newMessage);
            this.messageCopies.push(newMessage);
        }

        this.processors.forEach(processor => {
            processor.draw(context);
        });

        this.edges.forEach(edge => {
            edge.draw(context);
        });
    }
}