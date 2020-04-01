import { observable, runInAction, decorate } from 'mobx';

class DevicesStore {
    deviceData = {
        model: []
    };
    status = "initial";
    searchQuery = "";

    reset = () => {
      this.deviceData = {
          model: []
      };
    }

    getDevicesAPIData = async (urlParams) => {
        const options = {
            method: "GET",
        }
        const request = new Request("http://35.201.2.209:8000/devices", options);
        const response = await fetch(request);
        return response.json();
    }

    getDevicesAsync = async () => {
        try {
            var params = {
                searchQuery: this.searchQuery,
            };
            const urlParams = new URLSearchParams(Object.entries(params));
            const data = await this.getDevicesAPIData(urlParams)
            runInAction(() => {
                this.deviceData = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };
}

decorate(DevicesStore, {
    deviceData: observable,
    status: observable
});

export const devicesStore = new DevicesStore();