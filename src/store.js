import { createStore, createEvent } from 'effector';

export const increment = createEvent();
export const bulkInsert = createEvent();

export const $counter = createStore(0)
    .on(increment, (state) => state + 1);

export const $data = createStore([])
    .on(bulkInsert, (_, payload) => payload);