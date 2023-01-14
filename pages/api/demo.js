
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("newsCasterNext");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("posts").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allNews = await db.collection("news").find({}).toArray();
      res.json({ status: 200, data: allNews });
      break;
  }
}