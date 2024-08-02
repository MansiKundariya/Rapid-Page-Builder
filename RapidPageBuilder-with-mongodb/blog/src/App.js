import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PublishPageList from './components/PublishPageList';
import GenerateHTML from './components/GenerateHTML';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/publishblog' element={<PublishPageList/>} />
        <Route path='/:url' element={<GenerateHTML/>} />
      </Routes>
    </Router>
  );
}

export default App;
