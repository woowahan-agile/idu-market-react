import {
  BASIC_BOARD_GET_REQUEST,
  BASIC_BOARD_GET_SUCCESS,
  BASIC_BOARD_GET_FAILURE,
  BOARD_WRITE_REQUEST,
  BOARD_WRITE_SUCCESS,
  BOARD_WRITE_FAILURE,
  BOARD_DELETE_REQUEST,
  BOARD_DELETE_SUCCESS,
  BOARD_DELETE_FAILURE,
  BOARD_UPDATE_REQUEST,
  BOARD_UPDATE_SUCCESS,
  BOARD_UPDATE_FAILURE,
  BOARD_DETAIL_REQUEST,
  BOARD_DETAIL_SUCCESS,
  BOARD_DETAIL_FAILURE,
  BOARD_STATUS_REQUEST,
  BOARD_STATUS_SUCCESS,
  BOARD_STATUS_FAILURE,
  BOARD_HIT_REQUEST,
  BOARD_HIT_SUCCESS,
  BOARD_HIT_FAILURE,
  BOARD_WATCHLIST_ADD_REQUEST,
  BOARD_WATCHLIST_ADD_SUCCESS,
  BOARD_WATCHLIST_ADD_FAILURE,
  BOARD_WATCHLIST_DELETE_REQUEST,
  BOARD_WATCHLIST_DELETE_SUCCESS,
  BOARD_WATCHLIST_DELETE_FAILURE,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAILURE,
} from "../types";

const initialState = {
  data: [],
  loading: false,
  num: "",
  studentName: "",
  studentId: "",
  title: "",
  content: "",
  hit: "",
  price: "",
  status: "",
  inDate: "",
  updateDate: "",
  isLoading: false,
  msg: "",
  isWatchList: null,
  categoryName: "",
  profilePath: "",
};

const boards = (state = initialState, action) => {
  switch (action.type) {
    case BOARD_WATCHLIST_DELETE_REQUEST:
    case BOARD_WATCHLIST_ADD_REQUEST:
    case BOARD_HIT_REQUEST:
    case BOARD_STATUS_REQUEST:
    case IMAGE_DELETE_REQUEST:
    case BOARD_DELETE_REQUEST:
    case BASIC_BOARD_GET_REQUEST:
      return {
        ...state,
        loading: true,
        msg: "",
      };

    case BASIC_BOARD_GET_SUCCESS:
      return {
        ...state,
        data: [...action.payload.boards],
        loading: false,
        msg: action.payload.msg,
      };

    case BASIC_BOARD_GET_FAILURE:
      return {
        ...state,
        loading: false,
        msg: "",
      };

    case BOARD_UPDATE_REQUEST:
    case BOARD_WRITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        msg: "",
        num: "",
      };

    case BOARD_UPDATE_SUCCESS:
    case BOARD_WRITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.msg,
        num: action.payload.num,
      };

    case BOARD_UPDATE_FAILURE:
    case BOARD_WRITE_FAILURE:
      return {
        ...state,
        data: [],
        msg: action.payload.data.msg,
      };

    case BOARD_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        msg: "",
        num: "",
      };

    case BOARD_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        num: action.payload.board.num,
        studentName: action.payload.board.studentName,
        nickname: action.payload.board.nickname,
        studentId: action.payload.board.studentId,
        title: action.payload.board.title,
        content: action.payload.board.content,
        status: action.payload.board.status,
        hit: action.payload.board.hit,
        price: action.payload.board.price,
        inDate: action.payload.board.inDate,
        updateDate: action.payload.board.updateDate,
        msg: action.payload.msg,
        isWatchList: action.payload.isWatchList,
        categoryName: action.payload.board.categoryName,
        profilePath: action.payload.board.profilePath,
      };

    case BOARD_DETAIL_FAILURE:
      return {
        ...state,
        num: "",
        studentName: "",
        title: "",
        content: "",
        status: "",
        hit: "",
        price: "",
        inDate: "",
        updateDate: "",
        isLoading: false,
        profilePath: "",
        isWatchList: "",
        msg: action.payload.data.msg,
      };

    case IMAGE_DELETE_SUCCESS:
    case BOARD_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };

    case BOARD_HIT_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        hit: action.payload.hit,
      }  
    case BOARD_HIT_FAILURE:
    case IMAGE_DELETE_FAILURE:
    case BOARD_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
      };

    case BOARD_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        status: action.payload.status,
      };

    case BOARD_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
        status: "",
        isWatchList: null,
      };

    case BOARD_WATCHLIST_ADD_SUCCESS:
      return {
        ...state,
        loading: true,
        isWatchList: 1,
        msg: action.payload.msg,
      };

    case BOARD_WATCHLIST_DELETE_SUCCESS:
      return {
        ...state,
        loading: true,
        isWatchList: 0,
        msg: action.payload.msg,
      };
    case BOARD_WATCHLIST_DELETE_FAILURE:
    case BOARD_WATCHLIST_ADD_FAILURE:
      return {
        ...state,
        loading: true,
        isWatchList: null,
        msg: action.payload.data.msg,
      };

    default:
      return state;
  }
};

export default boards;
