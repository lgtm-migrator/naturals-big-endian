'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.convert_keep_zeros = convert_keep_zeros;

var _array = require('../array');

var _ = require('.');

function convert_keep_zeros(f, t, a, ai, aj) {

	var bi = 0;
	var bj = Math.ceil(Math.log(f) / Math.log(t) * (aj - ai));
	var b = (0, _array._zeros)(bj - bi);

	(0, _._convert)(f, t, a, ai, aj, b, bi, bj);

	return b;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8xLW5ldy9jb252ZXJ0L2NvbnZlcnRfa2VlcF96ZXJvcy5qcyJdLCJuYW1lcyI6WyJjb252ZXJ0X2tlZXBfemVyb3MiLCJmIiwidCIsImEiLCJhaSIsImFqIiwiYmkiLCJiaiIsIk1hdGgiLCJjZWlsIiwibG9nIiwiYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFHZ0JBLGtCLEdBQUFBLGtCOztBQUhoQjs7QUFDQTs7QUFFTyxTQUFTQSxrQkFBVCxDQUE4QkMsQ0FBOUIsRUFBa0NDLENBQWxDLEVBQXNDQyxDQUF0QyxFQUEwQ0MsRUFBMUMsRUFBK0NDLEVBQS9DLEVBQW9EOztBQUUxRCxLQUFNQyxLQUFLLENBQVg7QUFDQSxLQUFNQyxLQUFLQyxLQUFLQyxJQUFMLENBQVdELEtBQUtFLEdBQUwsQ0FBVVQsQ0FBVixJQUFnQk8sS0FBS0UsR0FBTCxDQUFVUixDQUFWLENBQWhCLElBQWtDRyxLQUFLRCxFQUF2QyxDQUFYLENBQVg7QUFDQSxLQUFNTyxJQUFJLG1CQUFRSixLQUFLRCxFQUFiLENBQVY7O0FBRUEsaUJBQVVMLENBQVYsRUFBY0MsQ0FBZCxFQUFrQkMsQ0FBbEIsRUFBc0JDLEVBQXRCLEVBQTJCQyxFQUEzQixFQUFnQ00sQ0FBaEMsRUFBb0NMLEVBQXBDLEVBQXlDQyxFQUF6Qzs7QUFFQSxRQUFPSSxDQUFQO0FBRUEiLCJmaWxlIjoiY29udmVydF9rZWVwX3plcm9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX3plcm9zIH0gZnJvbSAnLi4vYXJyYXknIDtcbmltcG9ydCB7IF9jb252ZXJ0IH0gZnJvbSAnLicgO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9rZWVwX3plcm9zICggZiAsIHQgLCBhICwgYWkgLCBhaiApIHtcblxuXHRjb25zdCBiaSA9IDAgO1xuXHRjb25zdCBiaiA9IE1hdGguY2VpbCggTWF0aC5sb2coIGYgKSAvIE1hdGgubG9nKCB0ICkgKiAoIGFqIC0gYWkgKSApIDtcblx0Y29uc3QgYiA9IF96ZXJvcyggYmogLSBiaSApIDtcblxuXHRfY29udmVydCggZiAsIHQgLCBhICwgYWkgLCBhaiAsIGIgLCBiaSAsIGJqICkgO1xuXG5cdHJldHVybiBiIDtcblxufVxuIl19