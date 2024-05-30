"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface RankingResult {
  username: string;
  score: number;
}

export default function Ranking() {
  const [rankingData, setRankingData] = useState<RankingResult[]>([]);

  useEffect(() => {
    // ランキングデータを取得するAPI呼び出し
    async function fetchRankingData() {
      try {
        const response = await axios.get("http://localhost:3001/api/ranking"); // 仮のAPIエンドポイント
        setRankingData(response.data);
        console.log("Ranking data fetched:", response.data);
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      }
    }

    fetchRankingData();
  }, []);

  return (
    <div>
      <div className="mt-12 text-center text-3xl">ランキング</div>
      <div className="text-md mt-4 text-center text-slate-800">
        上位を目指してがんばりましょう！
      </div>
      <ul className="mt-6">
        {rankingData.map((result, index) => (
          <li key={index} className="mt-3 text-center text-2xl">
            {index + 1}位 {result.username || "名無し"}: {result.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
