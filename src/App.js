import logo from './logo.svg';
import './App.css';
import ChatContainer from './modules/chatContainer';
import NotFound from './modules/notfount';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <Route path="/:id/:name/:avatar" component={ChatContainer} />
        <Route exact  path="/" component={NotFound} />
      </BrowserRouter>
    </div>
  );
}

export default App;
