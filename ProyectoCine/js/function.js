
const anios = document.querySelectorAll(".anio");

anios.forEach(function(anio) {
    anio.textContent = new Date().getFullYear();
});

const buscador = document.querySelector("#buscarPelicula");
const filtro = document.querySelector("#filtroGenero");
const tarjetas = document.querySelectorAll(".tarjeta-catalogo");
const mensajeCatalogo = document.querySelector("#mensajeCatalogo");

function filtrarPeliculas() {
    if (!buscador || !filtro || !mensajeCatalogo) {
        return;
    }

    const texto = buscador.value.toLowerCase().trim();
    const genero = filtro.value;
    let cantidad = 0;

    tarjetas.forEach(function(tarjeta) {
        const titulo = tarjeta.dataset.titulo.toLowerCase();
        const categoria = tarjeta.dataset.genero;

        const coincideTexto = titulo.includes(texto);
        const coincideGenero = genero === "todos" || genero === categoria;

        if (coincideTexto && coincideGenero) {
            tarjeta.classList.remove("oculta");
            cantidad++;
        } else {
            tarjeta.classList.add("oculta");
        }
    });

    mensajeCatalogo.textContent = "Películas encontradas: " + cantidad;
}

if (buscador && filtro) {
    buscador.addEventListener("input", filtrarPeliculas);
    filtro.addEventListener("change", filtrarPeliculas);
}

const formulario = document.querySelector("#formularioContacto");
const respuesta = document.querySelector("#respuestaFormulario");
const mensaje = document.querySelector("#mensaje");
const contador = document.querySelector("#contador");

if (mensaje && contador) {
    mensaje.addEventListener("input", function() {
        contador.textContent = mensaje.value.length + " de 500 caracteres";
    });
}

if (formulario && respuesta) {
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        respuesta.classList.remove("exito", "error");

        if (!formulario.checkValidity()) {
            formulario.classList.add("formulario-invalido");
            respuesta.classList.add("error");
            respuesta.textContent = "Revisa los campos obligatorios antes de continuar.";
            formulario.reportValidity();
            return;
        }

        formulario.classList.remove("formulario-invalido");
        respuesta.classList.add("exito");
        respuesta.textContent = "¡Gracias, " +
            document.querySelector("#nombre").value.trim() +
            "! Tu sugerencia se validó correctamente. Este formulario es una demostración y no envía datos a un servidor.";

        formulario.reset();

        if (contador) {
            contador.textContent = "0 de 500 caracteres";
        }
    });
}