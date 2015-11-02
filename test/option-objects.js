import test from 'ava';
import mergeOptions from '../';

test('ignore `undefined` Option Objects', t => {
	t.same(mergeOptions(undefined), {});
	t.same(mergeOptions(undefined, {foo: true}, {foo: false}), {foo: false});
	t.same(mergeOptions({foo: true}, undefined, {foo: false}), {foo: false});
	t.end();
});

test('support Object.create(null) Option Objects', t => {
	const option1 = Object.create(null);
	option1.foo = Object.create(null);
	t.same(mergeOptions(option1, {bar: Object.create(null)}), {foo: Object.create(null), bar: Object.create(null)});
	t.end();
});
