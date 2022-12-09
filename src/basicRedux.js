const redux = require("redux");
const produce = require("immer").produce;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const createStore = redux.createStore;
const initialCakeState = {
  numOfCakes: 10,
};
const initialChocoState = {
  numOfChocolates: 10,
};
const CAKE_ORDERED = "CAKE_ORDERED";
const RESTOKE_CAKES = "RESTOKE_CAKES";
const CHOCOLATES_ORDERED = "CHOCOLATES_ORDERED";
const RESTOKE_CHOCOLATES = "RESTOKE_CHOCOLATES";
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}
function restokeCakes(num = 1) {
  return {
    type: RESTOKE_CAKES,
    quantity: num,
  };
}
function orderChoco(qty = 1) {
  return {
    type: CHOCOLATES_ORDERED,
    quantity: qty,
  };
}
function restokeChoco(qty = 1) {
  return {
    type: RESTOKE_CHOCOLATES,
    quantity: qty,
  };
}
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return produce(state, (draft) => {
        draft.numOfCakes = draft.numOfCakes - action.quantity;
      });

    case RESTOKE_CAKES:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.quantity,
      };

    default:
      return state;
  }
};
const chocoReducer = (state = initialChocoState, action) => {
  switch (action.type) {
    case CHOCOLATES_ORDERED:
      return {
        ...state,
        numOfChocolates: state.numOfChocolates - action.quantity,
      };
    case RESTOKE_CHOCOLATES:
      return {
        ...state,
        numOfChocolates: state.numOfChocolates + action.quantity,
      };
    //lets say as and offer for each customer when ever cake is ordered and icecream is given for free

    case CAKE_ORDERED:
      return {
        ...state,
        numOfChocolates: state.numOfChocolates - 1,
      };
    default:
      return state;
  }
};
const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  choco: chocoReducer,
});
const store = createStore(rootReducer, redux.applyMiddleware(logger));
console.log(store.getState().cake);
console.log(store.getState().choco);

const unsubscribe = store.subscribe(() => {
  //ß console.log("UpdateState", store.getState());
});
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restokeCakes(2));
// store.dispatch(restokeCakes(1));

const actions = redux.bindActionCreators(
  { orderCake, restokeCakes, orderChoco, restokeChoco },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.restokeCakes(4);
actions.restokeChoco(2);
actions.orderChoco(5);
unsubscribe();
