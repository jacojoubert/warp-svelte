<script>
	import manager from '../utils/request-manager';
	import { browser } from '$app/environment';

	const fetchData = async function () {
		if (!browser) {
			return;
		}
		const response = await manager.request({
			url: `/users`
		});
		debugger;
	};
</script>

<h1>Warp Drive Testing App</h1>
<button onclick={fetchData}>Fetch Data</button>
