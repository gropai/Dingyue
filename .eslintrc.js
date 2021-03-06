module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		sourceType: 'module'
	},
	rules: {
		indent: 0,
		semi: ['warn', 'always'],
		'no-console': 0,
		'no-unused-vars': 0,
		'no-undef': 0
	}
};
