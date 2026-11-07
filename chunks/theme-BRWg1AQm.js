import { hasPokerService as e, pokerServices as t, resolvePokerService as n } from "../contracts.js";
import { o as r } from "./createPokerContainer-f4kZLtXZ.js";
import { createContext as i, useCallback as a, useContext as o, useMemo as s } from "react";
import { useNavigate as c } from "react-router";
import { useContainer as l } from "fluxo-ui/services";
// src/runtime/usePokerServices.ts
function u() {
	let i = l();
	return s(() => {
		let a = (t) => e(i, t) ? n(i, t) : null;
		return {
			room: n(i, t.room),
			session: n(i, t.session),
			realtime: n(i, t.realtime),
			identity: n(i, t.identity),
			host: n(i, t.host),
			message: i.resolve(r)[r],
			issues: a(t.issues),
			directory: a(t.directory),
			userPicker: a(t.userPicker)
		};
	}, [i]);
}
// src/runtime/usePokerNavigate.ts
var d = i("");
function f(e) {
	return e.replace(/\/+$/, "");
}
function p() {
	let e = c(), t = f(o(d)), { host: n } = u(), r = a((e) => `${t}${e}`, [t]), i = a((r) => {
		n.navigateToRoom ? n.navigateToRoom(r) : e(`${t}/room/${r}`);
	}, [
		n,
		e,
		t
	]), l = a(() => {
		n.navigateHome ? n.navigateHome() : e(`${t}/`, { replace: !0 });
	}, [
		n,
		e,
		t
	]), p = a((n) => e(`${t}/join/${n}`, { replace: !0 }), [e, t]), m = a(() => e(`${t}/`), [e, t]), h = a(() => e(`${t}/new`), [e, t]);
	return s(() => ({
		to: r,
		toRoom: i,
		toHome: l,
		toJoin: p,
		toRooms: m,
		toCreate: h
	}), [
		r,
		i,
		l,
		p,
		m,
		h
	]);
}
// src/common/theme.ts
var m = "pokerTheme";
function h() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function g() {
	try {
		let e = window.localStorage.getItem(m);
		if (e === "light" || e === "dark" || e === "system") return e;
	} catch (e) {
		console.error("Could not read the stored theme preference", e);
	}
	return "system";
}
function _(e) {
	return e === "dark" || e === "system" && h();
}
function v(e) {
	document.body.classList.toggle("mode-dark", _(e));
	try {
		window.localStorage.setItem(m, e);
	} catch (e) {
		console.error("Could not persist the theme preference", e);
	}
}
function y(e) {
	let t = window.matchMedia("(prefers-color-scheme: dark)");
	return t.addEventListener("change", e), () => t.removeEventListener("change", e);
}
export { p as a, d as i, g as n, u as o, y as r, v as t };
