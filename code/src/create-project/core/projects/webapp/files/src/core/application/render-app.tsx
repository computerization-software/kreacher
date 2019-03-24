import App from 'react/app';


const APP_CONTAINER_ID = 'app';

interface IRenderAppFacade {
  render: (component: any, container: any) => any;
  create: (Component: any) => any;
  document: any;
  App: any;
};


export default (facade: IRenderAppFacade) => facade.render(
  facade.create(facade.App),
  facade.document.getElementById(APP_CONTAINER_ID)
);
