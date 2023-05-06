import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Listing from './scenes/Listing'
import CreateList from './scenes/CreateList'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Listing />} ></Route>
        <Route path='/:id' element={<Listing />} ></Route>
          <Route path='/Inventory/create' element={< CreateList/>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
    
  )
 
  
}

export default App