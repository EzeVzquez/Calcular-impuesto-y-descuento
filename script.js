let $formValorIngresadoDelUsuario = document.getElementById(
  "inputvalorIngresadoDelUsuario"
);
let $inputApellidoDelUsuario = document.getElementById(
  "inputApellidoDelUsuario"
);
let $inputNombreDelUsuario = document.getElementById("inputNombreDelUsuario");
let $inputPrecioDelUsuario = document.getElementById("inputPrecioDelUsuario");
let $inputImpuestoDelUsuario = document.getElementById(
  "inputImpuestoDelUsuario"
);
let $textPrecioConImpuesto = document.getElementById("valorUsuarioConImpuesto");
let $buttonEnviarValor = document.getElementById("buttonEnviarValor");
let $inputDescuentoSobrePrecioFinal = document.getElementById(
  "inputDescuentoSobrePrecioFinal"
);
let $textErrorValorImpuesto = document.getElementById("errorValorImpuesto");
let $buttonAplicarDescuento = document.getElementById("buttonAplicarDescuento");
let $textValorFinalConDescuento = document.getElementById(
  "valorFinalConDescuento"
);
let $textNumerosOrdenados = document.getElementById("textNumerosOrdenados");
let $textDatosUsuarioFinal = document.getElementById("datosUsuarioFinal");
let $textDatosImpuestoFinal = document.getElementById("datosImpuestoFinal");
let $buttonMostarUsuarioConImpuestos = document.getElementById(
  "mostarUsuarioConImpuestos"
);
let $textParrafoError = document.getElementById("parrafoError");

const calcularImpuesto = (valorImpuesto) => 1 + valorImpuesto / 100;

const calcularPrecioFinal = (valorUsuario, valorIvaUsuario) =>
  valorUsuario * valorIvaUsuario;

const calcularCantidadDescuento = (precioConImpuesto, descuento) =>
  precioConImpuesto * (descuento / 100);

const precioFinalConDescuento = (precioConImpuesto, descuentoSobrePrecio) =>
  precioConImpuesto - descuentoSobrePrecio;

const crearObjeto = (nombre, apellido) => {
  return {
    nombre,
    apellido,
  };
};

let impuestos = [];
let personasArray = [];

let precioConImpuesto;
let precioConDescuento;

const pintarFinal = (personasArray, impuestos) => {
  if (
    ($textDatosUsuarioFinal.children.length == 0) |
    ($textDatosImpuestoFinal.children.length == 0)
  ) {
    // const pintarUsuario = (personasArray) => {
    personasArray.forEach((usuario, indice) => {
      $textDatosUsuarioFinal.innerHTML += `
          <p class="usuario${indice}">${usuario.nombre} ${usuario.apellido}</p>  
        `;
    });
    // };
    // const pintarImpuestos = (impuestos) => {
    impuestos.forEach((valor, indice) => {
      $textDatosImpuestoFinal.innerHTML += `
          <p class="impuesto${indice}">$${valor}</p>
        `;
    });
    // };
  } else {
    $textParrafoError.innerText = "No des mas click al boton mostrar";
  }
};

const handleClickEnviarValor = (e) => {
  e.preventDefault();

  if (parseInt($inputImpuestoDelUsuario.value) > 100) {
    $textErrorValorImpuesto.innerHTML += `
    <p>No se puede poner un impuesto del mas de %100</p>    
    `;
    return;
  }

  const persona = crearObjeto(
    $inputNombreDelUsuario.value,
    $inputApellidoDelUsuario.value
  );

  precioConImpuesto = calcularPrecioFinal(
    $inputPrecioDelUsuario.value,
    calcularImpuesto($inputImpuestoDelUsuario.value)
  );

  impuestos.push(precioConImpuesto);
  impuestos.sort(function (a, b) {
    return a - b;
  });

  personasArray.push(persona);

  localStorage.setItem("personas", JSON.stringify(personasArray));
  localStorage.setItem("impuestos", JSON.stringify(impuestos));

  $textPrecioConImpuesto.innerHTML = `$${precioConImpuesto}`;
  $textNumerosOrdenados.innerHTML = `$${impuestos.join(" $")}`;

  $formValorIngresadoDelUsuario.reset();
};

const handelClickEnviarDescuento = () => {
  precioConDescuento = precioFinalConDescuento(
    precioConImpuesto,
    calcularCantidadDescuento(
      precioConImpuesto,
      $inputDescuentoSobrePrecioFinal.value
    )
  );
  $textValorFinalConDescuento.innerHTML = `$${precioConDescuento}`;
};

const handleClickMostarUsuarioConImpuestosFinal = (e) => {
  e.preventDefault();
  pintarFinal(personasArray, impuestos);
  // pintarUsuario(personasArray);
  // pintarImpuestos(impuestos);
};

$buttonEnviarValor.addEventListener(`click`, handleClickEnviarValor);

$buttonAplicarDescuento.addEventListener(`click`, handelClickEnviarDescuento);

$buttonMostarUsuarioConImpuestos.addEventListener(
  `click`,
  handleClickMostarUsuarioConImpuestosFinal
);
