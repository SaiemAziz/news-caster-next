import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("newsCasterNext");
    switch (req.method) {
        case "GET":
            const cat = req.query.category
            let query;
            if(cat === "all")
                query = {}
            else
                query = {category: cat}
            const allNews = await db.collection("news").find(query).toArray();

            res.json({ status: 200, data: allNews });
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}