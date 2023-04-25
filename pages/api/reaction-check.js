import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("newsCasterNext");
    let newsCollection = await db.collection("news");
    let usersCollection = await db.collection("users");
    let reactionsCollection = await db.collection("reactions");
    switch (req.method) {
        case "GET":
            {
                let reporterID = req.query.reporterID
                let newsID = req.query.newsid
                // let reporter = await usersCollection.findOne({ email: userEmail })

                let reaction = await reactionsCollection.findOne({ reporterID: reporterID, newsID: newsID })

                let likeCount = await reactionsCollection.find({ newsID: newsID, reaction: "liked" }).toArray()
                let disLikeCount = await reactionsCollection.find({ newsID: newsID, reaction: "disliked" }).toArray()

                res.json({ status: 200, data: reaction?.reaction || "none", likeCount: likeCount.length, disLikeCount: disLikeCount.length });
            }
            break;
        case "DELETE":
            {
                let reporterID = req.query.reporterID
                let newsID = req.query.newsid
                // let reporter = await usersCollection.findOne({ email: userEmail })
                let reaction = await reactionsCollection.deleteOne({ reporterID: reporterID, newsID: newsID })
                // let likeCount = await reactionsCollection.find({ newsID: newsID, reaction: "liked" }).toArray()
                // if (reaction)
                //     return res.json({ status: 200, data: reaction.reaction, likeCount: likeCount.length });
                res.json({ status: 200, data: "no reaction" })
            }
            break;
        case "PUT":
            {
                let reporterID = req.query.reporterID
                let newsID = req.query.newsid
                let react = req.query.react
                let updateDoc = {
                    $set: { reaction: react }
                }
                // let reporter = await usersCollection.findOne({ email: userEmail })
                let reaction = await reactionsCollection.updateOne(
                    { reporterID: reporterID, newsID: newsID },
                    updateDoc,
                    { upsert: true }
                )
                // let likeCount = await reactionsCollection.find({ newsID: newsID, reaction: "liked" }).toArray()
                // if (reaction)
                //     return res.json({ status: 200, data: reaction.reaction, likeCount: likeCount.length });
                res.json({ status: 200, data: react })
            }
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}