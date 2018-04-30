import test from 'ava';
import mergeOptions from '..';

const defineProtoProperty = (obj, value) => Object.defineProperty(obj, '__proto__', {
	value,
	writable: true,
	enumerable: true,
	configurable: true
});

test('PoC by HoLyVieR', t => {
	const maliciousPayload = '{"__proto__":{"oops":"It works !"}}';
	const a = {};
	t.is(undefined, a.oops);
	mergeOptions({}, JSON.parse(maliciousPayload));
	t.is(undefined, a.oops);
});

test('array values (regression test)', t => {
	const array1 = [];
	const array2 = [];
	const pristine = [];
	defineProtoProperty(array2, {oops: 'It works !'});
	t.is(undefined, pristine.oops);
	mergeOptions({array: array1}, {array: array2});
	t.is(undefined, pristine.oops);
});

test('recusive merge', t => {
	const a = {};
	const b = defineProtoProperty({a}, {oops: 'It works !'});
	t.is(undefined, b.a.oops);
	mergeOptions({a: {}}, b);
	t.is(undefined, b.a.oops);
});
