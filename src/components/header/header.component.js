import { Component } from '../../library/index';

class AppHeader extends Component {
  constructor(config) {
    super(config);
    this.isClosed = true;
  };
  
  hideBurger() {
    const menu = document.querySelector('.menu');
    const burger = document.querySelector('.menu__burger');
    const wrapper = document.querySelector('.wrapper');
    const links = document.querySelectorAll('.menu__link');

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.toggle('close-menu');
        wrapper.classList.toggle('close-wrapper');
        burger.classList.toggle('close-btn');
        document.body.classList.toggle('prevent-scroll');
      });
    });
    burger.addEventListener('click', () => {
      menu.classList.toggle('close-menu');
      wrapper.classList.toggle('close-wrapper');
      burger.classList.toggle('close-btn');
      document.body.classList.toggle('prevent-scroll');
    });
    wrapper.addEventListener('click', () => {
      menu.classList.toggle('close-menu');
      wrapper.classList.toggle('close-wrapper');
      burger.classList.toggle('close-btn');
      document.body.classList.toggle('prevent-scroll');
    });
  };
};

export const appHeader = new AppHeader({
  selector: '#header',
  template: require('./header.html'),
});