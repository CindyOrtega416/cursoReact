import React from "react";

export default function Carrito({cartItems}) {
    return(
        <div className="">
            <h2>Productos en carrito</h2>
            <div>
                {cartItems.length === 0 && <div>El carrito está vacío</div>}
            </div>
        </div>
    )
}