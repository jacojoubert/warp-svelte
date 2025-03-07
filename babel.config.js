import { buildMacros } from '@embroider/macros/babel';
console.log(buildMacros);

const builtMacros = buildMacros({
	// this is how you configure your own package
	setOwnConfig: {
		// your config goes here
	},
	// this is how you can optionally send configuration into your
	// dependencies, if those dependencies choose to use
	// @embroider/macros configs.
	setConfig: {}
});

export default function (api) {
	api.cache(true);

	return {
		plugins: [
			[
				'module:babel-plugin-debug-macros',
				{
					flags: [
						{
							source: '@glimmer/env',
							flags: { DEBUG: true }
						}
					],
					debugTools: {
						isDebug: true,
						source: '@ember/debug',
						assertPredicateIndex: 1
					}
				},
				'ember-data-specific-macros-stripping'
			],
			...builtMacros.babelMacros
		]
	};
}
