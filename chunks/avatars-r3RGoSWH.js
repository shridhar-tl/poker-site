// shared/poker/avatars.ts
var e = /* @__PURE__ */ "🧑‍💻.🦄.🐼.🦁.🐵.🐨.🦊.🐱.🐯.🐴.🐙.🦖.🐋.🐸.🐔.🐮.🐰.🐧.🦩.🐢.🐹.🐻.🐣.🐩.🐶.👩‍🦰.🦸.🧞.🧞‍♀️".split(".");
function t(t) {
	return typeof t != "number" || t < 0 || t >= e.length ? "👤" : e[t];
}
function n() {
	let t = /* @__PURE__ */ new Uint32Array(1);
	return globalThis.crypto.getRandomValues(t), t[0] % e.length;
}
function r(e, t) {
	return e === null ? t ? null : n() : e;
}
function i(t) {
	return typeof t == "number" && Number.isInteger(t) && t >= 0 && t < e.length;
}
export { i, e as n, r, t };
