import assert from 'assert';
import _copy from '../../array/_copy.js';

/**
 * Adds two big endian arrays and puts result in a destination array.
 * Wraps on overflow. |C| >= |A| >= |B|.
 *
 * @param {Number} r base (radix)
 * @param {Array} a first operand
 * @param {Number} ai a left
 * @param {Number} aj a right
 * @param {Array} b second operand
 * @param {Number} bi b left
 * @param {Number} bj b right
 * @param {Array} c result, must be 0 initialized
 * @param {Number} ci c left
 * @param {Number} cj c right
 */

export default function _add(r, a, ai, aj, b, bi, bj, c, ci, cj) {
	assert(r >= 2);
	assert(ai >= 0 && aj <= a.length);
	assert(bi >= 0 && bj <= b.length);
	assert(ci >= 0 && cj <= c.length);
	assert(cj - ci >= aj - ai);
	assert(aj - ai >= bj - bi);

	let C = 0;

	while (--bj >= bi) {
		const t = a[--aj] + b[bj] + C;
		c[--cj] = t % r;
		C = (t >= r) | 0;
	}

	if (C !== 0) {
		while (--aj >= ai && a[aj] === r - 1) c[--cj] = 0;
		if (--cj >= ci) {
			if (aj >= ai) {
				c[cj] = a[aj] + 1;
			} else c[cj] = 1;
		}
	}

	_copy(a, ai, aj, c, cj - aj + ai);
}
