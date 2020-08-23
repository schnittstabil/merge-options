const test = require('ava');
const mergeOptions = require('..');

test('undefined values', t => {
	t.deepEqual(
		mergeOptions.call({ignoreUndefined: true}, {foo: 0}, {foo: undefined}),
		{foo: 0}
	);
});

test('deep undefined values', t => {
	t.deepEqual(
		mergeOptions.call({ignoreUndefined: true}, {nested: {unicorns: 'none'}}, {nested: {unicorns: undefined}}),
		{nested: {unicorns: 'none'}}
	);
});

test('undefined options objects', t => {
	t.deepEqual(
		mergeOptions.call({ignoreUndefined: true}, {nested: {unicorns: 'none'}}, {nested: undefined}),
		{nested: {unicorns: 'none'}}
	);
});
