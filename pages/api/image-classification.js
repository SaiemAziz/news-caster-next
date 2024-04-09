import SashiDoTeachableMachine from "@sashido/teachablemachine-node";

const model = new SashiDoTeachableMachine({
  modelUrl: process.env.TM_MODEL_URL,
});

export default async function handler(req, res) {
  switch (req?.method) {
    case "GET": {
      const prediction = await model.classify({
        imageUrl: req.query.url,
      });
      res.json(prediction);
    }
    default:
      res.json({});
  }
}
