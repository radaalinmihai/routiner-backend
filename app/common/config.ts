export const schemaEnv = {
	type: 'object',
	required: ['DATABASE_USERNAME', 'DATABASE_PASSWORD', 'DATABASE_NAME', 'DATABASE_TYPE'],
	properties: {
		DATABASE_USERNAME: {
			type: 'string',
		},
		DATABASE_PASSWORD: {
			type: 'string',
		},
		DATABASE_NAME: {
			type: 'string'
		},
		DATABASE_TYPE: {
			type: 'string'
		}
	}
}

export const envConfig = {
	confKey: 'environmentConfiguration',
	schema: schemaEnv,
	dotenv: true,
	data: process.env
};
