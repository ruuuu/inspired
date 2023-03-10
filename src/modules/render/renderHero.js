// отсриовка блока hero:

import { createElement } from "../utils/createElement";
import { TITLE } from "../const";
import { hero } from "../const";




export const renderHero = ({ gender, render }) => {               // gender = men/women


    if (!render) {
        hero.style.display = 'none';
        return;                                         // дальше функция не будет выполнться
    }

    hero.style.display = '';
    hero.className = `hero hero__${gender}`;


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
            textContent: `${gender === 'men' ? TITLE[gender].title : TITLE[gender].title}`
        },
        {
            parent: heroContent
        }
    );


    createElement('a',
        {
            className: 'hero__link',
            href: `#/product/${TITLE[gender].id}`,
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
