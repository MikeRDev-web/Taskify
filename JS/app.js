//Acciones del nav

let contenedorGeneral = document.getElementById("seccionGeneral");
let boton1Menu = document.getElementById("nuevaTareaBtnMenu");
let boton2Menu = document.getElementById("queEsTaskifyBtnMenu");
let header = document.getElementById("header");

let nuevaTareaBtn = document.getElementById("nuevaTareaBtn");

let idTarea;

boton1Menu.addEventListener("click", () => {
  if (nuevaTareaBtn) {
    if (
      nuevaTareaBtn.innerHTML === "Nueva tarea" &&
      contenedorGeneral.innerHTML ===
        `<div class="modalNuevaTarea" id="nuevaTareaModal">`
    ) {
      setTimeout(() => {
        nuevaTareaBtn.classList.add("alertClass");
        nuevaTareaBtn.classList.remove("nuevaTarea__btn");
      }, 100);
      setTimeout(() => {
        nuevaTareaBtn.classList.remove("alertClass");
        nuevaTareaBtn.classList.add("nuevaTarea__btn");
      }, 500);
    } else {
      nuevaTareaBtn.remove();
      contenedorGeneral.innerHTML = `<a href="#" class="nuevaTarea__btn" id="nuevaTareaBtn" onclick="abrirModalNuevaTarea()">Nueva tarea</a>`;
    }
  }
});

boton2Menu.addEventListener("click", () => {
  contenedorGeneral.innerHTML = `<div class="seccionDescripcion" id="descripcion">
  <h1 class="seccionDescripcion__titulo">¿Que es Taskify?</h1>
  <p class="seccionDescripcion__parrafo">
  Taskify es una práctica y eficiente aplicación de lista de tareas que te ayuda a ser más productivo. 📝<br>
  Con Taskify, puedes organizar y completar tus tareas de manera sencilla y mantener un seguimiento de tus metas diarias. 🚀<br>
  ¡Logra tus objetivos de manera más fácil y efectiva con Taskify! 💪
    </p>
</div>`;
});

//agregar y almacenar la nueva tarea

//objeto de cada tarea

let conjuntoDeTareas = [];

//objeto de cada tarea (constructor)
function tareaGuardadaObj(tituloTarea, numComtrol) {
  this.tarea = tituloTarea;
  this.numeroControl = numComtrol;
}
// Función para agregar una nueva tarea al conjuntoDeTareas
function agregarTarea(tituloTarea, numComtrol) {
  const nuevaTarea = new tareaGuardadaObj(tituloTarea, numComtrol);
  conjuntoDeTareas.push(nuevaTarea);
  console.log(conjuntoDeTareas);
}

function abrirModalNuevaTarea() {
  contenedorGeneral.innerHTML = `<div class="modalNuevaTarea" id="nuevaTareaModal">
    <a href="#" id="cerrarModalNuevaTarea"><img src="/IMG/svg/close.svg" alt="close" class="modalNuevaTarea__btn-close--img"></a>
    <h2 class="modalNuevaTarea__titulo">¡Nombra tu tarea!</h2>
    <input type="text" class="modalNuevaTarea__input" id="tituloNuevaTareaInput" maxlength="50">
    <p id="cuentaCaracteres" class="modalNuevaTarea__contador"></p>
    <a href="#" class="modalNuevaTarea__btn" id="guardarTareaBtn">Guardar tarea</a>
  </div>`;

  let cerrarModalBtn = document.getElementById("cerrarModalNuevaTarea");
  cerrarModalBtn.addEventListener("click", function () {
    contenedorGeneral.innerHTML = `<a href="#" class="nuevaTarea__btn" id="nuevaTareaBtn" onclick="abrirModalNuevaTarea()">Nueva tarea</a>`;
  });

  let tituloTarea = document.getElementById("tituloNuevaTareaInput");
  let guardarTareaBtn = document.getElementById("guardarTareaBtn");
  function comprobarCampoVacio() {
    if (tituloTarea.value === "") {
      return true;
    }
  }

  //almacenar tarea
  let seccionTareas = document.getElementById("tareaAsignada");

  let idTarea = Math.floor(Math.random() * 99) + 1;
  function guardarTarea(tarea) {
    tarea = tituloTarea.value;

    seccionTareas.insertAdjacentHTML(
      "beforeend",
      `<li class="seccionTareas__lista--li" id="${idTarea}">
        <h2 class="seccionTareas__lista--h2">${tarea}</h2>
        <span class="seccionTareas__lista--iconSection">
        <a href="#" title="Completar tarea" id="completarTarea${idTarea}">
            <img src="/IMG/svg/completado.svg" alt="completado" class="seccionTareas__lista--ul-icon">
          </a>
          <a href="#" title="Eliminar tarea" id="eliminarTarea${idTarea}">
            <img src="/IMG/svg/delete.svg" alt="Eliminar Tarea" class="seccionTareas__lista--ul-icon-chatgtpt" id="eliminarTareaImg${idTarea}">
          </a>
          <a href="#" title="Resaltar" id="marcarTareaAsignada${idTarea}">
              <img src="/IMG/svg/marcar.svg" alt="Marcar Tarea" class="seccionTareas__lista--ul-icon-chatgtpt">
            </a>
        </span>
      </li>`
    );

    // Control de los botones
    let tareaCompletadaSeccion = document.getElementById("tareaCompletada");
    let completarTareaBtn = document.getElementById(`completarTarea${idTarea}`);
    completarTareaBtn.addEventListener("click", () => {
      event.preventDefault();
      // Lógica para completar la tarea con ID igual a idTarea
      let tareaAMover = document.getElementById(`${idTarea}`);
      tareaCompletadaSeccion.insertAdjacentHTML(
        "beforeend",
        `<li class="seccionTareas__lista--li" id="tareaCompletada${idTarea}">
        <h2 class="seccionTareas__lista--h2">${tarea}</h2>
        <span class="seccionTareas__lista--iconSection-completada">
        <a href="#" title="Eliminar definitivamente" id="eliminarTareaCompletada${idTarea}">
        <img src="/IMG/svg/delete.svg" alt="Eliminar Tarea" class="seccionTareas__lista--ul-icon-chatgtpt">
        </a>
        <a href="#" title="Resaltar" id="marcarTarea${idTarea}">
        <img src="/IMG/svg/marcar.svg" alt="Marcar Tarea" class="seccionTareas__lista--ul-icon-chatgtpt">
        </a>
        </span>
        </li>`
      );
      tareaAMover.remove();
      console.log(`Completar tarea con ID: ${idTarea}`);
      //funcion para eliminar la tarea
      let tareaCompletadaAEliminar = document.getElementById(`tareaCompletada${idTarea}`);
      let eliminarTareaCompletadaBtn = document.getElementById(`eliminarTareaCompletada${idTarea}`)
      eliminarTareaCompletadaBtn.addEventListener('click', function(){
        event.preventDefault();
        tareaCompletadaAEliminar.remove();
      });
      //resaltar la tarea
      let marcarTareaCompletada = document.getElementById(`marcarTarea${idTarea}`);
      marcarTareaCompletada.addEventListener('click', ()=>{
        event.preventDefault();
        if (tareaCompletadaAEliminar.style.backgroundColor === "yellow") {
          tareaCompletadaAEliminar.style.backgroundColor = "#E9E9E9";
          tareaCompletadaAEliminar.style.paddingTop = "0";
          tareaCompletadaAEliminar.style.paddingBottom = "0";
          tareaCompletadaAEliminar.style.border = "none";
          tareaCompletadaAEliminar.style.margin = "1rem";
          tareaCompletadaAEliminar.style.transition = ".3s";
        } else {
          tareaCompletadaAEliminar.style.backgroundColor = "yellow";
          tareaCompletadaAEliminar.style.paddingTop = "15px";
          tareaCompletadaAEliminar.style.paddingBottom = "15px";
          tareaCompletadaAEliminar.style.borderRadius = "5px";
          tareaCompletadaAEliminar.style.border = "1px solid black";
          tareaCompletadaAEliminar.style.margin = "0.5rem";
          tareaCompletadaAEliminar.style.transition = ".3s";
        }
      })
    });

    let eliminarTareaBtn = document.getElementById(`eliminarTarea${idTarea}`);
    let elimiarSeccion = document.getElementById(`${idTarea}`);
    let tareaAEliminar = document.getElementById(`eliminarTareaImg${idTarea}`);
    let modalDeAlerta = document.getElementById("modalDeAlerta");
    eliminarTareaBtn.addEventListener("click", () => {
      // Lógica para eliminar la tarea con ID igual a idTarea
      event.preventDefault();
      tareaAEliminar.setAttribute("src", "/IMG/svg/relojDeArena.gif");
      modalDeAlerta.classList.add("modal-container");
      modalDeAlerta.style.opacity = '1';
      modalDeAlerta.innerHTML = `<div class="modal-container">
      <span class="modal__alerta__borrar" id="contenidoDelModal${idTarea}">
        <h1>¿Deseas eliminar esta tarea de la lista de tareas asignadas?</h1>
        <h2>Recuerda que las tareas eliminadas no pueden recuperarse</h2>
        <a href="#" class="modal__alerta__borrar__btn" id="siQuieroElimiar${idTarea}">Si, quiero eliminarla</a>
        <a href="#" class="modal__alerta__borrar__btn" id="noQuieroEliminar${idTarea}">No, quiero conservarla</a>
      </span>
    </div>`;
      //bloquear la interactividad de todos los botones
      completarTareaBtn.style.pointerEvents = "none";
      ayudaTareaBtn.style.pointerEvents = "none";
      ayudaTareaBtn.style.pointerEvents = "none";
      eliminarTareaBtn.style.pointerEvents = "none";
      contenedorGeneral.style.pointerEvents = "none";
      header.style.pointerEvents = "none";
      body.style.overflowY = 'hidden';
      //usar los botones del modal
      let siBorrar = document.getElementById(`siQuieroElimiar${idTarea}`);
      let modalDeAlertaEnPantalla = document.getElementById(`contenidoDelModal${idTarea}`);
      siBorrar.addEventListener("click", () => {
        //eliminar el modal
        event.preventDefault();
        modalDeAlertaEnPantalla.remove();
        elimiarSeccion.remove();
        completarTareaBtn.style.pointerEvents = "auto";
        ayudaTareaBtn.style.pointerEvents = "auto";
        ayudaTareaBtn.style.pointerEvents = "auto";
        eliminarTareaBtn.style.pointerEvents = "auto";
        contenedorGeneral.style.pointerEvents = "auto";
        header.style.pointerEvents = "auto";
        modalDeAlerta.classList.remove("modal-container");
        modalDeAlerta.style.opacity = '0';
        body.style.overflowY = 'scroll';
      });

      let noBorrar = document.getElementById(`noQuieroEliminar${idTarea}`);
      noBorrar.addEventListener('click', ()=>{
        event.preventDefault();
        modalDeAlertaEnPantalla.remove();
        tareaAEliminar.setAttribute("src", "/IMG/svg/delete.svg");
        modalDeAlertaEnPantalla.remove();
        completarTareaBtn.style.pointerEvents = "auto";
        ayudaTareaBtn.style.pointerEvents = "auto";
        ayudaTareaBtn.style.pointerEvents = "auto";
        eliminarTareaBtn.style.pointerEvents = "auto";
        contenedorGeneral.style.pointerEvents = "auto";
        header.style.pointerEvents = "auto";
        modalDeAlerta.classList.remove("modal-container");
        modalDeAlerta.style.opacity = '0';
        body.style.overflowY = 'scroll';
      })

      console.log(`Eliminar tarea con ID: ${idTarea}`);
    });

    let ayudaTareaBtn = document.getElementById(
      `marcarTareaAsignada${idTarea}`
    );
    ayudaTareaBtn.addEventListener("click", () => {
      let recuadroTarea = document.getElementById(`${idTarea}`);
      event.preventDefault();
      if (recuadroTarea.style.backgroundColor === "yellow") {
        recuadroTarea.style.backgroundColor = "#E9E9E9";
        recuadroTarea.style.paddingTop = "0";
        recuadroTarea.style.paddingBottom = "0";
        recuadroTarea.style.border = "none";
        recuadroTarea.style.margin = "1rem";
        recuadroTarea.style.transition = ".3s";
      } else {
        recuadroTarea.style.backgroundColor = "yellow";
        recuadroTarea.style.paddingTop = "15px";
        recuadroTarea.style.paddingBottom = "15px";
        recuadroTarea.style.borderRadius = "5px";
        recuadroTarea.style.border = "1px solid black";
        recuadroTarea.style.margin = "0.5rem";
        recuadroTarea.style.transition = ".3s";
      }
    });

    contenedorGeneral.innerHTML = `<a href="#" class="nuevaTarea__btn" id="nuevaTareaBtn" onclick="abrirModalNuevaTarea()">Nueva tarea</a>`;
  }

  //contador de caracteres
  let cuentaCaracteres = document.getElementById("cuentaCaracteres");
  const maximoCaracteres = 49;

  cuentaCaracteres.textContent = `0/${maximoCaracteres}`;

  tituloTarea.addEventListener("input", () => {
    const cuenta = tituloTarea.value.length;
    if (cuenta === 0) {
      cuentaCaracteres.style.backgroundColor = "#E9E9E9";
      cuentaCaracteres.textContent = `0/${maximoCaracteres}`;
    } else if (cuenta === 10) {
      cuentaCaracteres.style.backgroundColor = "#FFEBEE";
    } else if (cuenta === 20) {
      cuentaCaracteres.style.backgroundColor = "#FFCDD2";
    } else if (cuenta === 30) {
      cuentaCaracteres.style.backgroundColor = "#EF9A9A";
    } else if (cuenta === 40) {
      cuentaCaracteres.style.backgroundColor = "#E57373";
    } else if (cuenta === 50) {
      cuentaCaracteres.style.backgroundColor = "#F44336";
    } else {
      cuentaCaracteres.textContent = `${cuenta}/${maximoCaracteres}`;
    }
  });

  //aqui termina el contador de caracteres

  //aqui se ejecutan las funciones con el click
  guardarTareaBtn.onclick = () => {
    if (comprobarCampoVacio() === true) {
      setTimeout(() => {
        tituloTarea.classList.add("modalNuevaTarea__input--alert");
        tituloTarea.setAttribute(
          "placeholder",
          "Debes darle un nombre a tu tarea"
        );
      }, 200);
      setTimeout(() => {
        tituloTarea.classList.remove("modalNuevaTarea__input--alert");
        tituloTarea.setAttribute("placeholder", "");
      }, 2000);
    } else {
      guardarTarea(tituloTarea.value);
      agregarTarea(tituloTarea.value, idTarea);
    }
  };
}