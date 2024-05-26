"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const title = "VOCALOID TYPING";

  useEffect(() => {
    let index = 0;
    const typing = () => {
      if (index < title.length) {
        setText((prev) => prev + title.charAt(index));
        index++;
        const timerId = window.setTimeout(typing, 100); // タイピング速度(ミリ秒単位)
        return timerId;
      } else {
        setIsCompleted(true); // テキストがすべて表示されたら状態を更新
      }
    };

    const timerId = typing();
    // コンポーネントがアンマウントされたときにタイマーをクリア
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div
      className="flex h-screen flex-col items-center justify-center"
      // style={{
      //   backgroundImage: "url(/test_miku.png)",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   width: "100vw",
      //   height: "100vh",
      // }}
    >
      <div className="mb-6 text-3xl ">
        <span className="text-3xl">{text}</span>
        {/* 文字が表示し終わったらテキストカーソルを点滅させる */}
        <span className={`text-3xl ${isCompleted ? "animate-blink" : ""}`}>
          |
        </span>
      </div>
      {/* 「STARTボタン」にすると すぐ始まる→唐突すぎる、確認画面を挟む→スタートすると思ってたのに始まらない */}
      {/* となりそうなので、「PLAYボタン」として押した後に確認画面を挟む形式にする */}
      <button
        className="mb-6 rounded-full bg-sky-500 px-6 py-3 text-white shadow-sm hover:bg-sky-600"
        onClick={() => {
          router.push("/confirmation");
        }}
      >
        プレイする
      </button>
      <div className="text-center">
        VOCALOID TYPINGはボカロ曲の歌詞を入力して
        <br />
        タイピングを学べるゲームです
        <br />
      </div>
    </div>
  );
}
