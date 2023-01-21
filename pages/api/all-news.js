import clientPromise from "../../lib/mongodb";
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

    details = puncRemove(details)
    let mytokenizedText = details.toLowerCase().split(' ');
    let res = await fetch('https://raw.githubusercontent.com/SaiemAziz/news-caster-next/main/public/word_index.json')
    let wordIndex = await res.json()
    let mywordIndices = await mytokenizedText.map(word => wordIndex[word]);

    let mypaddedSequences = [...removeZero(mywordIndices)]
    let slicedPaddedSequence = mypaddedSequences.slice(0, 500)
    let mypaddedSequence = tf.tensor1d(slicedPaddedSequence, 'int32')
    let reshapedPaddedSequence = mypaddedSequence.reshape([1, 500])
    let model = await tf.loadLayersModel('https://raw.githubusercontent.com/ReazTausif97/saiemmodel/main/Model8/model.json')
    let pred = model.predict(reshapedPaddedSequence);

    let fake = (pred.dataSync()[0] * 100)
    let real = (pred.dataSync()[1] * 100)
    return { fake, real }
    // const result = pred.dataSync()[0] > pred.dataSync()[1] ? "FAKE" : "REAL"
    // const result2 = Math.max(...pred.dataSync())
    // console.log(index + " Prediction " + result + ", Percent " + parseFloat(result2 * 100).toFixed(2))
}

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("newsCasterNext");
    let newsCollection = await db.collection("news");
    switch (req.method) {
        case "GET":
                let allNews = await newsCollection.find({}).toArray()
                res.json({ status: 200, data: await allNews });
            break;
        case "POST":
                let myNews = req.body
                let {details} = myNews
                let prediction = await handleTokenizeClick(details)
                myNews = {...myNews, prediction}
                console.log(prediction);
                let result = await newsCollection.insertOne(myNews)
                res.json({ status: 200, result });
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}