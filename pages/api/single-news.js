
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

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
            //     let { userName, fullName, password, email, birthdate, verified, displayURL, role } = req.body
            //     let updateDoc = {
            //         $set: {
            //             fullName, password, email, birthdate, verified, displayURL, role, userName
            //         }
            //     }
            //     let result = await usersCollection.updateOne(
            //         { email: email },
            //         updateDoc,
            //         { upsert: true }
            //     )
            //     res.json({ status: 200, data: result });
        }
        // break;
        case "POST": {
            let news = req.body;

            let result = await newsCollection.insertOne(news)
            res.json({ status: 200, data: result });
        }
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}