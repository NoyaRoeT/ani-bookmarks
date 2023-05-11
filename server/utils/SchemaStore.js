const SchemaStore = (() => {
	const schemas = {};

	return {
		addSchema: (key, schemaGetter) => {
			console.log(`Adding ${key} schema`);
			schemas[key] = schemaGetter();
		},
		get: (key) => {
			return schemas[key];
		},
	};
})();

export default SchemaStore;
