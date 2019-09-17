class NeuralNetwork {
    constructor(shapes, activator) {
        var layers = [];
        var biases = [];

        shapes.forEach((a, i) => {
            let lastIndex = shapes.length - 1;

            if (i !== lastIndex) {
                let nextValue = shapes[i + 1];
                layers.push(vec(`${a}x${nextValue}`, () => {
                    return chance.normal() / shapes[0] ** 0.5;
                }));
            }
        });

        shapes.forEach((a, i) => {
            if (i > 0) {
                biases.push(vec(`1x${a}`));
            }
        });

        this.layers = layers;
        this.biases = biases;
        this.activator = activator;
    }

    compute(inputVector) {

        var lastResult = inputVector;

        this.layers.forEach((layer, layerIndex) => {

            let layerResult = vecMultiply(layer, lastResult);
            layerResult = vecAdd(layerResult, this.biases[layerIndex]);
            layerResult = vecProcess(layerResult, this.activator);

            lastResult = layerResult;

        });

        return lastResult;
    }

    train(input, expectedOutput) {
        
    }
}

function randomNr(min, max) {
    
}

function randomTrainingData() {
    var inputArray = 
}

const shape = [10, 5, 2];

const network = new NeuralNetwork(shape, x => 1/(1+Math.exp(-x)));

var prediction = network.compute(
    vec(`1x${shape[0]}`, 1)
);

console.log(prediction, network);