import { createRoot } from 'react-dom/client'
import App from './App';
import Accordion from './components/Accordion'
import Typahead from './components/TypeAhead'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VirtualizedList from './components/VirtualizedList';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path='/accordion' element={<Accordion />} />
            <Route path='/typahead' element={<Typahead />} />
            <Route path='/virtualizedList' element={<VirtualizedList />} />
        </Routes>
    </BrowserRouter>
)
