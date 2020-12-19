import { Component } from '../../library/index';

class AppComponent extends Component {
  constructor(config) {
    super(config);
  }

}

export const homeComponent = new AppComponent({
  selector: '#main-container',
  template: require('./home.html'),
})