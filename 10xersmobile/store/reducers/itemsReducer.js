import {
  GET_ITEMS,
  GET_ITEM,
  SET_LOADING,
  SET_ERROR,
} from '../actionTypes';

const initialState = {
  items: [],
  itemsLoading: true,
  itemsError: null,
  item: {}
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, items: action.payload };
    case SET_LOADING:
      return { ...state, itemsLoading: action.payload };
    case SET_ERROR:
      return { ...state, itemsError: action.payload };
    case GET_ITEM:
      return {...state, item: action.payload};
    default:
      return state;
  }
}
