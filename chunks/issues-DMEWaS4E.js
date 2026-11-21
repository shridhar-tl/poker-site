import { n as e } from "./scores-BUpnRFKN.js";
// shared/poker/estimates.ts
var t = [
	"manual",
	"consensus",
	"finalScore"
], n = {
	manual: "Only when I click update",
	consensus: "Automatically when everyone agrees",
	finalScore: "Automatically with the final score"
};
function r(e) {
	return typeof e == "string" && t.includes(e);
}
function i(e) {
	return e !== 3;
}
function a(t) {
	let n = Object.values(t), [r] = n;
	return e(r) && n.every((e) => e === r) ? r : void 0;
}
function o(t, n) {
	if (n.reveal) {
		if (t === "consensus") return a(n.values);
		if (t === "finalScore") return e(n.finalScore) ? n.finalScore : void 0;
	}
}
// shared/poker/issues.ts
function s(e) {
	return e.trim().toLowerCase();
}
function c(e, t) {
	let n = new Set(e.map((e) => s(e.key)));
	return t.filter((e) => {
		let t = s(e.key);
		return !t || n.has(t) ? !1 : (n.add(t), !0);
	});
}
export { n as a, i as c, a as i, c as n, t as o, o as r, r as s, s as t };
