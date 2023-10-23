import { useRoutes, A } from '@solidjs/router';
import { lazy } from 'solid-js';

const routes = [
    {
        path: '/tools',
        component: lazy(() => import('./pages/tools')),
    },
    {
        path: '/render',
        component: lazy(() => import('./pages/render')),
    },
];

const App = () => {
    const Routes = useRoutes(routes);

    return (
        <>
            <nav>
                <A href="/tools">tools</A>
                <A href="/render">render</A>
            </nav>
            <Routes />
        </>

    );
};

export default App;
