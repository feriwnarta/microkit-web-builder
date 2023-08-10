import { useEffect } from 'react';
import { useRenderContext } from '../../context/RenderContext';

function onClick(event) {

    console.log(event.target.id);

}

export default function Accordion() {
    const { setRenderContent } = useRenderContext();

    useEffect(() => {
        // Aktifkan popover saat komponen dimuat
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            const content = `
            <img src="/src/assets/Nav 2.png"/>
            `; // Isi konten dinamis di sini

            // Buat objek Popover dan set properti sanitize langsung
            const popover = new window.bootstrap.Popover(popoverTriggerEl, {
                sanitize: false,
                html: true,

                content: function () {

                    return content;
                }
            });

            // Atur lebar untuk popover saat terbuka
            popoverTriggerEl.addEventListener('shown.bs.popover', function () {
                const popoverElement = document.querySelector('.popover');


                // Tambahkan event listener untuk mendeteksi klik pada elemen gambar di dalam popover
                const imgElement = popoverElement.querySelector('img');
                if (imgElement) {
                    imgElement.addEventListener('click', () => {
                        handeClick(popover);
                    });
                }
            });

            // Bersihkan listener saat komponen unmount
            return () => {
                popover.dispose();
            };
        });
    });

    function handeClick(popover) {
        popover.hide();
        let html = `
        <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  </head>
  <body>
   

                    <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            </nav>
            
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
          </body>
        </html>
        `;
        setRenderContent(html);
    }





    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Navbars
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body d-flex flex-column align-items-start">
                        <p data-toggle="popover"
                            data-placement="top"
                            title=""
                            content=''
                            className='sidebar-item' onClick={onClick} id="all">
                            All</p>
                        <p className='sidebar-item'>Culinary</p>
                        <p className='sidebar-item'>Fashion</p>
                        <p className='sidebar-item'>Services</p>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOn2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        Navbars
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingOn2" data-bs-parent="#accordionExample">
                    <div className="accordion-body d-flex flex-column align-items-start">
                        <p data-toggle="popover"
                            data-placement="top"
                            title=""
                            content=''
                            className='sidebar-item' onClick={onClick} id="all">
                            All</p>
                        <p className='sidebar-item'>Culinary</p>
                        <p className='sidebar-item'>Fashion</p>
                        <p className='sidebar-item'>Services</p>
                    </div>
                </div>
            </div>


        </div>
    );
}