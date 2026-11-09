import { t as e } from "./AppLoader-D9yvNwlE.js";
import { a as t, o as n } from "./theme-BRWg1AQm.js";
import { a as r, n as i, o as a, u as o } from "./scores-BUpnRFKN.js";
import { i as s, n as c, o as l, r as u, t as d } from "./estimates-Dobh8bG9.js";
import { c as f, d as p, l as m, n as h, r as ee, u as g } from "./constants-BkFPV1oy.js";
import { n as _, r as v, t as y } from "./LabeledField-DyAMkIEx.js";
import { i as b, t as x } from "./avatars-r3RGoSWH.js";
import { useCallback as S, useEffect as C, useMemo as w, useRef as T, useState as E } from "react";
import { useParams as D } from "react-router";
import { Autocomplete as O, Button as k, Checkbox as A, Drawer as j, Dropdown as M, Modal as te, SelectButton as ne, TextInput as N } from "fluxo-ui";
import { Fragment as P, jsx as F, jsxs as I } from "react/jsx-runtime";
import L from "classnames";
import { create as R, createHook as re } from "fluxo-ui/store";
// src/store/poker-store.ts
var ie = {
	roomId: "",
	sid: "",
	role: "player",
	room: null,
	members: [],
	membersMap: {},
	issuesMap: {},
	votesMap: {},
	onlineIds: [],
	offlineSince: {},
	serverOffsetMs: 0,
	joinRequests: [],
	invitations: [],
	lastRevision: 0,
	viewingIssueId: null,
	connectionStatus: "idle",
	reconnect: null,
	isLoaded: !1,
	showIssuePanel: !1,
	showJoinRequests: !1,
	showInvitePanel: !1,
	bulkJoinAction: null,
	bulkDisableApproval: !1,
	closedReason: null,
	pendingActions: {},
	pendingIssues: [],
	estimateTarget: null
}, z = R(() => ({ ...ie })), B = re(z);
function V(e) {
	z.setState(e);
}
function ae() {
	z.setState({ ...ie });
}
function H(e, t) {
	z.setState(e, t);
}
function oe(e) {
	H((t) => ({ pendingActions: {
		...t.pendingActions,
		[e]: (t.pendingActions[e] ?? 0) + 1
	} }));
}
function se(e) {
	H((t) => {
		let n = (t.pendingActions[e] ?? 0) - 1, r = { ...t.pendingActions };
		return n > 0 ? r[e] = n : delete r[e], { pendingActions: r };
	});
}
function ce(e, t) {
	return (e.pendingActions[t] ?? 0) > 0;
}
function U(e) {
	return e.reduce((e, t) => (e[t.id] = t, e), {});
}
function le(e) {
	return e.reduce((e, t) => (e[t.issueId] = t, e), {});
}
function ue(e, t, n, r = 0) {
	let i = {};
	for (let a of e) if (!a.isOnline) {
		let e = a.lastSeenAt ? Date.parse(a.lastSeenAt) - r : NaN;
		i[a.id] = t[a.id] ?? (Number.isFinite(e) ? Math.min(e, n) : n);
	}
	return i;
}
function W(e) {
	return e.room !== null && e.room.moderatorId === e.sid;
}
// src/components/InlineSpinner.tsx
function G({ label: e, className: t }) {
	return /* @__PURE__ */ I("span", {
		className: L("pk-inlineSpinner", t),
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ F("span", {
			className: "pk-inlineSpinner__ring",
			"aria-hidden": !0
		}), e && /* @__PURE__ */ F("span", {
			className: "pk-inlineSpinner__label",
			children: e
		})]
	});
}
// src/modules/poker/pending.ts
var K = {
	vote: "vote",
	round: "round",
	settings: "settings",
	avatar: "avatar",
	invite: "invite",
	leave: "leave",
	host: "host",
	issue: (e) => `issue:${e}`,
	member: (e) => `member:${e}`,
	joinRequest: (e) => `joinRequest:${e}`,
	invitation: (e) => `invitation:${e}`,
	estimate: (e) => `estimate:${e}`
};
function q(e) {
	return B((t) => ce(t, e));
}
// src/modules/poker/usePokerActions.ts
var de = 0, J = /* @__PURE__ */ new Set(), fe = "Could not update the story points in Jira.";
function pe(e, t) {
	return e instanceof Error && e.message ? e.message : t;
}
function Y() {
	let { realtime: e, session: t, message: r, host: i, issues: a } = n(), o = S(async (t, n, r) => {
		r && oe(r);
		try {
			let r = await e.send(t, n);
			return !r && e.getStatus() === "connected" && e.requestResync(), r;
		} catch (n) {
			return console.error(`Could not send '${t}'`, n), e.getStatus() === "connected" && e.requestResync(), !1;
		} finally {
			r && se(r);
		}
	}, [e]), s = S(async (e, t, n) => {
		if (J.has(n)) return !1;
		J.add(n);
		try {
			return await o(e, t, n);
		} finally {
			J.delete(n);
		}
	}, [o]), c = S(async (e) => {
		let t = z.getState(), n = t.room?.currentIssueId;
		return !n || t.votesMap[n]?.reveal ? !1 : (H((t) => {
			let r = t.votesMap[n];
			return r?.reveal ? {} : { votesMap: {
				...t.votesMap,
				[n]: {
					...r,
					issueId: n,
					reveal: !1,
					values: {
						...r?.values,
						[t.sid]: e
					}
				}
			} };
		}), await o("submitVote", {
			issueId: n,
			vote: e
		}, K.vote));
	}, [o]), l = S(async () => {
		let { viewingIssueId: e } = z.getState();
		return e !== null && await s("startRound", { issueId: e }, K.round);
	}, [s]), u = S(async () => {
		let { viewingIssueId: e } = z.getState();
		return e !== null && await s("restartRound", { issueId: e }, K.round);
	}, [s]), d = S(async () => {
		let { room: e } = z.getState();
		return e?.currentIssueId != null && await s("revealVotes", { issueId: e.currentIssueId }, K.round);
	}, [s]), f = S(async (e) => {
		let { viewingIssueId: t } = z.getState();
		return t !== null && await s("setFinalScore", {
			issueId: t,
			finalScore: e
		}, K.round);
	}, [s]), p = S(async (e, t) => {
		let n = z.getState().issuesMap[e], i = K.estimate(e);
		if (!a || !n || J.has(i)) return !1;
		J.add(i), oe(i);
		try {
			try {
				await a.updateEstimate(n, t);
			} catch (e) {
				return console.error(`Could not update the estimate of ${n.key}`, e), r.error(pe(e, fe)), !1;
			}
			return H((n) => {
				let r = n.votesMap[e];
				return r ? { votesMap: {
					...n.votesMap,
					[e]: {
						...r,
						finalScore: t,
						syncedScore: t
					}
				} } : {};
			}), r.success(`${n.key} now has ${t} story points in Jira`), await o("setFinalScore", {
				issueId: e,
				finalScore: t,
				synced: !0
			});
		} finally {
			se(i), J.delete(i);
		}
	}, [
		a,
		r,
		o
	]), m = S(async (e) => {
		let t = e.key?.trim();
		if (!t) return !1;
		de += 1;
		let n = `pending-${de}`;
		H((r) => ({ pendingIssues: [...r.pendingIssues, {
			pendingId: n,
			key: t,
			summary: e.summary
		}] }));
		try {
			return await o("addIssue", { issue: {
				...e,
				key: t
			} });
		} finally {
			H((e) => ({ pendingIssues: e.pendingIssues.filter((e) => e.pendingId !== n) }));
		}
	}, [o]), h = S((e) => s("removeIssue", { issueId: e }, K.issue(e)), [s]), ee = S((e) => o("reorderIssues", { issueIds: e }), [o]), g = S((e) => {
		V({ viewingIssueId: e });
	}, []), _ = S((e) => (H((t) => t.room === null ? {} : { room: {
		...t.room,
		settings: {
			...t.room.settings,
			...e
		}
	} }), o("updateSettings", e, K.settings)), [o]), v = S((e) => (H((t) => t.room === null ? {} : { room: {
		...t.room,
		access: {
			...t.room.access,
			...e
		}
	} }), o("updateAccess", e, K.settings)), [o]), y = S((e) => o("renameRoom", { roomName: e }, K.settings), [o]), b = S((e) => (H((t) => {
		let n = t.members.map((n) => n.id === t.sid ? {
			...n,
			avatarId: e
		} : n);
		return {
			members: n,
			membersMap: U(n)
		};
	}), o("updateAvatar", { avatarId: e }, K.avatar)), [o]), x = S((e) => s("kickMember", { sid: e }, K.member(e)), [s]), C = S((e) => s("transferModerator", { sid: e }, K.member(e)), [s]), w = S(() => s("claimModerator", {}, K.host), [s]), T = S((e) => s("approveJoin", { requestId: e }, K.joinRequest(e)), [s]), E = S((e) => s("rejectJoin", { requestId: e }, K.joinRequest(e)), [s]), D = S((e) => (V({
		bulkJoinAction: "approveAllJoin",
		bulkDisableApproval: e
	}), o("approveAllJoin", { disableApproval: e })), [o]), O = S(() => (V({
		bulkJoinAction: "rejectAllJoin",
		bulkDisableApproval: !1
	}), o("rejectAllJoin", {})), [o]), k = S((e) => s("inviteMembers", { users: e }, K.invite), [s]), A = S((e) => s("revokeInvite", { userId: e }, K.invitation(e)), [s]), j = S(() => {
		t.clear(), i.onRoomLeft?.();
	}, [t, i]), M = S(async (e) => {
		let t = await s("leaveRoom", e ? { successorSid: e } : {}, K.leave);
		return t && j(), t;
	}, [s, j]), te = S(async () => {
		let e = await s("closeRoom", {}, K.leave);
		return e && j(), e;
	}, [s, j]), ne = S(() => V({ showIssuePanel: !0 }), []), N = S(() => V({ showIssuePanel: !1 }), []), P = S(() => V({ showJoinRequests: !0 }), []), F = S(() => V({ showJoinRequests: !1 }), []), I = S(() => V({ showInvitePanel: !0 }), []), L = S(() => V({ showInvitePanel: !1 }), []), R = S(async (e, t, n) => {
		try {
			await navigator.clipboard.writeText(e), r.success(t);
		} catch (e) {
			console.error(n, e), r.error(n);
		}
	}, [r]);
	return {
		submitVote: c,
		startRound: l,
		restartRound: u,
		revealVotes: d,
		setFinalScore: f,
		saveEstimate: p,
		addIssue: m,
		removeIssue: h,
		reorderIssues: ee,
		selectIssue: g,
		updateSettings: _,
		updateAccess: v,
		renameRoom: y,
		setAvatar: b,
		kickMember: x,
		transferModerator: C,
		claimModerator: w,
		approveJoin: T,
		rejectJoin: E,
		approveAllJoin: D,
		rejectAllJoin: O,
		inviteMembers: k,
		revokeInvite: A,
		leaveRoom: M,
		closeRoom: te,
		showIssuePanel: ne,
		hideIssuePanel: N,
		showJoinRequests: P,
		hideJoinRequests: F,
		showInvitePanel: I,
		hideInvitePanel: L,
		copyInviteLink: S(async () => {
			let { roomId: e } = z.getState();
			e && await R(i.shareUrl(e), "Invite link copied", "Could not copy the invite link.");
		}, [R, i]),
		copyRoomCode: S(async () => {
			let { roomId: e } = z.getState();
			e && await R(e, "Room code copied", "Could not copy the room code.");
		}, [R]),
		resync: S(() => e.requestResync(), [e])
	};
}
// src/modules/poker/CardDeck.tsx
function me() {
	let e = B((e) => e.room), t = B((e) => e.sid), n = B((e) => e.viewingIssueId), r = B((e) => e.viewingIssueId ? e.votesMap[e.viewingIssueId] : void 0), { submitVote: i } = Y(), a = q(K.vote), s = !!n && n === e?.currentIssueId, c = !!r?.reveal, l = s && !c, u = r?.values?.[t], d = w(() => e === null ? [] : [
		...o(e.scoreType, e.settings.maxPoints, e.settings.showHalfScore).map((e) => ({
			value: e,
			label: String(e)
		})),
		{
			value: "?",
			label: "?",
			hint: "Not sure"
		},
		{
			value: "~",
			label: "☕",
			hint: "Need a break"
		}
	], [e]);
	return e === null || d.length === 0 ? null : /* @__PURE__ */ I("div", {
		className: `pk-deck ${l ? "" : "is-disabled"}`,
		children: [/* @__PURE__ */ I("div", {
			className: "pk-deck__bar",
			children: [
				/* @__PURE__ */ F("p", {
					className: "pk-deck__hint",
					children: n ? c ? "Round revealed — waiting for the next round" : s ? u === void 0 ? "Pick your estimate" : "Tap another card to change your estimate" : "Waiting for the moderator to start the round" : "Select an issue to see the deck"
				}),
				a && /* @__PURE__ */ F(G, { label: "Saving your estimate" }),
				!a && u !== void 0 && l && /* @__PURE__ */ I("span", {
					className: "pk-deck__myVote",
					children: ["Your estimate: ", /* @__PURE__ */ F("strong", { children: u === "~" ? "☕" : String(u) })]
				})
			]
		}), /* @__PURE__ */ F("div", {
			className: "pk-deck__cards pk-scroll",
			role: "group",
			"aria-label": "Estimation cards",
			children: d.map((e) => /* @__PURE__ */ I("button", {
				type: "button",
				className: `pk-card ${u === e.value ? "is-selected" : ""}`,
				onClick: () => void i(e.value),
				disabled: !l,
				title: e.hint ? `${e.hint} (${e.label})` : e.label,
				"aria-pressed": u === e.value,
				children: [
					/* @__PURE__ */ F("span", {
						className: "pk-card__corner",
						children: e.label
					}),
					/* @__PURE__ */ F("span", {
						className: "pk-card__value",
						children: e.label
					}),
					/* @__PURE__ */ F("span", {
						className: "pk-card__corner is-bottom",
						children: e.label
					})
				]
			}, String(e.value)))
		})]
	});
}
// src/modules/poker/ConsensusCelebration.tsx
var he = 4200, ge = 28, _e = [
	330,
	345,
	312,
	20,
	48
];
function ve() {
	return Array.from({ length: ge }, (e, t) => ({
		left: Math.random() * 100,
		delay: Math.random() * 1.2,
		duration: 2.6 + Math.random() * 1.6,
		size: 14 + Math.random() * 16,
		drift: (Math.random() - .5) * 160,
		spin: (Math.random() > .5 ? 1 : -1) * (180 + Math.random() * 360),
		hue: _e[t % _e.length]
	}));
}
function ye() {
	let e = B((e) => e.room?.currentIssueId ?? null), t = B((e) => e.room?.currentIssueId ? e.votesMap[e.room.currentIssueId] : void 0), [n, r] = E(null), i = T(null), a = !!t?.reveal, o = t?.reveal ? c(t.values) : void 0;
	C(() => {
		let t = i.current;
		i.current = {
			issueId: e,
			revealed: a
		}, t !== null && t.issueId === e && !t.revealed && a && o !== void 0 && r({
			id: Date.now(),
			score: o
		});
	}, [
		e,
		a,
		o
	]), C(() => {
		if (n === null) return;
		let e = setTimeout(() => r(null), he);
		return () => clearTimeout(e);
	}, [n]);
	let s = w(() => n ? ve() : [], [n]);
	return n === null ? null : /* @__PURE__ */ I("div", {
		className: "pk-celebration",
		"aria-live": "polite",
		children: [/* @__PURE__ */ F("div", {
			className: "pk-celebration__blossoms",
			"aria-hidden": !0,
			children: s.map((e, t) => /* @__PURE__ */ F("span", {
				className: "pk-celebration__blossom",
				style: {
					left: `${e.left}%`,
					width: `${e.size}px`,
					height: `${e.size}px`,
					animationDelay: `${e.delay}s`,
					animationDuration: `${e.duration}s`,
					"--pk-drift": `${e.drift}px`,
					"--pk-spin": `${e.spin}deg`,
					"--pk-hue": e.hue
				},
				children: /* @__PURE__ */ F(be, {})
			}, t))
		}), /* @__PURE__ */ I("div", {
			className: "pk-celebration__badge",
			role: "status",
			children: [
				/* @__PURE__ */ F("span", {
					className: "pk-celebration__glow",
					"aria-hidden": !0
				}),
				/* @__PURE__ */ F("span", {
					className: "pk-celebration__title",
					children: "Consensus!"
				}),
				/* @__PURE__ */ I("span", {
					className: "pk-celebration__text",
					children: ["Everyone picked ", /* @__PURE__ */ F("strong", { children: n.score })]
				})
			]
		})]
	}, n.id);
}
function be() {
	return /* @__PURE__ */ I("svg", {
		viewBox: "0 0 40 40",
		width: "100%",
		height: "100%",
		children: [[
			0,
			72,
			144,
			216,
			288
		].map((e) => /* @__PURE__ */ F("ellipse", {
			cx: "20",
			cy: "10",
			rx: "7",
			ry: "10",
			transform: `rotate(${e} 20 20)`,
			className: "pk-celebration__petal"
		}, e)), /* @__PURE__ */ F("circle", {
			cx: "20",
			cy: "20",
			r: "4.5",
			className: "pk-celebration__core"
		})]
	});
}
// src/modules/poker/ConnectionNotice.tsx
var xe = {
	offline: "You are offline. Check your internet connection.",
	unreachable: "Cannot reach the poker server. Check your network, VPN or firewall, or try again in a moment.",
	lost: "The connection to the room was lost."
}, Se = 1e3;
function Ce() {
	let e = B((e) => e.reconnect), { realtime: t } = n(), r = e?.nextAttemptAt ?? null, [i, a] = E(() => Date.now());
	if (C(() => {
		if (r === null) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), Se);
		return () => clearInterval(e);
	}, [r]), e === null) return null;
	let o = r === null ? 0 : Math.max(0, Math.ceil((r - i) / 1e3)), s = o > 0 ? `Retrying in ${o}s.` : "Reconnecting…";
	return /* @__PURE__ */ I("div", {
		className: "pk-connection",
		role: "alert",
		children: [/* @__PURE__ */ I("div", {
			className: "pk-connection__body",
			children: [/* @__PURE__ */ F("p", {
				className: "pk-connection__title",
				children: xe[e.reason]
			}), /* @__PURE__ */ I("p", {
				className: "pk-connection__detail",
				children: ["Votes and changes cannot be sent until the connection is back. ", s]
			})]
		}), t.reconnectNow && /* @__PURE__ */ F(k, {
			variant: "primary",
			size: "sm",
			onClick: () => t.reconnectNow?.(),
			disabled: o === 0,
			label: "Retry now"
		})]
	});
}
// src/modules/poker/HostAwayBanner.tsx
function we() {
	let e = B((e) => e.room?.moderatorId ?? ""), t = B((e) => e.sid), n = B((e) => e.offlineSince[e.room?.moderatorId ?? ""] ?? null), { claimModerator: r } = Y(), [i, a] = E(() => Date.now());
	C(() => {
		if (n === null) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), ee);
		return () => clearInterval(e);
	}, [n]);
	let o = n !== null && i - n >= 18e4;
	return !e || e === t || !o ? null : /* @__PURE__ */ I("div", {
		className: "pk-away",
		role: "status",
		children: [/* @__PURE__ */ F("p", {
			className: "pk-away__text",
			children: "The host is away. You can take over so the round can continue."
		}), /* @__PURE__ */ F(k, {
			variant: "primary",
			size: "sm",
			onClick: r,
			label: "Take over as host"
		})]
	});
}
// src/components/MemberAvatar.tsx
function X({ avatarId: e, avatarUrl: t, className: n }) {
	let [r, i] = E(null), a = !b(e) && t && r !== t ? t : null;
	return /* @__PURE__ */ F("span", {
		className: L("pk-memberAvatar", n),
		"aria-hidden": !0,
		children: a ? /* @__PURE__ */ F("img", {
			src: a,
			alt: "",
			loading: "lazy",
			referrerPolicy: "no-referrer",
			onError: () => i(a)
		}) : x(e)
	});
}
// src/modules/poker/InvitePanel.tsx
function Te() {
	let e = B((e) => e.showInvitePanel), t = B((e) => e.invitations), n = B(W), { hideInvitePanel: r, inviteMembers: i, revokeInvite: a } = Y(), [o, s] = E([]);
	if (C(() => {
		e || s([]);
	}, [e]), !n) return null;
	let c = t.map((e) => e.invitee.id);
	return /* @__PURE__ */ F(j, {
		open: e,
		onClose: r,
		position: "right",
		size: "420px",
		title: "Invite people",
		children: /* @__PURE__ */ I("div", {
			className: "pk-panel",
			children: [/* @__PURE__ */ I("section", {
				className: "pk-panel__section",
				children: [
					/* @__PURE__ */ F("h3", {
						className: "pk-panel__sectionTitle",
						children: "Add people"
					}),
					/* @__PURE__ */ F(_, {
						selected: o,
						onChange: s,
						excludeIds: c
					}),
					/* @__PURE__ */ F(k, {
						variant: "primary",
						size: "sm",
						disabled: o.length === 0,
						onClick: async () => {
							await i(o) && s([]);
						},
						label: o.length > 0 ? `Invite ${o.length}` : "Invite"
					}),
					/* @__PURE__ */ F("p", {
						className: "pk-form__hint",
						children: "Invited people join directly and see this room under Invited to you."
					})
				]
			}), /* @__PURE__ */ I("section", {
				className: "pk-panel__section",
				children: [/* @__PURE__ */ I("h3", {
					className: "pk-panel__sectionTitle",
					children: ["Invited", /* @__PURE__ */ F("span", {
						className: "pk-panel__count",
						children: t.length
					})]
				}), t.length === 0 ? /* @__PURE__ */ F("p", {
					className: "pk-panel__empty",
					children: "No pending invitations."
				}) : /* @__PURE__ */ F("ul", {
					className: "pk-requests__list",
					children: t.map((e) => /* @__PURE__ */ I("li", {
						className: "pk-requests__item",
						children: [
							/* @__PURE__ */ F(X, {
								avatarId: null,
								avatarUrl: e.invitee.avatarUrl,
								className: "pk-requests__avatar"
							}),
							/* @__PURE__ */ I("div", {
								className: "pk-requests__info",
								children: [/* @__PURE__ */ F("p", {
									className: "pk-requests__name",
									title: e.invitee.name,
									children: e.invitee.name
								}), e.invitee.email && /* @__PURE__ */ F("p", {
									className: "pk-requests__email",
									title: e.invitee.email,
									children: e.invitee.email
								})]
							}),
							/* @__PURE__ */ F("div", {
								className: "pk-requests__actions",
								children: /* @__PURE__ */ F(k, {
									variant: "danger",
									layout: "outlined",
									size: "sm",
									onClick: () => a(e.invitee.id),
									label: "Revoke"
								})
							})
						]
					}, e.invitee.id))
				})]
			})]
		})
	});
}
// src/modules/poker/IssuePicker.tsx
function Ee(e) {
	let t = e.value;
	return /* @__PURE__ */ I("span", {
		className: "pk-issueOption",
		children: [
			t.icon && /* @__PURE__ */ F("img", {
				src: t.icon,
				alt: "",
				className: "pk-issueOption__icon"
			}),
			/* @__PURE__ */ F("span", {
				className: "pk-issueOption__key",
				children: t.key
			}),
			t.summary && /* @__PURE__ */ F("span", {
				className: "pk-issueOption__summary",
				children: t.summary
			})
		]
	});
}
var De = [{
	value: "jira",
	label: "Search Jira"
}, {
	value: "custom",
	label: "Custom item"
}];
function Oe({ onPick: e }) {
	let { issues: t } = n(), [r, i] = E(null), [a, o] = E("jira");
	return C(() => {
		if (t === null) {
			i(!1);
			return;
		}
		let e = !1;
		return t.isAvailable().then((t) => {
			e || i(t);
		}).catch(() => {
			e || i(!1);
		}), () => {
			e = !0;
		};
	}, [t]), r === null ? /* @__PURE__ */ F(N, {
		value: "",
		placeholder: "Checking for an issue source…",
		disabled: !0
	}) : r ? /* @__PURE__ */ I("div", {
		className: "pk-issuePicker",
		children: [/* @__PURE__ */ F(ne, {
			items: De,
			value: a,
			onChange: (e) => o(e.value === "custom" ? "custom" : "jira"),
			variant: "segmented",
			fullWidth: !0,
			ariaLabel: "How to add an issue"
		}), F(a === "jira" ? ke : Ae, { onPick: e })]
	}) : /* @__PURE__ */ F(Ae, { onPick: e });
}
function ke({ onPick: e }) {
	let { issues: t } = n(), [r, i] = E(""), [a, o] = E([]), [s, c] = E(!1), l = S(async (e) => {
		if (t === null || e.trim().length < 2) o([]);
		else {
			c(!0);
			try {
				let n = await t.lookupIssues(e.trim());
				o(n.map((e) => ({
					label: e.summary ? `${e.key} — ${e.summary}` : e.key,
					value: e
				})));
			} catch (e) {
				console.error("Could not look up issues", e), o([]);
			} finally {
				c(!1);
			}
		}
	}, [t]), u = S((t) => {
		e(t), i(""), o([]);
	}, [e]);
	return /* @__PURE__ */ I("div", {
		className: "pk-issuePicker__mode",
		children: [/* @__PURE__ */ F(O, {
			items: a,
			value: r,
			onChange: (e) => i(String(e.value)),
			onFilter: l,
			onSelect: (e) => u(e.value),
			renderItem: Ee,
			loading: s,
			placeholder: "Type a key or words from the summary…",
			minLength: 2,
			debounceMs: 300,
			emptyMessage: "No matching issues. Use Custom item to add it by hand."
		}), /* @__PURE__ */ F("p", {
			className: "pk-issuePicker__hint",
			children: "Choosing an issue from the results adds it to the backlog straight away."
		})]
	});
}
function Ae({ onPick: e }) {
	let [t, n] = E(""), [r, i] = E(""), a = t.trim().length > 0, o = () => {
		a && (e({
			key: t.trim(),
			summary: r.trim() || void 0
		}), n(""), i(""));
	}, s = (e) => {
		e.key === "Enter" && (e.preventDefault(), o());
	};
	return /* @__PURE__ */ I("div", {
		className: "pk-issuePicker__mode",
		children: [
			/* @__PURE__ */ F(y, {
				label: "Title or key",
				required: !0,
				children: /* @__PURE__ */ F(N, {
					value: t,
					onChange: (e) => n(String(e.value)),
					onKeyDown: s,
					placeholder: "PROJ-123 or a short title",
					maxLength: 64
				})
			}),
			/* @__PURE__ */ F(y, {
				label: "Description",
				children: /* @__PURE__ */ F(N, {
					value: r,
					onChange: (e) => i(String(e.value)),
					onKeyDown: s,
					placeholder: "Optional details shown to players",
					maxLength: 500
				})
			}),
			/* @__PURE__ */ F(k, {
				variant: "primary",
				size: "sm",
				onClick: o,
				disabled: !a,
				label: "Add to backlog"
			})
		]
	});
}
// src/modules/poker/IssuePanel.tsx
var je = s.map((e) => ({
	value: e,
	label: u[e]
}));
function Me() {
	let e = B((e) => e.showIssuePanel), t = B((e) => e.room), n = B((e) => e.viewingIssueId), r = B((e) => e.votesMap), i = B(W), a = B((e) => e.pendingIssues), { hideIssuePanel: o, addIssue: s } = Y(), c = t?.issues ?? [], l = c.length + a.length;
	return /* @__PURE__ */ F(j, {
		open: e,
		onClose: o,
		position: "right",
		size: "420px",
		title: i ? "Issues & settings" : "Issues",
		children: /* @__PURE__ */ I("div", {
			className: "pk-panel",
			children: [
				i && /* @__PURE__ */ I("section", {
					className: "pk-panel__section",
					children: [/* @__PURE__ */ F("h3", {
						className: "pk-panel__sectionTitle",
						children: "Add an issue"
					}), /* @__PURE__ */ F(Oe, { onPick: s })]
				}),
				/* @__PURE__ */ I("section", {
					className: "pk-panel__section",
					children: [/* @__PURE__ */ I("h3", {
						className: "pk-panel__sectionTitle",
						children: ["Backlog", /* @__PURE__ */ F("span", {
							className: "pk-panel__count",
							children: l
						})]
					}), l === 0 ? /* @__PURE__ */ F("p", {
						className: "pk-panel__empty",
						children: i ? "Add an issue to start estimating." : "The moderator has not added any issues yet."
					}) : /* @__PURE__ */ I("ul", {
						className: "pk-panel__list",
						children: [c.map((e) => /* @__PURE__ */ F(Pe, {
							issue: e,
							isSelected: n === e.id,
							isEstimating: t?.currentIssueId === e.id,
							finalScore: r[e.id]?.reveal ? r[e.id]?.finalScore : void 0,
							isSynced: r[e.id]?.syncedScore !== void 0,
							isModerator: i
						}, e.id)), a.map((e) => /* @__PURE__ */ F(Ne, { issue: e }, e.pendingId))]
					})]
				}),
				i && t !== null && /* @__PURE__ */ F(Fe, {})
			]
		})
	});
}
function Ne({ issue: e }) {
	return /* @__PURE__ */ F("li", { children: /* @__PURE__ */ I("div", {
		className: "pk-issueRow is-pending",
		"aria-busy": !0,
		children: [
			/* @__PURE__ */ F("div", {
				className: "pk-issueRow__icon",
				"aria-hidden": !0,
				children: /* @__PURE__ */ F("span", { children: "◇" })
			}),
			/* @__PURE__ */ I("div", {
				className: "pk-issueRow__body",
				children: [/* @__PURE__ */ F("div", {
					className: "pk-issueRow__keyLine",
					children: /* @__PURE__ */ F("span", {
						className: "pk-issueRow__key",
						children: e.key
					})
				}), e.summary && /* @__PURE__ */ F("p", {
					className: "pk-issueRow__summary",
					children: e.summary
				})]
			}),
			/* @__PURE__ */ F(G, { label: "Adding" })
		]
	}) });
}
function Pe({ issue: e, isSelected: t, isEstimating: n, finalScore: r, isSynced: i, isModerator: a }) {
	let { selectIssue: o, removeIssue: s } = Y(), c = q(K.issue(e.id));
	return /* @__PURE__ */ F("li", { children: /* @__PURE__ */ I("div", {
		className: L("pk-issueRow", {
			"is-selected": t,
			"is-pending": c
		}),
		onClick: () => !c && o(e.id),
		"aria-busy": c,
		onKeyDown: (t) => {
			c || t.key !== "Enter" && t.key !== " " || (t.preventDefault(), o(e.id));
		},
		role: "button",
		tabIndex: 0,
		title: e.summary,
		children: [
			/* @__PURE__ */ F("div", {
				className: "pk-issueRow__icon",
				"aria-hidden": !0,
				children: e.icon ? /* @__PURE__ */ F("img", {
					src: e.icon,
					alt: ""
				}) : /* @__PURE__ */ F("span", { children: "◇" })
			}),
			/* @__PURE__ */ I("div", {
				className: "pk-issueRow__body",
				children: [/* @__PURE__ */ I("div", {
					className: "pk-issueRow__keyLine",
					children: [
						/* @__PURE__ */ F("span", {
							className: "pk-issueRow__key",
							children: e.key
						}),
						n && /* @__PURE__ */ F("span", {
							className: "pk-issueRow__tag is-warning",
							children: "Voting"
						}),
						r !== void 0 && /* @__PURE__ */ F("span", {
							className: "pk-issueRow__tag is-success",
							title: i ? "Saved in Jira" : void 0,
							children: i ? `${String(r)} ✓` : String(r)
						})
					]
				}), e.summary && /* @__PURE__ */ F("p", {
					className: "pk-issueRow__summary",
					children: e.summary
				})]
			}),
			c ? /* @__PURE__ */ F(G, { label: "Removing" }) : /* @__PURE__ */ I("div", {
				className: "pk-issueRow__actions",
				children: [e.url && /* @__PURE__ */ F("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					onClick: (e) => e.stopPropagation(),
					className: "pk-issueRow__action",
					title: "Open in Jira",
					children: "↗"
				}), a && /* @__PURE__ */ F("button", {
					type: "button",
					className: "pk-issueRow__action is-danger",
					onClick: (t) => {
						t.stopPropagation(), s(e.id);
					},
					title: `Remove ${e.key}`,
					children: "✕"
				})]
			})
		]
	}) });
}
function Fe() {
	let e = B((e) => e.room), { updateSettings: t, updateAccess: i } = Y(), { host: o } = n(), s = q(K.settings), c = B((e) => e.estimateTarget);
	if (e === null) return null;
	let { settings: u, scoreType: d } = e, f = r(d);
	return /* @__PURE__ */ I("section", {
		className: "pk-panel__section",
		children: [/* @__PURE__ */ I("h3", {
			className: "pk-panel__sectionTitle",
			children: ["Round settings", s && /* @__PURE__ */ F(G, { label: "Saving" })]
		}), /* @__PURE__ */ I("div", {
			className: "pk-panel__settings",
			children: [
				/* @__PURE__ */ I("p", {
					className: "pk-panel__deck",
					children: ["Deck: ", /* @__PURE__ */ F("strong", { children: a[d] })]
				}),
				/* @__PURE__ */ F(A, {
					checked: e.access.requireApproval,
					onChange: (e) => i({ requireApproval: !!e.value }),
					label: "Require host approval before new players join"
				}),
				o.capabilities.listing && /* @__PURE__ */ F(A, {
					checked: e.access.listed,
					onChange: (e) => i({ listed: !!e.value }),
					label: "List this room in the directory"
				}),
				/* @__PURE__ */ F(A, {
					checked: u.autoReveal,
					onChange: (e) => t({ autoReveal: !!e.value }),
					label: "Reveal automatically once everyone has voted"
				}),
				/* @__PURE__ */ F(A, {
					checked: u.allowRevote,
					onChange: (e) => t({ allowRevote: !!e.value }),
					label: "Allow players to change their estimate before reveal"
				}),
				d !== 3 && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F(A, {
					checked: u.showHalfScore,
					onChange: (e) => t({ showHalfScore: !!e.value }),
					label: "Show the 0.5 card"
				}), /* @__PURE__ */ I("div", {
					className: "pk-panel__field",
					children: [/* @__PURE__ */ F("label", {
						className: "pk-panel__fieldLabel",
						htmlFor: "pk-maxPoints",
						children: "Highest card"
					}), /* @__PURE__ */ F(M, {
						id: "pk-maxPoints",
						value: u.maxPoints,
						onChange: (e) => t({ maxPoints: Number(e.value) }),
						options: f.map((e) => ({
							value: e,
							label: String(e)
						}))
					})]
				})] }),
				c !== null && l(d) && /* @__PURE__ */ I("div", {
					className: "pk-panel__field",
					children: [
						/* @__PURE__ */ F("label", {
							className: "pk-panel__fieldLabel",
							htmlFor: "pk-estimateSync",
							children: "Update story points in Jira"
						}),
						/* @__PURE__ */ F(M, {
							id: "pk-estimateSync",
							value: u.estimateSync,
							onChange: (e) => t({ estimateSync: e.value }),
							options: je,
							disabled: !c.ready
						}),
						/* @__PURE__ */ F("p", {
							className: "pk-panel__fieldHint",
							children: c.ready ? `Saved to the "${c.fieldName}" field. You can always change the value and update it by hand after the reveal.` : c.reason
						})
					]
				})
			]
		})]
	});
}
// src/modules/poker/JoinRequestsPanel.tsx
function Ie() {
	let e = B((e) => e.showJoinRequests), t = B((e) => e.joinRequests), n = B((e) => e.room?.access.requireApproval ?? !1), r = B(W), { hideJoinRequests: i, approveJoin: a, rejectJoin: o, approveAllJoin: s, rejectAllJoin: c } = Y(), [l, u] = E(!1);
	if (!r) return null;
	let d = t.length > 0;
	return /* @__PURE__ */ F(j, {
		open: e,
		onClose: i,
		position: "right",
		size: "420px",
		title: "Join requests",
		children: /* @__PURE__ */ F("div", {
			className: "pk-panel",
			children: /* @__PURE__ */ I("section", {
				className: "pk-panel__section",
				children: [
					/* @__PURE__ */ I("h3", {
						className: "pk-panel__sectionTitle",
						children: ["Waiting to join", /* @__PURE__ */ F("span", {
							className: "pk-panel__count",
							children: t.length
						})]
					}),
					/* @__PURE__ */ I("div", {
						className: "pk-requests__bulk",
						children: [/* @__PURE__ */ F(k, {
							variant: "primary",
							size: "sm",
							disabled: !d,
							onClick: () => s(l),
							label: d ? `Approve all (${t.length})` : "Approve all"
						}), /* @__PURE__ */ F(k, {
							variant: "danger",
							layout: "outlined",
							size: "sm",
							disabled: !d,
							onClick: c,
							label: "Reject all"
						})]
					}),
					n && /* @__PURE__ */ F(A, {
						checked: l,
						onChange: (e) => u(!!e.value),
						label: "Turn off approval for this room when I approve all"
					}),
					d ? /* @__PURE__ */ F("ul", {
						className: "pk-requests__list",
						children: t.map((e) => /* @__PURE__ */ I("li", {
							className: "pk-requests__item",
							children: [
								/* @__PURE__ */ F(X, {
									avatarId: e.avatarId,
									avatarUrl: e.avatarUrl,
									className: "pk-requests__avatar"
								}),
								/* @__PURE__ */ I("div", {
									className: "pk-requests__info",
									children: [/* @__PURE__ */ F("p", {
										className: "pk-requests__name",
										title: e.name,
										children: e.name
									}), /* @__PURE__ */ F("p", {
										className: "pk-requests__time",
										children: new Date(e.createdAt).toLocaleTimeString()
									})]
								}),
								/* @__PURE__ */ I("div", {
									className: "pk-requests__actions",
									children: [/* @__PURE__ */ F(k, {
										variant: "primary",
										size: "sm",
										onClick: () => a(e.requestId),
										label: "Approve"
									}), /* @__PURE__ */ F(k, {
										variant: "danger",
										layout: "outlined",
										size: "sm",
										onClick: () => o(e.requestId),
										label: "Reject"
									})]
								})
							]
						}, e.requestId))
					}) : /* @__PURE__ */ F("p", {
						className: "pk-panel__empty",
						children: "No one is waiting to join."
					})
				]
			})
		})
	});
}
// src/modules/poker/MembersTable.tsx
function Le(e) {
	return e === void 0 ? "–" : e === "?" ? "?" : e === "~" ? "☕" : String(e);
}
function Re() {
	let e = B((e) => e.members), t = B((e) => e.sid), n = B((e) => e.room?.moderatorId ?? ""), r = B((e) => e.room?.currentIssueId ?? null), i = B((e) => e.viewingIssueId), a = B((e) => e.viewingIssueId ? e.votesMap[e.viewingIssueId] : void 0), o = B(W), s = !!i && i === r, c = !!a?.reveal, l = w(() => [...e].sort((e, r) => e.id === t ? -1 : r.id === t ? 1 : e.id === n ? -1 : r.id === n ? 1 : e.name.localeCompare(r.name)), [
		e,
		t,
		n
	]);
	return e.length === 0 ? /* @__PURE__ */ F("section", {
		className: "pk-table",
		children: /* @__PURE__ */ F("div", {
			className: "pk-table__empty",
			children: /* @__PURE__ */ F("p", { children: "Waiting for players to join…" })
		})
	}) : /* @__PURE__ */ I("section", {
		className: "pk-table",
		children: [/* @__PURE__ */ I("header", {
			className: "pk-table__head",
			children: [
				/* @__PURE__ */ F("h2", {
					className: "pk-table__title",
					children: "Players"
				}),
				c && /* @__PURE__ */ F("span", {
					className: "pk-table__badge is-success",
					children: "Cards revealed"
				}),
				s && !c && /* @__PURE__ */ F("span", {
					className: "pk-table__badge is-warning",
					children: "Round in progress"
				})
			]
		}), /* @__PURE__ */ F("ul", {
			className: "pk-table__grid",
			children: l.map((e) => /* @__PURE__ */ F(ze, {
				member: e,
				vote: a?.values?.[e.id],
				issueId: i,
				isSelf: e.id === t,
				isRoomModerator: e.id === n,
				isVotingActive: s,
				revealed: c,
				canManage: o && e.id !== t
			}, e.id))
		})]
	});
}
function ze({ member: e, vote: t, issueId: n, isSelf: r, isRoomModerator: i, isVotingActive: a, revealed: o, canManage: s }) {
	let { kickMember: c, transferModerator: l } = Y(), u = q(K.member(e.id)), d = n !== null && e.votedIssueIds.includes(n), f = o ? "revealed" : a ? d ? "locked" : "thinking" : "idle";
	return /* @__PURE__ */ I("li", {
		className: L("pk-seat", `is-${f}`, {
			"is-offline": !e.isOnline,
			"is-pending": u
		}),
		"aria-busy": u,
		children: [
			/* @__PURE__ */ F("div", {
				className: "pk-seat__card",
				"aria-hidden": !0,
				children: f === "revealed" ? /* @__PURE__ */ F("span", {
					className: "pk-seat__vote",
					children: Le(t)
				}) : f === "locked" ? /* @__PURE__ */ F("span", {
					className: "pk-seat__cardBack",
					children: "✓"
				}) : f === "thinking" ? /* @__PURE__ */ I("span", {
					className: "pk-seat__dots",
					children: [
						/* @__PURE__ */ F("i", {}),
						/* @__PURE__ */ F("i", {}),
						/* @__PURE__ */ F("i", {})
					]
				}) : /* @__PURE__ */ F("span", { className: "pk-seat__cardIdle" })
			}),
			/* @__PURE__ */ I("div", {
				className: "pk-seat__person",
				children: [/* @__PURE__ */ F(X, {
					avatarId: e.avatarId,
					avatarUrl: e.avatarUrl,
					className: "pk-seat__avatar"
				}), /* @__PURE__ */ I("div", {
					className: "pk-seat__info",
					children: [/* @__PURE__ */ I("p", {
						className: "pk-seat__name",
						title: e.name,
						children: [e.name, r && /* @__PURE__ */ F("span", {
							className: "pk-seat__you",
							children: "you"
						})]
					}), /* @__PURE__ */ F("p", {
						className: "pk-seat__role",
						children: i ? "♛ Moderator" : e.isOnline ? "Online" : "Offline"
					})]
				})]
			}),
			u && /* @__PURE__ */ F(G, {
				label: "Updating",
				className: "pk-seat__pending"
			}),
			s && !u && /* @__PURE__ */ I("div", {
				className: "pk-seat__manage",
				children: [/* @__PURE__ */ F("button", {
					type: "button",
					className: "pk-seat__manageButton",
					onClick: () => void l(e.id),
					title: `Make ${e.name} the moderator`,
					children: "♛"
				}), /* @__PURE__ */ F("button", {
					type: "button",
					className: "pk-seat__manageButton is-danger",
					onClick: () => void c(e.id),
					title: `Remove ${e.name}`,
					children: "✕"
				})]
			})
		]
	});
}
// src/modules/poker/RoomClosedNotice.tsx
function Be({ reason: e, onExit: t }) {
	return /* @__PURE__ */ F("div", {
		className: "pk-closed",
		children: /* @__PURE__ */ I("div", {
			className: "pk-closed__card",
			children: [
				/* @__PURE__ */ F("span", {
					className: "pk-closed__icon",
					"aria-hidden": !0,
					children: "🚪"
				}),
				/* @__PURE__ */ F("h1", {
					className: "pk-closed__title",
					children: "You are no longer in this room"
				}),
				/* @__PURE__ */ F("p", {
					className: "pk-closed__text",
					children: e
				}),
				/* @__PURE__ */ F(k, {
					variant: "primary",
					size: "md",
					onClick: t,
					label: "Back to start"
				})
			]
		})
	});
}
// src/modules/poker/LeaveRoomDialog.tsx
function Ve({ isOpen: e, onClose: t, onHandOver: n, onCloseRoom: r }) {
	let i = B((e) => e.members), a = B((e) => e.sid), o = w(() => i.filter((e) => e.id !== a), [i, a]), [s, c] = E(""), l = q(K.leave);
	C(() => {
		e && c((e) => o.some((t) => t.id === e) ? e : o[0]?.id ?? "");
	}, [e, o]);
	let u = o.length > 0;
	return /* @__PURE__ */ F(te, {
		isOpen: e,
		onClose: () => {
			l || t();
		},
		title: "Leave as host",
		size: "sm",
		footer: /* @__PURE__ */ F("div", {
			className: "pk-leave__footer",
			children: /* @__PURE__ */ F(k, {
				variant: "secondary",
				layout: "plain",
				onClick: t,
				disabled: l,
				label: "Cancel"
			})
		}),
		children: /* @__PURE__ */ I("div", {
			className: "pk-leave",
			children: [u && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ I("section", {
				className: "pk-leave__option",
				children: [
					/* @__PURE__ */ F("h4", {
						className: "pk-leave__title",
						children: "Hand over hosting"
					}),
					/* @__PURE__ */ F("p", {
						className: "pk-leave__text",
						children: "The room stays open and the new host carries on with the estimates."
					}),
					/* @__PURE__ */ I("div", {
						className: "pk-leave__row",
						children: [/* @__PURE__ */ F(M, {
							id: "pk-successor",
							className: "pk-leave__successor",
							value: s,
							onChange: (e) => c(String(e.value)),
							options: o.map((e) => ({
								value: e.id,
								label: e.name
							})),
							ariaLabel: "New host"
						}), /* @__PURE__ */ F(k, {
							variant: "primary",
							onClick: () => n(s),
							disabled: !s || l,
							label: "Hand over and leave"
						})]
					})
				]
			}), /* @__PURE__ */ F("div", {
				className: "pk-leave__divider",
				role: "separator",
				children: /* @__PURE__ */ F("span", { children: "or" })
			})] }), /* @__PURE__ */ I("section", {
				className: "pk-leave__option",
				children: [
					/* @__PURE__ */ F("h4", {
						className: "pk-leave__title",
						children: "Close the room"
					}),
					/* @__PURE__ */ F("p", {
						className: "pk-leave__text",
						children: u ? "Everyone is sent out and every issue and estimate is removed." : "You are the only one here, so leaving closes the room and removes every issue and estimate."
					}),
					/* @__PURE__ */ F("div", {
						className: "pk-leave__row",
						children: /* @__PURE__ */ F(k, {
							variant: "danger",
							layout: "outlined",
							onClick: r,
							disabled: l,
							label: u ? "Close room for everyone" : "Close room and leave"
						})
					})
				]
			})]
		})
	});
}
// src/modules/poker/RoomHeader.tsx
var He = {
	idle: "Connecting",
	connecting: "Connecting",
	connected: "Live",
	reconnecting: "Reconnecting",
	degraded: "Retrying",
	closed: "Offline"
};
function Ue({ onExit: e }) {
	let t = B((e) => e.room), r = B(W), i = B((e) => e.connectionStatus), a = B((e) => e.membersMap[e.sid]), o = B((e) => e.members.length), s = B((e) => e.joinRequests.length), { host: c, userPicker: l, identity: u } = n(), { copyInviteLink: d, copyRoomCode: f, showIssuePanel: m, showJoinRequests: h, showInvitePanel: ee, leaveRoom: g, closeRoom: _ } = Y(), [v, y] = E(!1), [b, x] = E(!1), S = T(null), w = r && c.capabilities.invitations && l !== null, D = r && (t?.access.requireApproval || s > 0);
	C(() => {
		if (!v) return;
		let e = (e) => {
			S.current?.contains(e.target) || y(!1);
		}, t = (e) => {
			e.key === "Escape" && y(!1);
		};
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t);
		};
	}, [v]);
	let O = async (t) => {
		await t() && (y(!1), x(!1), e());
	}, A = async () => {
		r ? (y(!1), x(!0)) : await O(() => g());
	};
	return /* @__PURE__ */ I("header", {
		className: "pk-roomHeader",
		children: [
			/* @__PURE__ */ I("button", {
				type: "button",
				className: "pk-roomHeader__iconButton",
				onClick: m,
				title: "Issues and settings",
				children: [/* @__PURE__ */ F("span", {
					"aria-hidden": !0,
					children: "☰"
				}), /* @__PURE__ */ F("span", {
					className: "pk-visually-hidden",
					children: "Open issues and settings"
				})]
			}),
			/* @__PURE__ */ I("div", {
				className: "pk-roomHeader__identity",
				children: [/* @__PURE__ */ F("h1", {
					className: "pk-roomHeader__name",
					title: t?.roomName,
					children: t?.roomName ?? "Planning Poker"
				}), /* @__PURE__ */ I("div", {
					className: "pk-roomHeader__meta",
					children: [
						/* @__PURE__ */ I("button", {
							type: "button",
							className: "pk-roomHeader__code",
							onClick: f,
							title: "Copy room code",
							children: [/* @__PURE__ */ F("span", {
								className: "pk-roomHeader__codeValue",
								children: t?.roomId
							}), /* @__PURE__ */ F("span", {
								"aria-hidden": !0,
								children: "⧉"
							})]
						}),
						/* @__PURE__ */ I("span", {
							className: `pk-roomHeader__status is-${i}`,
							children: [/* @__PURE__ */ F("span", {
								className: "pk-roomHeader__statusDot",
								"aria-hidden": !0
							}), He[i] ?? i]
						}),
						/* @__PURE__ */ I("span", {
							className: "pk-roomHeader__count",
							children: [
								o,
								" ",
								o === 1 ? "player" : "players"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ I("div", {
				className: "pk-roomHeader__actions",
				children: [
					D && /* @__PURE__ */ F(k, {
						variant: s > 0 ? "primary" : "secondary",
						layout: "outlined",
						size: "sm",
						onClick: h,
						label: s > 0 ? `Requests (${s})` : "Requests"
					}),
					w && /* @__PURE__ */ F(k, {
						variant: "secondary",
						layout: "outlined",
						size: "sm",
						onClick: ee,
						label: "Invite people"
					}),
					/* @__PURE__ */ F(k, {
						variant: "secondary",
						layout: "outlined",
						size: "sm",
						onClick: d,
						label: "Copy link",
						className: "pk-roomHeader__invite"
					}),
					/* @__PURE__ */ F(p, {}),
					/* @__PURE__ */ I("div", {
						className: "pk-roomHeader__user",
						ref: S,
						children: [/* @__PURE__ */ I("button", {
							type: "button",
							className: "pk-roomHeader__avatarButton",
							onClick: () => y((e) => !e),
							"aria-expanded": v,
							"aria-haspopup": "menu",
							title: "Your profile",
							children: [/* @__PURE__ */ F(X, {
								avatarId: a?.avatarId,
								avatarUrl: a?.avatarUrl,
								className: "pk-roomHeader__avatar"
							}), r && /* @__PURE__ */ F("span", {
								className: "pk-roomHeader__crown",
								title: "Moderator",
								"aria-label": "Moderator",
								children: "♛"
							})]
						}), v && /* @__PURE__ */ I("div", {
							className: "pk-roomHeader__menu",
							role: "menu",
							children: [
								/* @__PURE__ */ I("div", {
									className: "pk-roomHeader__menuHead",
									children: [/* @__PURE__ */ F("p", {
										className: "pk-roomHeader__menuRole",
										children: r ? "Moderator" : "Player"
									}), /* @__PURE__ */ F("p", {
										className: "pk-roomHeader__menuName",
										children: a?.name ?? "You"
									})]
								}),
								u.allowsAvatarPicker && /* @__PURE__ */ F("div", {
									className: "pk-roomHeader__menuBody",
									children: /* @__PURE__ */ F(We, {
										currentAvatarId: a?.avatarId ?? null,
										profileImageUrl: a?.avatarUrl
									})
								}),
								/* @__PURE__ */ F("div", {
									className: "pk-roomHeader__menuFoot",
									children: r ? /* @__PURE__ */ F(k, {
										variant: "danger",
										layout: "plain",
										size: "sm",
										fullWidth: !0,
										onClick: A,
										label: "Leave or close room"
									}) : /* @__PURE__ */ F(k, {
										variant: "danger",
										layout: "plain",
										size: "sm",
										fullWidth: !0,
										onClick: A,
										label: "Leave room",
										confirmText: "Leave this room? Your estimates will be discarded.",
										confirmTitle: "Leave room"
									})
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ F(Ve, {
				isOpen: b,
				onClose: () => x(!1),
				onHandOver: (e) => O(() => g(e)),
				onCloseRoom: () => O(() => _())
			})
		]
	});
}
function We({ currentAvatarId: e, profileImageUrl: t }) {
	let { setAvatar: n } = Y(), r = q(K.avatar);
	return /* @__PURE__ */ I("div", {
		className: "pk-roomHeader__avatarPicker",
		children: [/* @__PURE__ */ F(v, {
			value: e,
			onChange: (e) => void n(e),
			className: "pk-roomHeader__avatarGrid",
			profileImageUrl: t
		}), r && /* @__PURE__ */ F(G, {
			label: "Saving",
			className: "pk-roomHeader__avatarSaving"
		})]
	});
}
// src/modules/poker/EstimateSync.tsx
function Ge({ room: e, issue: t, vote: n }) {
	let r = B(W), a = B((e) => e.estimateTarget);
	if (!n.reveal || !t.root || !l(e.scoreType)) return null;
	let o = n.syncedScore === void 0 ? null : /* @__PURE__ */ I("span", {
		className: "pk-estimateSync__saved",
		children: [
			"✓ ",
			String(n.syncedScore),
			" saved in Jira"
		]
	});
	if (!r || a === null) return o && /* @__PURE__ */ F("div", {
		className: "pk-estimateSync",
		children: o
	});
	if (!a.ready) return /* @__PURE__ */ F("div", {
		className: "pk-estimateSync",
		children: /* @__PURE__ */ F("span", {
			className: "pk-estimateSync__hint",
			children: a.reason
		})
	});
	let s = i(n.finalScore) ? n.finalScore : void 0, c = i(n.syncedScore) ? n.syncedScore : s;
	return /* @__PURE__ */ F(Ke, {
		room: e,
		issueId: t.id,
		fieldName: a.fieldName,
		initial: c,
		synced: o
	}, `${t.id}:${c ?? ""}`);
}
function Ke({ room: e, issueId: t, fieldName: n, initial: r, synced: a }) {
	let [s, c] = E(r), l = q(K.estimate(t)), { saveEstimate: u } = Y(), d = o(e.scoreType, e.settings.maxPoints, e.settings.showHalfScore).filter(i), f = (r === void 0 || d.includes(r) ? d : [...d, r].sort((e, t) => e - t)).map((e) => ({
		value: e,
		label: String(e)
	}));
	return /* @__PURE__ */ I("div", {
		className: "pk-estimateSync",
		children: [
			/* @__PURE__ */ F("label", {
				className: "pk-estimateSync__label",
				htmlFor: `pk-estimate-${t}`,
				children: n
			}),
			/* @__PURE__ */ F(M, {
				id: `pk-estimate-${t}`,
				className: "pk-estimateSync__value",
				value: s,
				placeholder: "Pick",
				options: f,
				disabled: l,
				onChange: (e) => c(Number(e.value))
			}),
			/* @__PURE__ */ F(k, {
				size: "sm",
				variant: "primary",
				label: "Update in Jira",
				isLoading: l,
				disabled: s === void 0,
				onClick: async () => {
					s !== void 0 && await u(t, s);
				}
			}),
			a
		]
	});
}
// src/modules/poker/IssueNavigator.tsx
function qe() {
	let e = B((e) => e.room?.issues), t = B((e) => e.viewingIssueId), { selectIssue: n, showIssuePanel: r } = Y();
	if (!e || e.length < 2) return null;
	let i = e.findIndex((e) => e.id === t), a = i > 0 ? e[i - 1] : void 0, o = i >= 0 && i < e.length - 1 ? e[i + 1] : void 0;
	return /* @__PURE__ */ I("nav", {
		className: "pk-issueNav",
		"aria-label": "Move between issues",
		children: [
			/* @__PURE__ */ F("button", {
				type: "button",
				className: "pk-issueNav__step",
				onClick: () => a && n(a.id),
				disabled: !a,
				title: a ? `Previous issue: ${a.key}` : "No previous issue",
				"aria-label": "Previous issue",
				children: "‹"
			}),
			/* @__PURE__ */ F("button", {
				type: "button",
				className: "pk-issueNav__position",
				onClick: r,
				title: "Open the backlog",
				children: i >= 0 ? `${i + 1} / ${e.length}` : `– / ${e.length}`
			}),
			/* @__PURE__ */ F("button", {
				type: "button",
				className: "pk-issueNav__step",
				onClick: () => o && n(o.id),
				disabled: !o,
				title: o ? `Next issue: ${o.key}` : "No next issue",
				"aria-label": "Next issue",
				children: "›"
			})
		]
	});
}
// src/modules/poker/RoundStage.tsx
var Je = {
	idle: {
		label: "No round in progress",
		tone: "neutral"
	},
	voting: {
		label: "Voting open",
		tone: "warning"
	},
	revealed: {
		label: "Votes revealed",
		tone: "success"
	}
};
function Ye() {
	let e = B((e) => e.room), t = B((e) => e.viewingIssueId), n = B((e) => e.viewingIssueId ? e.issuesMap[e.viewingIssueId] : void 0), r = B((e) => e.viewingIssueId ? e.votesMap[e.viewingIssueId] : void 0), i = B((e) => e.members), a = B(W), { startRound: o, restartRound: s, revealVotes: c, showIssuePanel: l } = Y(), u = !!t && t === e?.currentIssueId, d = !!r?.reveal, f = d ? "revealed" : u ? "voting" : "idle", p = u ? i.filter((e) => e.votedIssueIds.includes(t)).length : 0, m = i.length, h = m > 0 ? Math.round(p / m * 100) : 0;
	return /* @__PURE__ */ I("section", {
		className: "pk-stage",
		children: [
			/* @__PURE__ */ I("div", {
				className: "pk-stage__head",
				children: [/* @__PURE__ */ I("div", {
					className: "pk-stage__lead",
					children: [/* @__PURE__ */ I("span", {
						className: `pk-stage__status is-${Je[f].tone}`,
						children: [/* @__PURE__ */ F("span", {
							className: "pk-stage__statusDot",
							"aria-hidden": !0
						}), Je[f].label]
					}), /* @__PURE__ */ F(qe, {})]
				}), a && /* @__PURE__ */ I("div", {
					className: "pk-stage__controls",
					children: [
						!u && /* @__PURE__ */ F(k, {
							variant: "success",
							size: "sm",
							onClick: o,
							disabled: !t,
							label: "Start round"
						}),
						u && !d && /* @__PURE__ */ F(k, {
							variant: "primary",
							size: "sm",
							onClick: c,
							label: "Reveal votes"
						}),
						u && /* @__PURE__ */ F(k, {
							variant: "warning",
							layout: "outlined",
							size: "sm",
							onClick: s,
							label: "Restart",
							confirmText: "Restart this round? Every estimate for this issue is cleared.",
							confirmTitle: "Restart round"
						})
					]
				})]
			}),
			n ? /* @__PURE__ */ I("div", {
				className: "pk-stage__issue",
				children: [/* @__PURE__ */ I("div", {
					className: "pk-stage__issueKey",
					children: [n.icon && /* @__PURE__ */ F("img", {
						src: n.icon,
						alt: "",
						className: "pk-stage__issueIcon"
					}), n.url ? /* @__PURE__ */ F("a", {
						href: n.url,
						target: "_blank",
						rel: "noopener noreferrer",
						children: n.key
					}) : /* @__PURE__ */ F("span", { children: n.key })]
				}), n.summary && /* @__PURE__ */ F("p", {
					className: "pk-stage__issueSummary",
					children: n.summary
				})]
			}) : /* @__PURE__ */ I("div", {
				className: "pk-stage__empty",
				children: [
					/* @__PURE__ */ F("p", {
						className: "pk-stage__emptyTitle",
						children: "No issue selected"
					}),
					/* @__PURE__ */ F("p", {
						className: "pk-stage__emptyText",
						children: a ? "Add an issue from the issues panel to start estimating." : "Waiting for the moderator to add an issue."
					}),
					/* @__PURE__ */ F(k, {
						variant: "secondary",
						layout: "outlined",
						size: "sm",
						onClick: l,
						label: "Open issues"
					})
				]
			}),
			/* @__PURE__ */ I("div", {
				className: "pk-stage__stats",
				children: [
					/* @__PURE__ */ F(Z, {
						label: "Final",
						value: d && r?.finalScore !== void 0 ? String(r.finalScore) : "—",
						accent: !0
					}),
					/* @__PURE__ */ F(Z, {
						label: "Average",
						value: d && r?.average !== void 0 ? r.average.toFixed(1) : "—"
					}),
					/* @__PURE__ */ F(Z, {
						label: "Highest",
						value: d && r?.maxVote !== void 0 ? String(r.maxVote) : "—"
					}),
					/* @__PURE__ */ F(Z, {
						label: "Voted",
						value: u ? `${p}/${m}` : "—"
					})
				]
			}),
			e && n && r && /* @__PURE__ */ F(Ge, {
				room: e,
				issue: n,
				vote: r
			}),
			u && /* @__PURE__ */ I("div", {
				className: "pk-stage__progress",
				children: [/* @__PURE__ */ F("div", {
					className: "pk-stage__progressTrack",
					children: /* @__PURE__ */ F("div", {
						className: `pk-stage__progressFill ${d ? "is-revealed" : ""}`,
						style: { width: `${h}%` }
					})
				}), /* @__PURE__ */ I("span", {
					className: "pk-stage__progressLabel",
					children: [h, "% voted"]
				})]
			})
		]
	});
}
function Z({ label: e, value: t, accent: n = !1 }) {
	return /* @__PURE__ */ I("div", {
		className: `pk-stat ${n ? "is-accent" : ""}`,
		children: [/* @__PURE__ */ F("span", {
			className: "pk-stat__label",
			children: e
		}), /* @__PURE__ */ F("span", {
			className: "pk-stat__value",
			children: t
		})]
	});
}
// src/modules/poker/useAutoRevealCatchUp.ts
var Xe = 1500;
function Ze() {
	let { revealVotes: e } = Y(), t = T(/* @__PURE__ */ new Set()), n = B(W), r = B((e) => e.room?.settings.autoReveal ?? !1), i = B((e) => e.room?.currentIssueId ?? null), a = B((e) => e.room?.currentIssueId ? !!e.votesMap[e.room.currentIssueId]?.reveal : !1), o = B((e) => {
		let t = e.room?.currentIssueId;
		return !!t && e.members.length > 0 && e.members.every((e) => e.votedIssueIds.includes(t));
	});
	C(() => {
		if (!n || !r || i === null || a || !o || t.current.has(i)) return;
		let s = setTimeout(() => {
			t.current.add(i), e();
		}, Xe);
		return () => clearTimeout(s);
	}, [
		n,
		r,
		i,
		a,
		o,
		e
	]);
}
// src/modules/poker/useEstimateSync.ts
function Qe() {
	let { issues: e } = n(), { saveEstimate: t } = Y(), r = T(/* @__PURE__ */ new Set()), i = B(W), a = B((e) => e.estimateTarget), o = B((e) => e.room?.settings.estimateSync ?? "manual"), s = B((e) => e.room?.scoreType), c = B((e) => e.room?.currentIssueId ? e.issuesMap[e.room.currentIssueId] : void 0), u = B((e) => e.room?.currentIssueId ? e.votesMap[e.room.currentIssueId] : void 0);
	C(() => {
		if (!i || e === null) {
			V({ estimateTarget: null });
			return;
		}
		let t = !0;
		return e.getEstimateTarget().then((e) => {
			t && V({ estimateTarget: e });
		}).catch((e) => {
			console.error("Could not check where estimates are saved", e), t && V({ estimateTarget: null });
		}), () => {
			t = !1;
		};
	}, [i, e]), C(() => {
		if (!i || !a?.ready || s === void 0 || !l(s) || !c?.root || !u || u.syncedScore !== void 0 || r.current.has(u.issueId)) return;
		let e = d(o, u);
		e !== void 0 && (r.current.add(u.issueId), t(u.issueId, e));
	}, [
		i,
		a,
		s,
		c,
		u,
		o,
		t
	]);
}
// src/modules/poker/presence.ts
function $e(e, t, n, r) {
	return e.filter((e) => {
		if (!e.isOnline || e.id === r || !e.lastSeenAt) return !1;
		let i = Date.parse(e.lastSeenAt);
		return Number.isFinite(i) && t - i > n;
	}).map((e) => e.id);
}
function et(e, t) {
	if (!e) return null;
	let n = Date.parse(e);
	return Number.isFinite(n) ? n - t : null;
}
// src/modules/poker/revision.ts
function tt(e, t) {
	return t === void 0 ? {
		apply: !0,
		resync: !1,
		last: e
	} : t < e ? {
		apply: !1,
		resync: !1,
		last: e
	} : {
		apply: !0,
		resync: t > e + 1,
		last: t
	};
}
// src/modules/poker/roomEvents.ts
var nt = "RATE_LIMITED", rt = /* @__PURE__ */ new Set([
	"submitVote",
	"revealVotes",
	"startRound",
	"restartRound"
]), it = /* @__PURE__ */ new Set([
	"roomState",
	"heartbeatResult",
	"ack"
]);
function Q(e, t) {
	return {
		members: t,
		membersMap: U(t),
		offlineSince: ue(t, e.offlineSince, Date.now(), e.serverOffsetMs)
	};
}
function at(e, t) {
	let n = e.viewingIssueId !== null && t.room.issues.some((t) => t.id === e.viewingIssueId) ? e.viewingIssueId : t.room.currentIssueId ?? t.room.issues[0]?.id ?? null, r = et(t.serverTime, Date.now()) ?? e.serverOffsetMs;
	return {
		room: t.room,
		members: t.members,
		membersMap: U(t.members),
		issuesMap: U(t.room.issues),
		votesMap: le(t.votes),
		onlineIds: t.members.filter((e) => e.isOnline).map((e) => e.id),
		serverOffsetMs: r,
		offlineSince: ue(t.members, e.offlineSince, Date.now(), r),
		joinRequests: t.joinRequests ?? [],
		invitations: t.invitations ?? [],
		lastRevision: t.room.revision ?? 0,
		sid: t.sid,
		role: t.role,
		roomId: t.room.roomId,
		viewingIssueId: n,
		isLoaded: !0
	};
}
function $(e, t) {
	let n = new Map(e.members.map((e) => [e.id, e]));
	for (let e of t) n.set(e.id, e);
	return [...n.values()];
}
function ot(e, t, n = e.members) {
	let r = new Set(t);
	return {
		onlineIds: t,
		...Q(e, n.map((e) => ({
			...e,
			isOnline: r.has(e.id)
		})))
	};
}
function st(e, t) {
	let n = e.votesMap[t.issueId], r = t.reveal ? t : {
		...t,
		values: {
			...n?.values,
			...t.values
		}
	};
	return { votesMap: {
		...e.votesMap,
		[t.issueId]: r
	} };
}
function ct(e, t) {
	let n = new Set(t.votedIds), r = !1, i = e.members.map((e) => !n.has(e.id) || e.votedIssueIds.includes(t.issueId) ? e : (r = !0, {
		...e,
		votedIssueIds: [...e.votedIssueIds, t.issueId]
	}));
	return r ? {
		members: i,
		membersMap: U(i)
	} : {};
}
function lt(e, t) {
	if (e.room === null) return {};
	let n = e.viewingIssueId !== null && t.issues.some((t) => t.id === e.viewingIssueId) ? e.viewingIssueId : t.currentIssueId ?? t.issues[0]?.id ?? null;
	return {
		room: {
			...e.room,
			issues: t.issues,
			currentIssueId: t.currentIssueId
		},
		issuesMap: U(t.issues),
		viewingIssueId: n
	};
}
function ut(e, t) {
	if (e.room === null) return {};
	let n = e.members.map((e) => ({
		...e,
		votedIssueIds: e.votedIssueIds.filter((e) => e !== t.currentIssueId)
	}));
	return {
		room: {
			...e.room,
			issues: t.issues,
			currentIssueId: t.currentIssueId
		},
		issuesMap: U(t.issues),
		members: n,
		membersMap: U(n),
		votesMap: {
			...e.votesMap,
			[t.vote.issueId]: t.vote
		},
		viewingIssueId: t.currentIssueId
	};
}
function dt(e, t, n) {
	return e.joinRequests.some((e) => e.requestId === t.request.requestId) ? {
		patch: {},
		effects: []
	} : {
		patch: { joinRequests: [...e.joinRequests, t.request] },
		effects: [() => n.message.info(`${t.request.name} wants to join the room`)]
	};
}
function ft(e, t, n) {
	let r = new Set(t.requestIds), i = e.joinRequests.filter((e) => !r.has(e.requestId)), { bulkJoinAction: a, bulkDisableApproval: o } = e;
	return a === null ? {
		patch: { joinRequests: i },
		effects: []
	} : i.length > 0 && t.requestIds.length > 0 ? {
		patch: { joinRequests: i },
		effects: [() => n.sendBulkJoin(a, o)]
	} : {
		patch: {
			joinRequests: i,
			bulkJoinAction: null,
			bulkDisableApproval: !1
		},
		effects: []
	};
}
function pt(e, t, n) {
	let r = et(t.serverTime, Date.now()) ?? e.serverOffsetMs, i = t.lastSeen, a = i ? e.members.map((e) => i[e.id] ? {
		...e,
		lastSeenAt: i[e.id]
	} : e) : e.members, o = t.revision > e.lastRevision || e.room !== null && e.room.moderatorId === e.sid && t.pendingJoinRequests !== e.joinRequests.length;
	return {
		patch: {
			serverOffsetMs: r,
			...ot({
				...e,
				serverOffsetMs: r
			}, t.onlineIds, a)
		},
		effects: o ? [n.resync] : []
	};
}
function mt(e, t, n) {
	let r = [];
	if (t?.code === nt) r.push(() => n.message.error(g));
	else if (t?.message) {
		let e = t.message;
		r.push(() => n.message.error(e));
	}
	return (t?.code === nt || t?.action && rt.has(t.action)) && r.push(n.resync), {
		patch: e.bulkJoinAction === null ? {} : {
			bulkJoinAction: null,
			bulkDisableApproval: !1
		},
		effects: r
	};
}
function ht(e, t, n) {
	if (e.room === null) return {
		patch: {},
		effects: []
	};
	let r = t.moderatorId === e.sid ? "mod" : "player";
	return {
		patch: {
			room: {
				...e.room,
				moderatorId: t.moderatorId
			},
			role: r,
			joinRequests: r === "mod" ? e.joinRequests : [],
			invitations: r === "mod" ? e.invitations : []
		},
		effects: r === "mod" ? [n.resync] : []
	};
}
function gt(e, t, n) {
	let r = [];
	switch (t.action) {
		case "authResult": {
			let e = t.payload;
			return {
				patch: e.ok ? {} : { closedReason: e.error ?? "Your session is no longer valid." },
				effects: r
			};
		}
		case "roomState": return {
			patch: at(e, t.payload),
			effects: r
		};
		case "roomUpdated": return {
			patch: { room: {
				...t.payload.room,
				revision: e.lastRevision
			} },
			effects: r
		};
		case "memberJoined": {
			let r = t.payload.member;
			return {
				patch: Q(e, $(e, [r])),
				effects: [() => n.message.info(`${r.name} joined the room`)]
			};
		}
		case "membersJoined": return {
			patch: Q(e, $(e, t.payload.members)),
			effects: r
		};
		case "memberUpdated": return {
			patch: Q(e, $(e, [t.payload.member])),
			effects: r
		};
		case "memberLeft": {
			let n = t.payload.sid;
			return {
				patch: Q(e, e.members.filter((e) => e.id !== n)),
				effects: r
			};
		}
		case "presenceUpdate": return {
			patch: ot(e, t.payload.onlineIds),
			effects: r
		};
		case "heartbeatResult": return pt(e, t.payload, n);
		case "issuesUpdated": return {
			patch: lt(e, t.payload),
			effects: r
		};
		case "roundStarted": return {
			patch: ut(e, t.payload),
			effects: r
		};
		case "voteProgress": return {
			patch: ct(e, t.payload),
			effects: r
		};
		case "voteUpdated": return {
			patch: st(e, t.payload.vote),
			effects: r
		};
		case "votesRevealed": return {
			patch: st(e, t.payload.vote),
			effects: r
		};
		case "joinRequested": return dt(e, t.payload, n);
		case "joinRequestResolved": return ft(e, t.payload, n);
		case "invitationsUpdated": return {
			patch: { invitations: t.payload.invitations },
			effects: r
		};
		case "moderatorChanged": return ht(e, t.payload, n);
		case "kicked":
		case "roomClosed": return {
			patch: { closedReason: t.payload.reason },
			effects: r
		};
		case "sessionTakenOver": return {
			patch: { closedReason: "You joined this room from another tab or device." },
			effects: r
		};
		case "error": return mt(e, t.payload, n);
		default: return {
			patch: {},
			effects: r
		};
	}
}
function _t(e, t, n) {
	if (it.has(t.action)) return gt(e, t, n);
	let r = tt(e.lastRevision, t.revision);
	if (!r.apply) return {
		patch: {},
		effects: []
	};
	let i = gt({
		...e,
		lastRevision: r.last
	}, t, n);
	return {
		patch: {
			lastRevision: r.last,
			...i.patch
		},
		effects: r.resync ? [n.resync, ...i.effects] : i.effects
	};
}
function vt(e, t) {
	let n = [];
	H((r) => {
		let i = _t(r, e, t);
		return n = i.effects, i.patch;
	}, () => n.forEach((e) => e()));
}
function yt() {
	H((e) => {
		let t = new Set($e(e.members, Date.now() + e.serverOffsetMs, f, e.sid));
		return t.size === 0 ? {} : {
			onlineIds: e.onlineIds.filter((e) => !t.has(e)),
			...Q(e, e.members.map((e) => t.has(e.id) ? {
				...e,
				isOnline: !1
			} : e))
		};
	});
}
// src/modules/poker/useRoomConnection.ts
function bt(e, t) {
	let { realtime: r, message: i, host: a } = n(), o = a.capabilities.presenceHeartbeat;
	C(() => {
		if (!t || !e) return;
		let n = null, a = {
			message: i,
			resync: () => {
				n === null && (n = setTimeout(() => {
					n = null, r.requestResync();
				}, 300));
			},
			sendBulkJoin: (e, t) => {
				r.send(e, { disableApproval: t });
			}
		}, s = r.onMessage((e) => vt(e, a)), c = r.onStatusChange((e) => V({ connectionStatus: e })), l = r.onReconnectChange?.((e) => V({ reconnect: e }));
		r.connect(e);
		let u = null, d = null, f = !1, p = () => {
			f || (f = !0, r.send("exitRoom"));
		};
		return o && (u = setInterval(() => {
			r.send("heartbeat");
		}, h), d = setInterval(yt, m), window.addEventListener("pagehide", p)), () => {
			n !== null && clearTimeout(n), u !== null && clearInterval(u), d !== null && clearInterval(d), o && (window.removeEventListener("pagehide", p), z.getState().closedReason === null && p()), s(), c(), l?.(), r.disconnect(), V({ reconnect: null });
		};
	}, [
		e,
		t,
		r,
		i,
		o
	]);
}
// src/modules/poker/RoomPage.tsx
var xt = "We could not open this room. It may have been closed, or you may no longer be a member.";
function St() {
	let { roomId: r = "" } = D(), i = t(), { session: a, room: o } = n(), [s, c] = E(null), l = B((e) => e.isLoaded), u = B((e) => e.closedReason), d = B((e) => e.connectionStatus);
	C(() => {
		if (!r) {
			i.toHome();
			return;
		}
		let e = a.sessionFor(r);
		if (e === null) i.toJoin(r);
		else return V({
			roomId: r,
			sid: e.sid,
			role: e.role
		}), c(!0), o.refreshSession?.().catch((e) => {
			console.error("Could not refresh the room session", e);
		}), () => {
			ae();
		};
	}, [
		r,
		i,
		a,
		o
	]), bt(r, s === !0 && u === null), Qe(), Ze();
	let f = () => {
		a.clear(), ae(), i.toHome();
	};
	return s === null ? /* @__PURE__ */ F(e, { label: "Checking your session" }) : u === null ? !l && d === "closed" ? /* @__PURE__ */ F(Be, {
		reason: xt,
		onExit: f
	}) : l ? /* @__PURE__ */ I("div", {
		className: "pk-room",
		children: [
			/* @__PURE__ */ F(Ue, { onExit: f }),
			/* @__PURE__ */ F(Ce, {}),
			/* @__PURE__ */ F(we, {}),
			/* @__PURE__ */ F("main", {
				className: "pk-room__main pk-scroll",
				children: /* @__PURE__ */ I("div", {
					className: "pk-room__content",
					children: [/* @__PURE__ */ F(Ye, {}), /* @__PURE__ */ F(Re, {})]
				})
			}),
			/* @__PURE__ */ F(me, {}),
			/* @__PURE__ */ F(Me, {}),
			/* @__PURE__ */ F(Ie, {}),
			/* @__PURE__ */ F(Te, {}),
			/* @__PURE__ */ F(ye, {})
		]
	}) : /* @__PURE__ */ I("div", {
		className: "pk-room",
		children: [/* @__PURE__ */ F(Ce, {}), /* @__PURE__ */ F(e, { label: d === "reconnecting" ? "Reconnecting" : "Joining the room" })]
	}) : /* @__PURE__ */ F(Be, {
		reason: u,
		onExit: f
	});
}
export { St as default };
