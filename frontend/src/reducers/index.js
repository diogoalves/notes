import { NOTIFICATION_CLEAN, NOTIFICATION_SHOW } from '../actions';

export const initialState = {
  account: {
    user: null,
    error: null,
    authenticating: false
  },
  connection: {
    connected: false,
    error: null
  },
  notes: [{ id: 1, content: 'lorem ipslum' }],
  notification: ''
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case NOTIFICATION_CLEAN:
      return {
        ...state,
        notification: null
      };

    case NOTIFICATION_SHOW:
      return {
        ...state,
        notification: state.notification
          ? `${state.notification}, '${payload}`
          : payload
      };

    default:
      return state;
  }
};

export default reducer;
