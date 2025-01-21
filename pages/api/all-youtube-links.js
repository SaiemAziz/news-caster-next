// import handleTokenizeClick from "../../components/functions/handleTokenizeClick";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("newsCasterNext");
  let ytLinksCollection = await db.collection("yotubeLinks");
  let result;
  let allLinks
  let id;
  switch (req.method) {
    case "GET":
      allLinks = await ytLinksCollection.find({}).toArray();
      res.json({ status: 200, data: await allLinks });
      break;
    case "POST":
      let myLink = req.body;
      result = await ytLinksCollection.insertOne(myLink);
      res.json({ status: 200, result });
      break;
    case "PUT":
      id = req.query.id;
      delete req.body._id;
      let updateDoc = {
        $set: {
          ...req.body,
        },
      };

      result = await ytLinksCollection.updateOne(
        { _id: ObjectId(id) },
        updateDoc,
        { upsert: true }
      );
      res.json({ status: 200, data: result });
      break;
    case "DELETE":
      id = req.query.id;
      result = await ytLinksCollection.deleteOne({ _id: ObjectId(id) });
      res.json({ status: 200, data: result });
      break;
    default:
      res.json({ status: 401, message: "Forbidden Access" });
  }
}
