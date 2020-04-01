import { observable, reaction } from 'mobx';

export const appName = observable.box('ReactJS Assingment');
export const token = observable.box(window.localStorage.getItem('jwt-user-token'));
export const isAuthenticated = observable.box(!!token.get());

export class CommonStore {
  
  constructor() {
    console.log(" -- Is User logged In --", isAuthenticated.get())
        
    reaction(
        () => token.get(),
        token => {
          if (token) {
            window.localStorage.setItem('jwt-user-token', token);
          } else {
            window.localStorage.removeItem('jwt-user-token');
          }
        }
      );
    }
}

export const commonStore = new CommonStore();
