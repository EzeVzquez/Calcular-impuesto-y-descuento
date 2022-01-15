const $formImpuestos = document.getElementById("formImpuestos");
const $inputCantidadDinero = document.getElementById("precio");
const $inputCantidadImpuesto = document.getElementById("impuesto");
const $textErrorValorImpuesto = document.getElementById("errorValorImpuesto");
const $inputCantidadDescuento = document.getElementById("descuento");
const $textErrorValorDescuento = document.getElementById("errorValorDescuento");
const $buttonEnviarDatos = document.getElementById("enviarDatos");
const $textErrorInputVacios = document.getElementById("errorInputVacios");
const $rowMostarDatos = document.getElementById("mostarDatosEnTabla");

let cantidadDeDinero = [];
let precioConImpuesto = [];
let precioConDescuento = [];
let valoresFinal = [];
let dolarOficial = [];
let dolarBlue = [];

const pintarRows = (valoresFinal) => {
  $rowMostarDatos.innerHTML = "";
  valoresFinal.forEach((valor, indice) => {
    $rowMostarDatos.innerHTML += `     
      <tr id="valores${indice}">
      <td id="dinero${indice}">$${valor.dinero}</td>
      <td id="impuesto${indice}">$${valor.impuesto}</td>
      <td id="descuento${indice}">$${valor.descuento}</td>
      <td></td>
      <td id="eliminar${indice}" ><button class="btn btn-danger" id="eliminarDineroCargadoButton${indice}">Eliminar</button></td>
      </tr>
      `;
  });
  $rowMostarDatos.innerHTML += `
    <div>
    <tr id="totalDatos">
    <td id="totalDinero">Total:$${calcularTotal(valoresFinal, "dinero")}</td>
    <td id="totalImpuestos">Total:$${calcularTotal(
      valoresFinal,
      "impuesto"
    )}</td>
      <td id="totalDescuento">Total:$${calcularTotal(
        valoresFinal,
        "descuento"
      )}</td>
        </tr>
        </div>
        `;

  eliminarDineroCargado(valoresFinal);
};

const eliminarDineroCargado = (valoresFinal) => {
  for (let indice in valoresFinal) {
    let $buttonEliminarDineroCargado = document.getElementById(`eliminarDineroCargadoButton${indice}`);
    $buttonEliminarDineroCargado.addEventListener("click", () => {
      document.getElementById(`valores${indice}`).remove();
      valoresFinal.splice(indice, 1);
      localStorage.setItem("precios", JSON.stringify(valoresFinal));
      pintarRows(valoresFinal);
    });
  }
};

// const cambiarADolares = (valoresFinal) => {
//   for (indice in valoresFinal) {
//     document.getElementById(`cambiarADolarButton${indice}`).addEventListener("click", () => {
//       $rowMostarDatos.innerHTML += `
//       <tr id="valores${indice}">
//         <td id="dinero${indice}">$${calcularPrecioDolar(dolarOficial, cantidadDeDinero)}</td>
//         <td id="impuesto${indice}">$${calcularPrecioDolar(dolarOficial, precioConImpuesto)}</td>
//         <td id="descuento${indice}">$${calcularPrecioDolar(dolarOficial, precioConDescuento)}</td>
//         <td id="eliminar${indice}" ><button class="btn btn-danger" id="eliminarDineroCargadoButton${indice}">Eliminar</button></td>
//       <td id="cambiarAPeso${indice}"><button class="btn btn-dark id="cambiarAPesoButton${indice}">$ARS</button></td>
//       `
//     });
//   };
// };

// cambiarADolares(valoresFinal);

const init = () => {
  valoresFinal = JSON.parse(localStorage.getItem("precios")) || [];

  fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
    .then((response) => response.json())
    .then((data) => {
      let dolar = Object.entries(data).filter(
        (dolar) => dolar[0] === "0" || dolar[0] === "1"
      );
      dolarOficial = dolar[0][1].casa.venta.replace(",", ".");
      dolarBlue = dolar[1][1].casa.venta.replace(",", ".");
    });
};

init();

$buttonEnviarDatos.addEventListener(`click`, handleClickEnviar);