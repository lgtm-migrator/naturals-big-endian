

/**
 * Input
 * -----
 *  - No leading zeros
 *  - |A| = |C|
 *
 * References
 * ----------
 *   - https://gmplib.org/manual/Divide-and-Conquer-Division.html
 *
 */
const _dc_div = function ( X , a , ai , aj , b , bi , bj , c , ci , cj ) {

	// [BZ98] Fast Recursive Division

	const r = aj - ai ;
	const s = bj - bi ;

	if ( r < s || r === s && _CMP_n( a , ai , aj , b , bi ) < 0 ) return ;

	// shift to get n = 2^k for some k
	let _m = 1 ;
	let _k = 0 ;

	while ( _m  < s ) {
		_m <<= 1 ;
		++_k ;
	}

	const m = _m ;
	const k = _k ;
	const n = m ;

	const shift = n - s ;

	const w = r + shift + 1 ;
	const t = Math.ceil( w / n ) ;
	const _ai = 0 ;
	const _aj = t * n ;         // + 1 because of
	const _a = _zeros( _aj ) ;  // potential normalization overflow
	const _ak = _aj - shift - r ;
	_copy( a , ai , aj , _a , _ak ) ;

	const _bi = 0 ;
	const _bj = n ;
	const _b = _zeros( n ) ;
	_copy( b , bi , bj , _b , 0 ) ;

	const x = _b[_bi] ;
	const _X = X / 2 ;
	const _normalize = x < _X ;
	const z = Math.ceil( _X / x ) ;

	if ( _normalize ) {

		_imul_limb( X , z , _a , _ai , _aj ) ;
		_imul_limb( X , z , _b , _bi , _bj ) ;

	}

	const _cj = t * n ;
	const _c = _zeros( _cj ) ;

	for ( let i = 0 ; i < _aj - n ; i += n ) {

		_dc_div_21( X , _a , i , i + ( n << 1 ) , _b , _bi , _bj , _c , i , i + ( n << 1 ) ) ;

	}

	if ( _normalize ) {
		const p = _mod_limb( X , z , _a , _ai , _ak ) ;
		_div_limb_partial_fast( X , p , z , _a , _ak , _aj - shift , a , ai , aj ) ;
	}
	else{
		_copy( _a , _ak , _aj - shift , a , ai , aj ) ;
	}

	_copy( _c , _cj - r , _cj , c , ci ) ;

} ;

exports._dc_div = _dc_div ;
