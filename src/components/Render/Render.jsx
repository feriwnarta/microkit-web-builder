import { useEffect, useRef, useState } from "react";
import { useRenderContext } from "../../context/RenderContext";

export default function Render() {
    const { renderContent, sizeRender, setRenderContent } = useRenderContext();

    const [editedElement, setEditedElement] = useState(null);
    const iframeDocumentRef = useRef(null);
    const autoSaveTimeoutRef = useRef(null);

    useEffect(() => {
        const colorPickerChangeHandler = (event) => {
            if (editedElement) {
                const selectedColor = event.target.value;
                editedElement.style.color = selectedColor;
                scheduleAutoSave();
            }
        };

        const colorPickerBgChangeHandler = (event) => {
            if (editedElement) {
                const selectedColor = event.target.value;
                editedElement.style.backgroundColor = selectedColor;
                scheduleAutoSave();
            }
        };

        if (editedElement) {
            const colorPicker = iframeDocumentRef.current.getElementById('colorPicker');
            colorPicker.addEventListener('input', colorPickerChangeHandler);

            const colorPickerBg = iframeDocumentRef.current.getElementById('colorPickerBg');
            colorPickerBg.addEventListener('input', colorPickerBgChangeHandler);
        }

        return () => {
            if (editedElement) {
                const colorPicker = iframeDocumentRef.current.getElementById('colorPicker');
                colorPicker.removeEventListener('input', colorPickerChangeHandler);

                const colorPickerBg = iframeDocumentRef.current.getElementById('colorPickerBg');
                colorPickerBg.removeEventListener('input', colorPickerBgChangeHandler);
            }
        };
    }, [editedElement]);

    const handleIframeLoad = (event) => {
        const iframeDocument = event.target.contentDocument;
        iframeDocumentRef.current = iframeDocument;

        const allElements = iframeDocument.querySelectorAll('p, h1, h2, h3, h4, h5, a, button, nav');
        allElements.forEach(element => {
            if (element.textContent.trim() !== '') {
                element.addEventListener('click', (e) => {
                    e.stopPropagation();
                    element.contentEditable = true;
                    element.style.outline = '1px solid blue';

                    setEditedElement(element);
                    showCustomOffcanvas(iframeDocument);
                    openOffcanvas(iframeDocument);
                });
            }
        });

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

        const targetElements = iframeDocument.querySelectorAll('p, h1, h2, h3, a, nav, button');
        targetElements.forEach(element => {
            element.addEventListener('mouseover', () => {
                element.style.outline = '1px solid blue';
            });

            element.addEventListener('mouseout', () => {
                element.style.outline = 'none';
            });
        });

        const iframeLinks = iframeDocument.querySelectorAll("a");
        iframeLinks.forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();
            });
        });

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
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Edit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="d-flex flex-column">
                        <label for="colorPicker">Pilih Warna Tulisan</label>
                        <input type="color" id="colorPicker" name="colorPicker" value="#ff0000">
                    </div>
                    <div class="d-flex flex-column">
                        <label for="colorPickerBg">Ganti Warna Bg</label>
                        <input type="color" id="colorPickerBg" name="colorPickerBg" value="#ff0000">
                    </div>
                </div>
            </div>
        `;
        iframeDocument.body.appendChild(customOffcanvas);
    };

    const scheduleAutoSave = () => {
        clearTimeout(autoSaveTimeoutRef.current);
        autoSaveTimeoutRef.current = setTimeout(autoSave, 2000);
    };

    // ubah fungsi ini untuk menerapkah fitur auto save
    const autoSave = () => {
        // atuo
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
