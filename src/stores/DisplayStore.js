import { action, runInAction } from 'mobx';

export default class DisplayStore {

    event = null;
    loading = true;

    fetchEvent = action(async id => {
        const response = await fetch(`http://api.my-events.site/api/v1/events/${id}/`)
        const json = await response.json();
        runInAction(() => {
            this.event = json;
            this.loading = false;
        })
    })

};