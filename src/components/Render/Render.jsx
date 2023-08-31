import { useEffect, useRef, useState } from "react";
import { useRenderContext } from "../../context/RenderContext";

export default function Render() {
    const { renderContent, sizeRender } = useRenderContext();

    const [editedElement, setEditedElement] = useState(null);
    const iframeDocumentRef = useRef(null);

    useEffect(() => {
        if (editedElement) {
            // button dummy ganti color
            const btnColor = iframeDocumentRef.current.getElementById('changeColor');
            btnColor.addEventListener('click', () => {
                editedElement.style.color = 'red';
            });
        }
    }, [editedElement]);


    const handleIframeLoad = (event) => {
        const iframeDocument = event.target.contentDocument;
        iframeDocumentRef.current = iframeDocument;

        const allElements = iframeDocument.querySelectorAll('p, h1, h2, h3, h4, h5, a, button');

        allElements.forEach(element => {
            if (element.textContent.trim() !== '') {
                element.addEventListener('click', () => {
                    element.contentEditable = true;
                    element.style.outline = '1px solid blue';

                    setEditedElement(element);
                    showCustomOffcanvas(iframeDocument);
                    openOffcanvas(iframeDocument);
                });
            }
        });

        // mengembalikan content menjadi tidak editable
        iframeDocument.addEventListener('click', (e) => {
            const clickedElement = e.target;
            const isEditable = clickedElement.isContentEditable;

            if (!isEditable) {
                allElements.forEach(element => {
                    element.contentEditable = false;
                    element.style.border = 'none';
                });
            }
        });

        // membuat border saat element dihover
        const targetElements = iframeDocument.querySelectorAll('p, h1, h2, h3, a, nav, button');
        targetElements.forEach(element => {
            element.addEventListener('mouseover', () => {
                element.style.outline = '1px solid blue';
            });

            element.addEventListener('mouseout', () => {
                element.style.outline = 'none';
            });
        });

        // mencegah tag a diklik
        const iframeLinks = iframeDocument.querySelectorAll("a");
        iframeLinks.forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();
            });
        });

        // Mencegah tag button diklik
        const iframeButtons = iframeDocument.querySelectorAll("button");
        iframeButtons.forEach(button => {
            button.addEventListener("click", event => {
                event.preventDefault();
            });
        });


    };

    const openOffcanvas = (document) => {
        const offcanvasElement = document.getElementById('offcanvasScrolling');
        const offcanvas = new window.bootstrap.Offcanvas(offcanvasElement);
        offcanvas.show();
    };

    const showCustomOffcanvas = (iframeDocument) => {
        const customOffcanvas = iframeDocument.createElement('div');
        customOffcanvas.className = 'custom-offcanvas';
        customOffcanvas.innerHTML = `
            <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <button type="button" class="btn btn-primary" id="changeColor">Change Color</button>
                </div>
            </div>
        `;
        iframeDocument.body.appendChild(customOffcanvas);
    };

    return (
        <iframe
            id="showview"
            srcDoc={renderContent}
            title="Rendered Content"
            style={sizeRender}
            onLoad={handleIframeLoad}
        ></iframe>
    );
}
