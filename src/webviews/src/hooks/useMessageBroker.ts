type MessageCommands = 'error' | 'copyToClipboard' | 'sendAnalytics';

export const useMessageBroker = () => {
  return {
    postMessage: ({
      command,
      value,
    }: {
      command: MessageCommands;
      value: unknown;
    }) => {
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
