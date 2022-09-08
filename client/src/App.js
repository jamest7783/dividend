import './App.css'
import {Routes,Route} from 'react-router-dom'
import {useState} from 'react'
import Search from './components/Search'
import Nav from './components/Nav'
import Canvas from './components/Canvas'

const App=()=>{

  const [focus,setFocus]=useState(null)

  return(
    <div id='app'>
      <div id='header'>
        <Search />
        <Nav setFocus={setFocus}/> 
      </div>
      <Routes>
        <Route path='/' element={<Canvas focus={focus}/>}/>
      </Routes>
    </div>
  )
}

export default App;
