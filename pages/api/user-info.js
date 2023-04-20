
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
        // case "PUT": {
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
        // }
        //     break;
        default:
            res.json({ status: 401, message: "Forbidden Access" });
    }
}