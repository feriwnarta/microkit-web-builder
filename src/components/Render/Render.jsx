import { useRenderContext } from "../../context/RenderContext";

export default function Render() {
    const { renderContent, sizeRender } = useRenderContext();

    return (
        <iframe
            id="showview"
            srcDoc={renderContent}
            title="Rendered Content"
            style={sizeRender}
        ></iframe>
    );
}
