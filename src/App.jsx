import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Pokedex from "./components/Pokedex";
import Details from "./components/Details";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Pokedex />}/>
          <Route path='/details/:pokemonID' element={<Details />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
