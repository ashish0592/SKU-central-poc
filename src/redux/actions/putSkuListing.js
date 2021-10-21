import application from './../../environment';
import createRequestBeginAction from './requestBegin';
import createRequestEndAction from './requestEnd';
import getSkuListing from './getSkuListing';
import {UPDATE_SKU_ERROR, UPDATE_SKU_DONE} from './resourcesActionType';

const updateSkuError = (payload) => {
    return { type: UPDATE_SKU_ERROR, payload }
}

const updateSkuDone = (payload) => {
    return { type: UPDATE_SKU_DONE, payload }
}

const putSkuListing = (data) => {
    return (dispatch) =>{
        (() => {
            dispatch(createRequestBeginAction(true))            
            return fetch(application.apiBaseurl + 'updateinfo', {
                method: 'put',
                body: JSON.stringify(data),
                headers: new Headers({'content-type': 'application/json'}),
              })
            .then(response => {
                if(!response.ok) {
                    dispatch(updateSkuError(data.id)); 
                }
                else {
                    dispatch(updateSkuDone(data.id));
                    dispatch(getSkuListing());
                }   
                 dispatch(createRequestEndAction(false))
                })
        })();
    }
}

export default putSkuListing;

