import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ConfirmationScreen = () => {
  //   const router = useRouter();

  //   useEffect(() => {
  //     const handleKeyDown = (event: { key: string }) => {
  //       if (event.key === "Enter") {
  //         router.push("/game");
  //       }
  //     };

  //     window.addEventListener("keydown", handleKeyDown);

  //     return () => {
  //       window.removeEventListener("keydown", handleKeyDown);
  //     };
  //   }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-4 animate-bounce text-center text-lg">
        Enterキーを押すとゲームが開始します
      </div>
      <div className="text-center text-slate-800">
        ゲーム中にEscapeキーを押すと <br />
        最初からやり直すことができます
      </div>
    </div>
  );
};
