import { createElement } from "./utils/createElement";



export const createCssColors = (colors) => {        // colors = [ {id, color, title:black}, {id, color, title:white}, {} ]

    let style = createElement('style');

    colors.forEach(color => {
        style.textContent +=
            `
                .color--${color.title}:after{
                    background-color: ${color.code};
                    ${color.title === 'white' ? 'border: 0.4px solid #8A8A8A;' : ''}
                }
            `
    });


    document.head.append(style);  // <head><style> </style></head>

}; 
