import * as $ from 'svelte/internal/client';

const createSignal = (obj: object, key: string | symbol) => {
	const signal = $.state(obj);
	return signal;
};

const consumeSignal = (signal) => {
	return $.get(signal);
};

const notifySignal = (signal) => {
	return $.set(signal, $.get(signal), true);
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
