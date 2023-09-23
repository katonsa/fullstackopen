import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import notificationReducer from '../reducers/notificationReducer';

export function renderWithProviders(
  children,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { notification: notificationReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return { store, ...render(children, { wrapper: Wrapper, ...renderOptions }) };
}
