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