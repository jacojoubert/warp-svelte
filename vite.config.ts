import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
	server: {
		port: 4200
	},
	plugins: [
		sveltekit(),
		babel({
			filter: /\.js$/
		})
	]
});
