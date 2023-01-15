
//                               append это html-элемент, который добавляем в созданный, appends - это список html-элементов, attr={},  parent - родитель созданного элемента
export const createElement = (tag, attr, { append, appends, parent, cb } = {}) => {           // { }-деструктруизация. Если у элемнета нет классов и атрибутов, то втрому параметру присваиваем пустой объект

   const element = document.createElement(tag);          // любой элемент  на странице это объект
   if (attr) {
      Object.assign(element, attr);                   // добавляем объекту element, свойства объекта attr
   }

   if (append || append instanceof HTMLElement) {        // если append это html элемент
      element.append(append);
   }

   if (appends && appends.every(item => item instanceof HTMLElement)) {          // перебирем список appends
      element.append(...appends);                                       // добавляем список элементов в element
   }

   if (parent && parent instanceof HTMLElement) {
      parent.append(element);
   }

   if (cb && typeof cb === 'function') {                       // cb- коллбэк функция
      cb(element);
   }

   return element;

}
