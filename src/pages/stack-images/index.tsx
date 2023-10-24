import {createEffect, createSignal, onCleanup} from 'solid-js';
import * as cornerstone from '@cornerstonejs/core';
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import { initDemo } from '../../helpers/core';
import * as cornerstoneTools from "@cornerstonejs/tools";

const StackImages = () => {
    const {
        ToolGroupManager,
        StackScrollTool,
        MagnifyTool,
        Enums: csToolsEnums,
    } = cornerstoneTools;
    let [getFiles, setFiles] = createSignal([]);

    createEffect(async () => {
        const files = getFiles();
        const content = document.getElementById('content');
        const element = document.createElement('div');

        element.style.width = '500px';
        element.style.height = '500px';

        content.appendChild(element);
        await initDemo();

        const renderingEngineId = 'myRenderingEngine';
        const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId);
        const viewportId = 'CT_AXIAL_STACK';

        const viewportInput = {
            viewportId,
            element,
            type: cornerstone.Enums.ViewportType.STACK,
        };

        renderingEngine.enableElement(viewportInput);
        const viewport = renderingEngine.getViewport(viewportId)  as cornerstone.Types.IStackViewport;
        if (files.length > 0) {
            const imageIds = [];
            for (let i = 0; i < files.length; i++) {
                imageIds.push(cornerstoneDICOMImageLoader.wadouri.fileManager.add(files[i]));
            }

            await viewport.setStack(imageIds, imageIds.length / 2);
            viewport.render();

            const { MouseBindings } = csToolsEnums;
            cornerstoneTools.addTool(StackScrollTool);
            const toolGroup = ToolGroupManager.createToolGroup('PAGE-STACK-IMAGES');
            toolGroup.addTool(StackScrollTool.toolName);
            toolGroup.setToolActive(StackScrollTool.toolName, {
                bindings: [
                    { mouseButton: MouseBindings.Primary },
                ],
            });
            toolGroup.addViewport(viewportId, renderingEngineId);
        }
    }, getFiles());

    onCleanup(() => {
        cornerstoneTools.destroy();
        const content = document.getElementById('content');
        content.remove();
    });

    const selectFiles = (e) => {
        const content = document.getElementById('content');
        content.innerHTML = '';
        setFiles(e.target.files);
    };

    return  (
        <main>
            <header>stack images</header>
            <input type="file" multiple onChange={selectFiles} />
            <section id="content" />
        </main>
    );
};

export default StackImages;
