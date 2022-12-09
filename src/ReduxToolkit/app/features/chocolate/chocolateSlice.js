const { createSlice } = require("@reduxjs/toolkit");
const { cakeActions } = require("../cake/cakeSlice");

const initialState = {
  numOfChoco: 12,
};
const chocolateSlice = createSlice({
  name: "choco",
  initialState,
  reducers: {
    chocoOrdered: (state, action) => {
      state.numOfChoco = state.numOfChoco - action.payload;
    },
    chocoRestocked: (state, action) => {
      state.numOfChoco = state.numOfChoco + action.payload;
    },
  },
  //   extraReducers: {
  //     //map with the action of other slice
  //     ["cake/cakeOrdered"]: (state) => {
  //       state.numOfChoco = state.numOfChoco - 1;
  //     },
  //   },
  extraReducers: (builder) => {
    builder.addCase(cakeActions.cakeOrdered, (state) => {
      state.numOfChoco = state.numOfChoco--;
    });
  },
});

module.exports = chocolateSlice.reducer;
module.exports.chocoActions = chocolateSlice.actions;
