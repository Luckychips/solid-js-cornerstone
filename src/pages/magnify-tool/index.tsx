import { createEffect } from 'solid-js';
import { RenderingEngine, Enums, Types } from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { setTitleAndDescription, initDemo, createImageIdsAndCacheMetaData } from '../../helpers/core';

const MagnifyTool = () => {
    createEffect(async () => {
        const {
            MagnifyTool,
            PanTool,
            ZoomTool,
            ToolGroupManager,
            Enums: csToolsEnums,
        } = cornerstoneTools;

        const { ViewportType } = Enums;
        const { MouseBindings } = csToolsEnums;
        setTitleAndDescription(
            'Magnify Tool',
            'Magnify Tool to zoom in in part of the viewport (StackViewport only as of now)'
        );

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
        const toolGroupId = 'STACK_TOOL_GROUP_ID';
        await initDemo();

        // Add tools to Cornerstone3D
        cornerstoneTools.addTool(MagnifyTool);
        cornerstoneTools.addTool(PanTool);
        cornerstoneTools.addTool(ZoomTool);

        // Define a tool group, which defines how mouse events map to tool commands for
        // Any viewport using the group
        const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

        // Add the tools to the tool group
        toolGroup.addTool(MagnifyTool.toolName);
        toolGroup.addTool(PanTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);

        // Set the initial state of the tools, here we set one tool active on left click.
        // This means left click will draw that tool.
        toolGroup.setToolActive(MagnifyTool.toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Primary, // Left Click
                },
            ],
        });

        toolGroup.setToolActive(PanTool.toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Auxiliary, // Middle Click
                },
            ],
        });

        toolGroup.setToolActive(ZoomTool.toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Secondary, //
                },
            ],
        });

        // Get Cornerstone imageIds and fetch metadata into RAM
        const imageIds = await createImageIdsAndCacheMetaData({
            StudyInstanceUID:
                '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
            SeriesInstanceUID:
                '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
            wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
        });

        // Instantiate a rendering engine
        const renderingEngineId = 'myRenderingEngine';
        const renderingEngine = new RenderingEngine(renderingEngineId);

        // Create a stack viewport
        const viewportId = 'CT_STACK';
        const viewportInput = {
            viewportId,
            type: ViewportType.STACK,
            element,
        };

        renderingEngine.enableElement(viewportInput);

        // Set the tool group on the viewport
        toolGroup.addViewport(viewportId, renderingEngineId);

        const viewport = (renderingEngine.getViewport(viewportId)) as Types.IStackViewport;
        const stack = [imageIds[0]];
        viewport.setStack(stack);
        viewport.render();
    });

    return  (
        <main>
            <header>magnify tool</header>
            <section id="content" />
        </main>
    );
};

export default MagnifyTool;
