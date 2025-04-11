import { buildMacros } from '@embroider/macros/babel';
import { setConfig } from '@warp-drive/build-config';

const builtMacros = buildMacros({
	configure(macrosInstance) {
		setConfig(macrosInstance, { });
	},
});

export default function (api) {
	api.cache(true);

	return {
		plugins: [
			[
				'babel-plugin-debug-macros',
				{
					flags: [
						{
							source: '@glimmer/env',
							flags: { DEBUG: true, PROD: false }
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
