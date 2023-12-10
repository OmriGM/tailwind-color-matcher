import { useVsCodeBridge } from './useMessageBroker';

export const useCopy = () => {
  const { postMessage } = useVsCodeBridge();

  return {
    copy: (value: string) => {
      postMessage({
        command: 'copyToClipboard',
        value,
      });
    },
  };
};
