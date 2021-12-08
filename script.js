let $inputApellidoDelUsuario = document.getElementById("inputApellidoDelUsuario");
let $inputNombreDelUsuario = document.getElementById("inputNombreDelUsuario");
let $inputPrecioDelUsuario = document.getElementById("inputPrecioDelUsuario");
let $inputImpuestoDelUsuario = document.getElementById("inputImpuestoDelUsuario");
let $textPrecioConImpuesto = document.getElementById("valorUsuarioConImpuesto");
let $buttonEnviarValor = document.getElementById("buttonEnviarValor");
let $inputDescuentoSobrePrecioFinal = document.getElementById("inputDescuentoSobrePrecioFinal");
let $buttonAplicarDescuento = document.getElementById("buttonAplicarDescuento");
let $textValorFinalConDescuento = document.getElementById("valorFinalConDescuento");
let $textDatosDelUsuario = document.getElementById("datosDelUsuario");
let $textNumerosOrdenados = document.getElementById("textNumerosOrdenados")

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
    obtenerDatos: () => {
      return `${nombre} ${apellido}`;
    },
  };
};

let impuestos = []

let precioConImpuesto;
let precioConDescuento;

const handleClickEnviarValor = (e) => {
  e.preventDefault();
  
  if(parseInt($inputImpuestoDelUsuario.value) > 100){
     alert("no se puede poner un impuesto más de 100%")
    return
  };

  const persona = crearObjeto(
    $inputNombreDelUsuario.value,
    $inputApellidoDelUsuario.value
  );

  precioConImpuesto = calcularPrecioFinal(
    $inputPrecioDelUsuario.value,
    calcularImpuesto($inputImpuestoDelUsuario.value)
  );

  impuestos.push(precioConImpuesto);
  impuestos.sort(function (a, b) { return a - b });

  $textPrecioConImpuesto.innerHTML = `$${precioConImpuesto}`;
  $textDatosDelUsuario.innerHTML = `${persona.obtenerDatos()} $${precioConImpuesto}`;
  $textNumerosOrdenados.innerHTML = `$${impuestos.join(" $")}`;
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

$buttonEnviarValor.addEventListener(`click`, handleClickEnviarValor);

$buttonAplicarDescuento.addEventListener(`click`, handelClickEnviarDescuento);
