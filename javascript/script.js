const $buttonSwitchDarkMode = document.getElementById("switch")
const $formImpuestos = document.getElementById("formImpuestos");
const $inputCantidadDinero = document.getElementById("precio");
const $inputCantidadImpuesto = document.getElementById("impuesto");
const $textErrorValorImpuesto = document.getElementById("errorValorImpuesto");
const $inputCantidadDescuento = document.getElementById("descuento");
const $textErrorValorDescuento = document.getElementById("errorValorDescuento");
const $textErrorInputVacios = document.getElementById("errorInputVacios");
const $rowMostarDatos = document.getElementById("mostarDatosEnTabla");
const $buttonCambiarAPeso = document.getElementById("buttonCambiarAPeso");
const $buttonCambiarADolarOficial = document.getElementById("buttonCambiarADolarOficial");
const $buttonCambiarADolarBlue = document.getElementById("buttonCambiarADolarBlue");
const $textMostarDolar = document.getElementById("mostarDolar")

let cantidadDeDinero = [];
let precioConImpuesto = [];
let precioConDescuento = [];
let valoresFinal = [];
let monedaActual = "ARS"
let dolarOficial = [];
let dolarBlue = [];

let darkMode = localStorage.getItem(`darkMode`)

// Valor moneda string ARS,USD,USDB

const pintarRows = (valoresFinal, moneda) => {
  $rowMostarDatos.innerHTML = "";
  valoresFinal.forEach((valor, indice) => {

    let precioDolarDinero;
    let precioDolarImpuesto;
    let precioDolarDescuento;

    if (moneda == "ARS") {
      $rowMostarDatos.innerHTML += crearRow(indice, valor.dinero, valor.impuesto, valor.descuento, moneda);
    } else if (moneda == "USD") {
      precioDolarDinero = calcularPrecioDolar(dolarOficial, valor.dinero);
      precioDolarImpuesto = calcularPrecioDolar(dolarOficial, valor.impuesto);
      precioDolarDescuento = calcularPrecioDolar(dolarOficial, valor.descuento);
      $rowMostarDatos.innerHTML += crearRow(indice, precioDolarDinero, precioDolarImpuesto, precioDolarDescuento, moneda);
    } else {
      precioDolarDinero = calcularPrecioDolar(dolarBlue, valor.dinero);
      precioDolarImpuesto = calcularPrecioDolar(dolarBlue, valor.impuesto);
      precioDolarDescuento = calcularPrecioDolar(dolarBlue, valor.descuento);
      $rowMostarDatos.innerHTML += crearRow(indice, precioDolarDinero, precioDolarImpuesto, precioDolarDescuento, "Blue");
    }
  });

  eliminarDineroCargado(valoresFinal);
};

const eliminarDineroCargado = (valoresFinal) => {
  for (let indice in valoresFinal) {
    let $buttonEliminarDineroCargado = document.getElementById(`eliminarDineroCargadoButton${indice}`);
    $buttonEliminarDineroCargado.addEventListener("click", () => {
      document.getElementById(`valores${indice}`).remove();
      valoresFinal.splice(indice, 1);
      localStorage.setItem("precios", JSON.stringify(valoresFinal));
      pintarRows(valoresFinal, monedaActual);
    });
  }
};

const init = () => {
  valoresFinal = JSON.parse(localStorage.getItem("precios")) || [];
  monedaActual = localStorage.getItem("moneda") || monedaActual
  fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
    .then((response) => response.json())
    .then((data) => {
      let dolar = Object.entries(data).filter(
        (dolar) => dolar[0] === "0" || dolar[0] === "1"
      );
      dolarOficial = Number(dolar[0][1].casa.venta.replace(",", "."));
      dolarBlue = Number(dolar[1][1].casa.venta.replace(",", "."));
      pintarRows(valoresFinal, monedaActual)
      $textMostarDolar.innerHTML = mostarValorDolar(dolarOficial, dolarBlue);
    });
};



init();
guardarDarkMode();

$(() => {
  $("#enviarDatos").on("click", handleClickEnviar)
});

$buttonSwitchDarkMode.addEventListener("click", handleClickDarkMode)

$buttonCambiarAPeso.addEventListener("click", handleClickCambiarMoneda);
$buttonCambiarADolarOficial.addEventListener("click", handleClickCambiarMoneda);
$buttonCambiarADolarBlue.addEventListener("click", handleClickCambiarMoneda);