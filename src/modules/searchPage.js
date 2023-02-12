export const searchPage = (routerData) => {

    console.log('routerData in searchPage ', routerData)

    const { gender, search } = routerData.data;               // выбранный пол и категория, деструктуризация 
    const params = { gender, search };
    console.log('params in searchPage', params);

    const title = DATA.navigation[gender].list.find((item) => item.slug === category).title; // метод find ищет в массиве [ {slug:, title: }, {}, {} ] первый элемент удовлетвор условию, и возарщает его. И берем у него свойство title
    // console.log('title in categoryPage ', title);

    renderNavigation(gender, title);

    renderHero(false); // если gender = false

    renderProducts(title, params);

};
