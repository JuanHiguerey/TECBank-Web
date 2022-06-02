import './App.css';
import { Login } from './component/Login';
import { Citas } from './component/AgendarCitas'

function App() {
  return (
    <div className="App">
      <div className='App-header'/>
      <div className='App-body'>
        <Citas userId={1}/>
      </div>
    </div>
  );
}

export default App;
