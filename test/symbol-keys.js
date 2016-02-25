import test from 'ava';
import mergeOptions from '../';

test('return new option objects', t => {
	const fooKey = Symbol('foo');
	const source1 = {};
	const source2 = {};
	const fooRef1 = source1[fooKey] = {bar: false};
	const fooRef2 = source2[fooKey] = {bar: true};
	const result = mergeOptions(source1, source2);
	t.same(result, source2);
	t.not(result, source2);
	t.not(result[fooKey], source1[fooKey]);
	t.not(result[fooKey], source2[fooKey]);
	t.not(result[fooKey], fooRef1);
	t.not(result[fooKey], fooRef2);
});
