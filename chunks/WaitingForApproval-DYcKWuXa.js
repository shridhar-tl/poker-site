import { o as e } from "./theme-BRWg1AQm.js";
import { t } from "./errors-GZBLOECl.js";
import { o as n, s as r } from "./constants-BkFPV1oy.js";
import { useEffect as i, useRef as a, useState as o } from "react";
import { Button as s } from "fluxo-ui";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
// src/runtime/useIdentity.ts
function u() {
	let { identity: t } = e(), [n, r] = o({
		ready: !1,
		identity: null
	});
	return i(() => {
		let e = !1;
		return t.getIdentity().then((t) => {
			e || r({
				ready: !0,
				identity: t
			});
		}).catch((t) => {
			console.error("Could not read the host identity", t), e || r({
				ready: !0,
				identity: null
			});
		}), () => {
			e = !0;
		};
	}, [t]), {
		ready: n.ready,
		identity: n.identity,
		requiresEmail: t.requiresEmail,
		allowsAvatarPicker: t.allowsAvatarPicker
	};
}
// src/modules/landing/WaitingForApproval.tsx
var d = 1.25;
function f({ pending: u, onApproved: f, onDismissed: p }) {
	let { room: m } = e(), [h, g] = o(null), [_, v] = o(""), [y, b] = o(!1), x = a(!1), { request: S } = u;
	return i(() => {
		x.current = !1;
		let e = Date.now(), i = r, a = null, o = {
			roomId: S.roomId,
			requestId: S.requestId,
			email: u.email,
			name: u.name,
			avatarId: u.avatarId,
			avatarUrl: u.avatarUrl
		}, s = () => {
			x.current || (Date.now() - e >= 864e5 ? (x.current = !0, g("This request expired before the host responded.")) : (a = setTimeout(c, i), i = Math.min(Math.round(i * d), n)));
		}, c = async () => {
			try {
				let e = await m.getJoinStatus(o);
				if (x.current) return;
				if (e.status === "approved") {
					let t = e.session ?? await m.joinRoom({ ...o });
					if ("token" in t || "sid" in t) {
						x.current = !0, f(S.roomId);
						return;
					}
				} else if (e.status === "rejected" || e.status === "cancelled") {
					x.current = !0, g(e.reason ?? "The host did not approve your request.");
					return;
				}
				v("");
			} catch (e) {
				console.error("Could not check the join request", e), v(t(e, "Could not check your request. Retrying…"));
			}
			s();
		};
		return s(), () => {
			x.current = !0, a !== null && clearTimeout(a);
		};
	}, [
		m,
		S,
		u,
		f
	]), h === null ? /* @__PURE__ */ l("div", {
		className: "pk-waiting",
		children: [
			/* @__PURE__ */ c("span", {
				className: "pk-waiting__pulse",
				"aria-hidden": !0
			}),
			/* @__PURE__ */ c("h2", {
				className: "pk-waiting__title",
				children: "Waiting for host approval"
			}),
			/* @__PURE__ */ l("p", {
				className: "pk-waiting__text",
				children: [/* @__PURE__ */ c("strong", { children: S.roomName }), " needs the host to let you in. This page continues automatically once you are approved."]
			}),
			_ && /* @__PURE__ */ c("p", {
				className: "pk-waiting__note",
				children: _
			}),
			/* @__PURE__ */ c(s, {
				variant: "secondary",
				layout: "outlined",
				onClick: async () => {
					b(!0), x.current = !0;
					try {
						await m.cancelJoinRequest({
							roomId: S.roomId,
							requestId: S.requestId,
							email: u.email
						});
					} catch (e) {
						console.error("Could not cancel the join request", e);
					}
					p();
				},
				isLoading: y,
				label: "Cancel request"
			})
		]
	}) : /* @__PURE__ */ l("div", {
		className: "pk-waiting",
		children: [
			/* @__PURE__ */ c("span", {
				className: "pk-waiting__icon",
				"aria-hidden": !0,
				children: "✋"
			}),
			/* @__PURE__ */ c("h2", {
				className: "pk-waiting__title",
				children: "Request not approved"
			}),
			/* @__PURE__ */ c("p", {
				className: "pk-waiting__text",
				children: h
			}),
			/* @__PURE__ */ c(s, {
				variant: "primary",
				onClick: p,
				label: "Back"
			})
		]
	});
}
export { u as n, f as t };
