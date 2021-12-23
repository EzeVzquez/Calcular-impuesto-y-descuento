let $formImpuestos = document.getElementById("formImpuestos");
let $inputCantidadDinero = document.getElementById("precio");
let $inputCantidadImpuesto = document.getElementById("impuesto");
let $textErrorValorImpuesto = document.getElementById("errorValorImpuesto");
let $inputCantidadDescuento = document.getElementById("descuento");
let $buttonEnviarDatos = document.getElementById("enviarDatos");
let $rowMostarDatos = document.getElementById("mostarDatosEnTabla");

const calcularImpuestos = (valorImpuesto) => 1 + valorImpuesto / 100;

const calcularPrecioConImpuesto = (dineroIngresado, impuestosIngresado) =>
  dineroIngresado * impuestosIngresado;

const calcularDescuentoSobreImpuesto = (dineroConImpuesto, descuento) =>
  dineroConImpuesto * (descuento / 100);

const precioFinal = (dineroConImpuesto, descuentoSobrePrecio) =>
  dineroConImpuesto - descuentoSobrePrecio;

const crearPrecios = (dinero, impuesto, descuento) => {
  return {
    dinero,
    impuesto,
    descuento,
  };
};

let valoresFinal = [];

const init = () => {
  valoresFinal = JSON.parse(localStorage.getItem("valoresFinal")) || [];
};

init();

let precioConImpuesto;
let precioConDescuento;

const pintarRow = (valoresFinal) => {
  valoresFinal.forEach((valor, indice) => {
    $rowMostarDatos.innerHTML += `     
      <tr id="valores${indice}">
      <td id="dinero${indice}">$${valor.dinero}</td>
      <td id="impuesto${indice}">$${valor.impuesto}</td>
      <td id="descuento${indice}">$${valor.descuento}</td>
      </tr>
      `;
  });
};

const handleClickEnviar = (e) => {
  e.preventDefault();

  if (parseInt($inputCantidadImpuesto.value) > 100) {
    $textErrorValorImpuesto.innerHTML += `
          <p>No se puede poner un impuesto del mas de %100</p>    
          `;
    return;
  }

  precioConImpuesto = calcularPrecioConImpuesto(
    $inputCantidadDinero.value,
    calcularImpuestos($inputCantidadImpuesto.value)
  );

  precioConDescuento = precioFinal(
    precioConImpuesto,
    calcularDescuentoSobreImpuesto(
      precioConImpuesto,
      $inputCantidadDescuento.value
    )
  );

  const precios = crearPrecios(
    $inputCantidadDinero.value,
    precioConImpuesto,
    precioConDescuento
  );

  valoresFinal.push(precios);
  localStorage.setItem("precios", JSON.stringify(valoresFinal));
  $formImpuestos.reset();

  pintarRow(valoresFinal);
};

$buttonEnviarDatos.addEventListener(`click`, handleClickEnviar);
