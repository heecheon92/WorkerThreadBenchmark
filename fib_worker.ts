import { fib, fibdp, fibmat } from "@/fib";

addEventListener("message", (event) => {
  const { type, param } = event.data;
  const s = performance.now();
  let res = 0;
  switch (type) {
    case "fib":
      res = fib(param);
      break;
    case "fibdp":
      res = fibdp(param);
      break;
    case "fibmat":
      res = fibmat(param);
      break;
  }
  const e = performance.now();
  postMessage({ type, res, tc: e - s });
});
