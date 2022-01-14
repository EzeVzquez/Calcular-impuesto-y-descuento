const $formImpuestos = document.getElementById("formImpuestos");
const $inputCantidadDinero = document.getElementById("precio");
const $inputCantidadImpuesto = document.getElementById("impuesto");
const $textErrorValorImpuesto = document.getElementById("errorValorImpuesto");
const $inputCantidadDescuento = document.getElementById("descuento");
const $textErrorValorDescuento = document.getElementById("errorValorDescuento");
const $buttonEnviarDatos = document.getElementById("enviarDatos");
const $textErrorInputVacios = document.getElementById("errorInputVacios");
const $rowMostarDatos = document.getElementById("mostarDatosEnTabla");

const crearRegistro = (dinero, impuesto, descuento) => {
  return {
    dinero,
    impuesto,
    descuento,
  };
};

let cantidadDeDinero = [];
let precioConImpuesto = [];
let precioConDescuento = [];
let valoresFinal = [];
let dolarOficial = [];
let dolarBlue = [];

fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
.then((response) => response.json())
.then((data) => {
  let dolar = Object.entries(data).filter(
    (dolar) => dolar[0] === "0" || dolar[0] === "1"
  );
  dolarOficial = dolar[0][1].casa.venta.replace(",", ".");
  dolarBlue = dolar[1][1].casa.venta.replace(",", ".");
});

const pintarRows = (valoresFinal) => {
  $rowMostarDatos.innerHTML = "";
  valoresFinal.forEach((valor, indice) => {
    $rowMostarDatos.innerHTML += `     
    <tr id="valores${indice}">
      <td id="dinero${indice}">$${valor.dinero}</td>
      <td id="impuesto${indice}">$${valor.impuesto}</td>
      <td id="descuento${indice}">$${valor.descuento}</td>
      <td id="eliminar${indice}" ><button class="btn btn-danger" id="eliminarDineroCargadoButton${indice}">Eliminar</button></td>
      <td id="cambiarADolar${indice}"><button class="btn btn-dark id="cambiarADolarButton${indice}">$USD</button></td>
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
};

const eliminarDineroCargado = (valoresFinal) => {
  for (let indice in valoresFinal) {
    document.getElementById(`eliminarDineroCargadoButton${indice}`).addEventListener("click", () => {
      document.getElementById(`valores${indice}`).remove();
      valoresFinal.splice(indice, 1);
      localStorage.setItem("precios", JSON.stringify(valoresFinal));
    });
  };
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

const handleClickEnviar = (e) => {
  e.preventDefault(); 

  const hayCamposVacios = !$inputCantidadDinero.value &&
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

  cantidadDeDinero = parseInt($inputCantidadDinero.value);

  precioConImpuesto = calcularPrecioConImpuesto(
    cantidadDeDinero,
    calcularImpuestos($inputCantidadImpuesto.value)
  );

  precioConDescuento = calcularPrecioFinal(
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
  eliminarDineroCargado(valoresFinal);
  // cambiarADolares(valoresFinal);
};



const init = () => {
  valoresFinal = JSON.parse(localStorage.getItem("precios")) || [];
};

init();

$buttonEnviarDatos.addEventListener(`click`, handleClickEnviar);