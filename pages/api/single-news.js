import * as tf from '@tensorflow/tfjs';
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import handleTokenizeClick from "../../components/functions/handleTokenizeClick";


export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("newsCasterNext");
    let newsCollection = await db.collection("news");
    switch (req.method) {
        case "GET": {
            let id = req.query.id;
            // console.log(id);
            let news = await newsCollection.findOne({ _id: ObjectId(id) })
            // console.log(news);
            res.json({ status: 200, data: news });
        }
            break;
        case "PUT": {
            let status = req.query.status;
            let id = req.query.id;
            let updateDoc = {
                $set: {
                    status: status
                }
            }

            let result = await newsCollection.updateOne({ _id: ObjectId(id) }, updateDoc, { upsert: true })
            res.json({ status: 200, data: result });
        }
            break;
        case "POST": {
            let news = req.body;
            let response = await fetch("https://raw.githubusercontent.com/SaiemAziz/news-caster-next/refs/heads/main/public/models/model/word_index.json")
            let wordIndex = await response.json()
            let model = await tf.loadLayersModel("https://raw.githubusercontent.com/SaiemAziz/news-caster-next/refs/heads/main/public/models/model/model.json")
            let prediction = await handleTokenizeClick(news?.details, model, wordIndex);
            news.prediction = {
                  real: prediction.real
                }
            let result = await newsCollection.insertOne(news)
            res.json({ status: 200, data: result });
        }
            break;
        case "DELETE": {
            let id = req.query.id;
            let result = await newsCollection.deleteOne({ _id: ObjectId(id) })
            res.json({ status: 200, data: result });
        }
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}