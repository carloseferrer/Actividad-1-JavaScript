// Obtenemos los datos del DOM
var formulario = document.getElementById("formulario");
var formulariosGenerados = document.getElementById("formularios-generados");
var enviarDatosBtn = document.getElementById("enviar-datos");
var tablaAlumnos = document.getElementById("tabla-alumnos");
var tablaBody = document.getElementById("tabla-body");
var resultadosSection = document.getElementById("resultados");
var reiniciarBtn = document.getElementById("reiniciar");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  var repeticiones = parseInt(document.getElementById("repeticiones").value);

  generarFormularios(repeticiones);
  enviarDatosBtn.classList.remove("hidden");
});

enviarDatosBtn.addEventListener("click", function () {
  var pesos = obtenerPesos();

  if (validarCamposVacios(pesos)) {
    mostrarError(
      "Por favor, complete todos los campos de peso antes de enviar los datos."
    );
  } else {
    mostrarDatosClasificados(pesos);
    reiniciarBtn.classList.remove("hidden");
  }
});

function generarFormularios(repeticiones) {
  formulariosGenerados.innerHTML = "";

  for (var i = 1; i <= repeticiones; i++) {
    var form = document.createElement("form");
    var label = document.createElement("label");
    label.textContent = "Peso del alumno " + i + ":";
    var input = document.createElement("input");
    input.type = "number";
    input.name = "peso" + i;
    input.required = true;
    form.appendChild(label);
    form.appendChild(input);
    formulariosGenerados.appendChild(form);
  }
}

function obtenerPesos() {
  var pesos = [];
  var forms = formulariosGenerados.getElementsByTagName("form");

  for (var i = 0; i < forms.length; i++) {
    var pesoInput = forms[i].querySelector("input");
    var peso = parseFloat(pesoInput.value);
    pesos.push(peso);
  }

  return pesos;
}

function validarCamposVacios(pesos) {
  for (var i = 0; i < pesos.length; i++) {
    if (isNaN(pesos[i])) {
      return true;
    }
  }
  return false;
}

function mostrarDatosClasificados(pesos) {
  var alumnosMenos40kg = 0;
  var alumnosEntre40y50kg = 0;
  var alumnosMas50yMenos60kg = 0;
  var alumnosMasIgual60kg = 0;

  for (var i = 0; i < pesos.length; i++) {
    var peso = pesos[i];

    if (peso < 40) {
      alumnosMenos40kg++;
    } else if (peso >= 40 && peso <= 50) {
      alumnosEntre40y50kg++;
    } else if (peso > 50 && peso < 60) {
      alumnosMas50yMenos60kg++;
    } else {
      alumnosMasIgual60kg++;
    }
  }

  mostrarResultados(
    alumnosMenos40kg,
    alumnosEntre40y50kg,
    alumnosMas50yMenos60kg,
    alumnosMasIgual60kg
  );
}

// Funcion para mostrar los resultados
function mostrarResultados(
  alumnosMenos40kg,
  alumnosEntre40y50kg,
  alumnosMas50yMenos60kg,
  alumnosMasIgual60kg
) {
  resultadosSection.innerHTML = "";

  var menos40kgText = "Alumnos que pesan menos de 40kg: " + alumnosMenos40kg;
  var menos40kgP = document.createElement("p");
  menos40kgP.textContent = menos40kgText;
  resultadosSection.appendChild(menos40kgP);

  var entre40y50kgText =
    "Alumnos que pesan entre 40 y 50kg: " + alumnosEntre40y50kg;
  var entre40y50kgP = document.createElement("p");
  entre40y50kgP.textContent = entre40y50kgText;
  resultadosSection.appendChild(entre40y50kgP);

  var mas50yMenos60kgText =
    "Alumnos que pesan más de 50kg y menos de 60kg: " + alumnosMas50yMenos60kg;
  var mas50yMenos60kgP = document.createElement("p");
  mas50yMenos60kgP.textContent = mas50yMenos60kgText;
  resultadosSection.appendChild(mas50yMenos60kgP);

  var masIgual60kgText =
    "Alumnos que pesan más o igual a 60kg: " + alumnosMasIgual60kg;
  var masIgual60kgP = document.createElement("p");
  masIgual60kgP.textContent = masIgual60kgText;
  resultadosSection.appendChild(masIgual60kgP);
}

// Mensaje de Error
function mostrarError(mensaje) {
  resultadosSection.innerHTML = "";
  var errorP = document.createElement("p");
  errorP.textContent = mensaje;
  errorP.classList.add("error-message");
  resultadosSection.appendChild(errorP);
}

// Boton para reiniciar
reiniciarBtn.addEventListener("click", function () {
  location.reload();
});
