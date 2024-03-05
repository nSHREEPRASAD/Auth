import './App.css';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Home from './Components/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup></Signup>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
