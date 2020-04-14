import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  name: null,
  avatar: null,
  createdAt: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        const { id, name, email, avatar, createdAt } = action.payload;
        draft.id = id;
        draft.name = name;
        draft.email = email;
        draft.avatar = avatar;
        draft.createdAt = createdAt;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.id = '';
        draft.name = '';
        draft.email = '';
        draft.avatar = '';
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
