const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // すべてのリクエストに対してCORSを許可

// 仮のランキングデータ
const mockRankingData = [
  { username: "Alice", score: 1500 },
  { username: "Bob", score: 1200 },
  { username: "Charlie", score: 1000 },
  { username: "David", score: 900 },
  { username: "Eva", score: 800 },
];

// ランキングデータを返すエンドポイント
app.get("/api/ranking", (req, res) => {
  res.json(mockRankingData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
