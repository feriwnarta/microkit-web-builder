import { useEffect, useState } from 'react';
import { useRenderContext } from '../../context/RenderContext';
import AccordionService from './Services/AccordionService';

export default function Accordion() {
    const { setRenderContent } = useRenderContext();
    const [activePopover, setActivePopover] = useState(null);
    const [firstClick, setFirstClick] = useState(false);

    const [mainHtml, setMainHtml] = useState('');
    let [tempHtml, setTempHtml] = useState('');
    let [additionHtml, setAdditionHtml] = useState(null);

    useEffect(() => {
        // set temporary html
        if (additionHtml !== null) {
            setTempHtml(mainHtml.replace('%ADDITIONAL_CONTENT%', additionHtml));

        }

        // render content utama
        if (tempHtml !== '') {
            setRenderContent(tempHtml);
        }

        const popoverTriggerList = document.querySelectorAll('[data-toggle="popover"]');
        let popover = null;

        const clickHandler = async (event) => {
            const clickedItemId = event.target.id;
            console.log(clickedItemId);
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

        const handleImageClick = async (popover, element) => {
            // hide pop over yang terbuka
            popover.hide();

            let header = null;

            // cek apakah pertama kali component diklik
            // jika bukan. maka tambahkan header
            if (!firstClick) {
                header = await AccordionService.getHeaderTemplate();
                setMainHtml(header);
                setFirstClick(true);
            }

            // dapatkan source code per single component melalui id thumbnail
            const codeElement = await AccordionService.getComponentCode(element.id);

            // cek terlebih dahulu apakah addition html kosong
            if (additionHtml === null) {
                setAdditionHtml(codeElement);
            } else {
                let additionElement = additionHtml + codeElement;
                setAdditionHtml(additionElement);
            }
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
    }, [additionHtml, mainHtml, tempHtml, activePopover, firstClick, setRenderContent]);



    async function getPopoverContent(itemId) {
        const src = 'http://127.0.0.1:8000/component/thumbnail/';
        const element = await AccordionService.getComponentPopOver(itemId);
        const imgTags = element.component.map(element => {
            return `<img src="${src}${element.img}" class="component" id="${element.id}"/>`;
        });
        const combinedImgTags = imgTags.join('');
        return combinedImgTags;
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
                        <button data-toggle="popover" className='sidebar-item btn btn-sidebar' id="all-navbar">
                            All
                        </button>
                        <button data-toggle="popover" className='sidebar-item btn btn-sidebar' id="culinary">
                            Culinary
                        </button>
                        <button data-toggle="popover" className='sidebar-item btn btn-sidebar' id="fashion">
                            Fashion
                        </button>
                        <button data-toggle="popover" className='sidebar-item btn btn-sidebar' id="services">
                            Services
                        </button>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                    >
                        Hero sections
                    </button>
                </h2>
                <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                >
                    <div className="accordion-body d-flex flex-column align-items-start">
                        <button data-toggle="popover" className='sidebar-item btn btn-sidebar' id="all-hero">
                            All
                        </button>
                        <button data-toggle="popover" className='sidebar-item btn btn-sidebar' id="culinary">
                            Culinary
                        </button>
                        <button data-toggle="popover" className='sidebar-item btn btn-sidebar' id="fashion">
                            Fashion
                        </button>
                        <button data-toggle="popover" className='sidebar-item btn btn-sidebar' id="services">
                            Services
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
