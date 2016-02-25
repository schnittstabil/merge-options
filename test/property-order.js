import test from 'ava';
import mergeOptions from '../';

test('preserve property order', t => {
	var letters = 'abcdefghijklmnopqrst';
	var source = {};
	letters.split('').forEach(function (letter) {
		source[letter] = letter;
	});
	var target = mergeOptions({}, source);
	t.is(Object.keys(target).join(''), letters);
});
