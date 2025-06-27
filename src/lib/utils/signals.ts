import { createSubscriber } from 'svelte/reactivity';

const createSignal = (obj: object, key: string | symbol) => {
	let value = 1;
	let update: () => void;

	const subscribe = createSubscriber((update_function) => {
		update = update_function;
	});

	const signal = {
		get value() {
			subscribe();
			return value;
		},
		set value(new_value) {
			value = new_value;
			update();
		}
	};

	return signal;
};

const consumeSignal = (signal: ReturnType<typeof createSignal>) => {
	return signal.value;
};

const notifySignal = (signal: ReturnType<typeof createSignal>) => {
	return (signal.value = signal.value + 1);
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
