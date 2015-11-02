import test from 'ava';
import mergeOptions from '../';

test('cloning example', t => {
	const defaultOpts = {
		fn: () => false,
		promise: Promise.reject(new Error()),
		array: ['foo'],
		nested: {unicorns: 'none'}
	};
	const opts = {
		fn: () => true,
		promise: Promise.resolve('bar'),
		array: ['baz'],
		nested: {unicorns: 'many'}
	};
	const result = mergeOptions(defaultOpts, opts);
	t.same(result, opts);
	t.is(result.fn, opts.fn);
	t.is(result.promise, opts.promise);
	t.not(result.array, opts.array);
	t.not(result.nested, opts.nested);
	t.end();
});

test('array.concat example', t => {
	t.same(
		mergeOptions({patterns: ['src/**']}, {patterns: ['test/**']}),
		{patterns: ['test/**']}
	);
	t.same(
		mergeOptions.call({concatArrays: true}, {patterns: ['src/**']}, {patterns: ['test/**']}),
		{patterns: ['src/**', 'test/**']}
	);
	t.end();
});
