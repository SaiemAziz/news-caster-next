
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("newsCasterNext");
    let usersCollection = await db.collection("users");
    switch (req.method) {
        case "GET": {
            let email = req.query.email
            let user = await usersCollection.findOne({ email: email })
            res.json({ status: 200, data: user });
        }
            break;
        case "PUT": {
            let status = req.query.status
            let id = req.query.id
            let updateDoc = {
                $set: {
                    verified: status
                }
            }
            let result = await usersCollection.updateOne({ _id: ObjectId(id) }, updateDoc, { upsert: true })
            res.json({ status: 200, data: result });
        }
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}