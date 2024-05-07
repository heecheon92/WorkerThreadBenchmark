"use client";

import { useEffect, useState } from "react";
import { useBackgroundTest, useMainTest } from "./useTest";

export default function Home() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [param, setParam] = useState(0);
  const [txt, setTxt] = useState("0");

  const { mainResult, onClickFib } = useMainTest(param);
  const { backgroundResult, onClickFibBackground } = useBackgroundTest(param);

  return (
    <main
      className="flex min-h-screen flex-col items-center space-y-4 p-24"
      suppressHydrationWarning
    >
      <div className="flex flex-row space-x-4 items-center">
        <input
          type="text"
          className="p-2 rounded-md bg-white"
          value={txt}
          onChange={(e) => {
            if (e.target.value === "") {
              setTxt("");
              setParam(0);
              return;
            }
            if (/^\d+$/.test(e.target.value)) {
              setTxt(e.target.value);
              setParam(parseInt(e.target.value));
            }
          }}
        />
        <span>{"40 ~ 45 사이의 값 추천"}</span>
      </div>
      <span className="text-2xl font-bold">{`${now.getSeconds()} <- 가 멈추면 메인스레드 block 상태`}</span>
      <section className="flex flex-row space-x-10 w-full">
        <div className="flex flex-col space-x-2 space-y-2 bg-white w-1/2 rounded-md p-4">
          <span>{"Executes in main"}</span>
          <button
            disabled={param > 45}
            onClick={onClickFib}
            className="disabled:opacity-50 disabled:cursor-not-allowed bg-green-200 rounded-md p-2 shrink disabled:bg-red-200"
          >{`fib rec executed in: ${mainResult.recursive}ms`}</button>
        </div>
        <div className="flex flex-col space-x-2 space-y-2 bg-white w-1/2 rounded-md p-4">
          <span>{"Executes in background"}</span>
          <button
            className="bg-green-200 rounded-md p-2 shrink"
            onClick={onClickFibBackground}
          >{`fib rec executed in: ${backgroundResult.recursive}ms`}</button>
        </div>
      </section>
    </main>
  );
}
