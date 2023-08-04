interface DetectorOptions {
  timerSeconds: number;
  onDetect: () => void;
}

export const createRequestInfiniteLoopDetector = (
  maxRequestCount: number,
  options: Partial<DetectorOptions> = {}
) => {
  const { timerSeconds = 10, onDetect } = options;
  let resetRequestCountTimer: NodeJS.Timeout;
  let requestCount = 0;
  const increaseRequestCount = () => {
    requestCount += 1;
  };
  const debouncedResetRequestCount = (seconds: number) => {
    if (resetRequestCountTimer) clearTimeout(resetRequestCountTimer);
    resetRequestCountTimer = setTimeout(() => {
      requestCount = 0;
    }, seconds * 1000);
  };

  return () => {
    increaseRequestCount();
    debouncedResetRequestCount(timerSeconds);
    if (requestCount > maxRequestCount) {
      onDetect?.();
      return true;
    }

    return false;
  };
};
