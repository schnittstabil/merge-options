import test from 'ava';
import mergeOptions from '..';

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
