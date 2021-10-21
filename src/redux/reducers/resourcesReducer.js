import {
     INIT_LOGGED_IN_USER, CLEAR_ERRORS, GET_SKU_LISTING, REQUEST_BEGIN, REQUEST_END,UPDATE_SKU_ERROR,
     ADD_SKU_ERROR, ADD_SKU_DONE, UPDATE_SKU_DONE
    } from '../actions/resourcesActionType'
import _ from 'lodash';
import application from './../../environment';

const initialState = {
    resources: {
            loggedInUserData: {}, skuList:[],
    },
    isLoading: false,
    error: { isError: false, errorList: [] },
    success: { isSuccess: false, successList: [] }
}
const resources = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_BEGIN:
            return { ...state, isLoading: action.payload }
        case REQUEST_END:
            return { ...state, isLoading: action.payload }
        case GET_SKU_LISTING:
            return { ...state, resources: { ...state.resources, skuList: action.payload } }
        case CLEAR_ERRORS:
                return {
                    ...state, resources: { ...state.resources}, error:
                    {
                        isError: false,
                        errorList: []
                    }, success:
                    {
                        isSuccess: false,
                        successList: []
                    }
                }
        case INIT_LOGGED_IN_USER:
            return { ...state, resources: { ...state.resources, loggedInUserData: { ...action.payload, role: application.environment === 'local' ? application.role : action.payload.role } } }
        case UPDATE_SKU_ERROR:
            return {...state,resources: { ...state.resources}, error:
            {
                isError: true,
                errorList:[...state.error.errorList, `Could not update the SKU: ${action.payload}`]
            }}
        case ADD_SKU_ERROR:
            return {...state,resources: { ...state.resources}, error:
            {
                isError: true,
                errorList:[...state.error.errorList, `Could not add the SKU: ${action.payload}`]
            }}
        case ADD_SKU_DONE:
            return {...state,resources: { ...state.resources}, success:
            {
                isSuccess: true,
                successList:[...state.success.successList, `Successfully added the SKU: ${action.payload}`]
            }}
        case UPDATE_SKU_DONE:            
            return {...state,resources: { ...state.resources}, success:
            {
                isSuccess: true,
                successList:[...state.success.successList, `Successfully updated the SKU: ${action.payload}`]
            }}
    default:
            return state
    }
}

export default resources;



