// Esta función crea una promesa que se resuelve después de un tiempo específico
export function timer(milliseconds) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        setTimeout(() => {
            const elapsedTime = Date.now() - startTime;

            if (elapsedTime > milliseconds * 2) {
                reject("Time is not working properly");
            } else {
                resolve("Time concluded");
            }
        }, milliseconds);
    });
}

// Esta función async crea una cuenta regresiva que se muestra en un elemento HTML
export async function countdown(
    initialNumber,
    element = document.body,
    interval = 1000,
    callback = null
) {
    const displayElement = document.createElement('div');
    element.appendChild(displayElement);

    for (let i = initialNumber; i >= 0; i--) {
        displayElement.textContent = i;

        await new Promise(resolve => setTimeout(resolve, interval));
    }

    if (callback) {
        callback();
    }
}
