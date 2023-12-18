import * as Mixpanel from 'mixpanel';

let mixpanelInstance: Mixpanel.Mixpanel;
const mixpanelToken: string = '039a7132d6f151fdbdb5edea456a64f3'; // Remove this token in the future, for now it's fine

export const mixpanelService = {
  init: () => {
    if (!mixpanelToken) {
      console.warn('Mixpanel token not found');
      return;
    }
    if (!mixpanelInstance) {
      mixpanelInstance = Mixpanel.init(mixpanelToken, { debug: true });
    }
  },
  trackEvent: (eventName: string, eventProperties: Record<string, string>) => {
    if (mixpanelInstance) {
      mixpanelInstance.track(eventName, {
        ...eventProperties,
      });
    } else {
      console.warn('Mixpanel has not been initialized');
    }
  },
  trackError: (eventName: string, eventProperties: Record<string, string>) => {
    if (mixpanelInstance) {
      mixpanelInstance.track(eventName, {
        ...eventProperties,
        is_error: true,
      });
    } else {
      console.warn('Mixpanel has not been initialized');
    }
  },
};
