const calcularImpuestos = (valorImpuesto) => 1 + valorImpuesto / 100;

const calcularPrecioConImpuesto = (dineroIngresado, impuestosIngresado) =>
  dineroIngresado * impuestosIngresado;

const calcularDescuentoSobreImpuesto = (dineroConImpuesto, descuento) =>
  dineroConImpuesto * (descuento / 100);

const calcularPrecioFinal = (dineroConImpuesto, descuentoSobrePrecio) =>
  dineroConImpuesto - descuentoSobrePrecio;

const calcularTotal = (datos, tipo) =>
  datos.reduce((acc, curr) => acc + curr[tipo], 0);

const calcularPrecioDolar = (dolar, peso) => dolar * peso;

const crearRow = (indice, dinero, impuesto, descuento, moneda) => {
  return ( `     
    <tr id="valores${indice}">
    <td id="dinero${indice}">${moneda} $${dinero}</td>
    <td id="impuesto${indice}">${moneda} $${impuesto}</td>
    <td id="descuento${indice}">${moneda} $${descuento}</td>
    <td></td>
    <td id="eliminar${indice}" ><button class="btn btn-danger" id="eliminarDineroCargadoButton${indice}">Eliminar</button></td>
    </tr>
    `
  ) 
};

const crearRegistro = (dinero, impuesto, descuento) => {
  return {
    dinero,
    impuesto,
    descuento,
  };
};
