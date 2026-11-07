var e = ["?", "~"], t = {
	1: [
		0,
		.5,
		1,
		2,
		3,
		5,
		8,
		13,
		21,
		34,
		55,
		89
	],
	2: [
		0,
		.5,
		1,
		2,
		3,
		5,
		8,
		13,
		20,
		40,
		100
	],
	3: [
		"XXS",
		"XS",
		"S",
		"M",
		"L",
		"XL",
		"XXL"
	]
}, n = [
	1,
	2,
	3
], r = {
	1: "Fibonacci",
	2: "Short Fibonacci",
	3: "T-Shirt"
}, i = {
	1: 89,
	2: 100,
	3: 0
};
function a(e) {
	return e === 1 || e === 2 || e === 3;
}
function o(e) {
	return e === 3 ? [] : t[e].filter((e) => e >= 3);
}
function s(n, r) {
	return typeof r == "string" && e.includes(r) ? !0 : t[n].includes(r);
}
function c(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function l(e, t, n) {
	let r = t.map((t) => e[t]).filter(c);
	if (r.length === 0) return {};
	let i = r.reduce((e, t) => e + t, 0) / r.length, a = Math.max(...r);
	return {
		average: i,
		maxVote: a,
		finalScore: u(n, i, a)
	};
}
function u(e, n, r) {
	let i = t[e].filter(c), a = i.filter((e) => e <= r);
	return (a.length > 0 ? a : [i[0]]).reduce((e, t) => Math.abs(t - n) < Math.abs(e - n) ? t : e);
}
function d(e, n, r) {
	let i = t[e];
	return e === 3 ? [...i] : i.filter((e) => e <= n && (r || e !== .5));
}
export { o as a, t as c, s as i, l, c as n, r as o, a as r, n as s, i as t, d as u };
