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
        path: '/stack-images',
        component: lazy(() => import('./pages/stack-images')),
    },
];

const App = () => {
    const Routes = useRoutes(routes);

    return (
        <>
            <aside>
                <A href="/streaming-image-volume-loader">streaming-image-volume-loader</A>
                <A href="/magnify-tool">magnify-tool</A>
                <A href="/stack-images">stack-images</A>
            </aside>
            <Routes />
        </>
    );
};

export default App;
