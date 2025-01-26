const products = {
    1: { name: "Laptop", price: 1000, stock: 5 },
    2: { name: "Mouse", price: 20, stock: 10 },
    3: { name: "Keyboard", price: 50, stock: 0 }
};

// Función para verificar el stock
function checkStock(productId, quantity) {
    return new Promise((resolve, reject) => {
        if (!products[productId]) {
            reject(`Stock insuficiente para el producto ${productId}`)
            return
        }

        if (products[productId].stock >= quantity) {
            resolve(`Stock disponible para el producto ${productId}`)
        } else{
            reject(`Stock insuficiente para el producto ${productId}`)
        }
    })
}

// Función para calcular el total
function calculateTotal(productId, quantity) {
    return new Promise((resolve, reject) => {
        if (!products[productId]) {
            reject(`Producto ${productId} no encontrado`)
            return
        }

        const total = products[productId].price * quantity
        resolve(`Total para ${quantity} unidades de ${products[productId].name}: $${total}`)
    })
}

// Función para procesar el pedido
function confirmOrder(productId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Pedido confirmado para el producto ${productId}`)
        }, 2000)
    })
}

// Función para simular el flujo completo de un pedido
async function processOrder(productId, quantity) {
    try {
        const stockMessage = await checkStock(productId, quantity)
        mostrarResultado(stockMessage)

        const totalMessage = await calculateTotal(productId, quantity)
        mostrarResultado(totalMessage)

        const confimMessage = await confirmOrder(productId)
        mostrarResultado(confimMessage)

        return true
    } catch (error) {
        return false
    }
}

// Función para mostrar los resultados en la página
function mostrarResultado(message) {
    const resultadoDiv = document.querySelector('#result')
    const textElement = document.createElement('p')

    // Si es un mensaje de inicio de pedido, crear nuevo contenedor
    if (message.startsWith('1.') || message.startsWith('2.') || message.startsWith('3.')) {
        const pedidoDiv = document.createElement('div')
        pedidoDiv.className = 'pedido'
        resultadoDiv.appendChild(pedidoDiv)
        textElement.style.fontWeight = 'bold'
        pedidoDiv.appendChild(textElement)
    } else {
        // Obtener el último contenedor de pedido
        const currentPedido = resultadoDiv.lastElementChild

        // Añadir clase según el tipo de mensaje
        if (message.includes('completado')) {
            textElement.className = 'success'
        } else if (message.includes('fallido')) {
            textElement.className = 'error'
        }

        currentPedido.appendChild(textElement)
    }

    textElement.textContent = message
}

window.onload = async () => {
    mostrarResultado('1. Probando pedido de 2 portatil')
    let result = await processOrder(1, 2)
    mostrarResultado(result ? 'Pedido completado' : 'Pedido fallido')

    mostrarResultado('2. Probando pedido de 20 ratones')
    result = await processOrder(2, 20)
    mostrarResultado(result ? 'Pedido completado' : 'Pedido fallido')

    mostrarResultado('3. Probando pedido de 1 teclado')
    result = await processOrder(3, 1)
    mostrarResultado(result ? 'Pedido completado' : 'Pedido fallido')
}
