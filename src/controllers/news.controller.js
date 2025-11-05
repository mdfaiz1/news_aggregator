import axios from "axios";
export const getNews = async (req, res) => {
  try {
    const {
      q, // required
      lang, // optional
      country, // optional
      max = 10, // optional, default 10
      inAttr, // optional
      nullable, // optional
      from, // optional
      to, // optional
      sortby, // optional
      page = 1, // optional, default 1
      truncate, // optional
    } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Query parameter 'q' is required",
      });
    }

    const API_KEY = process.env.GNEWS_API_KEY;

    // Build API URL dynamically
    let url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      q
    )}&apikey=${API_KEY}`;

    if (lang) url += `&lang=${lang}`;
    if (country) url += `&country=${country}`;
    if (max) url += `&max=${max}`;
    if (inAttr) url += `&in=${inAttr}`;
    if (nullable) url += `&nullable=${nullable}`;
    if (from) url += `&from=${from}`;
    if (to) url += `&to=${to}`;
    if (sortby) url += `&sortby=${sortby}`;
    if (page) url += `&page=${page}`;
    if (truncate) url += `&truncate=${truncate}`;

    const response = await axios.get(url);

    res.status(200).json({
      success: true,
      total: response.data.totalArticles,
      articles: response.data.articles,
    });
  } catch (error) {
    console.error("GNews API Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
