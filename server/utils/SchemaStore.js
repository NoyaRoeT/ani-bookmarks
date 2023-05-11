const SchemaStore = (() => {
	const schemas = {};

	return {
		addSchema: (key, schemaGetter) => {
			schemas[key] = schemaGetter();
		},
		get: (key) => {
			return schemas[key];
		},
	};
})();

export default SchemaStore;
