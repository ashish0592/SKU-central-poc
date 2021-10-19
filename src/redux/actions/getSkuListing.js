import { GET_SKU_LISTING } from './resourcesActionType'
import createRequestBeginAction from './requestBegin'
import createRequestEndAction from './requestEnd'
import application from './../../environment';

const saveAlternativeRef = (payload) => {
    return { type: GET_SKU_LISTING, payload }
}

const getAlternativeRef = () => {
    return (dispatch) => {
        (() => {
            dispatch(createRequestBeginAction(true))
            return fetch(application.apiBaseurl + 'getinfo')
                .then(response => response.json())
                .then(json => {
                    dispatch(saveAlternativeRef(json));
                    dispatch(createRequestEndAction(false))
                })
        })();

    }
}

export default getAlternativeRef;
