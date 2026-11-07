import { d as e } from "./constants-BkFPV1oy.js";
import { a as t, o as n } from "./theme-BRWg1AQm.js";
import { c as r, o as i, s as a } from "./scores-BUpnRFKN.js";
import { n as o, r as s, t as c } from "./LabeledField-DyAMkIEx.js";
import { n as l, t as u } from "./WaitingForApproval-DYcKWuXa.js";
import { t as d } from "./errors-GZBLOECl.js";
import { useCallback as f, useEffect as p, useRef as m, useState as h } from "react";
import { useParams as g } from "react-router";
import { Button as _, InputSwitch as v, TextInput as y } from "fluxo-ui";
import { jsx as b, jsxs as x } from "react/jsx-runtime";
// src/modules/landing/CreateRoomForm.tsx
var S = {
	1: "🌀",
	2: "⚡",
	3: "👕"
};
function C(e) {
	return r[e].join("  ·  ");
}
function w({ onCreated: e }) {
	let { room: t, host: r, userPicker: u } = n(), { identity: m, requiresEmail: g, allowsAvatarPicker: w } = l(), [T, E] = h(""), [D, O] = h(""), [k, A] = h(""), [j, M] = h(1), [N, P] = h(null), [F, I] = h(r.defaults.requireApproval), [L, R] = h(r.defaults.listed), [z, B] = h([]), [V, H] = h({}), [U, W] = h(""), [G, K] = h(!1), q = r.capabilities.invitations && u !== null;
	p(() => {
		m !== null && (O((e) => e || m.name), A((e) => e || m.email || ""));
	}, [m]);
	let J = f(() => {
		let e = {};
		return T.trim().length < 3 && (e.roomName = "Use at least 3 characters."), D.trim().length < 2 && (e.name = "Use at least 2 characters."), g && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(k.trim()) && (e.email = "Enter a valid email address."), H(e), Object.keys(e).length === 0;
	}, [
		T,
		D,
		k,
		g
	]), Y = f(async () => {
		if (J()) {
			K(!0), W("");
			try {
				e((await t.createRoom({
					roomName: T.trim(),
					name: D.trim(),
					email: g ? k.trim() : void 0,
					scoreType: j,
					avatarId: w ? N : null,
					avatarUrl: m?.avatarUrl,
					requireApproval: F,
					listed: r.capabilities.listing ? L : !1,
					invitees: q ? z : void 0
				})).roomId);
			} catch (e) {
				console.error("Could not create the room", e), W(d(e, "Could not create the room. Please try again.")), K(!1);
			}
		}
	}, [
		J,
		t,
		T,
		D,
		k,
		g,
		j,
		w,
		N,
		m,
		F,
		r,
		L,
		q,
		z,
		e
	]);
	return /* @__PURE__ */ x("form", {
		className: "pk-form",
		onSubmit: (e) => {
			e.preventDefault(), Y();
		},
		children: [
			/* @__PURE__ */ b(c, {
				label: "Room name",
				required: !0,
				error: V.roomName,
				children: /* @__PURE__ */ b(y, {
					value: T,
					onChange: (e) => E(String(e.value)),
					invalid: !!V.roomName,
					placeholder: "Sprint 42 planning",
					maxLength: 40,
					required: !0,
					autoFocus: !0
				})
			}),
			/* @__PURE__ */ x("div", {
				className: "pk-form__row",
				children: [/* @__PURE__ */ b(c, {
					label: "Your name",
					required: !0,
					error: V.name,
					children: /* @__PURE__ */ b(y, {
						value: D,
						onChange: (e) => O(String(e.value)),
						invalid: !!V.name,
						placeholder: "Alex Morgan",
						maxLength: 25,
						required: !0
					})
				}), g && /* @__PURE__ */ b(c, {
					label: "Your email",
					required: !0,
					error: V.email,
					hint: "Used to recognise you if you rejoin.",
					children: /* @__PURE__ */ b(y, {
						value: k,
						onChange: (e) => A(String(e.value)),
						invalid: !!V.email,
						placeholder: "alex@company.com",
						maxLength: 254,
						autoComplete: "email",
						required: !0
					})
				})]
			}),
			/* @__PURE__ */ x("fieldset", {
				className: "pk-form__fieldset",
				children: [
					/* @__PURE__ */ b("legend", {
						className: "pk-form__legend",
						children: "Estimation deck"
					}),
					/* @__PURE__ */ b("div", {
						className: "pk-deckPicker",
						children: a.map((e) => /* @__PURE__ */ x("button", {
							type: "button",
							className: `pk-deckPicker__option ${j === e ? "is-selected" : ""}`,
							onClick: () => M(e),
							"aria-pressed": j === e,
							children: [/* @__PURE__ */ b("span", {
								className: "pk-deckPicker__icon",
								"aria-hidden": !0,
								children: S[e]
							}), /* @__PURE__ */ b("span", {
								className: "pk-deckPicker__name",
								children: i[e]
							})]
						}, e))
					}),
					/* @__PURE__ */ b("p", {
						className: "pk-deckPicker__preview",
						children: C(j)
					})
				]
			}),
			/* @__PURE__ */ x("fieldset", {
				className: "pk-form__fieldset",
				children: [
					/* @__PURE__ */ b("legend", {
						className: "pk-form__legend",
						children: "Access"
					}),
					/* @__PURE__ */ x("div", {
						className: "pk-form__toggle",
						children: [/* @__PURE__ */ x("div", {
							className: "pk-form__toggleText",
							children: [/* @__PURE__ */ b("p", {
								className: "pk-form__toggleTitle",
								children: "Require host approval"
							}), /* @__PURE__ */ b("p", {
								className: "pk-form__toggleHint",
								children: "Nobody joins until you approve them, even with the link."
							})]
						}), /* @__PURE__ */ b(v, {
							checked: F,
							onChange: (e) => I(e.value),
							ariaLabel: "Require host approval",
							onLabel: "On",
							offLabel: "Off"
						})]
					}),
					r.capabilities.listing && /* @__PURE__ */ x("div", {
						className: "pk-form__toggle",
						children: [/* @__PURE__ */ x("div", {
							className: "pk-form__toggleText",
							children: [/* @__PURE__ */ b("p", {
								className: "pk-form__toggleTitle",
								children: "List this room in the directory"
							}), /* @__PURE__ */ b("p", {
								className: "pk-form__toggleHint",
								children: "Anyone on this site can find the room and join or request to join."
							})]
						}), /* @__PURE__ */ b(v, {
							checked: L,
							onChange: (e) => R(e.value),
							ariaLabel: "List this room in the directory",
							onLabel: "On",
							offLabel: "Off"
						})]
					})
				]
			}),
			q && /* @__PURE__ */ x("fieldset", {
				className: "pk-form__fieldset",
				children: [
					/* @__PURE__ */ b("legend", {
						className: "pk-form__legend",
						children: "Invite people"
					}),
					/* @__PURE__ */ b(o, {
						selected: z,
						onChange: B
					}),
					/* @__PURE__ */ b("p", {
						className: "pk-form__hint",
						children: "Invited people join directly, without approval."
					})
				]
			}),
			w && /* @__PURE__ */ b(s, {
				label: "Pick an avatar",
				value: N,
				onChange: P,
				profileImageUrl: m?.avatarUrl,
				offersRandom: !m?.avatarUrl
			}),
			U && /* @__PURE__ */ b("p", {
				className: "pk-form__error",
				role: "alert",
				children: U
			}),
			/* @__PURE__ */ b(_, {
				type: "submit",
				variant: "primary",
				size: "lg",
				fullWidth: !0,
				isLoading: G,
				loadingMessage: "Creating room...",
				label: "Create room"
			})
		]
	});
}
// src/modules/landing/JoinRoomForm.tsx
function T({ roomId: e, onJoined: t, onPending: r }) {
	let { room: i, session: a } = n(), { ready: o, identity: u, requiresEmail: g, allowsAvatarPicker: v } = l(), [S, C] = h(e ?? ""), [w, T] = h(""), [E, D] = h(""), [O, k] = h(null), [A, j] = h({}), [M, N] = h(""), [P, F] = h(!1), I = m(!1);
	p(() => {
		e && C(e);
	}, [e]), p(() => {
		let e = a.getSession();
		e !== null && T((t) => t || e.name);
	}, [a]), p(() => {
		u !== null && (T((e) => e || u.name), D((e) => e || u.email || ""));
	}, [u]);
	let L = f(async (e) => {
		F(!0), N("");
		try {
			let n = await i.joinRoom({
				roomId: e.roomId,
				name: e.name,
				email: e.email,
				avatarId: e.avatarId,
				avatarUrl: u?.avatarUrl
			});
			if ("status" in n && n.status === "pending") {
				r({
					request: n,
					name: e.name,
					email: e.email,
					avatarId: e.avatarId,
					avatarUrl: u?.avatarUrl
				});
				return;
			}
			t(n.roomId);
		} catch (e) {
			console.error("Could not join the room", e), N(d(e, "Could not join the room. Check the code and try again.")), F(!1);
		}
	}, [
		i,
		u,
		t,
		r
	]);
	p(() => {
		!o || I.current || !e || u === null || g && !u.email || (I.current = !0, L({
			roomId: e,
			name: u.name,
			email: g ? u.email : void 0,
			avatarId: null
		}));
	}, [
		o,
		u,
		g,
		e,
		L
	]);
	let R = f(() => {
		let e = {}, t = S.trim().toLowerCase();
		return t.length < 4 ? e.roomId = "Enter the room code you were given." : /^[a-z0-9]+$/.test(t) || (e.roomId = "Room codes contain only letters and numbers."), w.trim().length < 2 && (e.name = "Use at least 2 characters."), g && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(E.trim()) && (e.email = "Enter a valid email address."), j(e), Object.keys(e).length === 0;
	}, [
		S,
		w,
		E,
		g
	]), z = f(() => {
		R() && L({
			roomId: S.trim().toLowerCase(),
			name: w.trim(),
			email: g ? E.trim() : void 0,
			avatarId: v ? O : null
		});
	}, [
		R,
		L,
		S,
		w,
		E,
		g,
		v,
		O
	]);
	return /* @__PURE__ */ x("form", {
		className: "pk-form",
		onSubmit: (e) => {
			e.preventDefault(), z();
		},
		children: [
			!e && /* @__PURE__ */ b(c, {
				label: "Room code",
				required: !0,
				error: A.roomId,
				children: /* @__PURE__ */ b(y, {
					value: S,
					onChange: (e) => C(String(e.value)),
					invalid: !!A.roomId,
					placeholder: "e.g. k4m2xq7d",
					maxLength: 15,
					required: !0,
					autoFocus: !0
				})
			}),
			/* @__PURE__ */ x("div", {
				className: "pk-form__row",
				children: [/* @__PURE__ */ b(c, {
					label: "Your name",
					required: !0,
					error: A.name,
					children: /* @__PURE__ */ b(y, {
						value: w,
						onChange: (e) => T(String(e.value)),
						invalid: !!A.name,
						placeholder: "Alex Morgan",
						maxLength: 25,
						required: !0,
						autoFocus: !!e
					})
				}), g && /* @__PURE__ */ b(c, {
					label: "Your email",
					required: !0,
					error: A.email,
					hint: "Used to recognise you if you rejoin.",
					children: /* @__PURE__ */ b(y, {
						value: E,
						onChange: (e) => D(String(e.value)),
						invalid: !!A.email,
						placeholder: "alex@company.com",
						maxLength: 254,
						autoComplete: "email",
						required: !0
					})
				})]
			}),
			v && /* @__PURE__ */ b(s, {
				label: "Pick an avatar",
				value: O,
				onChange: k,
				profileImageUrl: u?.avatarUrl,
				offersRandom: !u?.avatarUrl
			}),
			M && /* @__PURE__ */ b("p", {
				className: "pk-form__error",
				role: "alert",
				children: M
			}),
			/* @__PURE__ */ b(_, {
				type: "submit",
				variant: "primary",
				size: "lg",
				fullWidth: !0,
				isLoading: P,
				loadingMessage: "Joining room...",
				label: "Join room"
			})
		]
	});
}
// src/modules/landing/LandingPage.tsx
var E = [
	{
		icon: "⚡",
		title: "Real-time",
		text: "Votes and presence sync instantly across every device in the room."
	},
	{
		icon: "🃏",
		title: "Three decks",
		text: "Fibonacci, short Fibonacci, or T-shirt sizes — pick what your team uses."
	},
	{
		icon: "🔗",
		title: "Share a link",
		text: "No accounts to create. Send the room link and start estimating."
	},
	{
		icon: "🧩",
		title: "Jira ready",
		text: "Pull ticket summaries straight from Jira Assistant while you estimate."
	}
];
function D() {
	let { roomId: r } = g(), i = t(), { room: a, host: o } = n(), [s, c] = h(null), [l, d] = h(r ? "join" : "create"), [f, m] = h(null);
	p(() => {
		if (!r) return;
		d("join");
		let e = !1;
		return a.getRoomSummary(r).then((t) => {
			e || m(t.roomName);
		}).catch((e) => {
			console.error("Could not load the room summary", e);
		}), () => {
			e = !0;
		};
	}, [r, a]);
	let v = (e) => {
		i.toRoom(e);
	};
	return /* @__PURE__ */ x("div", {
		className: "pk-landing",
		children: [
			/* @__PURE__ */ x("header", {
				className: "pk-landing__bar",
				children: [/* @__PURE__ */ x("div", {
					className: "pk-landing__brand",
					children: [/* @__PURE__ */ b("span", {
						className: "pk-landing__mark",
						"aria-hidden": !0,
						children: "♠"
					}), /* @__PURE__ */ b("span", {
						className: "pk-landing__brandName",
						children: "Planning Poker"
					})]
				}), /* @__PURE__ */ x("div", {
					className: "pk-landing__barActions",
					children: [o.capabilities.directory && /* @__PURE__ */ b(_, {
						variant: "secondary",
						layout: "outlined",
						size: "sm",
						onClick: i.toRooms,
						label: "Back to rooms"
					}), /* @__PURE__ */ b(e, {})]
				})]
			}),
			/* @__PURE__ */ x("main", {
				className: "pk-landing__main",
				children: [/* @__PURE__ */ x("section", {
					className: "pk-landing__intro",
					children: [
						/* @__PURE__ */ x("h1", {
							className: "pk-landing__title",
							children: [
								"Estimate together,",
								/* @__PURE__ */ b("br", {}),
								"decide faster."
							]
						}),
						/* @__PURE__ */ b("p", {
							className: "pk-landing__lede",
							children: "A focused planning poker room for your team. Create a room, share the link, and get a shared estimate in minutes — no sign-up required."
						}),
						/* @__PURE__ */ b("ul", {
							className: "pk-landing__features",
							children: E.map((e) => /* @__PURE__ */ x("li", {
								className: "pk-landing__feature",
								children: [/* @__PURE__ */ b("span", {
									className: "pk-landing__featureIcon",
									"aria-hidden": !0,
									children: e.icon
								}), /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("p", {
									className: "pk-landing__featureTitle",
									children: e.title
								}), /* @__PURE__ */ b("p", {
									className: "pk-landing__featureText",
									children: e.text
								})] })]
							}, e.title))
						})
					]
				}), /* @__PURE__ */ x("section", {
					className: "pk-landing__panel",
					children: [s === null ? r ? /* @__PURE__ */ x("div", {
						className: "pk-landing__invite",
						children: [/* @__PURE__ */ b("p", {
							className: "pk-landing__inviteLabel",
							children: "You have been invited to"
						}), /* @__PURE__ */ b("p", {
							className: "pk-landing__inviteRoom",
							children: f ?? r
						})]
					}) : /* @__PURE__ */ x("div", {
						className: "pk-landing__tabs",
						role: "tablist",
						"aria-label": "Create or join a room",
						children: [/* @__PURE__ */ b("button", {
							type: "button",
							role: "tab",
							"aria-selected": l === "create",
							className: `pk-landing__tab ${l === "create" ? "is-active" : ""}`,
							onClick: () => d("create"),
							children: "Create a room"
						}), /* @__PURE__ */ b("button", {
							type: "button",
							role: "tab",
							"aria-selected": l === "join",
							className: `pk-landing__tab ${l === "join" ? "is-active" : ""}`,
							onClick: () => d("join"),
							children: "Join a room"
						})]
					}) : null, /* @__PURE__ */ b("div", {
						className: "pk-landing__form",
						children: s === null ? l === "create" && !r ? /* @__PURE__ */ b(w, { onCreated: v }) : /* @__PURE__ */ b(T, {
							roomId: r,
							onJoined: v,
							onPending: c
						}) : /* @__PURE__ */ b(u, {
							pending: s,
							onApproved: v,
							onDismissed: () => c(null)
						})
					})]
				})]
			}),
			/* @__PURE__ */ b("footer", {
				className: "pk-landing__footer",
				children: /* @__PURE__ */ b("p", { children: "Room data — names, issue keys, and estimates — is kept only while the room is active and is removed automatically once it expires." })
			})
		]
	});
}
export { D as default };
