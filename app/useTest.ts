"use client";

import { fib, fibdp, fibmat } from "@/fib";
import { useCallback, useEffect, useRef, useState } from "react";

export type FibExecutionResult = {
  recursive: number;
  dp: number;
  matrix: number;
};
export type WorkerResponse = {
  type: string;
  res: number;
  tc: number;
};

export function useMainTest(param: number) {
  const [mainResult, setMainResult] = useState<FibExecutionResult>({
    recursive: 0,
    dp: 0,
    matrix: 0,
  });
  const onClickFib = useCallback(() => {
    const s = performance.now();
    fib(param);
    const e = performance.now();
    setMainResult((prev) => ({ ...prev, recursive: e - s }));
  }, [param]);
  const onClickFibDp = useCallback(() => {
    const s = performance.now();
    fibdp(param);
    const e = performance.now();
    setMainResult((prev) => ({ ...prev, dp: e - s }));
  }, [param]);
  const onClickFibMat = useCallback(() => {
    const s = performance.now();
    fibmat(param);
    const e = performance.now();
    setMainResult((prev) => ({ ...prev, matrix: e - s }));
  }, [param]);
  return { mainResult, onClickFib, onClickFibDp, onClickFibMat };
}

export function useBackgroundTest(param: number) {
  const workerRef = useRef<Worker>();
  const [backgroundResult, setBackgroundResult] = useState<FibExecutionResult>({
    recursive: 0,
    dp: 0,
    matrix: 0,
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../fib_worker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
      if (event.data.type === "fib")
        setBackgroundResult((prev) => ({ ...prev, recursive: event.data.tc }));
      else if (event.data.type === "fibdp")
        setBackgroundResult((prev) => ({ ...prev, dp: event.data.tc }));
      else if (event.data.type === "fibmat")
        setBackgroundResult((prev) => ({ ...prev, matrix: event.data.tc }));
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const onClickFibBackground = useCallback(() => {
    workerRef.current?.postMessage({ type: "fib", param });
  }, [param]);

  const onClickFibDpBackground = useCallback(() => {
    workerRef.current?.postMessage({ type: "fibdp", param });
  }, [param]);

  const onClickFibMatBackground = useCallback(() => {
    workerRef.current?.postMessage({ type: "fibmat", param });
  }, [param]);

  return {
    backgroundResult,
    onClickFibBackground,
    onClickFibDpBackground,
    onClickFibMatBackground,
  };
}
