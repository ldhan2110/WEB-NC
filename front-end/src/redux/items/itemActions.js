import * as types from './constants';

export function getAllItems(value) {
  return {
    type: types.GET_ALL_ITEMS_REQ,
    payload: value
  }
}

export function getItemById(value){
  return {
    type: types.GET_ITEMS_BY_ID_REQ,
    payload: value
  }
}

export function removeItemById(value){
  return {
    type: types.DELETE_ITEM_REQ,
    payload: value
  }
}

export function resetAllItemRedux(){
  return {
    type: types.RESET_ALL_ITEM_REDUX
  }
}

export function resetItemIdRedux(){
  return {
    type: types.RESET_ITEM_ID_REDUX
  }
}

export function resetDeleteItemRedux(){
  return {
    type: types.RESET_DELETE_ITEM_REDUX
  }
}