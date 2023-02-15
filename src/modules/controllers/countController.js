// считает число товара (на станице товара) и для Корзина:


export const countController = (minus, number, plus, input) => {

    let n = +input.value;           // приводим строку к числу

    minus.addEventListener('click', () => {
        if (n > 1) {                            // чтобв  минус не уйти
            n -= 1;
            number.textContent = n;
            input.value = n;
        }

    });


    plus.addEventListener('click', () => {
        n += 1;
        number.textContent = n;
        input.value = n;
    });

};
