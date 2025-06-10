//Menu lateral
var menu_visible = false;
let menu = document.getElementById("nav");
function mostrarOcultarMenu(){
    if(menu_visible==false){//si esta oculto
        menu.style.display = "block";
        menu_visible = true;
    }
    else{
        menu.style.display = "none";
        menu_visible = false;
    }
}

//oculto el menu una vez que selecciono una opción
let links = document.querySelectorAll("nav a");
for(var x = 0; x <links.length;x++){
    links[x].onclick = function(){
        menu.style.display = "none";
        menu_visible = false;
    }
}
   // =======  RELOJ ======
// Variables globales
let manualHour = null;
let manualMinute = null;
let manualSecond = null;

// Función que actualiza el reloj y el mensaje de saludo
function updateClock() {
// Obtener la hora actual con moment.js
    let now;
    if (manualHour !== null && manualMinute !== null && manualSecond !== null) {
        now = moment({hour: manualHour, minute: manualMinute, second: manualSecond});
    } else {
        now = moment();
    }
    const hour = now.hour();
    const minute = now.minute();
    const second = now.second();

// Formato de la hora en formato 12 horas
    const time = now.format("hh:mm:ss A");

// Mostrar la hora en el reloj
    document.getElementById("clock").innerHTML = time;

// Obtener el mensaje de saludo según la hora del día
    let greeting;
    if (hour >= 6 && hour < 14) {
        greeting = "Buenos días";
    } else if (hour >= 14 && hour < 20) {
        greeting = "Buenas tardes";
    } else {
        greeting = "Buenas noches";
    }
// Mostrar el mensaje de saludo
    document.getElementById("greeting").innerHTML = greeting;
}
// Actualizar el reloj cada segundo
setInterval(updateClock, 1000);
    // ======== FIN RELOJ =====

// imagen del ascensor
const elevator = document.querySelector('.elevator');
elevator.addEventListener('mouseleave', () => {
  elevator.classList.remove('open');
});
elevator.addEventListener('click', () => {
  elevator.classList.toggle('open');
});
// fin de imagen del ascensor    



// ==== Proyecto ====
const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas');

	// Agregamos los listener de los enlaces para filtrar por categoria.
	const enlaces = document.querySelectorAll('#categorias a');
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			evento.target.classList.add('activo');

			const categoria = evento.target.innerHTML.toLowerCase();
			categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
		});
	});

	// Agregamos el listener para la barra de busqueda
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});

	// Agregamos listener para las imagenes
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

			overlay.classList.add('activo');
			document.querySelector('#overlay img');			
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
	});
	
});
// ==== Fin de Proyecto ====

// Cuando el usuario hace clic en el botón de cerrar, oculta el modal
var closeButton = document.getElementsByClassName("close")[0];
closeButton.addEventListener("click", function() {
  modal.style.display = "none";
});

// Cuando el usuario hace clic fuera del modal, oculta el modal
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function cerrarModal() {
	var modal = document.getElementById("modal");
	modal.style.display = "none";
}

function mostrarModal(numero) {
	var modal = document.getElementById("modal");
	var modalImagen = document.getElementById("modal-imagen");
	var modalTitulo = document.getElementById("modal-titulo");
	var modalEnlace = document.getElementById("modal-enlace");

	modal.style.display = "flex";
	
	if (numero === 1) {
		modalImagen.src = "img/Informatica.jpg";
		modalTitulo.innerHTML = "I N F O R M A T I C A";
		modalEnlace.innerHTML = "<a href='main2.html' target='_blank'>E N T R A R</a>";
	} else if (numero === 2) {
		modalImagen.src = "img/ecommerce.jpg";
		modalTitulo.innerHTML = "E - C O M M E R C E";
		modalEnlace.innerHTML = "<a href='main2.html' target='_blank'>E N T R A R</a>";
	} else if (numero === 3) {
		modalImagen.src = "img/programacion.jpg";
		modalTitulo.innerHTML = "P R O G R A M A C I O N";
		modalEnlace.innerHTML = "<a href='main2.html' target='_blank'>E N T R A R</a>";
	} else if (numero === 4) {
		modalImagen.src = "img/electronica.jpg";
		modalTitulo.innerHTML = "E L E C T R O N I C A";
		modalEnlace.innerHTML = "<a href='main2.html' target='_blank'>E N T R A R</a>";
	} else if (numero === 5) {
		modalImagen.src = "img/proyectos.jpg";
		modalTitulo.innerHTML = "P R O Y E C T O S";
		modalEnlace.innerHTML = "<a href='main2.html' target='_blank'>E N T R A R</a>";
	}
}


// ================== fin de modal ===================
