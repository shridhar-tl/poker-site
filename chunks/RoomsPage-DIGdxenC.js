import { o as e } from "./scores-BUpnRFKN.js";
import { d as t, t as n } from "./constants-BkFPV1oy.js";
import { n as r, t as i } from "./WaitingForApproval-DYcKWuXa.js";
import { a, o } from "./theme-BRWg1AQm.js";
import { t as s } from "./errors-GZBLOECl.js";
import { useCallback as c, useEffect as l, useMemo as u, useState as d } from "react";
import { Button as f, Modal as p, TextInput as m } from "fluxo-ui";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
// src/modules/rooms/RoomsPage.tsx
var v = [
	{
		key: "invited",
		title: "Invited to you",
		empty: "No invitations right now."
	},
	{
		key: "mine",
		title: "Your rooms",
		empty: "You are not in any room yet."
	},
	{
		key: "open",
		title: "Open rooms",
		empty: "No open rooms. Create one and list it for others to find."
	}
];
function y(e, t) {
	return t.length === 0 || e.roomName.toLowerCase().includes(t) || e.hostName.toLowerCase().includes(t);
}
function b() {
	let e = a(), { directory: h, room: b, message: S } = o(), { identity: C } = r(), [w, T] = d(null), [E, D] = d(""), [O, k] = d(""), [A, j] = d(!1), [M, N] = d(null), [P, F] = d(null), I = c(async () => {
		if (h !== null) {
			j(!0);
			try {
				T(await h.list()), k("");
			} catch (e) {
				console.error("Could not load the room directory", e), k(s(e, "Could not load rooms. Please try again."));
			} finally {
				j(!1);
			}
		}
	}, [h]);
	l(() => {
		I();
		let e = setInterval(() => {
			document.visibilityState === "visible" && I();
		}, n), t = () => {
			document.visibilityState === "visible" && I();
		};
		return document.addEventListener("visibilitychange", t), () => {
			clearInterval(e), document.removeEventListener("visibilitychange", t);
		};
	}, [I]);
	let L = E.trim().toLowerCase(), R = w === null && O !== "", z = u(() => {
		let e = {
			invited: [],
			mine: [],
			open: []
		};
		if (w !== null) for (let t of v) e[t.key] = w[t.key].filter((e) => y(e, L));
		return e;
	}, [w, L]), B = c(async (t) => {
		if (C === null) S.error("Your identity is not available yet. Please try again.");
		else {
			N(t.roomId);
			try {
				let n = await b.joinRoom({
					roomId: t.roomId,
					name: C.name,
					avatarUrl: C.avatarUrl
				});
				if ("status" in n && n.status === "pending") {
					F({
						request: n,
						name: C.name,
						avatarId: null,
						avatarUrl: C.avatarUrl
					}), await I();
					return;
				}
				e.toRoom(n.roomId);
			} catch (e) {
				console.error("Could not join the room", e), S.error(s(e, "Could not join the room."));
			} finally {
				N(null);
			}
		}
	}, [
		C,
		b,
		S,
		e,
		I
	]), V = c(async (e) => {
		if (e.requestId) {
			N(e.roomId);
			try {
				await b.cancelJoinRequest({
					roomId: e.roomId,
					requestId: e.requestId
				}), await I();
			} catch (e) {
				console.error("Could not cancel the join request", e), S.error(s(e, "Could not cancel the request."));
			} finally {
				N(null);
			}
		}
	}, [
		b,
		S,
		I
	]), H = c(() => {
		F(null), I();
	}, [I]);
	return /* @__PURE__ */ _("div", {
		className: "pk-rooms",
		children: [
			/* @__PURE__ */ _("header", {
				className: "pk-rooms__bar",
				children: [/* @__PURE__ */ _("div", {
					className: "pk-rooms__heading",
					children: [/* @__PURE__ */ g("h1", {
						className: "pk-rooms__title",
						children: "Rooms"
					}), /* @__PURE__ */ g("p", {
						className: "pk-rooms__lede",
						children: "Find a room to join, or pick up where you left off."
					})]
				}), /* @__PURE__ */ _("div", {
					className: "pk-rooms__actions",
					children: [
						/* @__PURE__ */ g(f, {
							variant: "secondary",
							layout: "outlined",
							size: "sm",
							onClick: () => void I(),
							isLoading: A,
							label: "Refresh"
						}),
						/* @__PURE__ */ g(f, {
							variant: "primary",
							size: "sm",
							onClick: e.toCreate,
							label: "Create or join"
						}),
						/* @__PURE__ */ g(t, {})
					]
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "pk-rooms__search",
				children: /* @__PURE__ */ g(m, {
					value: E,
					onChange: (e) => D(String(e.value)),
					placeholder: "Search by room or host name",
					maxLength: 60
				})
			}),
			O && /* @__PURE__ */ g("p", {
				className: "pk-form__error",
				role: "alert",
				children: O
			}),
			!R && /* @__PURE__ */ g("main", {
				className: "pk-rooms__main",
				children: v.map((e) => /* @__PURE__ */ _("section", {
					className: "pk-rooms__group",
					children: [/* @__PURE__ */ _("h2", {
						className: "pk-rooms__groupTitle",
						children: [e.title, /* @__PURE__ */ g("span", {
							className: "pk-panel__count",
							children: z[e.key].length
						})]
					}), z[e.key].length === 0 ? /* @__PURE__ */ g("p", {
						className: "pk-panel__empty",
						children: w === null ? "Loading…" : e.empty
					}) : /* @__PURE__ */ g("ul", {
						className: "pk-rooms__list",
						children: z[e.key].map((t) => /* @__PURE__ */ g(x, {
							room: t,
							group: e.key,
							isBusy: M === t.roomId,
							onEnter: B,
							onCancel: V
						}, t.roomId))
					})]
				}, e.key))
			}),
			/* @__PURE__ */ g(p, {
				isOpen: P !== null,
				onClose: H,
				title: "Join request",
				size: "sm",
				children: P !== null && /* @__PURE__ */ g(i, {
					pending: P,
					onApproved: e.toRoom,
					onDismissed: H
				})
			})
		]
	});
}
function x({ room: t, group: n, isBusy: r, onEnter: i, onCancel: a }) {
	let o = t.requestStatus === "pending", s = t.requestStatus === "rejected", c = "Join";
	return n === "mine" || t.isMember ? c = "Open" : t.requireApproval && n !== "invited" && (c = s ? "Request again" : "Request to join"), /* @__PURE__ */ _("li", {
		className: "pk-roomRow",
		children: [/* @__PURE__ */ _("div", {
			className: "pk-roomRow__info",
			children: [
				/* @__PURE__ */ g("p", {
					className: "pk-roomRow__name",
					title: t.roomName,
					children: t.roomName
				}),
				/* @__PURE__ */ _("p", {
					className: "pk-roomRow__meta",
					children: [
						t.hostName ? `Hosted by ${t.hostName} · ` : "",
						e[t.scoreType],
						" · ",
						t.memberCount,
						" ",
						t.memberCount === 1 ? "player" : "players"
					]
				}),
				s && /* @__PURE__ */ g("p", {
					className: "pk-roomRow__note",
					children: "Your last request was declined."
				})
			]
		}), /* @__PURE__ */ _("div", {
			className: "pk-roomRow__actions",
			children: [
				t.isHost && !!t.pendingRequests && /* @__PURE__ */ _("span", {
					className: "pk-roomRow__badge",
					children: [t.pendingRequests, " waiting"]
				}),
				t.requireApproval && /* @__PURE__ */ g("span", {
					className: "pk-roomRow__tag",
					children: "Approval"
				}),
				o && !t.isMember ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("span", {
					className: "pk-roomRow__tag is-pending",
					children: "Requested"
				}), /* @__PURE__ */ g(f, {
					variant: "secondary",
					layout: "outlined",
					size: "sm",
					onClick: () => void a(t),
					isLoading: r,
					label: "Cancel"
				})] }) : /* @__PURE__ */ g(f, {
					variant: "primary",
					size: "sm",
					onClick: () => void i(t),
					isLoading: r,
					label: c
				})
			]
		})]
	});
}
export { b as default };
