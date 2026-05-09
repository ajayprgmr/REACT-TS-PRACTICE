import Home from './components/Home'
import { ToastProvider } from './components/Toast';
import ToastComponent from './components/Toast';
import './app.css'

function App() {

  return (
    <ToastProvider>
      <div className="app-layout">
        <Home />
        <ToastComponent />
      </div>
    </ToastProvider>
  );
}

export default App;