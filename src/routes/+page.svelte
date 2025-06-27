<script lang="ts">
	import store from '$lib/utils/store';
	import { json } from '@sveltejs/kit';

	import Pretender from 'pretender';

	interface User {
		id: string;
		name: string;
		email: string;
		age: number;
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

	server.get('/users/:id', (request) => {
		const user = {
			data: [
				{
					type: 'user',
					id: request.params.id,
					attributes: { name: 'New name', email: 'new@email.com', age: 30 }
				}
			]
		};
		return [200, { 'Content-Type': 'application/json' }, JSON.stringify(user)];
	});

	const users: Promise<User[]> = store
		.request({
			url: 'users'
		})
		.then((response) => {
			return response.content.data;
		});

	const fetchUpdatedUser = async function (id: string) {
		const response = await store.request({
			url: `users/${id}`
		});
		return response.content.data;
	};
</script>

<h1>Warp Drive Testing App</h1>

{#await users}
	loading...
{:then users}
	{#each users as user (user.id)}
		<p>
			{user.name}
			<button onclick={() => fetchUpdatedUser(user.id)}>Update</button>
		</p>
	{/each}
	<button
		onclick={() => {
			console.log(JSON.parse(JSON.stringify(users)));
		}}
	>
		Log
	</button>
{/await}
