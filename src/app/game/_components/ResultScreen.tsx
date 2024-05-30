import { useRouter } from "next/navigation";

interface ResultScreenProps {
  score: number;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score }) => {
  const router = useRouter();

  return (
    <>
      <div className="mb-4 text-center text-xl">
        ゲーム終了！ 最終スコア: {score}
      </div>
      <button
        className="rounded-full bg-sky-500 px-4 py-2 text-white shadow-sm hover:bg-sky-600"
        onClick={() => {
          router.push("/");
        }}
      >
        戻る
      </button>
    </>
  );
};
