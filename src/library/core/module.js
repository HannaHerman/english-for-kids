import { router } from '../tools/router';

export class CoreModule {
  constructor(config) {
    this.components = config.components;
    this.startComponent = config.start;
    this.routes = config.routes;
  }

  start() {
    this.initComponents();
  };
  
  initComponents() {
    this.startComponent.render();
    this.components.forEach(this.renderComponent.bind(this));
  };

  renderRoute() {
    let url = router.getUrl();
    let route = this.routes.find(r => r.path = url);

    if (route === undefined) {
      route = this.routes.find(r => r.path = '#');
    }
    this.components.forEach(this.renderComponent.bind(this));
  }

  renderComponent(comp) {
    comp.render();
  }
}