import { router } from "./router";


export const getUrl = (params) => {         // params = {  search:  ,  page: ,  count:  }


    const currentLocation = router.getCurrentLocation();
    //console.log('currentLocation ', currentLocation);

    let url = currentLocation.url;              // выдает урл текущ станицы, напрмиер  #/men/batjrobes

    const searchParams = new URLSearchParams(currentLocation.queryString);          // URLSearchParams встроенный в  js объект


    // заполняем объект searchParams:
    for (const key in params) {                     // перебиреам свойтсва объекта params
        searchParams.set(key, params[key]);         // объекту searchParams добавляем свойство key  
    }



    url += `?${searchParams.toString()}`;  // search: 'халаты' page:2
    console.log('url ', url)

    return url;



};
