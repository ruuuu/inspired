import { createElement } from "../createElement";



export const renderHero = (gender) => {               // gender = men/women

   const hero = document.querySelector('.hero');      // <section>

   if (!gender) {
      hero.style.display = 'none';
      return;                                         // дальше функция не будет выполнться
   }

   hero.style.display = '';                           // очищаем сперва, потом заполняем
   hero.className = `hero hero__${gender}`;
   hero.innerHTML = '';

   const container = createElement('div',
      {
         className: 'container hero__container',
      },
      {
         parent: hero
      }
   );



   const heroContent = createElement('div',
      {
         className: 'hero__content'
      },
      {
         parent: container
      }
   );


   createElement('h2',
      {
         className: 'hero__title',
         textContent: `${gender === 'men' ? 'Боксеры из новой коллекции' : 'Новая коллекция бюстгальтер-баклонет'}`
      },
      {
         parent: heroContent
      }
   );


   createElement('a',
      {
         className: 'hero__link',
         href: `#/${gender}`,
         textContent: 'Перейти'
      },
      {
         parent: heroContent
      }
   );





   // hero.innerHTML = `
   //          <div class="container hero__container">
   //                <div class="hero__content">
   //                      <h2 class="hero__title">Новая&nbspколлекция Бюстгальтер-&nbspбалконет </h2>
   //                      <a class="hero__link" href="#">Перейти</a>
   //                </div>
   //          </div>
   //    `;
}
