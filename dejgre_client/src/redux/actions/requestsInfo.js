export const BEGIN_REQUEST = "BEGIN_REQUEST";
export const FINISH_REQUEST = "FINISH_REQUEST";
export const FAIL_REQUEST = "FAIL_REQUEST";

export const beginRequest = (name) => ({
  type: BEGIN_REQUEST,
  name
});

export const finishRequest = (name) => ({
  type: FINISH_REQUEST,
  name
});

export const failRequest = (name) => ({
  type: FAIL_REQUEST,
  name
});