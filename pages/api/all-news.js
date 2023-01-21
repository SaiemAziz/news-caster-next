import handleTokenizeClick from "../../components/functions/handleTokenizeClick";
import clientPromise from "../../lib/mongodb";

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
                let result = await newsCollection.insertOne(myNews)
                res.json({ status: 200, result });
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}