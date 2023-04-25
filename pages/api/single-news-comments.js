
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("newsCasterNext");
    let commentsCollection = await db.collection("comments");
    switch (req.method) {
        case "GET": {
            let newsId = req.query.newsId;
            // console.log(id);
            let allComments = await commentsCollection.find({ newsId: newsId }).sort({ time: -1 }).toArray()
            // console.log(news);
            res.json({ status: 200, data: allComments });
        }
            break;
        case "PUT": {
            let id = req.query.id
            let updateDoc = {
                $set: {
                    reply: req.body
                }
            }
            // console.log(req.body);
            let result = await commentsCollection.updateOne({ _id: ObjectId(id) }, updateDoc, { upsert: true })
            res.json({ status: 200, data: result });
        }
            break;
        case "POST": {
            let comment = req.body;
            let result = await commentsCollection.insertOne(comment)
            res.json({ status: 200, data: result });
        }
            break;
        case "DELETE": {
            let type = req.query.type
            let result;
            if (type === "comment") {
                await commentsCollection.deleteOne({ _id: ObjectId(req.query.id) })
            } else
                await commentsCollection.updateOne({ _id: ObjectId(req.query.id) }, { $set: { reply: null } }, { upsert: true })

            res.json({ status: 200, data: result });
        }
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}