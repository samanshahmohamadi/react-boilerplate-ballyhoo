// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import {getAsyncInjectors} from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

import {requireNotAuth, requireAuth} from './routesPolicy'

export default function createRoutes (store) {
  // create reusable async injectors using getAsyncInjectors factory
  const {injectReducer, injectSagas} = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }, {
      path: '/signup',
      name: 'signup',
      onEnter: requireNotAuth(store),
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SignUpPage/reducer'),
          import('containers/SignUpPage/sagas'),
          import('containers/SignUpPage')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signup', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }, {
      path: '/gallery',
      name: 'gallery',
      onEnter: requireAuth(store),
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/GalleryPage/reducer'),
          import('containers/GalleryPage/sagas'),
          import('containers/GalleryPage')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('gallery', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }, {
      path: '/forgetpassword',
      name: 'forgetpassword',
      onEnter: requireNotAuth(store),
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ForgetPasswordPage/reducer'),
          import('containers/ForgetPasswordPage/sagas'),
          import('containers/ForgetPasswordPage')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('forgetPassword', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    }
  ];
}
