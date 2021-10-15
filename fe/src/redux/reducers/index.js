import { combineReducers } from "redux";
import usersReducer from "./users";
import productReducer from "./products";
import addressesReducer from "./addresses";
import adminReducer from "./admins";
import cartReducer from "./cart";
import userstocksReducer from "./userstocks";

export default combineReducers({
  users: usersReducer,
  addresses: addressesReducer,
  admins: adminReducer,
  product: productReducer,
  cart: cartReducer,
  userstocks: userstocksReducer,
});
