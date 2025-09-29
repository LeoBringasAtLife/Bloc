const devocionales = [
    {
        id: 1,
        titulo: "Una nueva época",
        referencia: "Isaías 54:2",
        fecha: "28/09/2025",
        imagen: "imagenes/una-nueva-epoca.webp",
        contenido: `
        <p>Termina un largo día. Termina una semana intensa. Sí, ya sé: el domingo no termina la semana, empieza la nueva, pero en la práctica los lunes arranca la rutina.</p>

        <p>Bueno, según lo que entiendas por rutina. Si se trata de una serie de actividades fijas y repetidas, estamos en el horno, porque nuestra actividad también consiste en eventos fijos y repetidos los fines de semana.</p>

        <p>Ok. Fijos y repetidos, pero a veces (como esta semana) tenemos actividades especiales. Ya sabés: cumplimos 14 años como iglesia y, recién hoy, hace un rato, terminamos de celebrar.</p>

        <p>En estos cinco días Dios nos habló. Los cuatro predicadores invitados que nos acompañaron estuvieron alineados en la palabra y la visión — “como si se hubieran puesto de acuerdo”, según el comentario general. Pero no se pusieron de acuerdo entre ellos, sino que se encontraron en Dios, quien les dio esta dirección, resumida en la declaración final de hoy: una nueva época comienza.</p>

        <p>Una época no es lo mismo que una temporada. Tampoco es solo una etapa. Una nueva época es un cambio completo de códigos, principios y métodos. Lo que se hacía ya no se hace. Lo que se hace, se hace distinto. Lo que se mantiene, tiene otra forma u otro fin. Una nueva época en la que lo que terminó queda en la historia, donde no se vuelve atrás.</p>

        <p>Dice Isaías 54:2: “¡Extiende el sitio de tu tienda! ¡Alarga las cortinas de tus aposentos! ¡No te midas! ¡Extiende las cuerdas y refuerza las estacas!”</p>

        <p>Una nueva época: “¡Extiende el sitio de tu tienda!” No te acostumbres a lo rutinario. No te amoldes a lo habitual. Abrí tu mente. Ampliá tu visión.</p>

        <p>Una nueva época: “¡Alarga las cortinas de tus aposentos!” No te detengas ante tus limitaciones. No te encierres en tu propio criterio. “No seas sabio en tu propia opinión”.</p>

        <p>Una nueva época: “¡No te midas!” Otra versión dice: “no te limites”, otra más dice: “no seas escaso”. No juzgues tus metas según tu capacidad, sino según tu potencial y la palabra recibida.</p>

        <p>Una nueva época: “¡Extiende las cuerdas!” No vivas para el hoy. No midas tu inversión según el esfuerzo aplicado, sino según la meta a alcanzar.</p>

        <p>Una nueva época: “¡Refuerza las estacas!” Lo más pequeño e insignificante puede llegar a ser lo más relevante e imprescindible. Un pequeño fusible de 1 cm de largo puede definir el funcionamiento de una gran maquinaria. Afirmate, ajustate, pulí y sacá filo; cavá más profundo: reforzá, fortalecé, asegurá las estacas.</p>

        <p>Una nueva época. No te quedes atrás.</p>
    `
    },
    {
        id: 2,
        titulo: "Titulo 2",
        referencia: "Pasaje 1:1",
        fecha: "27/09/2025",
        imagen: "imagenes/imagen.webp",
        contenido: `
            <p>Texto</p>
        `
    },
    {
        id: 3,
        titulo: "Titulo 3",
        referencia: "Pasaje 1:1",
        fecha: "26/09/2025",
        imagen: "imagenes/imagen.webp",
        contenido: `
            <p>Texto</p>
        `
    },
    {
        id: 4,
        titulo: "Titulo 4",
        referencia: "Pasaje 1:1",
        fecha: "25/09/2025",
        imagen: "imagenes/imagen.webp",
        contenido: `
            <p>Texto</p>
        `
    },
    {
        id: 5,
        titulo: "Titulo 5",
        referencia: "Pasaje 1:1",
        fecha: "24/09/2025",
        imagen: "imagenes/imagen.webp",
        contenido: `
            <p>Texto</p>
        `
    },
];

// Función para extraer y formatear meses y años
function obtenerMesesDisponibles() {
    const mesesMap = new Map();

    devocionales.forEach(post => {
        // Parsear la fecha (formato: DD/MM/YYYY)
        const [dia, mes, año] = post.fecha.split('/').map(Number);

        if (!isNaN(mes) && !isNaN(año)) {
            const fecha = new Date(año, mes - 1, dia);
            const clave = `${mes}/${año}`;
            const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
            const displayText = `${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)} ${año}`;

            if (mesesMap.has(clave)) {
                mesesMap.get(clave).count++;
            } else {
                mesesMap.set(clave, {
                    display: displayText,
                    count: 1,
                    mes: mes,
                    año: año
                });
            }
        }
    });

    // Función para mostrar sugerencias de búsqueda
    function mostrarSugerencias(termino) {
        if (termino.length < 2) return;

        const sugerencias = devocionales.filter(post =>
            post.titulo.toLowerCase().includes(termino.toLowerCase()) ||
            post.referencia.toLowerCase().includes(termino.toLowerCase())
        ).slice(0, 5);

        // Implementar dropdown de sugerencias
    }

    // Convertir a array y ordenar por fecha (más reciente primero)
    return Array.from(mesesMap.entries())
        .sort((a, b) => {
            if (a[1].año !== b[1].año) return b[1].año - a[1].año;
            return b[1].mes - a[1].mes;
        });
}

// Función para poblar el dropdown de meses
function poblarDropdownMeses() {
    const monthFilter = document.getElementById('monthFilter');
    const meses = obtenerMesesDisponibles();

    // Limpiar opciones existentes (excepto la primera)
    while (monthFilter.children.length > 1) {
        monthFilter.removeChild(monthFilter.lastChild);
    }

    // Agregar nuevas opciones
    meses.forEach(([clave, data]) => {
        const option = document.createElement('option');
        option.value = clave;
        option.textContent = `${data.display} (${data.count})`;
        monthFilter.appendChild(option);
    });
}

// Función para filtrar por mes
function filtrarPorMes(claveMes) {
    if (claveMes === 'all') {
        return devocionales;
    }

    const [mes, año] = claveMes.split('/').map(Number);

    return devocionales.filter(post => {
        const [diaPost, mesPost, añoPost] = post.fecha.split('/').map(Number);
        return mesPost === mes && añoPost === año;
    });
}

// Función para renderizar los posts
function renderPosts(posts) {
    const container = document.getElementById('postsContainer');

    if (posts.length === 0) {
        container.innerHTML = '<div class="no-results">No se encontraron devocionales que coincidan con tu búsqueda.</div>';
        return;
    }

    container.innerHTML = posts.map(post => {
        const imagenHTML = post.imagen ? `
            <div class="post-image-container">
                <img src="${post.imagen}" alt="${post.titulo}" class="post-image"
                     onerror="this.parentElement.style.display='none'">
            </div>
        ` : '';

        return `
            <article class="blog-post" data-id="${post.id}">
                <h2 class="post-title">${post.titulo}</h2>
                <p class="post-meta">${post.referencia} · ${post.fecha}</p>
                ${imagenHTML}
                <div class="post-content">${post.contenido}</div>
            </article>
        `;
    }).join('');
}

// Función para buscar devocionales
function buscarDevocionales(termino) {
    if (!termino.trim()) {
        return devocionales;
    }

    const terminoLower = termino.toLowerCase();
    return devocionales.filter(post =>
        post.titulo.toLowerCase().includes(terminoLower) ||
        post.referencia.toLowerCase().includes(terminoLower) ||
        post.contenido.toLowerCase().includes(terminoLower) ||
        post.fecha.includes(termino)
    );
}

// Función para aplicar todos los filtros
function aplicarFiltros() {
    const searchInput = document.getElementById('searchInput');
    const monthFilter = document.getElementById('monthFilter');

    let resultados = devocionales;

    // Aplicar filtro de búsqueda
    const terminoBusqueda = searchInput.value;
    if (terminoBusqueda.trim()) {
        resultados = buscarDevocionales(terminoBusqueda);
    }

    // Aplicar filtro de mes
    const mesSeleccionado = monthFilter.value;
    if (mesSeleccionado !== 'all') {
        resultados = filtrarPorMes(mesSeleccionado).filter(post =>
            resultados.includes(post)
        );
    }

    renderPosts(resultados);
}

// Función para manejar la búsqueda
function manejarBusqueda() {
    aplicarFiltros();
}

// Inicializar la aplicación
function init() {
    // Poblar el dropdown de meses
    poblarDropdownMeses();

    // Renderizar todos los posts al cargar
    renderPosts(devocionales);

    // Configurar eventos del buscador
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const monthFilter = document.getElementById('monthFilter');

    searchButton.addEventListener('click', manejarBusqueda);

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            manejarBusqueda();
        }
    });

    // Búsqueda en tiempo real
    searchInput.addEventListener('input', function () {
        if (this.value.length === 0 || this.value.length >= 3) {
            aplicarFiltros();
        }
    });

    // Filtro por mes
    monthFilter.addEventListener('change', aplicarFiltros);
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);