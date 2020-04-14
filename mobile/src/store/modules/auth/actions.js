export function signInRequest(id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { id },
  };
}

export function signInSuccess(data) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: data,
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
