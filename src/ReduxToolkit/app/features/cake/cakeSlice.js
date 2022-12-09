const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numOfCakes: 20,
};
const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    cakeOrdered: (state, action) => {
      state.numOfCakes = state.numOfCakes - action.payload;
    },
    cakeRestoked: (state, action) => {
      state.numOfCakes = state.numOfCakes + action.payload;
    },
  },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
