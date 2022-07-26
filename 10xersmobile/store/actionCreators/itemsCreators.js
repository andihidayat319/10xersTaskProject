import {
  GET_ITEMS,
  GET_ITEM,
  SET_LOADING,
  SET_ERROR,
} from '../actionTypes';
const url = 'https://api-generator.retool.com/j3Iz08/collections'

export const getAllItems = (payload) => {
  return { type: GET_ITEMS, payload };
};

export const loadingItems = (payload) => {
  return { type: SET_LOADING, payload };
};

export const errorItems = (payload) => {
  return { type: SET_ERROR, payload };
};

export const getItem = (payload) => {
  return {type: GET_ITEM, payload };
}

export  const getItems = () => {
  return (dispatch, getState) => {
    dispatch(loadingItems(true));
    dispatch(errorItems(null));
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('cannot fetch');
        return response.json();
      })
      .then((data) => {
        dispatch(getAllItems(data));
      })
      .catch((error) => {
        dispatch(errorItems(error));
      })
      .finally(() => {
        dispatch(loadingItems(false));
      });
  };
}

export const detailItem = (id) => {
  console.log("cek id:",id)
  return (dispatch) => {
    dispatch(loadingItems(true));
    dispatch(errorItems(null));
    fetch(url+'/'+id)
      .then((response) => {
        if (!response.ok) throw new Error('cannot fetch');
        return response.json();
      })
      .then((data) => {
        dispatch(getItem(data));
      })
      .catch((error) => {
        dispatch(errorItems(error));
      })
      .finally(() => {
        dispatch(loadingItems(false));
      });
  }
}
