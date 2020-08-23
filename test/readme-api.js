const test = require('ava');
const mergeOptions = require('..');

test('cloning example', async t => {
	const defaultPromise = Promise.reject(new Error());
	const optionsPromise = Promise.resolve('bar');
	const defaultOptions = {
		fn: () => false,
		promise: defaultPromise,
		array: ['foo'],
		nested: {unicorns: 'none'}
	};
	const options = {
		fn: () => true,
		promise: optionsPromise,
		array: ['baz'],
		nested: {unicorns: 'many'}
	};
	const result = mergeOptions(defaultOptions, options);
	t.deepEqual(result, options);
	t.is(result.fn, options.fn);
	t.is(result.promise, options.promise);
	t.not(result.array, options.array);
	t.not(result.nested, options.nested);
	await t.throwsAsync(defaultPromise);
	await t.notThrowsAsync(optionsPromise);
});

test('array.concat example', t => {
	t.deepEqual(
		mergeOptions({patterns: ['src/**']}, {patterns: ['test/**']}),
		{patterns: ['test/**']}
	);
	t.deepEqual(
		mergeOptions.call({concatArrays: true}, {patterns: ['src/**']}, {patterns: ['test/**']}),
		{patterns: ['src/**', 'test/**']}
	);
	t.deepEqual(
		mergeOptions.apply({concatArrays: true}, [{patterns: ['src/**']}, {patterns: ['test/**']}]),
		{patterns: ['src/**', 'test/**']}
	);
});
