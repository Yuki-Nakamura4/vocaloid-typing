"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { problems } from "../../data/problems";

export default function Game() {
  const router = useRouter();
  const [currentProblem, setCurrentProblem] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1分（60秒）
  const [typedIndex, setTypedIndex] = useState(0);
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
  }, [currentProblem]);

  const getRandomProblem = () => {
    if (timeLeft <= 0) {
      router.push("/result");
    }
    if (usedProblems.size >= problems.length) {
      setUsedProblems(new Set()); // 全ての問題を使い切ったらリセット
    }
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * problems.length);
    } while (usedProblems.has(randomIndex));

    setUsedProblems((prev) => new Set(prev).add(randomIndex));
    setCurrentProblem(problems[randomIndex]);
    setTypedIndex(0);
    setTypedAnswer("");
  };

  const handleKeyDown = (e: { key: string }) => {
    if (timeLeft > 0 && currentProblem) {
      const typedChar = e.key.toLowerCase();
      const currentChar = currentProblem.answer[typedIndex];
      if (typedChar === currentChar) {
        setTypedIndex((prev) => prev + 1);
        setTypedAnswer((prev) => prev + typedChar);
        if (typedIndex === currentProblem.answer.length - 1) {
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
        {currentProblem.problem.split("").map((char: string, index: any) => (
          <span key={index} style={{ opacity: index < typedIndex ? 0.5 : 1 }}>
            {char}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-6 text-3xl">タイピングゲーム</h1>
      {timeLeft > 0 ? (
        <>
          <div className="text-xl">残り時間: {timeLeft} 秒</div>
          <div className="my-8">{renderProblem()}</div>
          <div className="text-xl">スコア: {score}</div>
        </>
      ) : (
        <div className="text-xl">ゲーム終了！最終スコア: {score}</div>
      )}
    </div>
  );
}
