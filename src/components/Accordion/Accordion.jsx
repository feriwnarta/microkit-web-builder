import { useEffect, useState } from 'react';
import { useRenderContext } from '../../context/RenderContext';
import AccordionService from './Services/AccordionService';

export default function Accordion() {
    const { setRenderContent } = useRenderContext();
    const [activePopover, setActivePopover] = useState(null);

    useEffect(() => {
        const popoverTriggerList = document.querySelectorAll('[data-toggle="popover"]');
        let popover = null;

        const clickHandler = async (event) => {
            const clickedItemId = event.target.id;
            const content = await getPopoverContent(clickedItemId);

            if (activePopover !== null) {
                activePopover.dispose(); // Close the active popover
                setActivePopover(null);
            }

            popover = new window.bootstrap.Popover(event.target, {
                sanitize: false,
                html: true,
                content: content,
            });

            setActivePopover(popover);
            popover.show();

            // Add a click event listener to elements inside the popover content
            const popoverElement = document.querySelector('.popover');
            if (popoverElement) {
                const imgElement = popoverElement.querySelectorAll('img');

                imgElement.forEach(el => {
                    if (el) {
                        el.addEventListener('click', () => handleImageClick(popover, el));
                    }
                });


            }
        };


        const handleImageClick = (popover, element) => {
            popover.hide();
            console.log(element);
            let html = `
                <h1>Popover content clicked!</h1>
            `;
            setRenderContent(html);
        };

        popoverTriggerList.forEach(popoverTriggerEl => {
            popoverTriggerEl.addEventListener('click', clickHandler);
        });


        // Cleanup on unmount
        return () => {
            popoverTriggerList.forEach(popoverTriggerEl => {
                popoverTriggerEl.removeEventListener('click', clickHandler);
            });
        };
    });

    async function getPopoverContent(itemId) {
        const element = await AccordionService.getComponentPopOver(itemId);
        return element
    }

    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        Navbars
                    </button>
                </h2>
                <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                >
                    <div className="accordion-body d-flex flex-column align-items-start">
                        <p data-toggle="popover" className='sidebar-item' id="all">
                            All
                        </p>
                        <p data-toggle="popover" className='sidebar-item' id="culinary">
                            Culinary
                        </p>
                        <p data-toggle="popover" className='sidebar-item' id="fashion">
                            Fashion
                        </p>
                        <p data-toggle="popover" className='sidebar-item' id="services">
                            Services
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
