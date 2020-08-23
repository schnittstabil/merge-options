const test = require('ava');
const mergeOptions = require('..');

test('preserve property order', t => {
	const letters = 'abcdefghijklmnopqrst';
	const source = {};
	letters.split('').forEach(letter => {
		source[letter] = letter;
	});
	const target = mergeOptions({}, source);
	t.is(Object.keys(target).join(''), letters);
});
