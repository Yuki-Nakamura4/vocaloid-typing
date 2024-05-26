"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { problems } from "../../data/problems";

export default function Game() {
  const router = useRouter();
  const [currentProblem, setCurrentProblem] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1分
  const [typedIndex, setTypedIndex] = useState(0); // 入力された文字数
  const [typedAnswer, setTypedAnswer] = useState("");
  const [usedProblems, setUsedProblems] = useState(new Set());

  useEffect(() => {
    // タイマーのセットアップ
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getRandomProblem();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentProblem, typedIndex]);

  // problemsのインデックスをシャッフル
  const shuffledIndices = problems
    .map((_, index) => index)
    .sort(() => Math.random() - 0.5);

  const getRandomProblem = () => {
    let randomIndex: number | null = null;
    for (let i = 0; i < problems.length; i++) {
      const index = shuffledIndices[i];
      if (!usedProblems.has(index)) {
        randomIndex = index;
        break;
      }
    }

    // if(randaomIndex)だとindexが0の場合に問題が出ないので注意
    if (randomIndex !== null) {
      // 使用済み問題セットに追加
      setUsedProblems((prev) => new Set(prev).add(randomIndex));

      // 問題を設定
      setCurrentProblem(problems[randomIndex]);
      setTypedIndex(0);
      setTypedAnswer("");
    } else {
      console.error("すべての問題が使用済みです。");
      setUsedProblems(new Set());

      // 新しい問題を選択してゲームを継続
      const newRandomIndex = Math.floor(Math.random() * problems.length);
      setCurrentProblem(problems[newRandomIndex]);
      setTypedIndex(0);
      setTypedAnswer("");
    }
  };

  // キーボードの入力を監視
  const handleKeyDown = (e: { key: string }) => {
    if (timeLeft > 0 && currentProblem) {
      const typedChar = e.key.toLowerCase();
      const currentChar = currentProblem.answer[typedIndex];
      if (typedChar === currentChar) {
        setTypedIndex((prevIndex) => prevIndex + 1);
        setTypedAnswer((prev) => prev + typedChar);

        if (typedIndex + 1 === currentProblem.answer.length) {
          setScore((prev) => prev + 100);
          getRandomProblem();
        }
      }
    }
  };

  const renderProblem = () => {
    if (!currentProblem) return null;
    return (
      <div className="text-xl">
        <div className="text-center">{currentProblem.problem}</div>
        <div className="text-center">
          {currentProblem.answer.split("").map((char: string, index: any) => (
            <span key={index} style={{ opacity: index < typedIndex ? 0.5 : 1 }}>
              {char}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {/* <h1 className="mb-6 text-3xl">タイピングゲーム</h1> */}
      {timeLeft > 0 ? (
        <>
          <div className="text-xl">残り時間: {timeLeft} 秒</div>
          <div className="my-8">{renderProblem()}</div>
          <div className="text-xl">スコア: {score}</div>
        </>
      ) : (
        <>
          {" "}
          <div className="mb-4 text-xl">ゲーム終了！最終スコア: {score}</div>
          <button
            className="rounded-full bg-sky-500 px-4 py-2 text-white shadow-sm hover:bg-sky-600"
            onClick={() => {
              router.push("/");
            }}
          >
            戻る
          </button>
        </>
      )}
    </div>
  );
}
