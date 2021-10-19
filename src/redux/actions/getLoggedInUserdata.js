import {INIT_LOGGED_IN_USER} from './resourcesActionType'
import createRequestBeginAction from './requestBegin'
import createRequestEndAction from './requestEnd'
import application from './../../environment';

const initLoggedInUserDataAction = (payload) => {
    return {type: INIT_LOGGED_IN_USER, payload}
}

const getLoggedInUserdata = () => {
    return (dispatch) =>{
        (() => {
            dispatch(createRequestBeginAction(true)) 
            return fetch(application.apiBaseurl + 'Ldap')
            .then(response => response.json())
            .then(json => {
                dispatch(initLoggedInUserDataAction(json));
                dispatch(createRequestEndAction(false))
            })
        })();
        
    }
}

export default getLoggedInUserdata;
