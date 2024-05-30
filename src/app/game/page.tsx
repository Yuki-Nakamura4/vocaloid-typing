"use client";
import React, { useState, useEffect } from "react";
import { ConfirmationScreen } from "./_components/ConfirmationScreen"; // Import the Confirmation component
import { problems } from "../../data/problems";
import typeSound from "../../../public/sound/typeSound.mp3";
import correctSound from "../../../public/sound/correctSound.mp3";
import missTypeSound from "../../../public/sound/missSound.mp3";
import { ResultScreen } from "./_components/ResultScreen";
import { useRouter } from "next/navigation";

export default function Game() {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentProblem, setCurrentProblem] = useState<any>();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [usedProblems, setUsedProblems] = useState(new Set());
  const [showConfirmation, setShowConfirmation] = useState(true);

  const typeAudio = new Audio(typeSound);
  const correctAudio = new Audio(correctSound);
  const missTypeAudio = new Audio(missTypeSound);

  const playTypeSound = () => typeAudio.play();
  const playCorrectSound = () => correctAudio.play();
  const playMissTypeSound = () => missTypeAudio.play();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showConfirmation) getRandomProblem();
  }, [showConfirmation]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentProblem, typedIndex]);

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

    if (randomIndex !== null) {
      setUsedProblems((prev) => new Set(prev).add(randomIndex));
      setCurrentProblem(problems[randomIndex]);
      setTypedIndex(0);
      setTypedAnswer("");
    } else {
      setUsedProblems(new Set());
      const newRandomIndex = Math.floor(Math.random() * problems.length);
      setCurrentProblem(problems[newRandomIndex]);
      setTypedIndex(0);
      setTypedAnswer("");
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (timeLeft > 0 && currentProblem) {
      const typedChar = e.key.toLowerCase();
      const currentChar = currentProblem.answer[typedIndex];
      if (typedChar === currentChar) {
        setTypedIndex((prevIndex) => prevIndex + 1);
        setTypedAnswer((prev) => prev + typedChar);

        if (typedIndex + 1 === currentProblem.answer.length) {
          setScore((prev) => prev + 100);
          playCorrectSound();
          getRandomProblem();
        } else {
          playTypeSound();
        }
      } else {
        playMissTypeSound();
      }
    }

    if (e.key === "Enter" && showConfirmation) {
      setGameStarted(true); // ゲームを開始
      setShowConfirmation(false); // 確認画面を非表示
    }

    if (e.key === "Escape") {
      router.push("/confirmation");
    }
  };

  const renderProblem = () => {
    if (!currentProblem) return null;
    return (
      <div className="w-[calc(100vw/3)] rounded-3xl border border-gray-300 py-6">
        <div className="text-xl">
          <div className="text-center">{currentProblem.problem}</div>
          <div className="text-center">
            {currentProblem.answer.split("").map((char: string, index: any) => (
              <span
                key={index}
                className={`${index < typedIndex ? "text-sky-500" : ""}`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
        <div className="text-md mt-6 text-center text-slate-500">
          {currentProblem.title} / {currentProblem.author}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {!gameStarted && <ConfirmationScreen />}
      {gameStarted && timeLeft > 0 ? (
        <>
          <div className="text-xl">
            残り時間:
            <span className={`${timeLeft <= 5 ? "text-rose-500" : ""} ml-2`}>
              {timeLeft}秒
            </span>
          </div>
          <div className="my-8">{renderProblem()}</div>
          <div className="text-xl">スコア: {score}</div>
        </>
      ) : (
        <ResultScreen score={score} />
      )}
    </div>
  );
}
