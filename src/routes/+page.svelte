<script>
	import store from '$lib/utils/store';

	const fetchData = async function () {
		const response = await store.request({
			url: 'users'
		});
		console.log(response);
	};
</script>

<h1>Warp Drive Testing App</h1>
<button onclick={fetchData}>Fetch Data</button>
