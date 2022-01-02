import * as actions from './constants';
import { ofType} from 'redux-observable';
import {mergeMap, map, //filter,
  catchError} from 'rxjs/operators';
import { //Observable, 
  from, of } from 'rxjs';
import axios from 'axios';
import {API_ADDR} from '../constants';


export  const getAllItemEpic = (action$, state$) => action$.pipe(
  ofType(actions.GET_ALL_ITEMS_REQ),
  mergeMap(({  }) =>  from(axios.get(API_ADDR+'/api/item/getAll',{
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })).pipe(
    map(response => {
      const {data} = response;
      console.log(data);
      if (data.success) {
        return ({
          type: actions.GET_ALL_ITEMS_SUCESS,
          payload: data.data
        })
      } else {
        return ({
          type: actions.GET_ALL_ITEMS_FAILED,
          payload: data.errMsg
        })
      }
    
    }),
    catchError (error => {
      const {status} = error.response.data;
      if (status ===  401) {
        localStorage.clear();
        // //window.location.replace('/login');
      } else
      return of({
        type: actions.GET_ALL_ITEMS_FAILED,
        payload: error.response.data.errMsg
      })})
    )))


  


  export  const getItemByIdEpic = (action$, state$) => action$.pipe(
    ofType(actions.GET_ITEMS_BY_ID_REQ),
    mergeMap(({ payload }) =>  from(axios.get(API_ADDR+'/api/item/'+payload,{
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
          "content-type": "application/json",
        }
      })).pipe(
      map(response => {
        const {data} = response;
        console.log(data);
        if (data.success) {
          return ({
            type: actions.GET_ITEMS_BY_ID_SUCESS,
            payload: data.data
          })
        } else {
          return ({
            type: actions.GET_ITEMS_BY_ID_FAILED,
            payload: data.errMsg
          })
        }
      
      }),
      catchError (error =>{
        const {status} = error.response.data;
        if (status ===  401) {
          localStorage.clear();
          ////window.location.replace('/login');
        } else
        return of({
        type: actions.GET_ITEMS_BY_ID_FAILED,
        payload: error.response.data.errMsg
      })})
    )))

  


    export  const deleteItemByIdEpic = (action$, state$) => action$.pipe(
      ofType(actions.DELETE_ITEM_REQ),
      mergeMap(({ payload }) =>  from(axios.delete(API_ADDR+'/api/item/update/'+payload,{
          headers: {
            "X-Auth-Token": localStorage.getItem("token"),
            "content-type": "application/json",
          }
        })).pipe(
        map(response => {
          const {data} = response;
          console.log(data);
          if (data.success) {
            return ({
              type: actions.GET_ITEMS_BY_ID_SUCESS,
              payload: data.data
            })
          } else {
            return ({
              type: actions.GET_ITEMS_BY_ID_FAILED,
              payload: data.errMsg
            })
          }
        
        }),
        catchError (error =>{
          const {status} = error.response.data;
          if (status ===  401) {
            localStorage.clear();
            ////window.location.replace('/login');
          } else
          return of({
          type: actions.GET_ITEMS_BY_ID_FAILED,
          payload: error.response.data.errMsg
        })})
      )))