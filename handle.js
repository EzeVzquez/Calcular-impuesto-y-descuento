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
    pintarRows(valoresFinal)
};

// const handleClickCambiarMoneda = () => {

// };

// const handleSortTable = () => {
    
// };