import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import ingredientsReducer from "./store/reducers/ingredientsReducer";
import totalPriceReducer from "./store/reducers/totalPriceReducer";
import orderReducer from "./store/reducers/orderReducer";
import authReducer from "./store/reducers/authReducer";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  totalPrice: totalPriceReducer,
  order: orderReducer,
  auth: authReducer
});

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
