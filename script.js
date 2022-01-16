const $formImpuestos = document.getElementById("formImpuestos");
const $inputCantidadDinero = document.getElementById("precio");
const $inputCantidadImpuesto = document.getElementById("impuesto");
const $textErrorValorImpuesto = document.getElementById("errorValorImpuesto");
const $inputCantidadDescuento = document.getElementById("descuento");
const $textErrorValorDescuento = document.getElementById("errorValorDescuento");
const $buttonEnviarDatos = document.getElementById("enviarDatos");
const $textErrorInputVacios = document.getElementById("errorInputVacios");
const $rowMostarDatos = document.getElementById("mostarDatosEnTabla");
const $buttonCambiarAPeso = document.getElementById("buttonCambiarAPeso");
const $buttonCambiarADolarOficial = document.getElementById("buttonCambiarADolarOficial");
const $buttonCambiarADolarBlue = document.getElementById("buttonCambiarADolarBlue");

let cantidadDeDinero = [];
let precioConImpuesto = [];
let precioConDescuento = [];
let valoresFinal = [];
let dolarOficial = [];
let dolarBlue = [];

// Valor moneda string ARS,USD,USDB

const pintarRows = (valoresFinal, moneda) => {
  $rowMostarDatos.innerHTML = "";
  valoresFinal.forEach((valor, indice) => {

    let precioDolarDinero;
    let precioDolarImpuesto;
    let precioDolarDescuento;

    if(moneda == "ARS"){
      $rowMostarDatos.innerHTML += crearRow(indice, valor.dinero, valor.impuesto, valor.descuento, moneda);
    } else if(moneda == "USD") {
      precioDolarDinero = calcularPrecioDolar(dolarOficial, valor.dinero);
      precioDolarImpuesto = calcularPrecioDolar(dolarOficial, valor.impuesto);
      precioDolarDescuento = calcularPrecioDolar(dolarOficial, valor.descuento);
      $rowMostarDatos.innerHTML += crearRow(indice,precioDolarDinero, precioDolarImpuesto, precioDolarDescuento, moneda);
    } else {
      precioDolarDinero = calcularPrecioDolar(dolarBlue, valor.dinero);
      precioDolarImpuesto = calcularPrecioDolar(dolarBlue, valor.impuesto);
      precioDolarDescuento = calcularPrecioDolar(dolarBlue, valor.descuento);
      $rowMostarDatos.innerHTML += crearRow(indice,precioDolarDinero, precioDolarImpuesto, precioDolarDescuento, "Blue");
    } 
  });
  //FIXME:arreglar total con base a la moneda
  if(valoresFinal.length){
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
        <td class="vacio"> </td>
        <td class="vacio"> </td>
          </tr>
          </div>
          `;
  };
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
      
      const init = () => {
        valoresFinal = JSON.parse(localStorage.getItem("precios")) || [];
        
        fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
        .then((response) => response.json())
        .then((data) => {
          let dolar = Object.entries(data).filter(
            (dolar) => dolar[0] === "0" || dolar[0] === "1"
            );
            dolarOficial = Number(dolar[0][1].casa.venta.replace(",", "."));
            dolarBlue = Number(dolar[1][1].casa.venta.replace(",", "."));
          });
        };
        
        init();
        
        // $(() => {
        //   $buttonEnviarDatos.on("click", (handleClickEnviar);
        // });
        $buttonEnviarDatos.addEventListener(`click`, handleClickEnviar);
        
        $buttonCambiarAPeso.addEventListener("click", handleClickPeso);
        $buttonCambiarADolarOficial.addEventListener("click", handleClickDolarOficial);
        $buttonCambiarADolarBlue.addEventListener("click", handleClickDolarBlue);