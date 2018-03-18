/* eslint no-extend-native:0, no-use-extend-native/no-use-extend-native:0 */
import test from 'ava';
import fn from '..';

test('ignore non-own properties', t => {
	const optionObject = {foo: 'bar'};

	Object.defineProperty(Object.prototype, 'TEST_NonOwnButEnumerable', {
		value: optionObject,
		configurable: true,
		enumerable: true
	});
	const result = fn({}, optionObject, {baz: true});

	t.true(result.baz);
	t.is(result.TEST_NonOwnButEnumerable, optionObject);
	t.false(Object.hasOwnProperty.call(result, 'TEST_NonOwnButEnumerable'));
	delete Object.prototype.TEST_NonOwnButEnumerable;
	t.false('TEST_NonOwnButEnumerable' in result);
});

test('ignore non-enumerable properties', t => {
	const optionObject = Object.create(null);
	const key = Symbol('TEST_NonEnumerableButOwn');

	Object.defineProperty(optionObject, key, {
		value: 42,
		configurable: true,
		enumerable: false
	});
	const result = fn({}, optionObject, {baz: true});

	if (Object.getOwnPropertySymbols) {
		const ownPropertySymbols = Object.getOwnPropertySymbols(result);
		t.deepEqual(ownPropertySymbols, []);
	} else {
		t.false(key in result);
	}

	t.not(result, optionObject);
	t.true(result.baz);
});
