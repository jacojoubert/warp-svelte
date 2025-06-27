import { Fetch, RequestManager, Store } from '@warp-drive/core';
import {
	instantiateRecord,
	registerDerivations,
	SchemaService,
	teardownRecord
} from '@warp-drive/core/reactive';
import type { CacheCapabilitiesManager, ResourceKey } from '@warp-drive/core/types';
import { JSONAPICache } from '@warp-drive/json-api';

class AppStore extends Store {
	requestManager = new RequestManager().use([Fetch]);

	createSchemaService() {
		const schema = new SchemaService();
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
