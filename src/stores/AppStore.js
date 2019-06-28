import { action, runInAction } from 'mobx';

export default class AppStore {
    events = [];
    offset = 0;

    fetchEvents = action(async (offset) => {
        const response = await fetch(`http://api.my-events.site/api/v1/events/?limit=20&offset=${offset}`);
        const json = await response.json();
        runInAction(() => {
            this.events = json.results;
        });
    })

    increaseOffset = action(async () => {
        this.offset += 20;
    });

    decreaseOffset = action(async () => {
        this.offset -= 20;
    });
};