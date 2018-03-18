import test from 'ava';
import mergeOptions from '..';

test('support array values', t => {
	const array1 = ['foo', 'bar'];
	const array2 = ['baz'];
	const result = mergeOptions({array: array1}, {array: array2});
	t.deepEqual(result, {array: array2});
	t.not(result.array, array1);
	t.not(result.array, array2);
});

test('support concatenation', t => {
	const array1 = ['foo'];
	const array2 = ['bar'];
	const result = mergeOptions.call({concatArrays: true}, {array: array1}, {array: array2});
	t.deepEqual(result.array, ['foo', 'bar']);
	t.not(result.array, array1);
	t.not(result.array, array2);
});

test('support concatenation via apply', t => {
	const array1 = ['foo'];
	const array2 = ['bar'];
	const result = mergeOptions.apply({concatArrays: true}, [{array: array1}, {array: array2}]);
	t.deepEqual(result.array, ['foo', 'bar']);
	t.not(result.array, array1);
	t.not(result.array, array2);
});

test('support concatenation of sparsed arrays', t => {
	const sparseArray1 = [];
	const sparseArray2 = [];
	sparseArray1[2] = 42;
	sparseArray2[5] = 'unicorns';
	const result = mergeOptions.call({concatArrays: true}, {foo: sparseArray1}, {foo: sparseArray2});
	t.deepEqual(result.foo, [42, 'unicorns']);
	t.not(result.array, sparseArray1);
	t.not(result.array, sparseArray2);
});

test('support concatenation of sparsed arrays via apply', t => {
	const sparseArray1 = [];
	const sparseArray2 = [];
	sparseArray1[2] = 42;
	sparseArray2[5] = 'unicorns';
	const result = mergeOptions.apply({concatArrays: true}, [{foo: sparseArray1}, {foo: sparseArray2}]);
	t.deepEqual(result.foo, [42, 'unicorns']);
	t.not(result.array, sparseArray1);
	t.not(result.array, sparseArray2);
});

test('clone option objects', t => {
	const plainObj1 = {value: 'foo'};
	const plainObj2 = {value: 'bar'};
	const result = mergeOptions({array: [plainObj1]}, {array: [plainObj2]});
	t.deepEqual(result.array, [plainObj2]);
	t.not(result.array[0], plainObj1);
	t.not(result.array[0], plainObj2);
});
