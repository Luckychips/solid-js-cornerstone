import { useRoutes, A } from '@solidjs/router';
import { lazy } from 'solid-js';

const routes = [
    {
        path: '/streaming-image-volume-loader',
        component: lazy(() => import('./pages/streaming-image-volume-loader')),
    },
    {
        path: '/magnify-tool',
        component: lazy(() => import('./pages/magnify-tool')),
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
            <aside>
                <A href="/streaming-image-volume-loader">streaming-image-volume-loader</A>
                <A href="/magnify-tool">magnify-tool</A>
                <A href="/render">render</A>
            </aside>
            <Routes />
        </>

    );
};

export default App;
