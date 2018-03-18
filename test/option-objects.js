import test from 'ava';
import mergeOptions from '..';

test('ignore `undefined` Option Objects', t => {
	t.deepEqual(mergeOptions(undefined), {});
	t.deepEqual(mergeOptions(undefined, {foo: true}, {foo: false}), {foo: false});
	t.deepEqual(mergeOptions({foo: true}, undefined, {foo: false}), {foo: false});
});

test('support Object.create(null) Option Objects', t => {
	const option1 = Object.create(null);
	option1.foo = Object.create(null);
	t.deepEqual(mergeOptions(option1, {bar: Object.create(null)}), {foo: Object.create(null), bar: Object.create(null)});
});
