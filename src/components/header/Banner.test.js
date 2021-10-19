import React from 'react';
import Banner from './BannerComponent';
import {render , screen} from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders banner', async () => {
  render(<Banner/>);
  const linkElement = screen.getByRole("heading", {name: "SKU CENTRAL"})
  expect(linkElement).toBeInTheDocument();
  // screen.debug();
});
