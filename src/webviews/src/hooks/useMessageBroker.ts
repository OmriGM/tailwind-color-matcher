export const useVsCodeBridge = () => {
  return {
    postMessage: ({ command, value }: { command: string; value: unknown }) => {
      tsvscode.postMessage({
        command,
        value,
      });
    },
    postError: (error: string) => {
      tsvscode.postMessage({
        command: 'error',
        value: error,
      });
    },
  };
};
