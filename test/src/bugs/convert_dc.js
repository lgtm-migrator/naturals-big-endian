import test from 'ava';

import {xoroshiro128plus, fill} from '@entropy-source/pseudo-random';
import {decode as hex} from '@codec-bytes/base16';

import {
	_convert_dc,
	trim_natural,
	THRESHOLD_MUL_TOOM22,
	_to_string,
	_from_string,
	_convert,
	_zeros,
} from '#module';

function translate(f, t, string) {
	const a = parse(f, t, string);
	return stringify(t, t, a, 0, a.length);
}

function parse(f, t, string) {
	const b = parse_keep_zeros(f, t, string);

	return trim_natural(b, 0, b.length);
}

function stringify(f, t, a, ai, aj) {
	if (t > 36) throw new Error('t > 36 not implemented');

	const b = convert(f, t, a, ai, aj);

	return _to_string(b);
}

function parse_keep_zeros(f, t, string) {
	if (f > 36) throw new Error('f > 36 not implemented');

	const a = _from_string(string);

	return convert_keep_zeros(f, t, a, 0, a.length);
}

function convert(f, t, a, ai, aj) {
	const b = convert_keep_zeros(f, t, a, ai, aj);

	return trim_natural(b, 0, b.length);
}

function convert_keep_zeros(f, t, a, ai, aj) {
	const bi = 0;
	const bj = Math.ceil((Math.log(f) / Math.log(t)) * (aj - ai));
	const b = _zeros(bj - bi);

	// MOCK CONVERT WITH LOWER THRESHOLD FOR DC CONVERSION AND NO COPY FALLBACK
	if (aj - ai >= 4 * THRESHOLD_MUL_TOOM22) {
		_convert_dc(2 * THRESHOLD_MUL_TOOM22, f, t, a, ai, aj, b, bi, bj);
	} else {
		_convert(f, t, a, ai, aj, b, bi, bj);
	}

	return b;
}

function macro_parse(t, r, s) {
	// Only works for base <= 10
	t.true(r <= 10);
	t.is(s, parse(r, r, s).join(''));
}

macro_parse.title = (_, r, s) =>
	`convert_dc bug parse ${r} ${s.slice(0, 40) + '...'}`;

test(macro_parse, 10, '1267650600228229401496703205376');
test(macro_parse, 10, '515377520732011331036461129765621272702107522001');
test(
	macro_parse,
	10,
	'1606938044258990275541962092341162602522202993782792835301376',
);
test(
	macro_parse,
	10,
	'7888609052210118054117285652827862296732064351090230047702789306640625',
);
test(
	macro_parse,
	10,
	'653318623500070906096690267158057820537143710472954871543071966369497141477376',
);
test(
	macro_parse,
	10,
	'46336150792381577588313262263220434371406283602843045997201608143345357543255478647000589718036536507270555180182966478507',
);
test(
	macro_parse,
	10,
	'7696436915158194113318351373463845221171356145956582163352457594358867621369111939116411591286644215669468216857934835317654199357729258249751557319148431184429671129493281347861351938333111711595191294654521519168223111179372164712642323113738666356144516',
);

function macro_convert(t, f, _t, e) {
	const a = parse(f, _t, e);
	const s = stringify(_t, f, a, 0, a.length);
	t.is(e, s);
}

macro_convert.title = (_, f, _t, s) =>
	`convert_dc bug convert ${f} ${_t} ${s.slice(0, 40) + '...'}`;

const PROBLEM =
	'7aca1358dcd766fea62e85a01d212c033ee131f73699549048ea4ff82340e8527da2600626bb62ac40a691226b708325be13cb77c424f53d6ea72ab95e6f02b07475aa66d75f0752621eaddc85e247f23dfcc1079346466cf998e5e2e216fbaa3796a2c2cd8a0bb12b6cc277402b37ba5938cbd2c214d7b401ac6b9096ecde7dc312e1d82eb0772c792e1ad712592d80da27fb4af123905abda111f967827e3fbb02a5e999c28e93faadaeeffb0a1084367c04bb533ff3f7b3d10d7d6838b6f1982757878c44c6dea5827490890fdf9cc0a1094c6ae2ce035357bfad82d499b23c615c9b212bd1db8f4abe2d6060a994a436464cb19f4fcf3bbc140048d367d1';

test(`convert_dc bug parse 16 94906266 ${
	PROBLEM.slice(0, 40) + '...'
}`, (t) => {
	const e = [
		86, 78_312_951, 94_374_105, 26_624_213, 56_693_695, 75_296_934, 52_733_292,
		89_892_400, 54_699_504, 48_281_904, 10_809_218, 85_508_125, 49_276_796,
		87_865_021, 72_206_610, 5_697_942, 69_159_977, 94_774_286, 21_492_437,
		39_742_495, 34_925_480, 81_393_355, 36_486_614, 23_554_825, 86_860_493,
		7_638_516, 79_195_555, 14_338_633, 4_251_794, 16_199_573, 56_267_139,
		43_815_017, 77_069_067, 65_464_041, 22_569_049, 9_250_901, 40_595_367,
		27_577_914, 385_664, 17_176_549, 25_188_154, 66_306_515, 85_000_594,
		30_136_354, 13_339_295, 80_846_790, 75_889_458, 86_325_523, 25_930_160,
		80_454_574, 5_478_079, 74_084_772, 68_678_456, 52_611_002, 86_734_364,
		67_384_514, 43_111_198, 61_749_912, 26_407_909, 12_660_282, 88_491_445,
		54_448_031, 14_651_560, 77_560_284, 52_827_888, 17_065_922, 91_075_304,
		62_456_048, 22_864_492, 57_190_597, 90_254_267, 80_332_605, 71_663_268,
		25_184_985, 64_032_247, 17_816_350, 70_011_326, 89_986_917,
	];
	const a = parse(16, 94_906_266, PROBLEM);
	t.deepEqual(e, a);
});

test(`convert_dc bug stringify 94906266 16 ${
	PROBLEM.slice(0, 40) + '...'
}`, (t) => {
	const a = [
		86, 78_312_951, 94_374_105, 26_624_213, 56_693_695, 75_296_934, 52_733_292,
		89_892_400, 54_699_504, 48_281_904, 10_809_218, 85_508_125, 49_276_796,
		87_865_021, 72_206_610, 5_697_942, 69_159_977, 94_774_286, 21_492_437,
		39_742_495, 34_925_480, 81_393_355, 36_486_614, 23_554_825, 86_860_493,
		7_638_516, 79_195_555, 14_338_633, 4_251_794, 16_199_573, 56_267_139,
		43_815_017, 77_069_067, 65_464_041, 22_569_049, 9_250_901, 40_595_367,
		27_577_914, 385_664, 17_176_549, 25_188_154, 66_306_515, 85_000_594,
		30_136_354, 13_339_295, 80_846_790, 75_889_458, 86_325_523, 25_930_160,
		80_454_574, 5_478_079, 74_084_772, 68_678_456, 52_611_002, 86_734_364,
		67_384_514, 43_111_198, 61_749_912, 26_407_909, 12_660_282, 88_491_445,
		54_448_031, 14_651_560, 77_560_284, 52_827_888, 17_065_922, 91_075_304,
		62_456_048, 22_864_492, 57_190_597, 90_254_267, 80_332_605, 71_663_268,
		25_184_985, 64_032_247, 17_816_350, 70_011_326, 89_986_917,
	];
	const s = stringify(94_906_266, 16, a, 0, a.length);
	t.is(PROBLEM, s);
});

test(macro_convert, 16, 16, PROBLEM);

test(macro_convert, 16, 94_906_266, PROBLEM);

test('convert_dc bug 16 32', (t) => {
	const s16 =
		'7696436905158094003308350373463845221071356045956582063352457594358867621369100939016411590286644205669468206857934835307654199357729258249751557309048431184429670029493281347861350938333001700595191294654520509068223010179372164702642323113738666356044506';
	const s32 = translate(16, 32, s16);
	t.is(s16, translate(32, 16, s32));
});

test('convert_dc bug 16 36', (t) => {
	const s16 =
		'7696436905158094003308350373463845221071356045956582063352457594358867621369100939016411590286644205669468206857934835307654199357729258249751557309048431184429670029493281347861350938333001700595191294654520509068223010179372164702642323113738666356044506';
	const s36 = translate(16, 36, s16);
	t.is(s16, translate(36, 16, s36));
});

test('convert_dc bug 16 35', (t) => {
	const s16 =
		'7696436905158094003308350373463845221071356045956582063352457594358867621369100939016411590286644205669468206857934835307654199357729258249751557309048431184429670029493281347861350938333001700595191294654520509068223010179372164702642323113738666356044506';
	const s35 = translate(16, 35, s16);
	t.is(s16, translate(35, 16, s35));
});

test('convert_dc bug 9 8', (t) => {
	const s9 =
		'7676436715158174113318351373463845221171356145756582163352457574358867621367111737116411571286644215667468216857734835317654177357727258247751557317148431184427671127473281347861351738333111711575171274654521517168223111177372164712642323113738666356144516';
	const s8 =
		'2341511753762417574267007637275674131142156520746203057314467730455404277272762246772544705373444735202465304444063665456343411166473401205724176607231571765573377253513617567037636027453057070427750527740414020063465317231626405252605557043305357513631417320631516523047';

	const out = translate(9, 8, s9);
	t.is(s8, out);
});

test('convert_dc bug 8 9', (t) => {
	const s8 =
		'2341511753762417574267117637275674131142156521746213157314467731455414277272762246772544715373444735212465314444163665456343411166473411215724176617231571765573377253513617567137636127453157171427751527741414121163465317231626415252615557143315357513631417321631516523147';
	const s9 =
		'7676436715158174113324628077245537553715217783000327125164316171175261487176551270283528223665306534361832552387385342283811063603446045453853316005761148822334514681534233512340787628370085234700131650275200138738633568337374662744606600607032773544166071';

	const out = translate(8, 9, s8);
	t.is(s9, out);
});

test('convert_dc bug 9 8 translate', (t) => {
	const s9 =
		'7676436715158174113318351373463845221171356145756582163352457574358867621367111737116411571286644215667468216857734835317654177357727258247751557317148431184427671127473281347861351738333111711575171274654521517168223111177372164712642323113738666356144516';

	const out = translate(9, 8, s9);
	t.is(s9, translate(8, 9, out));
});

const seed = [1, 0, 0, 0];
const prng = xoroshiro128plus(seed, {});
const buffer = new Uint8Array(8192);
fill(prng, buffer);
const _b8192 = hex(buffer).toLowerCase().replace(/^0*/, '');
test(macro_convert, 16, 94_906_266, _b8192);
