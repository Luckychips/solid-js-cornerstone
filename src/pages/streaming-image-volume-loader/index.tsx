import { createEffect } from 'solid-js';
import {
    RenderingEngine,
    Enums,
    init as csInit,
    Types,
} from '@cornerstonejs/core';
import { init as csTools3dInit } from '@cornerstonejs/tools';

const StreamingImageVolumeLoader = () => {
    createEffect(async () => {
        const content = document.getElementById('content');
        const element = document.createElement('div');
        element.id = 'cornerstone-element';
        element.style.width = '500px';
        element.style.height = '500px';

        content.appendChild(element);
        await csInit();
        await csTools3dInit();

        // registerWebImageLoader(cs)

        const renderingEngineId = 'myRenderingEngine';
        const renderingEngine = new RenderingEngine(renderingEngineId);
        const viewportInput = [
            {
                viewportId: 'CT_STACK',
                type: Enums.ViewportType.STACK,
                element,
                defaultOptions: {
                    background: [0.2, 0, 0.2] as Types.Point3,
                },
            },
        ];

        renderingEngine.setViewports(viewportInput);
    });

    return  (
        <main>
            <section id="content" />
        </main>
    );
};

export default StreamingImageVolumeLoader;