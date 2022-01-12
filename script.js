const $formImpuestos = document.getElementById("formImpuestos");
const $inputCantidadDinero = document.getElementById("precio");
const $inputCantidadImpuesto = document.getElementById("impuesto");
const $textErrorValorImpuesto = document.getElementById("errorValorImpuesto");
const $inputCantidadDescuento = document.getElementById("descuento");
const $textErrorValorDescuento = document.getElementById("errorValorDescuento");
const $buttonEnviarDatos = document.getElementById("enviarDatos");
const $textErrorInputVacios = document.getElementById("errorInputVacios");
const $rowMostarDatos = document.getElementById("mostarDatosEnTabla");
const $textCambiarAlDolar = document.getElementById("cambiarDatosAlDolar");
const $buttonCambiarAlDolar = document.getElementById("dolar");
const $rowMostarDolar = document.getElementById("mostarDatosDolarEnTabla");

const calcularImpuestos = (valorImpuesto) => 1 + valorImpuesto / 100;

const calcularPrecioConImpuesto = (dineroIngresado, impuestosIngresado) =>
  dineroIngresado * impuestosIngresado;

const calcularDescuentoSobreImpuesto = (dineroConImpuesto, descuento) =>
  dineroConImpuesto * (descuento / 100);

const precioFinal = (dineroConImpuesto, descuentoSobrePrecio) =>
  dineroConImpuesto - descuentoSobrePrecio;

const precioDolar = (dolar, peso) => dolar * peso;

const crearRegistro = (dinero, impuesto, descuento) => {
  return {
    dinero,
    impuesto,
    descuento,
  };
};

let valoresFinal = [];

const pintarRows = (valoresFinal) => {
  $rowMostarDatos.innerHTML = "";
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

  const hayCamposVacios =
    !$inputCantidadDinero.value &&
    !$inputCantidadImpuesto.value &&
    !$inputCantidadDescuento.value;

  if (hayCamposVacios) {
    $textErrorInputVacios.innerHTML = `
    <p>Por favor completar todos los datos antes de precionar el boton</p>
    `;
    return;
  }

  if (parseInt($inputCantidadImpuesto.value) > 100) {
    $textErrorValorImpuesto.innerHTML = `
    <p>No se puede poner un impuesto del mas de 100%</p>    
    `;
    return;
  }

  if (parseInt($inputCantidadDescuento.value) > 100) {
    $textErrorValorDescuento.innerHTML = `
    <p>No se puede poner un descuento del mas de 100%</p>    
    `;
    return;
  }

  $textErrorInputVacios.innerHTML = ``;
  $textErrorValorDescuento.innerHTML = ``;
  $textErrorValorImpuesto.innerHTML = ``;

  let cantidadDeDinero = parseInt($inputCantidadDinero.value);

  let precioConImpuesto = calcularPrecioConImpuesto(
    cantidadDeDinero,
    calcularImpuestos($inputCantidadImpuesto.value)
  );

  let precioConDescuento = precioFinal(
    precioConImpuesto,
    calcularDescuentoSobreImpuesto(
      precioConImpuesto,
      $inputCantidadDescuento.value
    )
  );

  const registro = crearRegistro(
    cantidadDeDinero,
    precioConImpuesto,
    precioConDescuento
  );

  valoresFinal.push(registro);
  localStorage.setItem("precios", JSON.stringify(valoresFinal));
  $formImpuestos.reset();
  pintarRows(valoresFinal);
};

// const handleClickCalcularDolar = () => {
fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
  .then((response) => response.json())
  .then((data) => {
    let dolar = Object.entries(data).filter(
      (dolar) => dolar[0] === "0" || dolar[0] === "1"
    );
    console.log(dolar);
    $rowMostarDolar.innerHTML += `
            <tr id="valores">
            <td >$${dolar[0][1].casa.venta}</td>
            <td >$${dolar[1][1].casa.venta}</td>
            </tr>
            `;
  });

const init = () => {
  valoresFinal = JSON.parse(localStorage.getItem("precios")) || [];
};

init();

$buttonEnviarDatos.addEventListener(`click`, handleClickEnviar);
// $buttonCambiarAlDolar.addEventListener(`click`,handleClickCalcularDolar)
