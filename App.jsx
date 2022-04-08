import MainStack from './src/router/MainStack';
import { Provider } from 'react-redux';

import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}