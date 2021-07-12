import logo from './logo.svg';
import './App.css';
import ChatBox from './modules/chat';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/:id/:name/:avatar" component={ChatBox} />
      </BrowserRouter>
    </div>
  );
}

export default App;
