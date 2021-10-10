export const schemaEnv = {
	type: 'object',
	required: ['DATABASE_USERNAME', 'DATABASE_PASSWORD', 'DATABASE_NAME', 'DATABASE_HOST'],
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
		DATABASE_HOST: {
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
