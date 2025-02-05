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
			]
		]
	};
}
