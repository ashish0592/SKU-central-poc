import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import {Provider} from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import HeaderComponent from '../HeaderComponent';
import store from '../../../redux/store';
import * as Aphrodite from 'aphrodite';

describe('header test',()=> {

afterEach(cleanup);

beforeEach(() => {
    Aphrodite.StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    Aphrodite.StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

function renderWithRedux(component){
    return{
        ...render(<Provider store={store}>
            {component}
        </Provider>)
    }
}

it('renders header title', () => {
  const {getByText} = renderWithRedux (<HeaderComponent title="SKU"/>);
  expect(getByText("SKU")).toBeInTheDocument();
});
})

