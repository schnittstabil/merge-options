import test from 'ava';
import mergeOptions from '..';

function toString(value) {
	try {
		return String(value);
	} catch (error) {
		return typeof value;
	}
}

test('throw TypeError on non-option-objects', async t => {
	const promise = Promise.reject(new Error());
	[
		42,
		'unicorn',
		new Date(),
		promise,
		Symbol('unicorn'),
		/regexp/,
		function () {},
		null
	].forEach(value => {
		t.throws(() => mergeOptions(value), TypeError, toString(value));
		t.throws(() => mergeOptions({}, value), TypeError, toString(value));
		t.throws(() => mergeOptions({foo: 'bar'}, value), TypeError, toString(value));
		t.throws(() => mergeOptions(Object.create(null), value), TypeError, toString(value));
	});

	await t.throwsAsync(promise);
});

test('support `undefined` Option Values', t => {
	t.deepEqual(mergeOptions({foo: true}, {foo: undefined}), {foo: undefined});
});

test('support undefined as target, null as source', t => {
	const result = mergeOptions({foo: undefined}, {foo: null});
	t.is(result.foo, null);
});

test('support null as target, undefined as source', t => {
	const result = mergeOptions({foo: null}, {foo: undefined});
	t.is(result.foo, undefined);
});

test('support Date as target, Number as source', t => {
	const result = mergeOptions({date: new Date()}, {date: 990741600000});
	t.is(result.date, 990741600000);
	t.is(result.date.constructor, Number);
});

test('support Date as target, Date as source', t => {
	const result = mergeOptions({date: new Date()}, {date: new Date(990741600000)});
	t.is(result.date.getTime(), 990741600000);
	t.is(result.date.constructor, Date);
});

test('support RegExp as target, String as source', t => {
	const result = mergeOptions({regexp: /reg/}, {regexp: 'string'});
	t.is(result.regexp.constructor, String);
	t.is(result.regexp, 'string');
});

test('support RegExp as target, RegExp as source', t => {
	const result = mergeOptions({regexp: /reg/}, {regexp: /new/});
	t.is(result.regexp.constructor, RegExp);
	t.is(result.regexp.test('new'), true);
});

test('support Promise as target, Number as source', t => {
	const promise1 = Promise.resolve(666);
	const promise2 = 42;
	const result = mergeOptions({promise: promise1}, {promise: promise2});
	t.is(result.promise.constructor, Number);
	t.is(result.promise, 42);
});

test('support Promise as target, Promise as source', async t => {
	const promise1 = Promise.resolve(666);
	const promise2 = Promise.resolve(42);
	const result = mergeOptions({promise: promise1}, {promise: promise2});
	t.is(result.promise.constructor, Promise);
	t.deepEqual(await result.promise, 42);
});

test('support user-defined object as target, user-defined object as source', t => {
	function User(firstName) {
		this.firstName = firstName;
	}

	const alice = new User('Alice');
	const bob = new User('Bob');
	const result = mergeOptions({user: alice}, {user: bob});
	t.is(result.user.constructor, User);
	t.is(result.user, bob);
	t.is(result.user.firstName, 'Bob');
});
