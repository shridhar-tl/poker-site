import { t as e } from "./chunks/AppLoader-D9yvNwlE.js";
import { i as t, n, o as r, t as i } from "./chunks/theme-BRWg1AQm.js";
import { n as a, r as o, t as s } from "./chunks/createPokerContainer-f4kZLtXZ.js";
import { defaultRetryPolicy as c, hasPokerService as l, pokerServices as u, registerPokerService as d, requiredPokerServices as f, resolvePokerService as p } from "./contracts.js";
import { Suspense as m, lazy as h, useMemo as g } from "react";
import { Navigate as _, Route as v, Routes as y } from "react-router";
import { ConfirmPopoverManager as b, SnackbarManager as x, TooltipManager as S } from "fluxo-ui";
import { ServiceProvider as C } from "fluxo-ui/services";
import { Fragment as w, jsx as T, jsxs as E } from "react/jsx-runtime";
// src/embed/PokerApp.tsx
var D = h(() => import("./chunks/LandingPage-D6CfCTdZ.js")), O = h(() => import("./chunks/RoomPage-DsT_hw6j.js")), k = h(() => import("./chunks/RoomsPage-DIGdxenC.js"));
function A() {
	let { host: e } = r();
	return e.capabilities.directory ? /* @__PURE__ */ T(k, {}) : /* @__PURE__ */ T(D, {});
}
function j({ container: n, basePath: r, manageToasts: i = !1 }) {
	return g(() => s(n), [n]), /* @__PURE__ */ T(C, {
		container: n,
		children: /* @__PURE__ */ T(t.Provider, {
			value: r,
			children: /* @__PURE__ */ E("div", {
				className: "pk-root",
				children: [/* @__PURE__ */ T(m, {
					fallback: /* @__PURE__ */ T(e, {}),
					children: /* @__PURE__ */ E(y, { children: [
						/* @__PURE__ */ T(v, {
							path: "/",
							element: /* @__PURE__ */ T(A, {})
						}),
						/* @__PURE__ */ T(v, {
							path: "/new",
							element: /* @__PURE__ */ T(D, {})
						}),
						/* @__PURE__ */ T(v, {
							path: "/join/:roomId",
							element: /* @__PURE__ */ T(D, {})
						}),
						/* @__PURE__ */ T(v, {
							path: "/room/:roomId",
							element: /* @__PURE__ */ T(O, {})
						}),
						/* @__PURE__ */ T(v, {
							path: "*",
							element: /* @__PURE__ */ T(_, {
								to: `${r.replace(/\/+$/, "")}/`,
								replace: !0
							})
						})
					] })
				}), i && /* @__PURE__ */ E(w, { children: [
					/* @__PURE__ */ T(x, {}),
					/* @__PURE__ */ T(S, {}),
					/* @__PURE__ */ T(b, {})
				] })]
			})
		})
	});
}
export { j as PokerApp, i as applyThemeMode, s as assertRequiredServices, a as createPokerContainer, c as defaultRetryPolicy, l as hasPokerService, u as pokerServices, n as readThemeMode, o as registerHostIndependentServices, d as registerPokerService, f as requiredPokerServices, p as resolvePokerService };
