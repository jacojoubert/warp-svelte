<script>
	import manager from '../utils/request-manager';

	const fetchData = async function () {
	
		const response = await manager.request({
			url: `/users`
		});
		debugger;
	};
</script>

<h1>Warp Drive Testing App</h1>
<button onclick={fetchData}>Fetch Data</button>
