import { Fetch, RequestManager, Store } from '@warp-drive/core';
import {
	instantiateRecord,
	registerDerivations,
	SchemaService,
	teardownRecord
} from '@warp-drive/core/reactive';
import type { CacheCapabilitiesManager, ResourceKey } from '@warp-drive/core/types';
import { JSONAPICache } from '@warp-drive/json-api';
// import { CacheHandler } from '@warp-drive/core/store';
import { CacheHandler } from '@ember-data/store';

import { setupSignals } from '@warp-drive/core/configure';
import { buildSignalConfig } from './signals.svelte.js';
import { Type } from '@warp-drive/core/types/symbols';
// import { buildSignalConfig } from './signal-store.svelte.js';

setupSignals(buildSignalConfig);

class AppStore extends Store {
	requestManager = new RequestManager().use([Fetch]).useCache(CacheHandler);

	createSchemaService() {
		const schema = new SchemaService();

		function concat(record: any, options: Record<string, unknown> | null, _prop: string): string {
			if (!options) throw new Error(`options is required`);
			const opts = options as { fields: string[]; separator?: string };
			return opts.fields.map((field) => record[field]).join(opts.separator ?? '');
		}

		concat[Type] = 'concat';

		schema.registerDerivation(concat);
		registerDerivations(schema);

		schema.registerResource({
			type: 'user',
			identity: { kind: '@id', name: 'id' },
			fields: [
				{ name: 'name', kind: 'field' },
				{ name: 'email', kind: 'field' },
				{ name: 'age', kind: 'field' },
				{
					name: 'details',
					type: 'concat',
					options: { fields: ['email', 'age'], separator: ' ° ' },
					kind: 'derived'
				}
			]
		});

		return schema;
	}

	createCache(capabilities: CacheCapabilitiesManager) {
		return new JSONAPICache(capabilities);
	}

	instantiateRecord(identifier: ResourceKey, createArgs?: Record<string, unknown>) {
		return instantiateRecord(this, identifier, createArgs);
	}

	teardownRecord(record: unknown): void {
		return teardownRecord(record);
	}
}

export default new AppStore();
