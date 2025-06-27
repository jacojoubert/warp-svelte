import * as $ from 'svelte/internal/client';

const createSignal = (obj: object, key: string | symbol) => {
	console.log('createSignal', obj, key);
	const signal = $.state(obj);
	return signal;
};

const consumeSignal = (signal) => {
	console.log('consumeSignal', signal);
	return $.get(signal);
};

const notifySignal = (signal) => {
	console.log('notifySignal', signal);
	return $.set(signal, $.get(signal) + 1, true);
};

const buildSignalConfig = () => {
	return {
		createSignal,
		consumeSignal,
		notifySignal,
		willSyncFlushWatchers: () => false
	};
};

export { buildSignalConfig };
