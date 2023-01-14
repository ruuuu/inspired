export const renderProducts = () => {

      const products = document.querySelector('.goods');

      products.innerHTML = `
      <div class="container goods__container">
        <h2 class="goods__title">Новинки</h2>

        <ul class="goods__list">
          <li class="goods__item">
            <!--независымй элемент, его можно переиспользовать в др местах-->
            <article class="product">
              <a class="product__link" href="#">
                <img class="product__image" src="img/photo-wopmen1.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры">
                <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
              </a>

              <div class="product__row">
                <p class="product__price">руб 2999</p>
                <!-- aria-label показывает что делает кнопка, полезно для слепых людей -->
                <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
                </button>
              </div>

              <ul class="product__color-list">
                <li class="product__color-item">
                  <!--color--check  это актвный  элемент-->
                  <div class="color color--red color--check"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--white"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--black"></div>
                </li>
              </ul>
            </article>
          </li>

          <li class="goods__item">
            <!--независымй элемент, его можно переиспользовать в др местах-->
            <article class="product">
              <a class="product__link" href="#">
                <img class="product__image" src="img/photo-women2.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры">
                <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
              </a>

              <div class="product__row">
                <p class="product__price">руб 2999</p>
                <!-- aria-label показывает что делает кнопка, полезно для слепых людей -->
                <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
                </button>
              </div>

              <ul class="product__color-list">
                <li class="product__color-item">
                  <!--color--check  выбранный элемент-->
                  <div class="color color--red color--check"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--white"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--black"></div>
                </li>
              </ul>
            </article>
          </li>

          <li class="goods__item">
            <!--независымй элемент, его можно переиспользовать в др местах-->
            <article class="product">
              <a class="product__link" href="#">
                <img class="product__image" src="img/photo-women3.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры">
                <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
              </a>

              <div class="product__row">
                <p class="product__price">руб 2999</p>
                <!-- aria-label показывает что делает кнопка, полезно для слепых людей -->
                <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
                </button>
              </div>

              <ul class="product__color-list">
                <li class="product__color-item">
                  <!--color--check  выбранный элемент-->
                  <div class="color color--red color--check"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--white"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--black"></div>
                </li>
              </ul>
            </article>
          </li>

          <li class="goods__item">
            <article class="product">
              <a class="product__link" href="#">
                <img class="product__image" src="img/photo-wopmen1.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры">
                <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
              </a>

              <div class="product__row">
                <p class="product__price">руб 2999</p>
                <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
                </button>
              </div>

              <ul class="product__color-list">
                <li class="product__color-item">
                  <div class="color color--red color--check"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--white"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--black"></div>
                </li>
              </ul>
            </article>
          </li>

          <li class="goods__item">
            <article class="product">
              <a class="product__link" href="#">
                <img class="product__image" src="img/photo-wopmen1.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры">
                <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
              </a>

              <div class="product__row">
                <p class="product__price">руб 2999</p>
                <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
                </button>
              </div>

              <ul class="product__color-list">
                <li class="product__color-item">
                  <div class="color color--red color--check"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--white"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--black"></div>
                </li>
              </ul>
            </article>
          </li>

          <li class="goods__item">
            <article class="product">
              <a class="product__link" href="#">
                <img class="product__image" src="img/photo-wopmen1.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры">
                <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
              </a>

              <div class="product__row">
                <p class="product__price">руб 2999</p>
                <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
                </button>
              </div>

              <ul class="product__color-list">
                <li class="product__color-item">
                  <div class="color color--red color--check"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--white"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--black"></div>
                </li>
              </ul>
            </article>
          </li>

          <li class="goods__item">
            <article class="product">
              <a class="product__link" href="#">
                <img class="product__image" src="img/photo-wopmen1.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры">
                <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
              </a>

              <div class="product__row">
                <p class="product__price">руб 2999</p>
                <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
                </button>
              </div>

              <ul class="product__color-list">
                <li class="product__color-item">
                  <div class="color color--red color--check"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--white"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--black"></div>
                </li>
              </ul>
            </article>
          </li>

          <li class="goods__item">
            <article class="product">
              <a class="product__link" href="#">
                <img class="product__image" src="img/photo-wopmen1.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры">
                <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
              </a>

              <div class="product__row">
                <p class="product__price">руб 2999</p>
                <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
                </button>
              </div>

              <ul class="product__color-list">
                <li class="product__color-item">
                  <div class="color color--red color--check"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--white"></div>
                </li>
                <li class="product__color-item">
                  <div class="color color--black"></div>
                </li>
              </ul>
            </article>
          </li>
        </ul>
      </div>
      
      `;
}