import React from 'react';
// import {createStore} from 'redux';
import {render, fireEvent, cleanup} from '@testing-library/react';
import {Provider} from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import HeaderComponent from './HeaderComponent';
import store from '../../redux/store';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import freeze from 'redux-freeze';
import _ from 'lodash';
import rootReducer from '../../redux/rootReducer';

afterEach(cleanup);

const startingState =  {resources: {
    loggedInUserData: {}, skuList:[],
},
isLoading: false,
error: { isError: false, errorList: [] },
success: { isSuccess: false, successList: [] }
};

const middlewares = _.compact([thunk, freeze])
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
// const store = createStoreWithMiddleware(rootReducer)

function reducer(state = startingState, action){
    switch(action.type){
        case 'GET_SKU_LISTING':
            return{...state, resources:{...state.resources, skuList:[{id:"123", revision:"v1", customer:"tbg", description:"Desc", created_by:"suchi", updated_by: "suchi", number: 12345, active: true}]}}
    case 'REQUEST_BEGIN':
        return { ...state, isLoading: true }
    case 'REQUEST_END':
        return { ...state, isLoading: false }
    case 'CLEAR_ERRORS':
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
    case 'INIT_LOGGED_IN_USER':
        return { ...state, resources: { ...state.resources, loggedInUserData: { ldap:'sxn8dds', name:'Suchi,Narayana', role: 'Admin'} } }
    case 'UPDATE_SKU_ERROR':
        return {...state,resources: { ...state.resources}, error:
        {
            isError: true,
            errorList:[...state.error.errorList, `Could not update the SKU`]
        }}
    case 'ADD_SKU_ERROR':
        return {...state,resources: { ...state.resources}, error:
        {
            isError: true,
            errorList:[...state.error.errorList, `Could not add the SKU`]
        }}
    case 'ADD_SKU_DONE':
        return {...state,resources: { ...state.resources}, success:
        {
            isSuccess: true,
            successList:[...state.success.successList, `Successfully added the SKU`]
        }}
    case 'UPDATE_SKU_DONE':            
        return {...state,resources: { ...state.resources}, success:
        {
            isSuccess: true,
            successList:[...state.success.successList, `Successfully updated the SKU`]
        }}
        default:
            return state;
    }
}

function renderWithRedux(component,{initialState, store= createStore(reducer,initialState)}={}
){
    return{
        ...render(<Provider store={store}>
            {component}
        </Provider>)
    }
}

it('renders header title', () => {
  const {getByText} = renderWithRedux  (<HeaderComponent title="SKU"/>);
  expect(getByText("SKU")).toBeInTheDocument();
});

