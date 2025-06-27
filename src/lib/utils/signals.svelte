<script module lang="ts">
	const createSignal = (obj: object, key: string | symbol) => {
		const signal = $state(obj);
		return signal;
	};

	const consumeSignal = (signal) => {
		return signals;
	};

	const notifySignal = (signal) => {
		return (signal = signal);
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
</script>
