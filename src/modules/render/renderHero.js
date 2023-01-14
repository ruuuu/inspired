export const renderHero = () => {


      const hero = document.querySelector('.hero');

      hero.innerHTML = `
            <div class="container hero__container">
                  <div class="hero__content">
                        <h2 class="hero__title">Новая&nbspколлекция Бюстгальтер-&nbspбалконет </h2>
                        <a class="hero__link" href="#">Перейти</a>
                  </div>

                  <!-- <div class="hero__content">
                      <h2 class="hero__title">Боксеры из новой коллекции </h2>
                      <a class="hero__link" href="#">Перейти</a>
                  </div> -->
            </div>
      `;
}