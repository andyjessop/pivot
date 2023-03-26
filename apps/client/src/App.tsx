import './App.css';
import { useService } from './services';

function App() {
  const router = useService('router');

  if (!router) {
    return null;
  }

  return (
    <div className="App">
      <div>{router.toString()}</div>
    </div>
  );
}

export default App;
