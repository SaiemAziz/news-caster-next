import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("newsCasterNext");
    let usersCollection = await db.collection("users");
    switch (req.method) {

        case "GET":
            {
                let allUSers = await usersCollection.find({}).toArray();
                let avgRating = 0;
                let userCount = 0;
                allUSers.forEach(user => {
                    if (user?.rating) {
                        avgRating += parseInt(user.rating)
                        userCount++
                    }
                })
                avgRating /= userCount
                res.json({ status: 200, data: { avgRating, userCount } })
            }
            break;
        case "PUT":
            {
                let rating = req.body.rating;
                let userId = req.body.id;
                let updateDoc = {
                    $set: {
                        rating: rating
                    }
                }
                let result = await usersCollection.updateOne({ _id: ObjectId(userId) }, updateDoc, { upsert: true });
                res.json({ status: 200, data: result })
            }
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}