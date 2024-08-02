import './App.css';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BlogPost from './components/Blog/BlogPost';
import Home from './components/Home/Home';
import GenerateHTML from './components/GenerateHTML';
import PublishPageList from './components/PublishPageList';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Registration/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/notFound' element={<NotFound/>} />
        <Route path='/blogform' element={<Layout/>} />
        <Route path='/blogform/:id' element={<Layout/>} />
        <Route path='/blogpost' element={<BlogPost/>} />
        <Route path='/home' element={<Home/>} />
        {/* <Route path='/publishblog' element={<PublishPageList/>} />
        <Route path='/:url' element={<GenerateHTML/>} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
