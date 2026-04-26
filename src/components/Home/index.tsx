import { useNavigate } from 'react-router-dom';
import './home.css';

const routes = [
    { path: '/accordion', text: 'accordion' },
    { path: '/typahead', text: 'typahead' },
    { path: '/search', text: 'search' },
    { path: '/toolip', text: 'tooltip' },
    { path: '/slider', text: 'slider' },
    { path: '/virtualizedList', text: 'Virtualized List' },
]

const routeMap = new Map(routes.map(route => [route.path, route]));

function Home() {

    const Navigate = useNavigate();

    const handleFromHomeNavigatorClick = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        const target = e.target as HTMLElement;
        const path = target.dataset.path;

        if (!path) return;

        const route = routeMap.get(path);
        if (route) {
            Navigate(route.path)
        }
    };

    return (
        <div className="home-page-main" onClick={handleFromHomeNavigatorClick}>
            <div className="navigator-container">
                {routes.map((route) => (
                    <div key={route.path} className="navigator" data-path={route.path} >
                        {route.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
