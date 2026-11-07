import { n as e, o as t, r as n, t as r } from "./theme-BRWg1AQm.js";
import { useEffect as i, useState as a } from "react";
import { jsx as o } from "react/jsx-runtime";
// src/components/ThemeToggle.tsx
var s = [
	"system",
	"light",
	"dark"
], c = {
	system: "System theme",
	light: "Light theme",
	dark: "Dark theme"
}, l = {
	system: "◐",
	light: "☀",
	dark: "☾"
};
function u() {
	let { host: e } = t();
	return e.hidesThemeToggle ? null : /* @__PURE__ */ o(d, {});
}
function d() {
	let [t, u] = a(() => e());
	return i(() => {
		r(t);
	}, [t]), i(() => {
		if (t === "system") return n(() => r("system"));
	}, [t]), /* @__PURE__ */ o("button", {
		type: "button",
		className: "pk-themeToggle",
		onClick: () => {
			u((e) => s[(s.indexOf(e) + 1) % s.length]);
		},
		title: c[t],
		"aria-label": c[t],
		children: /* @__PURE__ */ o("span", {
			"aria-hidden": !0,
			children: l[t]
		})
	});
}
// src/constants.ts
var f = 6e4, p = 18e4, m = 15e3, h = 12e4, g = 3e4, _ = 5e3, v = 3e4, y = 864e5, b = 3e4, x = "The service is rate limiting requests right now, so your last action did not go through. Please try again in a moment.";
export { y as a, h as c, u as d, p as i, g as l, f as n, v as o, m as r, _ as s, b as t, x as u };
