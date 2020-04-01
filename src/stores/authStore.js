import { observable, action } from 'mobx';

export class AuthStore {
    inProgress = observable.box(false);
    errors = observable.box(undefined);
    loginResponse = observable.box(undefined);

    fetchAPIData = async (payload) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        var options = {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        }
        const request = new Request("http://35.201.2.209:8000/login", options);
        const response = await fetch(request);
        return response;
    }

    userLogin = async (payload) => {
      this.inProgress = true;
      this.errors = undefined;
      
      return this.fetchAPIData(payload)
        .then((response) => {
          this.loginResponse.set(response);
        })
        .catch(action((err) => {
          this.errors = err.response && err.response.body && err.response.body.errors;        
          throw err;
        }))
        .finally(action((response) => { 
          this.inProgress = false;
          if(this.loginResponse.get().ok) {
            window.localStorage.setItem('jwt-user-token', 'Secured-Auth');
          }
        }));
    }

    userLogout = async () => {
      window.localStorage.removeItem('jwt-user-token');
    }
}

export const authStore = new AuthStore();
