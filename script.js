let $formImpuestos = document.getElementById("formImpuestos");
let $inputCantidadDinero = document.getElementById("precio");
let $inputCantidadImpuesto = document.getElementById("impuesto");
let $textErrorValorImpuesto = document.getElementById("errorValorImpuesto");
let $inputCantidadDescuento = document.getElementById("descuento");
let $textErrorValorDescuento = document.getElementById("errorValorDescuento")
let $buttonEnviarDatos = document.getElementById("enviarDatos");
let $textErrorInputVacios = document.getElementById("errorInputVacios")
let $rowMostarDatos = document.getElementById("mostarDatosEnTabla");

const calcularImpuestos = (valorImpuesto) => 1 + valorImpuesto / 100;

const calcularPrecioConImpuesto = (dineroIngresado, impuestosIngresado) =>
  dineroIngresado * impuestosIngresado;

const calcularDescuentoSobreImpuesto = (dineroConImpuesto, descuento) =>
  dineroConImpuesto * (descuento / 100);

const precioFinal = (dineroConImpuesto, descuentoSobrePrecio) =>
  dineroConImpuesto - descuentoSobrePrecio;

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
  
  const hayCamposVacios = (!$inputCantidadDinero.value && !$inputCantidadImpuesto.value && !$inputCantidadDescuento.value);
  
  if(hayCamposVacios) {
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
  
  let cantidadDeDinero = parseInt($inputCantidadDinero.value)
  
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
        
        const init = () => {
          valoresFinal = JSON.parse(localStorage.getItem("precios")) || [];
        };
        
        init();

        $buttonEnviarDatos.addEventListener(`click`, handleClickEnviar);
        