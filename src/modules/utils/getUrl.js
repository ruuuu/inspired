import { router } from "./router";


export const getUrl = (params) => {


    const currentLocation = router.getCurrentLocation();
    //console.log('currentLocation ', currentLocation);

    const searchParams = new URLSearchParams(currentLocation.queryString);          // URLSearchParams втроенный в  js объект

    let url = currentLocation.url;              // выдает урл текущ станицы #/men/batjrobes





};
