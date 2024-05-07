export function fib(n: number): number {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}
export function fibdp(n: number): number {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}
export function fibmat(n: number): number {
  let mat = [
    [1, 1],
    [1, 0],
  ];
  const pow = (a: number[][], b: number[][]): number[][] => {
    const c = [
      [0, 0],
      [0, 0],
    ];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        for (let k = 0; k < 2; k++) {
          c[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return c;
  };
  let res = [
    [1, 0],
    [0, 1],
  ];
  while (n) {
    if (n & 1) res = pow(res, mat);
    mat = pow(mat, mat);
    n >>= 1;
  }
  return res[0][1];
}
