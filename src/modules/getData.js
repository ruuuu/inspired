// получение данных с сервера:



export const getData = async (urlApi, param, cbError = () => { }) => {            // ставим async  тк есть внутри fetch(), в коллбэк cbError передаем по умолчанию пустую функцию

    try {
        //console.log('param ', param);
        const url = new URL(urlApi);

        if (param && typeof param === 'object') {
            for (const key in param) {                          // перебираем объект param = { gender:'men',  category:'bathrobes',  search: '',  count: '' }
                url.searchParams.set(key, param[key]);          // устанавливаем параметры поиска http://localhost:8024/api/goods?name=value
            }
        }


        const response = await fetch(url);                            // тк fetch асинхронная фукнция, поэтому await, иначе получаем даннеы в ввиде промиса
        const data = await response.json();                             // возвращет промис, поэтому ставим await, чтобы отдавал ответ
        //console.log('response ', response);

        if (!response.ok) {
            throw new Error(data.message);
        }


        //console.log('data ', data);

        return data;
    }
    catch (err) {
        // console.warn(err);

        if (typeof param === 'function') {
            param(err);
        }
        else {
            cbError(err);                    // вызов коллбэка
        }

    }
};
