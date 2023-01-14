export const renderNavigation = () => {

      const navigation = document.querySelector('.navigation');

      navigation.innerHTML = `
      <div class="container navigation__container">
            <ul class="navigation__gender gender">
                  <li class="gender__item">
                        <a class="gender__link gender__link--active" href="#">Женщины</a>
                  </li>

                  <li class="gender__item">
                        <a class="gender__link" href="#">Мужчины</a>
                  </li>
            </ul>

            <ul class="navigation__category category">
                  <li class="category__item">
                        <a class="category__link category__link--active" href="#">Бюстгальтеры</a>
                  </li>
                  <li class="category__item">
                        <a class="category__link" href="#">Трусы</a>
                  </li>
                  <li class="category__item">
                        <a class="category__link" href="#">Носки</a>
                  </li>
                  <li class="category__item">
                        <a class="category__link" href="#">Халаты</a>
                  </li>
                  <li class="category__item">
                        <a class="category__link" href="#">Термобелье</a>
                  </li>
                  <li class="category__item">
                        <a class="category__link" href="#">Пижамы</a>
                  </li>
            </ul>

      <!-- если нажали на Мужчины: -->
      <!-- <ul class="navigation__category category">
        <li class="category__item">
          <a class="category__link" href="#">Трусы</a>
        </li>
        <li class="category__item">
          <a class="category__link" href="#">Носки</a>
        </li>
        <li class="category__item">
          <a class="category__link" href="#">Халаты</a>
        </li>
        <li class="category__item">
          <a class="category__link" href="#">Термобелье</a>
        </li>
      </ul> -->
    </div>
      `;
}