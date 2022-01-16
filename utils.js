/**
 *
 * @param {Number} valorImpuesto
 * @returns Devuelve el porcentaje a aplicar del impuesto deseado del usuario
 */
const calcularImpuestos = (valorImpuesto) => 1 + valorImpuesto / 100;

/**
 *
 * @param {Number} dineroIngresado
 * @param {Function} impuestosIngresado
 * @returns Devuelve el pocentaje del impuesto aplicado en el dinero ingresado por el usuario, se utiliza, en el segundo parametro, calcularImpuesto para que funcione correctamente
 */
const calcularPrecioConImpuesto = (dineroIngresado, impuestosIngresado) =>
  dineroIngresado * impuestosIngresado;

/**
 *
 * @param {Variable} dineroConImpuesto
 * @param {Number} descuento
 * @returns Devuelve el descuento a aplicar al valor del usuario con impuestos, en el primer parametro(dineroConImpuesto) se pone el impuesto ya aplicado y en el segundo parametro(descuento) la cantidad de descuento a aplicar.
 */
const calcularDescuentoSobreImpuesto = (dineroConImpuesto, descuento) =>
  dineroConImpuesto * (descuento / 100);

/**
 *
 * @param {Variable} dineroConImpuesto
 * @param {Function} descuentoSobrePrecio
 * @returns Devuelve el descuento ya aplicado en el valor final
 */
const calcularPrecioFinal = (dineroConImpuesto, descuentoSobrePrecio) =>
  dineroConImpuesto - descuentoSobrePrecio;

/**
 *
 * @param {Variable} datos
 * @param {String} tipo
 * @returns Devuelve el total de las filas de datos, va sumando el dinero en una columna, el impuesto en otra y el descuento tambien
 */
const calcularTotal = (datos, tipo) =>
  datos.reduce((acc, curr) => acc + curr[tipo], 0);

/**
 *
 * @param {} dolar
 * @param {} peso
 * @returns Devuelve la multiplicacion del dolar por el peso
 */
const calcularPrecioDolar = (dolar, peso) => dolar * peso;

const crearRow = (indice, dinero, impuesto, descuento, moneda) => {
  return `     
    <tr id="valores${indice}">
    <td id="dinero${indice}">${moneda} $${dinero}</td>
    <td id="impuesto${indice}">${moneda} $${impuesto}</td>
    <td id="descuento${indice}">${moneda} $${descuento}</td>
    <td></td>
    <td id="eliminar${indice}" ><button class="btn btn-danger" id="eliminarDineroCargadoButton${indice}">Eliminar</button></td>
    </tr>
    `;
};

const crearRowTotal = (dinero, impuesto, descuento, moneda) => {
  return `
  <div>
  <tr id="totalDatos">
  <td id="totalDinero">Total:${moneda} $${dinero}</td>
  <td id="totalImpuestos">Total:${moneda} $${impuesto}</td>
    <td id="totalDescuento">Total:${moneda} $${descuento}</td>
    <td class="vacio"> </td>
    <td class="vacio"> </td>
      </tr>
      </div>
  `;
};

const crearRegistro = (dinero, impuesto, descuento) => {
  return {
    dinero,
    impuesto,
    descuento,
  };
};