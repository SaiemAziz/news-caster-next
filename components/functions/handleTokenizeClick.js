import * as tf from '@tensorflow/tfjs-node';
const puncRemove = (t) => {
    t = t.split('');
    let newt = t.filter(x => {
        if (x >= 'A' && x <= 'Z') return x;
        else if (x >= 'a' && x <= 'z') return x;
        else if (x === ' ' || x === '\'' || x === '“' || x === '”') return x;
    })
    newt = newt.join('')
    return newt
}

const paddingAdd = (arr) => {
    let newArray = [...arr]
    if (arr.length >= 500) {
        return newArray
    }
    for (let i = arr.length; i < 500; i++) {
        newArray.push(0)
    }
    return newArray
}

const removeZero = (arr) => {
    let newArray = arr.filter(num => num !== undefined)
    return paddingAdd(newArray)
}


const handleTokenizeClick = async (details) => {
    console.log(details)
    details = puncRemove(details)
    let mytokenizedText = details.toLowerCase().split(' ');
    let res = await fetch("https://raw.githubusercontent.com/SaiemAziz/news-caster-next/main/models/model/word_index.json")
    let wordIndex = await res.json()
    let mywordIndices = await mytokenizedText.map(word => wordIndex[word]);

    let mypaddedSequences = [...removeZero(mywordIndices)]
    let slicedPaddedSequence = mypaddedSequences.slice(0, 500)
    let mypaddedSequence = tf.tensor1d(slicedPaddedSequence, 'int32')
    let reshapedPaddedSequence = mypaddedSequence.reshape([1, 500])
    let model = await tf.loadLayersModel("https://raw.githubusercontent.com/SaiemAziz/news-caster-next/main/models/model/model.json")
    let pred = model.predict(reshapedPaddedSequence);
    let fake = (pred.dataSync()[0] * 100)
    let real = (pred.dataSync()[1] * 100)
    return { fake, real }
    // const result = pred.dataSync()[0] > pred.dataSync()[1] ? "FAKE" : "REAL"
    // const result2 = Math.max(...pred.dataSync())
    // console.log(index + " Prediction " + result + ", Percent " + parseFloat(result2 * 100).toFixed(2))
}
export default handleTokenizeClick