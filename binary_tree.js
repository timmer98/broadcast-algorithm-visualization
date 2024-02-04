class BinaryTreeStrategy {
    constructor() {
        this.initialStep = Math.pow(2, Math.ceil(Math.log2(PROCESSOR_COUNT) - 1)); 
        this.currentStep = this.initialStep;
        this.processors = [];
        this.edges = [];
        this.messageCopies = [];
        // this.messageCopies.push(new Message(0, this.processors[0], this.processors[0], COLORS[0]));
    }

    newMessageIteration() {
        let lastMessage = this.messageCopies[0];
        this.messageCopies = [];
        let newId = lastMessage.label + 1;
        this.messageCopies.push(new Message(newId, this.processors[0], this.processors[0], COLORS[newId % COLORS.length]));
        this.currentStep = this.initialStep;
    }

    buildTree(context) {
        let treeDepth = Math.floor(Math.log2(PROCESSOR_COUNT)) + 1;
        let yPos = LEVEL_HEIGHT - PIPELINED_MESSAGE_HEIGHT + 1;
        let middle = context.canvas.width;
        let levelDrawingStart = middle;
        let nodesDistance = middle;
        let nodeCount = 0;
        let lastLevellastNodeIndex;

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
                    // Subtracting 0.1 might be a bit hacky but that leads to floor(2 / 2) evaluating to 0 which is the correct parent
                    let parentIndex = Math.floor((nodeCount - 0.1) / 2);
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
            lastLevellastNodeIndex = nodeCount;
        }
    }

    iterate() {

    }

    drawTree(context) {
        if (this.processors.length == 0) {
            this.buildTree(context);
        }

        this.processors.forEach(processor => {
            processor.draw(context);
        });

        this.edges.forEach(edge => {
            edge.draw(context);
        });
    }
}