"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Confirmation() {
  const router = useRouter();

  useEffect(() => {
    // キーボードのEnterキーが押されたときにゲーム画面に遷移
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Enter") {
        router.push("/game");
      }
    };

    // ブラウザのキーボードイベントを監視
    window.addEventListener("keydown", handleKeyDown);

    // コンポーネントがアンマウントされたときにイベントリスナーを解除
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-center">Enterキーを押すとゲームが開始します</div>
    </div>
  );
}