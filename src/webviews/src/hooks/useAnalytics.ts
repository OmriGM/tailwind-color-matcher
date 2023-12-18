import { useMessageBroker } from './useMessageBroker';

export const useSendAnalytics = () => {
  const { postMessage } = useMessageBroker();

  return {
    sendAnalytics: ({
      eventName,
      eventProps,
    }: {
      eventName: string;
      eventProps: Record<string, string | number | object>;
    }) => {
      postMessage({
        command: 'sendAnalytics',
        value: { eventName, eventProps },
      });
    },
  };
};
