const weatherReducer = (state = [], action: any) => {
  switch (action.type) {
    case "GET_WEATHER_INFORMATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default weatherReducer;
