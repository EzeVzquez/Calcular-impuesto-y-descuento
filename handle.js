const handleClickEnviar = (e) => {
    e.preventDefault();

    const hayCamposVacios = !$inputCantidadDinero.value ||
        !$inputCantidadImpuesto.value ||
        !$inputCantidadDescuento.value;

    if ($inputCantidadDinero.value <= 0 || $inputCantidadImpuesto.value < 0 || $inputCantidadDescuento.value < 0) {
        $textErrorInputVacios.innerHTML = `
        <p>Por favor ingresar valores correctos</p>
        `;
        return;
    }

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
    pintarRows(valoresFinal, monedaActual)
};

const handleClickPeso = () => {
    monedaActual = "ARS"
    localStorage.setItem("moneda", monedaActual)
    pintarRows(valoresFinal, monedaActual)
};
const handleClickDolarOficial = () => {
    monedaActual = "USD"
    localStorage.setItem("moneda", monedaActual)
    pintarRows(valoresFinal, monedaActual)
};
const handleClickDolarBlue = () => {
    monedaActual = "USDB"
    localStorage.setItem("moneda", monedaActual)
    pintarRows(valoresFinal, monedaActual)
}