import React from 'react';
import {createStore} from 'redux';
import {render, fireEvent, cleanup} from '@testing-library/react';
import {Provider} from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import SkuListingComponent from './SkuListingComponent';
import store from '../../redux/store';

afterEach(cleanup);

const startingState =  {resources: {
    loggedInUserData: {}, skuList:[],
},
isLoading: false,
error: { isError: false, errorList: [] },
success: { isSuccess: false, successList: [] }
};

function reducer(state = startingState, action){
    switch(action.type){
        case 'GET_SKU_LISTING':
            return{...state, resources:{...state.resources, skuList:[{id:"123", revision:"v1", customer:"tbg", description:"Desc", created_by:"suchi", updated_by: "suchi", number: 12345, active: true}]}}
    case 'REQUEST_BEGIN':
        return { ...state, isLoading: false }
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

function renderWithRedux(component,{initialState}={}
){
    return{
        ...render(<Provider store={store}>
            {component}
        </Provider>)
    }
}

it('renders table with redux', () => {
  const {getByTestId} = renderWithRedux  (<SkuListingComponent/>);
  expect(getByTestId("table-data")).toHaveTextContent("123");
});

it('opens add sku dialog on button click',() =>{
    const {getByText, getByTitle} = renderWithRedux(<SkuListingComponent/>);
    fireEvent.click(getByText(/Add New/i));
    expect(getByTitle('add-dialog').toBeInDocument());
});