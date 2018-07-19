export const NOTIFICATION_CLEAN = 'NOTIFICATION_CLEAN';
export const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';

const createAction = type => payload => ({ type, payload });

export default {
  cleanNotification: createAction(NOTIFICATION_CLEAN),
  showNotification: createAction(NOTIFICATION_SHOW)
};
