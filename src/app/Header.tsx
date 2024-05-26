import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b px-12 py-5 ">
      <h1 className="text-2xl">
        <Link href="/">VOCALOID TYPING</Link>
      </h1>
      <div>
        <div className="flex items-center justify-between">
          <nav className="px-10">
            <Link href="/ranking">ランキング</Link>
          </nav>
          <button className=" rounded-full bg-sky-500 px-4 py-2 text-white shadow-sm hover:bg-sky-600 ">
            ログイン
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
