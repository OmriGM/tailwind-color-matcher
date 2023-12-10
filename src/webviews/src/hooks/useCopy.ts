import { useMessageBroker } from './useMessageBroker';

export const useCopy = () => {
  const { postMessage } = useMessageBroker();

  return {
    copy: (value: string) => {
      postMessage({
        command: 'copyToClipboard',
        value,
      });
    },
  };
};
