import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("newsCasterNext");
    switch (req.method) {
        case "GET":
            const allNews = await db.collection("news").find({}).toArray();
            res.json({ status: 200, data: allNews });
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}