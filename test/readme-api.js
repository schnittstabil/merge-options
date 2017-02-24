import test from 'ava';
import mergeOptions from '../';

test('cloning example', t => {
	const defaultPromise = Promise.reject(new Error());
	const optsPromise = Promise.resolve('bar');
	const defaultOpts = {
		fn: () => false,
		promise: defaultPromise,
		array: ['foo'],
		nested: {unicorns: 'none'}
	};
	const opts = {
		fn: () => true,
		promise: optsPromise,
		array: ['baz'],
		nested: {unicorns: 'many'}
	};
	const result = mergeOptions(defaultOpts, opts);
	t.deepEqual(result, opts);
	t.is(result.fn, opts.fn);
	t.is(result.promise, opts.promise);
	t.not(result.array, opts.array);
	t.not(result.nested, opts.nested);
	t.throws(defaultPromise);
	t.notThrows(optsPromise);
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
});
