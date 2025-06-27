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
import { buildSignalConfig } from './signals.js';

setupSignals(buildSignalConfig);

class AppStore extends Store {
	requestManager = new RequestManager().use([Fetch]).useCache(CacheHandler);

	createSchemaService() {
		const schema = new SchemaService();
		schema.registerResource({
			type: 'user',
			identity: { kind: '@id', name: 'id' },
			fields: [
				{ name: 'name', kind: 'field' },
				{ name: 'email', kind: 'field' },
				{ name: 'age', kind: 'field' }
			]
		});
		registerDerivations(schema);
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
