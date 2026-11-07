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
export { r as a, t as i, a as n, i as o, n as r, o as t };
