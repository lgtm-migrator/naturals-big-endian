import cmp from './cmp.js';

const le = (a, ai, aj, b, bi, bj) => cmp(a, ai, aj, b, bi, bj) <= 0;
export default le;
