import { combineReducers } from "redux";
import weatherReducer from "./weather-reducer";

export interface ReducerTypes {
  weather: any;
}

const allReducers = combineReducers<ReducerTypes>({
  weather: weatherReducer,
});

export default allReducers;
