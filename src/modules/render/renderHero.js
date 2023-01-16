export const renderHero = (gender) => {

   const hero = document.querySelector('.hero');

   if (!gender) {
      hero.style.display = 'none';
      return;                             // дальше функция не будет выполнться
   }

   hero.style.display = '';               // очищаем спевра, потом заполняем
   hero.className = `hero hero__${gender}`;



   // hero.innerHTML = `
   //          <div class="container hero__container">
   //                <div class="hero__content">
   //                      <h2 class="hero__title">Новая&nbspколлекция Бюстгальтер-&nbspбалконет </h2>
   //                      <a class="hero__link" href="#">Перейти</a>
   //                </div>
   //          </div>
   //    `;
}
