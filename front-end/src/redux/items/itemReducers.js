import * as types from './constants';

var initialState = {
  success: null,
  byIDsuccess: null,
  delSuccess: null,
  error: "",
  errorMsg:"",
  listItems: null,
  itemInfo: null,
}


const reducer = (state = initialState, actions) => {

  const {payload} = actions;

  switch (actions.type) {
    case types.GET_ALL_ITEMS_REQ:
      return {
        ...state, success: "",
      }

    case types.GET_ALL_ITEMS_FAILED:
      return {
        ...state, success: null,
        error: true,
        errorMsg: payload,
      }
    
    case types.GET_ALL_ITEMS_SUCESS:
        return {
          ...state, success: true,
          error: "",
          errorMsg:"",
          listItems: payload,
        }

    case types.RESET_ALL_ITEM_REDUX:
          return {
            ...state, success: null,
            error: "",
            errorMsg:"",
          } 


    case types.DELETE_ITEM_REQ:
      return {
            ...state, success: "",
      }
    
    case types.DELETE_ITEM_FAILED:
          return {
            ...state, success: null,
            error: true,
            errorMsg: payload,
          }
        
    case types.DELETE_ITEM_SUCCESS:
            return {
              ...state, success: true,
            }

    case types.RESET_DELETE_ITEM_REDUX:
              return {
                ...state, delSuccess: null,
                error: "",
                errorMsg:"",
              } 








    case types.GET_ITEMS_BY_ID_REQ:
      return {
        ...state,
        itemInfo: "",
      }

    case types.GET_ITEMS_BY_ID_FAILED:
      return {
        ...state,
        error: true,
        errorMsg: payload,
        itemInfo: ""
      }
    
    case types.GET_ITEMS_BY_ID_SUCESS:
      console.log(payload);
        return {
          ...state,
          error: "",
          errorMsg:"",
          itemInfo: payload,
        }

      case types.RESET_ITEM_ID_REDUX:
              return {
                ...state, byIDsuccess: null,
                error: "",
                errorMsg:"",
              } 


    default:
      return state
  }
}

export default reducer;