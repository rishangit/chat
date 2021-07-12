import logo from './logo.svg';
import './App.css';
import ChatBox from './modules/chat';
import NotFound from './modules/notfount';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       
        <Route path="/:id/:name/:avatar" component={ChatBox} />
        <Route exact  path="/" component={NotFound} />
      </BrowserRouter>
    </div>
  );
}

export default App;
