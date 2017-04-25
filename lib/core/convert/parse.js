'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parse = parse;

var _ = require('.');

function parse(f, t, string) {

	var b = (0, _.parse_keep_zeros)(f, t, string);

	return (0, _.trim_natural)(b, 0, b.length);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2NvbnZlcnQvcGFyc2UuanMiXSwibmFtZXMiOlsicGFyc2UiLCJmIiwidCIsInN0cmluZyIsImIiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7O1FBRWdCQSxLLEdBQUFBLEs7O0FBRmhCOztBQUVPLFNBQVNBLEtBQVQsQ0FBaUJDLENBQWpCLEVBQXFCQyxDQUFyQixFQUF5QkMsTUFBekIsRUFBa0M7O0FBRXhDLEtBQU1DLElBQUksd0JBQWtCSCxDQUFsQixFQUFzQkMsQ0FBdEIsRUFBMEJDLE1BQTFCLENBQVY7O0FBRUEsUUFBTyxvQkFBY0MsQ0FBZCxFQUFrQixDQUFsQixFQUFzQkEsRUFBRUMsTUFBeEIsQ0FBUDtBQUVBIiwiZmlsZSI6InBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2Vfa2VlcF96ZXJvcyAsIHRyaW1fbmF0dXJhbCB9IGZyb20gJy4nIDtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlICggZiAsIHQgLCBzdHJpbmcgKSB7XG5cblx0Y29uc3QgYiA9IHBhcnNlX2tlZXBfemVyb3MoIGYgLCB0ICwgc3RyaW5nICkgO1xuXG5cdHJldHVybiB0cmltX25hdHVyYWwoIGIgLCAwICwgYi5sZW5ndGggKSA7XG5cbn1cbiJdfQ==