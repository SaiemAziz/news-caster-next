// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import news from '../../assets/others/news.json'
import { loadModel } from '../../components/functions/handleTokenizeClick';
export default async function handler(req, res) {
  await loadModel();
  res.status(200).json("Model loading");
}
