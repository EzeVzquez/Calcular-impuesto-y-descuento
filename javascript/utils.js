/**
 *
 * @param {Number} valorImpuesto
 * @returns Devuelve el porcentaje a aplicar del impuesto deseado del usuario
 */
const calcularImpuestos = (valorImpuesto) => 1 + valorImpuesto / 100;

/**
 *
 * @param {Number} dineroIngresado
 * @param {Number} impuestosIngresado
 * @returns Devuelve el pocentaje del impuesto aplicado en el dinero ingresado por el usuario, se utiliza, en el segundo parametro, calcularImpuesto para que funcione correctamente
 */
const calcularPrecioConImpuesto = (dineroIngresado, impuestosIngresado) =>
  dineroIngresado * impuestosIngresado;

/**
 *
 * @param {Number} dineroConImpuesto
 * @param {Number} descuento
 * @returns Devuelve el descuento a aplicar al valor del usuario con impuestos, en el primer parametro(dineroConImpuesto) se pone el impuesto ya aplicado y en el segundo parametro(descuento) la cantidad de descuento a aplicar.
 */
const calcularDescuentoSobreImpuesto = (dineroConImpuesto, descuento) =>
  dineroConImpuesto * (descuento / 100);

/**
 *
 * @param {Number} dineroConImpuesto
 * @param {Number} descuentoSobrePrecio
 * @returns Devuelve el descuento ya aplicado en el valor final
 */
const calcularPrecioFinal = (dineroConImpuesto, descuentoSobrePrecio) =>
  dineroConImpuesto - descuentoSobrePrecio;

/**
 *
 * @param {String} datos
 * @param {String} tipo
 * @returns Devuelve el total de las filas de datos, va sumando el dinero en una columna, el impuesto en otra y el descuento tambien
 */
const calcularTotal = (datos, tipo) =>
  datos.reduce((acc, curr) => acc + curr[tipo], 0);

/**
 *
 * @param {Number} dolar
 * @param {Number} peso
 * @returns Devuelve la multiplicacion del dolar por el peso
 */
const calcularPrecioDolar = (dolar, peso) => peso / dolar;

/**
 * 
 * @param {Number} indice 
 * @param {Number} dinero 
 * @param {Number} impuesto 
 * @param {Number} descuento 
 * @param {String} moneda 
 * @returns Devuelve las filas con el registro creado
 */
const crearRow = (indice, dinero, impuesto, descuento, moneda) => {
  return `     
    <tr id="valores${indice}">
    <td id="dinero${indice}">${moneda} $${dinero.toFixed(2)}</td>
    <td id="impuesto${indice}">${moneda} $${impuesto.toFixed(2)}</td>
    <td id="descuento${indice}">${moneda} $${descuento.toFixed(2)}</td>
    <td id="eliminar${indice}" ><button class="button-send table-button" id="eliminarDineroCargadoButton${indice}">Eliminar</button></td>
    </tr>
    `;
};

/**
 * 
 * @param {Number} dolarOficial 
 * @param {Number} dolarBlue 
 * @returns Devuelve los <p> con el valor del dolar Oficial y Blue
 */
const mostarValorDolar = (dolarOficial, dolarBlue) => {
  return `
      <p>El dólar Oficial esta:<span class="mostarDolar__precio"> $${dolarOficial}</span></p>
      <p>El dólar Blue esta:<span class="mostarDolar__precio"> $${dolarBlue}</span></p>
    `
}


const prenderDarkMode = () => {
  $buttonSwitchDarkMode.classList.add("active");
  document.body.classList.add("dark");
  localStorage.setItem("darkMode", "encendido");
};

const apagarDarkMode = () => {
  document.body.classList.remove("dark");
  $buttonSwitchDarkMode.classList.remove("active");
  localStorage.setItem("darkMode", null);
};

const guardarDarkMode = () => {
  if (darkMode === "encendido") {
    prenderDarkMode();
  }
};

const crearRegistro = (dinero, impuesto, descuento) => {
  return {
    dinero,
    impuesto,
    descuento,
  };
};