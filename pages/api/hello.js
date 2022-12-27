// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import news from '../../assets/others/news.json'
export default function handler(req, res) {
  res.status(200).json({ news })
}
