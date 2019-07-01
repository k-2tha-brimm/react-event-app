import { action, runInAction } from 'mobx';
import DisplayStore from './DisplayStore';

export default class AppStore {
    events = [];
    offset = 0;
    loading = true;
    modal = {
        show: false,
        body: null
    };
    displayStore = new DisplayStore();

    fetchEvents = action(async (offset) => {
        const response = await fetch(`http://api.my-events.site/api/v1/events/?limit=20&offset=${offset}`);
        const json = await response.json();
        runInAction(() => {
            this.events = json.results;
            this.loading = false;
        });
    })

    openModal = action(body => {
        this.modal.show = true;
        this.modal.body = body;
    });

    closeModal = action(body => {
        this.modal.show = false;
        this.modal.body = null;
    });

    increaseOffset = action(async () => {
        this.offset += 20;
    });

    decreaseOffset = action(async () => {
        this.offset -= 20;
    });
};