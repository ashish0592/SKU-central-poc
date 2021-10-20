import { GET_SKU_LISTING } from './resourcesActionType'
import createRequestBeginAction from './requestBegin'
import createRequestEndAction from './requestEnd'
import application from './../../environment';

export const saveSkuList = (payload) => {
    return { type: GET_SKU_LISTING, payload }
}

const getSkuListing = () => {
    return (dispatch) => {
        (() => {
            dispatch(createRequestBeginAction(true))
            return fetch(application.apiBaseurl + 'getinfo')
                .then(response => response.json())
                .then(json => {
                    dispatch(saveSkuList(json));
                    dispatch(createRequestEndAction(false))
                })
        })();

    }
}

export default getSkuListing;
