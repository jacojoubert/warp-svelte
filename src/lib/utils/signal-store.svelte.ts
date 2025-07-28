// Non-functional rune version.
class Signal {
	#state = $state(0);

	subscribe() {
		this.#state;
	}

	notify() {
		this.#state = this.#state ^= 1;
	}
}

const buildSignalConfig = () => {
	return {
		createSignal: (obj: object, key: string | symbol) => {
			return new Signal();
		},
		consumeSignal: (signal: Signal) => {
			signal.subscribe();
		},
		notifySignal: (signal: Signal) => {
			signal.notify();
		},
		willSyncFlushWatchers: () => false
	};
};

export { buildSignalConfig };
