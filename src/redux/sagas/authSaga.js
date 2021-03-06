import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  LOADING_SUCCESS,
  LOADING_FAILURE,
  LOADING_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
} from "../types";

// LOGIN
function loginUserAPI(loginData) {
  return axios.post("/api/jwt", loginData);
}

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });

    yield put({
      type: LOADING_REQUEST,
      payload: localStorage.getItem("jwt"),
    });

    yield put(push(`/`));
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

// REGISTER
function registerAPI(registerData) {
  return axios.post("/api/student", registerData);
}

function* registerUser(action) {
  try {
    const result = yield call(registerAPI, action.payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });

    yield put(push("/login"));
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

// LOGOUT
function* logout() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

// Loading
function loadingAPI(token) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
    return axios.get("/api/auth", config).catch((e) => {
      localStorage.removeItem("jwt");
    });
  } else {
    return axios.get("/api/un-auth", config);
  }
}

//LOADING
function* loading(action) {
  const result = yield call(loadingAPI, action.payload);

  console.log(result);
  try {
    yield put({
      type: LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

function* watchLoading() {
  yield takeEvery(LOADING_REQUEST, loading);
}

//authSaga() 여러 Saga 통합
export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchLoading),
    fork(watchRegisterUser),
  ]);
}
