// отправка данных формы поиcка:
import { router } from "../router";



export const seachController = (form) => {

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();               // чтобы после отправки данных формы, страница не перезагружалась
        // console.log(form.search);        // обращение к полю поиска происходит через атрибут name: form.name , получим <input type="seaech" name="search">
        // form.search.value                 // значанеи которое ввели в поле поиска

        router.navigate(`search?value=${form.search.value}`);           // перейдем на станицу с урлом  http://localhost:3000/#/search?value='носки'
    });

}
