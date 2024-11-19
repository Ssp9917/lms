import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'
import { ThemeProvider } from './components/ThemeProvider'

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  )
}

export default App