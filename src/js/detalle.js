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
                if (proyecto.link && proyecto.link !== "#") {
                    const linkElement = document.getElementById("proyecto-link");
                    linkElement.href = proyecto.link;
                    linkElement.style.display = "inline-flex";
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
