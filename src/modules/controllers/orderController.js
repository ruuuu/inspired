// отправка данных формы  "Оформить заказ" на сервер:
import { API_URL } from "../const";



export const sendOrder = async (order) => {             //  async ставим потому что отправка данных на сервер происхдит

    const res = await fetch(`${API_URL}/api/order`, {       // await  тк ждем когда обработается запрос на сервер и получим ответ
        method: 'POST',
        body: JSON.stringify(order),                        // тело отправяем  { address:  "Test", delivery: "delivery",  email: "tre@mail.ru", fio: "Alsu" }
    });

    //console.log('res.json() ', res.json());
    return res.json();          // промис , обрбатывам его при помощи  then()

};
