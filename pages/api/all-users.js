
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("newsCasterNext");
    let usersCollection = await db.collection("users");
    switch (req.method) {
        case "GET": {
            let allUsers = await usersCollection.find({}).toArray()
            res.json({ status: 200, data: allUsers });
        }
            break;
        case "PUT": {
            // let { userName, fullName, password, email, birthdate, verified, displayURL, role } = req.body
            let { email } = req.body
            // delete req.body.email
            if (req.body._id)
                delete req.body._id
            let updateDoc = {
                $set: {
                    ...req.body
                }
            }
            console.log(req.body);
            let result = await usersCollection.updateOne(
                { email: email },
                updateDoc,
                { upsert: true }
            )
            let myUser = await usersCollection.findOne({ email: email })
            res.json({ status: 200, data: myUser });
        }
            break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}