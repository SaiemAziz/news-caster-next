import SashiDoTeachableMachine from "@sashido/teachablemachine-node";

const model = new SashiDoTeachableMachine({
  modelUrl: process.env.TM_MODEL_URL,
});

const handler = async (req, res) => {
  switch (req?.method) {
    case "POST": {
      const prediction = await model.classify({
        imageUrl: req.body.url,
      });
      res.json(prediction);
    }
  }
};
export default handler;
