<script lang="ts">
	import store from '$lib/utils/store';

	import Pretender from 'pretender';

	interface User {
		id: Number;
		name: String;
	}

	const server = new Pretender();

	server.get('/users', (request) => {
		const users = {
			data: [
				{
					type: 'user',
					id: '1',
					attributes: { name: 'John Doe', email: 'john.doe@example.com', age: 30 }
				},
				{
					type: 'user',
					id: '2',
					attributes: { name: 'Jane Doe', email: 'jane.doe@example.com', age: 25 }
				}
			]
		};
		return [200, { 'Content-Type': 'application/json' }, JSON.stringify(users)];
	});

	const fetchData = async function () {
		const response = await store.request({
			url: 'users'
		});
		return response.content.users;
	};
</script>

<h1>Warp Drive Testing App</h1>

{#await fetchData()}
	loading...
{:then users: User[]}
	{#each users as user}
		<p>{user.name}</p>
	{/each}
{/await}
