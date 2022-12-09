const chocoReducer = require("./app/features/chocolate/chocolateSlice");
const cakeReducer = require("./app/features/cake/cakeSlice");
const reduxLogger = require("redux-logger");
const { configureStore } = require("@reduxjs/toolkit");
const cakeActions = require("./app/features/cake/cakeSlice").cakeActions;
const chocoActions =
  require("./app/features/chocolate/chocolateSlice").chocoActions;
const fetchUsers = require("./app/features/user/userSlice").fetchUsers;
const userReducer = require("./app/features/user/userSlice");
const logger = reduxLogger.createLogger();
const store = configureStore({
  reducer: {
    cake: cakeReducer,
    choco: chocoReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
console.log("initialState", store.getState());
const unsubscribe = store.subscribe(() => {
  // console.log("initialState", store.getState());
});
// store.dispatch(cakeActions.cakeOrdered(2));
// store.dispatch(cakeActions.cakeOrdered(2));
// store.dispatch(cakeActions.cakeRestoked(2));
// store.dispatch(chocoActions.chocoRestocked(2));
store.dispatch(fetchUsers());
unsubscribe();
