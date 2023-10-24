import { createEffect, onCleanup } from 'solid-js';
import { RenderingEngine, Enums, Types } from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { initDemo, createImageIdsAndCacheMetaData } from '../../helpers/core';

const MagnifyTool = () => {
    const {
        MagnifyTool,
        PanTool,
        ZoomTool,
        ToolGroupManager,
        Enums: csToolsEnums,
    } = cornerstoneTools;

    createEffect(async () => {
        const { ViewportType } = Enums;
        const { MouseBindings } = csToolsEnums;

        const content = document.getElementById('content');
        const element = document.createElement('div');
        element.oncontextmenu = (e) => e.preventDefault();
        element.id = 'cornerstone-element';
        element.style.width = '500px';
        element.style.height = '500px';
        content.appendChild(element);
        const instructions = document.createElement('p');
        instructions.innerText = 'Left Click to use selected tool';
        content.append(instructions);
        await initDemo();

        cornerstoneTools.addTool(MagnifyTool);
        cornerstoneTools.addTool(PanTool);
        cornerstoneTools.addTool(ZoomTool);

        const toolGroup = ToolGroupManager.createToolGroup('PAGE-MAGNIFY-TOOL');

        toolGroup.addTool(MagnifyTool.toolName);
        toolGroup.addTool(PanTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);

        toolGroup.setToolActive(MagnifyTool.toolName, {
            bindings: [
                { mouseButton: MouseBindings.Primary },
            ],
        });

        toolGroup.setToolActive(PanTool.toolName, {
            bindings: [
                { mouseButton: MouseBindings.Auxiliary },
            ],
        });

        toolGroup.setToolActive(ZoomTool.toolName, {
            bindings: [
                { mouseButton: MouseBindings.Secondary },
            ],
        });

        const imageIds = await createImageIdsAndCacheMetaData({
            StudyInstanceUID:
                '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
            SeriesInstanceUID:
                '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
            wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
        });

        const renderingEngineId = 'myRenderingEngine';
        const renderingEngine = new RenderingEngine(renderingEngineId);
        const viewportId = 'CT_STACK';
        const viewportInput = {
            viewportId,
            type: ViewportType.STACK,
            element,
        };

        renderingEngine.enableElement(viewportInput);
        toolGroup.addViewport(viewportId, renderingEngineId);

        const viewport = (renderingEngine.getViewport(viewportId)) as Types.IStackViewport;
        const stack = [imageIds[0]];
        await viewport.setStack(stack);
        viewport.render();
    });

    onCleanup(() => {
        cornerstoneTools.destroy();
        const content = document.getElementById('content');
        content.remove();
    });

    return  (
        <main>
            <header>magnify tool</header>
            <section id="content" />
        </main>
    );
};

export default MagnifyTool;
