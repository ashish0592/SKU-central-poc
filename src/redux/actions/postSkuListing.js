import application from './../../environment';
import createRequestBeginAction from './requestBegin';
import createRequestEndAction from './requestEnd';
import getSkuListing from './getSkuListing';
import {ADD_SKU_ERROR, ADD_SKU_DONE} from './resourcesActionType';

const addSkuError = (payload) => {
    return { type: ADD_SKU_ERROR, payload }
}
const addSkuDone = (payload) => {
    return { type: ADD_SKU_DONE, payload }
}
const postSkuListing = (data) => {
    return (dispatch) =>{
        (() => {
            dispatch(createRequestBeginAction(true))            
            return fetch(application.apiBaseurl + 'create', {
                method: 'post',
                body: JSON.stringify(data),
                headers: new Headers({'content-type': 'application/json'}),
              })
            .then(response => {
                if(!response.ok) {
                    dispatch(addSkuError());               
                }
                else {
                    dispatch(addSkuDone());
                    dispatch(getSkuListing());
                }   
                 dispatch(createRequestEndAction(false))
                })
        })();
    }
}

export default postSkuListing;

