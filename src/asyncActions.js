const { default: axios } = require("axios");
const { default: produce } = require("immer");
const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");
const initialState = {
  loading: false,
  error: "",
  data: [],
};
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};
const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    error: error,
  };
};
const fetchUsersSuccess = (data) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    data: data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return produce(state, (draft) => {
        draft.loading = true;
      });

    case FETCH_USERS_FAILED:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.error = action.error;
      });
    case FETCH_USERS_SUCCEEDED:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.data = action.data;
      });
    default:
      return state;
  }
};
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch((err) => dispatch(fetchUsersFailed(err.message)));
  };
};

const store = createStore(reducer, applyMiddleware(thunk));
const unsubscribe = store.subscribe(() => {
  console.log("UpdateState", store.getState());
});
store.dispatch(fetchUsers());
