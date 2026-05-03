import { createRoot } from 'react-dom/client'
import App from './App';
import Accordion from './components/Accordion'
import Typahead from './components/TypeAhead'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VirtualizedList from './components/VirtualizedList';

const demoData = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path='/accordion' element={<Accordion />} />
            <Route path='/typahead' element={<Typahead />} />
            <Route
                path='/virtualizedList'
                element={
                    <VirtualizedList
                        data={demoData}
                        itemHeight={60}
                        gap={8}
                        containerHeight={400}
                        renderItem={(item, index) => (
                            <div
                                key={index}
                                style={{
                                    height: 60,
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 12px',
                                    background:'#000'
                                }}
                            >
                                {item}
                            </div>
                        )}
                    />
                }
            />

        </Routes>
    </BrowserRouter>
)
