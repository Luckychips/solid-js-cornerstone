import { createEffect, createSignal } from 'solid-js';
import { RenderingEngine, Enums, Types } from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { createImageIdsAndCacheMetaData, initDemo } from '../../helpers/core';
import { RadioGroup } from '../../components/widgets';

const StreamingImageVolumeLoader = () => {
    const {
        DragProbeTool,
        AngleTool,
        LengthTool,
        WindowLevelTool,
        ToolGroupManager,
        Enums: csToolsEnums,
    } = cornerstoneTools;
    const toolRadioGroups = [
        { id: 'tool-drag-probe', label: 'DragProbeTool' },
        { id: 'tool-angle', label: 'AngleTool' },
        { id: 'tool-length', label: 'LengthTool' },
        { id: 'tool-wwwc', label: 'WWWCTool' },
    ];
    const renderingEngineId = 'streamingImageVolumeLoaderRenderingEngine';
    const viewportId = 'CT_STACK';
    const [getSelectedTool, setSelectedTool] = createSignal('tool-drag-probe');

    const updateTool = () => {
        cornerstoneTools.destroy();
        const { MouseBindings } = csToolsEnums;
        const toolGroup = ToolGroupManager.createToolGroup('PAGE-STREAMING-IMAGE-VOLUME-LOADER');

        switch (getSelectedTool()) {
            case 'tool-drag-probe':
                cornerstoneTools.addTool(DragProbeTool);
                toolGroup.addTool(DragProbeTool.toolName);
                toolGroup.setToolActive(DragProbeTool.toolName, {
                    bindings: [{ mouseButton: MouseBindings.Primary }],
                });
                break;
            case 'tool-angle':
                cornerstoneTools.addTool(AngleTool);
                toolGroup.addTool(AngleTool.toolName);
                toolGroup.setToolActive(AngleTool.toolName, {
                    bindings: [{ mouseButton: MouseBindings.Primary }],
                });
                break;
            case 'tool-length':
                cornerstoneTools.addTool(LengthTool);
                toolGroup.addTool(LengthTool.toolName);
                toolGroup.setToolActive(LengthTool.toolName, {
                    bindings: [{ mouseButton: MouseBindings.Primary }],
                });
                break;
            case 'tool-wwwc':
                cornerstoneTools.addTool(WindowLevelTool);
                toolGroup.addTool(WindowLevelTool.toolName);
                toolGroup.setToolActive(WindowLevelTool.toolName, {
                    bindings: [{ mouseButton: MouseBindings.Primary }],
                });
                break;
            default:
        }

        toolGroup.addViewport(viewportId, renderingEngineId);
    };

    createEffect(async () => {
        const tool = getSelectedTool();
        const { ViewportType } = Enums;
        const content = document.getElementById('content');
        content.innerHTML = '';
        const element = document.createElement('div');
        element.id = 'cornerstone-element';
        element.style.width = '500px';
        element.style.height = '500px';

        content.appendChild(element);
        await initDemo();
        const imageIds = await createImageIdsAndCacheMetaData({
            StudyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
            SeriesInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
            wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
        });

        const renderingEngine = new RenderingEngine(renderingEngineId);
        const viewportInput = {
            viewportId,
            type: ViewportType.STACK,
            element,
        };

        renderingEngine.enableElement(viewportInput);
        const viewport = renderingEngine.getViewport(viewportId) as Types.IStackViewport;
        const stack = [imageIds[0]];
        await viewport.setStack(stack);
        viewport.render();
        updateTool();
    }, getSelectedTool());

    return (
        <main>
            <section id="content" />
            <RadioGroup
                groups={toolRadioGroups}
                selected={getSelectedTool()}
                select={(v) => setSelectedTool(v)}
            />
        </main>
    );
};

export default StreamingImageVolumeLoader;
