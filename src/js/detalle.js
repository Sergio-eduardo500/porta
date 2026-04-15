document.addEventListener("DOMContentLoaded", () => {
    // 1. Leer el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProyecto = parametrosURL.get("id");

    if (!idProyecto) {
        document.getElementById("proyecto-titulo").innerText = "Proyecto no encontrado";
        return;
    }

    // 2. Traer datos del JSON (Ajusta la ruta a tu JSON real)
    fetch("src/data/proyectos.json")
        .then(respuesta => respuesta.json())
        .then(datos => {
            const proyecto = datos.find(p => p.id === idProyecto);

            if (proyecto) {
                // Inyectar Título
                document.getElementById("proyecto-titulo").innerText = proyecto.titulo;

                // --- LÓGICA DEL CARRUSEL ADAPTATIVO ---
                const carouselInner = document.getElementById("carousel-imagenes");
                const carouselIndicadores = document.getElementById("carousel-indicadores");
                const btnPrev = document.getElementById("btn-prev");
                const btnNext = document.getElementById("btn-next");

                // Verificar si existe el arreglo 'imagenes' y no está vacío
                if (proyecto.imagenes && proyecto.imagenes.length > 0) {
                    
                    // Recorrer el arreglo de imágenes
                    proyecto.imagenes.forEach((rutaImagen, index) => {
                        const claseActiva = index === 0 ? "active" : ""; // La primera imagen debe ser activa

                        // Crear indicador
                        carouselIndicadores.innerHTML += `
                            <button type="button" data-bs-target="#carouselProyecto" data-bs-slide-to="${index}" class="${claseActiva}" aria-label="Slide ${index + 1}"></button>
                        `;

                        // Crear la imagen
                        carouselInner.innerHTML += `
                            <div class="carousel-item h-100 ${claseActiva}">
                                <img src="${rutaImagen}" class="d-block w-100 h-100" style="object-fit: cover; object-position: top center;" alt="Captura del proyecto">
                            </div>
                        `;
                    });

                    // MAGIA ADAPTATIVA: ¿Ocultar flechas si solo hay 1 imagen?
                    if (proyecto.imagenes.length === 1) {
                        btnPrev.style.display = "none";
                        btnNext.style.display = "none";
                        carouselIndicadores.style.display = "none";
                    }

                } else {
                    // Si el arreglo está vacío o no existe, escondemos toda la caja
                    document.getElementById("carouselProyecto").style.display = "none";
                }
                // --- FIN LÓGICA CARRUSEL ---

                // Inyectar Tecnologías
                const divTecnologias = document.getElementById("proyecto-tecnologias");
                const arrayTecnologias = proyecto.tecnologias.split(',');
                arrayTecnologias.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'service-tag';
                    span.innerText = tech.trim();
                    divTecnologias.appendChild(span);
                });

                // Inyectar Descripción
                document.getElementById("proyecto-descripcion").innerText = proyecto.descripcion;

                // Configurar Botón
                const linkElement = document.getElementById("proyecto-link");

                if (proyecto.link && proyecto.link !== "" && proyecto.link !== "#") {
                    // CASO 1: Es un proyecto público con enlace válido
                    linkElement.href = proyecto.link;
                    linkElement.style.display = "inline-flex";
                } else {
                    // CASO 2: Es un proyecto que no está en línea (el enlace es "#" o está vacío)
                    linkElement.style.display = "inline-flex"; // Lo mostramos
                    linkElement.removeAttribute("href"); // Quitamos el hipervínculo para que no haga nada al hacer clic
                    
                    linkElement.classList.remove("btn-dark");
                    linkElement.classList.add("btn-secondary");
                    linkElement.style.cursor = "not-allowed"; 
                    linkElement.style.opacity = "0.7"; 
                    
                    linkElement.innerHTML = `
                        Proyecto no dispobile
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
                        </svg>
                    `;
                }

            } else {
                document.getElementById("proyecto-titulo").innerText = "Proyecto no encontrado";
                document.getElementById("carouselProyecto").style.display = "none";
            }
        })
        .catch(error => {
            console.error("Error al cargar los proyectos:", error);
            document.getElementById("proyecto-titulo").innerText = "Error al cargar la información";
            document.getElementById("carouselProyecto").style.display = "none";
        });
});
