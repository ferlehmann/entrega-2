const tablaDeTalles = [
    { medida: 29, talle: 42 },
    { medida: 30, talle: 43 },
    { medida: 31, talle: 44 },
    { medida: 32, talle: 45 },
];

const modelos = [
    { id: "NIKE CELESTE", imagen: "./nikeCeleste.png" },
    { id: "NIKE GRIS", imagen: "./nikeGris.png" },
    { id: "NIKE MARRON", imagen: "./nikeMarron.png" },
    { id: "NIKE ROSA", imagen: "./nikeRosa.png" },
    { id: "NIKE VERDE", imagen: "./nikeVerde.png" },
    { id: "NIKE VIOLETA", imagen: "./nikeVioleta.png" },
];

let listaDeTalles = JSON.parse(localStorage.getItem('talles')) || [];

function mostrarModelos() {
    const contenedor = document.getElementById('modelos');
    contenedor.innerHTML = ''; 
    modelos.forEach(modelo => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${modelo.imagen}" alt="${modelo.id}">
            <p>${modelo.id}</p>
        `;
        card.onclick = () => seleccionarModelo(modelo.id);
        contenedor.appendChild(card);
    });
}

let modeloSeleccionado = "";

function seleccionarModelo(modelo) {
    modeloSeleccionado = modelo;

    const cards = document.getElementById('modelos').getElementsByClassName('card');
    cards.forEach(card => card.classList.remove('selected'));

    const selectedCard = Array.from(cards).find(card => card.innerText.includes(modelo));
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}

function registrarTalle() {
    if (!modeloSeleccionado) {
        alert('Por favor, seleccione un modelo de zapatilla.');
        return;
    }

    const medida = parseInt(document.getElementById('medida').value);
    const talleEncontrado = tablaDeTalles.find(item => item.medida === medida)?.talle;

    if (!talleEncontrado) {
        alert("No se encontró un talle para la medida seleccionada.");
        return;
    }
    
    const talleExistente = listaDeTalles.find(item => item.medida === medida && item.modelo === modeloSeleccionado);

    if (talleExistente) {
        talleExistente.cantidad += 1;
        alert(`Tienes ${talleExistente.cantidad} talles guardados para el modelo ${modeloSeleccionado}.`);
    } else {
        const nuevoTalle = { medida, talle: talleEncontrado, modelo: modeloSeleccionado, cantidad: 1 };
        listaDeTalles.push(nuevoTalle);
        alert(`Talle guardado: ${talleEncontrado}\nModelo: ${modeloSeleccionado}`);
    }
    localStorage.setItem('talles', JSON.stringify(listaDeTalles));
    mostrarTallesGuardados();
}
function mostrarTallesGuardados() {
    const contenedor = document.getElementById('tallesGuardados');
    const contador = document.getElementById('contadorTalles');
    contenedor.innerHTML = '';

    if (listaDeTalles.length === 0) {
        contenedor.innerHTML = '<p>No hay talles guardados.</p>';
    } else {
        listaDeTalles.forEach((item, index) => {
            const modeloEncontrado = modelos.find(modelo => modelo.id === item.modelo);

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div style="display: flex; align-items: center; padding: 20px 60px;">
                    <img src="${modeloEncontrado.imagen}" alt="${item.modelo}" style="width: 60px; height: auto; margin-right: 30px;">
                    <span style="text-transform: uppercase; font-size: 10px;">Talle: ${item.talle} - Modelo: ${item.modelo} (${item.cantidad} acumulados)</span>
                    <button onclick="eliminarTalle(${index})" class="talle-card-button" style="background-color: black; color: white; border: none; margin-left: 14px; padding 4px; cursor: pointer; border-radius: 5px; font-size: 10px;">
                    Eliminar
                    </button>
                </div>`;
            contenedor.appendChild(card);
        });
        contador.textContent = listaDeTalles.length;
    }
}

function eliminarTalle(index) {
    if (confirm('¿Seguro que querés eliminar este talle?')) {
        listaDeTalles.splice(index, 1);
        localStorage.setItem('talles', JSON.stringify(listaDeTalles));
        mostrarTallesGuardados();
    }
}
function eliminarTodosTalles() {
    if (confirm('¿Seguro que querés eliminar todos los talles guardados?')) {
        listaDeTalles = [];
        localStorage.setItem('talles', JSON.stringify(listaDeTalles));
        mostrarTallesGuardados();
    }
}
mostrarModelos();
mostrarTallesGuardados();
