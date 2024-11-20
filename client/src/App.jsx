import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'
import { ThemeProvider } from './components/ThemeProvider'
import { Provider } from 'react-redux'
import store from './app/store'
import AuthContextProvider from './context/AuthContext'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthContextProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router}></RouterProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </Provider>
    </>
  )
}

export default App