import { Component } from '../../library/index';

class AppFooter extends Component {
  constructor(config) {
    super(config);
  }
}

export const appFooter = new AppFooter({
  selector: '#footer',
  template: require('./footer.html'),
});