import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './app/store';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { registerSW } from 'virtual:pwa-register';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import SavedRecipesScreen from './screens/SavedRecipesScreen';
import SettingsScreen from './screens/SettingsScreen';

const updateSW = registerSW({
  onOfflineReady() {
    // Render a dialog or a modal to show the user offline mode is ready
    alert('Offline is ready!');
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/savedrecipes',
    element: <SavedRecipesScreen />,
  },
  {
    path: '/settings',
    element: <SettingsScreen />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
