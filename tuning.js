/*
 Exploring the effect of initial parameters on collisions and table size.
 Results have the following columns:
  accuracy
  probIncorrect
  table size
  number of collisions
  large collision delta (ie, size of error)
*/
var sample_size = 10000;

var sketch = require('count-min-sketch');

for (var a = 1; a <= 5; a++) {
	for (var b = 1; b <= 5; b++) {
		var _a = Math.pow(10, 0 - a);
		var _b = Math.pow(10, 0 - b);
		var sk = sketch(_a, _b);

		for (var i = 0; i < sample_size; i++) {
			sk.update(i, 10);
		}

		var collisions = 0, max = 0;
		for (var i = 0; i < sample_size; i++) {
			var value = sk.query(i);
			if (value != 10) {
				collisions++;
				max = Math.max(max, value);
			}
		}
		var size = Math.round(sk.table.length / 1024);

		var pad = function(val) {
			val = val.toString();
			return val + ('          ').substring(0, 10 - val.length);
		}
		console.log([_a, _b, size + 'kb', collisions, max].map(pad).join(''));
	}
}
