// отрисовка меню:
import { createElement } from "../createElement";
import { dataNavigation } from "../dataNavigation";       // импортируем объект dataNavigation



export const renderNavigation = () => {

   const navigation = document.querySelector('.navigation');

   navigation.textContent = '';     // очищем сперва, потом заполняем

   // navigation__container
   const container = createElement('div',
      {
         className: 'navigation__container'
      },
      {
         parent: navigation  // в  navigation складываем container
      }
   );


   // ul Мужчина/Женщина
   const genderList = createElement('ul',
      {
         className: 'navigation__gender gender'
      },
      {
         parent: container
      }
   );


   for (const genderName in dataNavigation) {      // genderName = men/women
      createElement('a',
         {
            className: 'category__link'
         }
      );

      // genderName.list.forEach(element => {
      //    createElement('')
      //    a.textContent = element.title;
      // });

   }





   //ul
   const categoryList = createElement('ul',
      {
         className: 'navigation__category category'
      },
      {
         parent: container
      }
   );






   // navigation.innerHTML = `
   //    <div class="container navigation__container">
   //          <ul class="navigation__gender gender">
   //                <li class="gender__item">
   //                      <a class="gender__link gender__link--active" href="#">Женщины</a>
   //                </li>

   //                <li class="gender__item">
   //                      <a class="gender__link" href="#">Мужчины</a>
   //                </li>
   //          </ul>

   //          <ul class="navigation__category category">
   //                <li class="category__item">
   //                      <a class="category__link category__link--active" href="#">Бюстгальтеры</a>
   //                </li>
   //                <li class="category__item">
   //                      <a class="category__link" href="#">Трусы</a>
   //                </li>
   //                <li class="category__item">
   //                      <a class="category__link" href="#">Носки</a>
   //                </li>
   //                <li class="category__item">
   //                      <a class="category__link" href="#">Халаты</a>
   //                </li>
   //                <li class="category__item">
   //                      <a class="category__link" href="#">Термобелье</a>
   //                </li>
   //                <li class="category__item">
   //                      <a class="category__link" href="#">Пижамы</a>
   //                </li>
   //          </ul>

   //    <!-- если нажали на Мужчины: -->
   //    <!-- <ul class="navigation__category category">
   //      <li class="category__item">
   //        <a class="category__link" href="#">Трусы</a>
   //      </li>
   //      <li class="category__item">
   //        <a class="category__link" href="#">Носки</a>
   //      </li>
   //      <li class="category__item">
   //        <a class="category__link" href="#">Халаты</a>
   //      </li>
   //      <li class="category__item">
   //        <a class="category__link" href="#">Термобелье</a>
   //      </li>
   //    </ul> -->
   //  </div>
   //    `;
}
