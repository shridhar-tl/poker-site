import { t as e } from "./AppLoader-D9yvNwlE.js";
import { a as t, o as n } from "./theme-BRWg1AQm.js";
import { a as r, n as i, o as a, u as o } from "./scores-BUpnRFKN.js";
import { a as s, c, i as l, n as u, o as d, r as f, t as p } from "./issues-DMEWaS4E.js";
import { c as m, d as h, l as g, n as _, r as ee, u as v } from "./constants-BkFPV1oy.js";
import { n as y, r as b, t as x } from "./LabeledField-DyAMkIEx.js";
import { i as S, t as C } from "./avatars-r3RGoSWH.js";
import { useCallback as w, useEffect as T, useMemo as E, useRef as D, useState as O } from "react";
import { useParams as te } from "react-router";
import { Autocomplete as ne, Button as k, Checkbox as A, Drawer as j, Dropdown as M, Modal as re, SelectButton as ie, TextArea as ae, TextInput as N } from "fluxo-ui";
import { Fragment as P, jsx as F, jsxs as I } from "react/jsx-runtime";
import L from "classnames";
import { create as oe, createHook as se } from "fluxo-ui/store";
// src/store/poker-store.ts
var ce = {
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
}, R = oe(() => ({ ...ce })), z = se(R);
function B(e) {
	R.setState(e);
}
function le() {
	R.setState({ ...ce });
}
function V(e, t) {
	R.setState(e, t);
}
function ue(e) {
	V((t) => ({ pendingActions: {
		...t.pendingActions,
		[e]: (t.pendingActions[e] ?? 0) + 1
	} }));
}
function de(e) {
	V((t) => {
		let n = (t.pendingActions[e] ?? 0) - 1, r = { ...t.pendingActions };
		return n > 0 ? r[e] = n : delete r[e], { pendingActions: r };
	});
}
function fe(e, t) {
	return (e.pendingActions[t] ?? 0) > 0;
}
function H(e) {
	return e.reduce((e, t) => (e[t.id] = t, e), {});
}
function pe(e) {
	return e.reduce((e, t) => (e[t.issueId] = t, e), {});
}
function me(e, t, n, r = 0) {
	let i = {};
	for (let a of e) if (!a.isOnline) {
		let e = a.lastSeenAt ? Date.parse(a.lastSeenAt) - r : NaN;
		i[a.id] = t[a.id] ?? (Number.isFinite(e) ? Math.min(e, n) : n);
	}
	return i;
}
function U(e) {
	return e.room !== null && e.room.moderatorId === e.sid;
}
// src/components/InlineSpinner.tsx
function W({ label: e, className: t }) {
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
var G = {
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
function K(e) {
	return z((t) => fe(t, e));
}
// src/modules/poker/usePokerActions.ts
var he = 0, q = /* @__PURE__ */ new Set(), ge = "Could not update the story points in Jira.";
function _e(e) {
	return typeof e.key == "string" && e.key.trim().length > 0;
}
function ve({ id: e, key: t, summary: n, url: r, icon: i, root: a }) {
	return {
		id: e,
		key: t.trim(),
		summary: n,
		url: r,
		icon: i,
		root: a
	};
}
function ye() {
	return he += 1, `pending-${he}`;
}
function be(e, t) {
	return e instanceof Error && e.message ? e.message : t;
}
function J() {
	let { realtime: e, session: t, message: r, host: i, issues: a } = n(), o = w(async (t, n, r) => {
		r && ue(r);
		try {
			let r = await e.send(t, n);
			return !r && e.getStatus() === "connected" && e.requestResync(), r;
		} catch (n) {
			return console.error(`Could not send '${t}'`, n), e.getStatus() === "connected" && e.requestResync(), !1;
		} finally {
			r && de(r);
		}
	}, [e]), s = w(async (e, t, n) => {
		if (q.has(n)) return !1;
		q.add(n);
		try {
			return await o(e, t, n);
		} finally {
			q.delete(n);
		}
	}, [o]), c = w(async (e) => {
		let t = R.getState(), n = t.room?.currentIssueId;
		return !n || t.votesMap[n]?.reveal ? !1 : (V((t) => {
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
		}, G.vote));
	}, [o]), l = w(async () => {
		let { viewingIssueId: e } = R.getState();
		return e !== null && await s("startRound", { issueId: e }, G.round);
	}, [s]), d = w(async () => {
		let { viewingIssueId: e } = R.getState();
		return e !== null && await s("restartRound", { issueId: e }, G.round);
	}, [s]), f = w(async () => {
		let { room: e } = R.getState();
		return e?.currentIssueId != null && await s("revealVotes", { issueId: e.currentIssueId }, G.round);
	}, [s]), p = w(async (e) => {
		let { viewingIssueId: t } = R.getState();
		return t !== null && await s("setFinalScore", {
			issueId: t,
			finalScore: e
		}, G.round);
	}, [s]), m = w(async (e, t) => {
		let n = R.getState().issuesMap[e], i = G.estimate(e);
		if (!a || !n || q.has(i)) return !1;
		q.add(i), ue(i);
		try {
			try {
				await a.updateEstimate(n, t);
			} catch (e) {
				return console.error(`Could not update the estimate of ${n.key}`, e), r.error(be(e, ge)), !1;
			}
			return V((n) => {
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
			de(i), q.delete(i);
		}
	}, [
		a,
		r,
		o
	]), h = w(async (e) => {
		let t = e.key?.trim();
		if (!t) return !1;
		let n = ye();
		V((r) => ({ pendingIssues: [...r.pendingIssues, {
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
			V((e) => ({ pendingIssues: e.pendingIssues.filter((e) => e.pendingId !== n) }));
		}
	}, [o]), g = w(async (e) => {
		let t = u(R.getState().room?.issues ?? [], e.filter(_e)), n = 0;
		for (let e = 0; e < t.length; e += 20) {
			let r = t.slice(e, e + 20).map(ve), i = r.map((e) => ({
				pendingId: ye(),
				key: e.key ?? "",
				summary: e.summary
			})), a = new Set(i.map((e) => e.pendingId));
			V((e) => ({ pendingIssues: [...e.pendingIssues, ...i] }));
			try {
				if (!await o("addIssues", { issues: r })) break;
				n += r.length;
			} finally {
				V((e) => ({ pendingIssues: e.pendingIssues.filter((e) => !a.has(e.pendingId)) }));
			}
		}
		return n;
	}, [o]), _ = w((e) => s("removeIssue", { issueId: e }, G.issue(e)), [s]), ee = w((e) => o("reorderIssues", { issueIds: e }), [o]), v = w((e) => {
		B({ viewingIssueId: e });
	}, []), y = w((e) => (V((t) => t.room === null ? {} : { room: {
		...t.room,
		settings: {
			...t.room.settings,
			...e
		}
	} }), o("updateSettings", e, G.settings)), [o]), b = w((e) => (V((t) => t.room === null ? {} : { room: {
		...t.room,
		access: {
			...t.room.access,
			...e
		}
	} }), o("updateAccess", e, G.settings)), [o]), x = w((e) => o("renameRoom", { roomName: e }, G.settings), [o]), S = w((e) => (V((t) => {
		let n = t.members.map((n) => n.id === t.sid ? {
			...n,
			avatarId: e
		} : n);
		return {
			members: n,
			membersMap: H(n)
		};
	}), o("updateAvatar", { avatarId: e }, G.avatar)), [o]), C = w((e) => s("kickMember", { sid: e }, G.member(e)), [s]), T = w((e) => s("transferModerator", { sid: e }, G.member(e)), [s]), E = w(() => s("claimModerator", {}, G.host), [s]), D = w((e) => s("approveJoin", { requestId: e }, G.joinRequest(e)), [s]), O = w((e) => s("rejectJoin", { requestId: e }, G.joinRequest(e)), [s]), te = w((e) => (B({
		bulkJoinAction: "approveAllJoin",
		bulkDisableApproval: e
	}), o("approveAllJoin", { disableApproval: e })), [o]), ne = w(() => (B({
		bulkJoinAction: "rejectAllJoin",
		bulkDisableApproval: !1
	}), o("rejectAllJoin", {})), [o]), k = w((e) => s("inviteMembers", { users: e }, G.invite), [s]), A = w((e) => s("revokeInvite", { userId: e }, G.invitation(e)), [s]), j = w(() => {
		t.clear(), i.onRoomLeft?.();
	}, [t, i]), M = w(async (e) => {
		let t = await s("leaveRoom", e ? { successorSid: e } : {}, G.leave);
		return t && j(), t;
	}, [s, j]), re = w(async () => {
		let e = await s("closeRoom", {}, G.leave);
		return e && j(), e;
	}, [s, j]), ie = w(() => B({ showIssuePanel: !0 }), []), ae = w(() => B({ showIssuePanel: !1 }), []), N = w(() => B({ showJoinRequests: !0 }), []), P = w(() => B({ showJoinRequests: !1 }), []), F = w(() => B({ showInvitePanel: !0 }), []), I = w(() => B({ showInvitePanel: !1 }), []), L = w(async (e, t, n) => {
		try {
			await navigator.clipboard.writeText(e), r.success(t);
		} catch (e) {
			console.error(n, e), r.error(n);
		}
	}, [r]);
	return {
		submitVote: c,
		startRound: l,
		restartRound: d,
		revealVotes: f,
		setFinalScore: p,
		saveEstimate: m,
		addIssue: h,
		addIssues: g,
		removeIssue: _,
		reorderIssues: ee,
		selectIssue: v,
		updateSettings: y,
		updateAccess: b,
		renameRoom: x,
		setAvatar: S,
		kickMember: C,
		transferModerator: T,
		claimModerator: E,
		approveJoin: D,
		rejectJoin: O,
		approveAllJoin: te,
		rejectAllJoin: ne,
		inviteMembers: k,
		revokeInvite: A,
		leaveRoom: M,
		closeRoom: re,
		showIssuePanel: ie,
		hideIssuePanel: ae,
		showJoinRequests: N,
		hideJoinRequests: P,
		showInvitePanel: F,
		hideInvitePanel: I,
		copyInviteLink: w(async () => {
			let { roomId: e } = R.getState();
			e && await L(i.shareUrl(e), "Invite link copied", "Could not copy the invite link.");
		}, [L, i]),
		copyRoomCode: w(async () => {
			let { roomId: e } = R.getState();
			e && await L(e, "Room code copied", "Could not copy the room code.");
		}, [L]),
		resync: w(() => e.requestResync(), [e])
	};
}
// src/modules/poker/CardDeck.tsx
function xe() {
	let e = z((e) => e.room), t = z((e) => e.sid), n = z((e) => e.viewingIssueId), r = z((e) => e.viewingIssueId ? e.votesMap[e.viewingIssueId] : void 0), { submitVote: i } = J(), a = K(G.vote), s = !!n && n === e?.currentIssueId, c = !!r?.reveal, l = s && !c, u = r?.values?.[t], d = E(() => e === null ? [] : [
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
					children: n ? c ? "Round revealed — waiting for the next round" : s ? u === void 0 ? "Pick your estimate" : "Tap another card to change your estimate" : "Waiting for the moderator to start the round" : "The cards unlock when the moderator starts a round"
				}),
				a && /* @__PURE__ */ F(W, { label: "Saving your estimate" }),
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
var Se = 4200, Ce = 28, we = [
	330,
	345,
	312,
	20,
	48
];
function Te() {
	return Array.from({ length: Ce }, (e, t) => ({
		left: Math.random() * 100,
		delay: Math.random() * 1.2,
		duration: 2.6 + Math.random() * 1.6,
		size: 14 + Math.random() * 16,
		drift: (Math.random() - .5) * 160,
		spin: (Math.random() > .5 ? 1 : -1) * (180 + Math.random() * 360),
		hue: we[t % we.length]
	}));
}
function Ee() {
	let e = z((e) => e.room?.currentIssueId ?? null), t = z((e) => e.room?.currentIssueId ? e.votesMap[e.room.currentIssueId] : void 0), [n, r] = O(null), i = D(null), a = !!t?.reveal, o = t?.reveal ? l(t.values) : void 0;
	T(() => {
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
	]), T(() => {
		if (n === null) return;
		let e = setTimeout(() => r(null), Se);
		return () => clearTimeout(e);
	}, [n]);
	let s = E(() => n ? Te() : [], [n]);
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
				children: /* @__PURE__ */ F(De, {})
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
function De() {
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
var Oe = {
	offline: "You are offline. Check your internet connection.",
	unreachable: "Cannot reach the poker server. Check your network, VPN or firewall, or try again in a moment.",
	lost: "The connection to the room was lost."
}, ke = 1e3;
function Ae() {
	let e = z((e) => e.reconnect), { realtime: t } = n(), r = e?.nextAttemptAt ?? null, [i, a] = O(() => Date.now());
	if (T(() => {
		if (r === null) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), ke);
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
				children: Oe[e.reason]
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
function je() {
	let e = z((e) => e.room?.moderatorId ?? ""), t = z((e) => e.sid), n = z((e) => e.offlineSince[e.room?.moderatorId ?? ""] ?? null), { claimModerator: r } = J(), [i, a] = O(() => Date.now());
	T(() => {
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
function Y({ avatarId: e, avatarUrl: t, className: n }) {
	let [r, i] = O(null), a = !S(e) && t && r !== t ? t : null;
	return /* @__PURE__ */ F("span", {
		className: L("pk-memberAvatar", n),
		"aria-hidden": !0,
		children: a ? /* @__PURE__ */ F("img", {
			src: a,
			alt: "",
			loading: "lazy",
			referrerPolicy: "no-referrer",
			onError: () => i(a)
		}) : C(e)
	});
}
// src/modules/poker/InvitePanel.tsx
function Me() {
	let e = z((e) => e.showInvitePanel), t = z((e) => e.invitations), n = z(U), { hideInvitePanel: r, inviteMembers: i, revokeInvite: a } = J(), [o, s] = O([]);
	if (T(() => {
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
					/* @__PURE__ */ F(y, {
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
							/* @__PURE__ */ F(Y, {
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
// src/modules/poker/CustomIssueForm.tsx
function Ne({ onPick: e }) {
	let [t, n] = O(""), [r, i] = O(""), a = t.trim().length > 0, o = () => {
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
			/* @__PURE__ */ F(x, {
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
			/* @__PURE__ */ F(x, {
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
// src/modules/poker/JiraIssueSearch.tsx
function Pe(e) {
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
function Fe({ onPick: e }) {
	let { issues: t } = n(), [r, i] = O(""), [a, o] = O([]), [s, c] = O(!1), l = w(async (e) => {
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
	}, [t]), u = w((t) => {
		e(t), i(""), o([]);
	}, [e]);
	return /* @__PURE__ */ I("div", {
		className: "pk-issuePicker__mode",
		children: [/* @__PURE__ */ F(ne, {
			items: a,
			value: r,
			onChange: (e) => i(String(e.value)),
			onFilter: l,
			onSelect: (e) => u(e.value),
			renderItem: Pe,
			loading: s,
			placeholder: "Type a key or words from the summary…",
			minLength: 2,
			debounceMs: 300,
			emptyMessage: "No matching issues. Use Custom to add it by hand."
		}), /* @__PURE__ */ F("p", {
			className: "pk-issuePicker__hint",
			children: "Choosing an issue from the results adds it to the backlog straight away."
		})]
	});
}
// src/modules/poker/IssueSelectionList.tsx
function X(e) {
	return e.estimate === void 0 || e.estimate === null;
}
function Ie(e) {
	return e === 0 ? "Select issues to add" : e === 1 ? "Add 1 issue to backlog" : `Add ${e} issues to backlog`;
}
function Le({ batch: e, limit: t, emptyMessage: n, onAdd: r }) {
	let i = z((e) => e.room?.issues), a = z((e) => e.pendingIssues), o = E(() => {
		let e = new Set((i ?? []).map((e) => p(e.key)));
		return a.forEach((t) => e.add(p(t.key))), e;
	}, [i, a]), s = E(() => e.issues.filter((e) => !o.has(p(e.key))), [e, o]), c = E(() => e.issues.some((e) => !X(e)), [e]), [l, u] = O(() => new Set(s.map((e) => p(e.key)))), d = E(() => s.filter((e) => l.has(p(e.key))), [s, l]), f = s.length > 0 && d.length === s.length, m = (e, t) => {
		let n = p(e.key);
		u((e) => {
			let r = new Set(e);
			return t ? r.add(n) : r.delete(n), r;
		});
	}, h = (e) => {
		u(new Set(s.filter(e).map((e) => p(e.key))));
	};
	return e.issues.length === 0 ? /* @__PURE__ */ F("p", {
		className: "pk-bulkList__empty",
		children: n
	}) : /* @__PURE__ */ I("div", {
		className: "pk-bulkList",
		children: [
			/* @__PURE__ */ I("div", {
				className: "pk-bulkList__toolbar",
				children: [/* @__PURE__ */ F(A, {
					className: "pk-bulkList__master",
					checked: f,
					indeterminate: d.length > 0 && !f,
					disabled: s.length === 0,
					onChange: (e) => h(() => !!e.value),
					label: `${d.length} of ${s.length} selected`
				}), c && s.some(X) && /* @__PURE__ */ F("button", {
					type: "button",
					className: "pk-bulkList__quick",
					onClick: () => h(X),
					children: "Only unestimated"
				})]
			}),
			/* @__PURE__ */ F("ul", {
				className: "pk-bulkList__items",
				children: e.issues.map((e) => {
					let t = p(e.key), n = o.has(t);
					return /* @__PURE__ */ F("li", {
						className: L("pk-bulkList__item", { "is-added": n }),
						children: /* @__PURE__ */ F(A, {
							className: "pk-bulkList__check",
							checked: !n && l.has(t),
							disabled: n,
							onChange: (t) => m(e, !!t.value),
							children: /* @__PURE__ */ I("span", {
								className: "pk-bulkList__issue",
								title: e.summary,
								children: [/* @__PURE__ */ F("span", {
									className: "pk-bulkList__icon",
									"aria-hidden": !0,
									children: e.icon ? /* @__PURE__ */ F("img", {
										src: e.icon,
										alt: ""
									}) : /* @__PURE__ */ F("span", { children: "◇" })
								}), /* @__PURE__ */ I("span", {
									className: "pk-bulkList__body",
									children: [/* @__PURE__ */ I("span", {
										className: "pk-bulkList__keyLine",
										children: [
											/* @__PURE__ */ F("span", {
												className: "pk-bulkList__key",
												children: e.key
											}),
											e.status && /* @__PURE__ */ F("span", {
												className: "pk-bulkList__tag",
												children: e.status
											}),
											!X(e) && /* @__PURE__ */ I("span", {
												className: "pk-bulkList__tag is-estimate",
												children: [e.estimate, " pts"]
											}),
											n && /* @__PURE__ */ F("span", {
												className: "pk-bulkList__tag is-added",
												children: "In backlog"
											})
										]
									}), e.summary && /* @__PURE__ */ F("span", {
										className: "pk-bulkList__summary",
										children: e.summary
									})]
								})]
							})
						})
					}, t);
				})
			}),
			e.hasMore && /* @__PURE__ */ I("p", {
				className: "pk-bulkList__notice",
				children: [
					"More issues match than the ",
					t,
					" that were loaded. Narrow the selection to see the rest."
				]
			}),
			/* @__PURE__ */ F(k, {
				variant: "primary",
				size: "sm",
				fullWidth: !0,
				onClick: async () => {
					await r(d) > 0 && u(/* @__PURE__ */ new Set());
				},
				disabled: d.length === 0,
				label: Ie(d.length)
			})
		]
	});
}
// src/modules/poker/useIssueBatch.ts
var Re = {
	status: "idle",
	batch: null,
	error: null,
	version: 0
}, ze = "Could not load the issues.";
function Be(e) {
	return e instanceof Error && e.message ? e.message : ze;
}
function Ve() {
	let [e, t] = O(Re), n = D(0), r = w(async (e) => {
		n.current += 1;
		let r = n.current;
		t((e) => ({
			...e,
			status: "loading",
			error: null
		}));
		try {
			let i = await e();
			r === n.current && t({
				status: "ready",
				batch: i,
				error: null,
				version: r
			});
		} catch (e) {
			console.error("Could not load issues", e), r === n.current && t({
				status: "error",
				batch: null,
				error: Be(e),
				version: r
			});
		}
	}, []), i = w(() => {
		n.current += 1, t({
			...Re,
			version: n.current
		});
	}, []);
	return {
		...e,
		load: r,
		reset: i
	};
}
// src/modules/poker/QueryIssueLoader.tsx
var He = 2e3, Ue = "project = ABC AND sprint in openSprints() ORDER BY Rank", We = "No issues match this JQL.";
function Ge({ source: e, onAdd: t }) {
	let [n, r] = O(""), i = Ve(), a = n.trim(), o = () => {
		a.length > 0 && i.load(() => e.loadIssues(a, 100));
	};
	return /* @__PURE__ */ I("div", {
		className: "pk-bulkLoader",
		children: [
			/* @__PURE__ */ F(x, {
				label: "JQL",
				hint: "Press Ctrl+Enter to run.",
				children: /* @__PURE__ */ F(ae, {
					value: n,
					onChange: (e) => r(String(e.value ?? "")),
					onKeyDown: (e) => {
						e.key === "Enter" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), o());
					},
					placeholder: Ue,
					maxLength: He,
					rows: 3,
					autoResize: !0,
					maxHeight: "160px",
					spellCheck: !1,
					className: "pk-bulkLoader__query"
				})
			}),
			/* @__PURE__ */ F(k, {
				variant: "secondary",
				size: "sm",
				onClick: o,
				disabled: a.length === 0 || i.status === "loading",
				label: "Find issues"
			}),
			i.status === "loading" && /* @__PURE__ */ F(W, { label: "Searching Jira" }),
			i.status === "error" && /* @__PURE__ */ F("p", {
				className: "pk-bulkLoader__error",
				children: i.error
			}),
			i.status === "ready" && i.batch && /* @__PURE__ */ F(Le, {
				batch: i.batch,
				limit: 100,
				emptyMessage: We,
				onAdd: t
			}, i.version)
		]
	});
}
// src/modules/poker/SprintIssueLoader.tsx
var Ke = {
	active: "Active",
	future: "Future"
}, qe = "Could not load the boards.", Je = "Could not load the sprints of this board.", Ye = "This sprint has no issues to estimate.";
function Xe(e, t) {
	return e instanceof Error && e.message ? e.message : t;
}
function Ze(e) {
	return e.loading ? "Loading boards…" : e.items.length === 0 ? "No boards with sprints found" : "Choose a board";
}
function Qe(e, t) {
	let n = t.get(String(e.value));
	return /* @__PURE__ */ I("span", {
		className: "pk-sprintOption",
		children: [/* @__PURE__ */ F("span", {
			className: "pk-sprintOption__name",
			children: e.label
		}), n && /* @__PURE__ */ F("span", {
			className: `pk-sprintOption__state is-${n.state}`,
			children: Ke[n.state]
		})]
	});
}
function $e({ source: e, onAdd: t }) {
	let [n, r] = O({
		loading: !0,
		items: [],
		error: null
	}), [i, a] = O({
		loading: !1,
		items: [],
		error: null
	}), [o, s] = O(null), [c, l] = O(null), u = Ve(), { load: d, reset: f } = u;
	T(() => {
		let t = !1;
		return e.listBoards().then((e) => {
			t || r({
				loading: !1,
				items: e,
				error: null
			});
		}).catch((e) => {
			console.error("Could not load boards", e), t || r({
				loading: !1,
				items: [],
				error: Xe(e, qe)
			});
		}), () => {
			t = !0;
		};
	}, [e]);
	let p = w((t) => {
		l(t), t === null ? f() : d(() => e.loadSprintIssues(t, 100));
	}, [
		e,
		d,
		f
	]);
	T(() => {
		if (o === null) return;
		let t = !1;
		return a({
			loading: !0,
			items: [],
			error: null
		}), e.listSprints(o).then((e) => {
			if (t) return;
			a({
				loading: !1,
				items: e,
				error: null
			});
			let n = e.filter((e) => e.state === "active");
			n.length === 1 && p(n[0].id);
		}).catch((e) => {
			console.error("Could not load sprints", e), t || a({
				loading: !1,
				items: [],
				error: Xe(e, Je)
			});
		}), () => {
			t = !0;
		};
	}, [
		o,
		e,
		p
	]);
	let m = E(() => n.items.map((e) => ({
		value: e.id,
		label: e.name
	})), [n.items]), h = E(() => i.items.map((e) => ({
		value: e.id,
		label: e.name
	})), [i.items]), g = E(() => new Map(i.items.map((e) => [e.id, e])), [i.items]), _ = (e) => {
		s(e), a({
			loading: !1,
			items: [],
			error: null
		}), p(null);
	};
	return /* @__PURE__ */ I("div", {
		className: "pk-bulkLoader",
		children: [
			/* @__PURE__ */ F(x, {
				label: "Board",
				error: n.error ?? void 0,
				children: /* @__PURE__ */ F(M, {
					value: o,
					options: m,
					onChange: (e) => _(e.value ? String(e.value) : null),
					placeholder: Ze(n),
					loading: n.loading,
					disabled: n.loading || n.items.length === 0,
					emptyMessage: "No boards match",
					searchable: !0
				})
			}),
			/* @__PURE__ */ F(x, {
				label: "Sprint",
				error: i.error ?? void 0,
				children: /* @__PURE__ */ F(M, {
					value: c,
					options: h,
					onChange: (e) => p(e.value ? String(e.value) : null),
					placeholder: o === null ? "Choose a board first" : i.loading ? "Loading sprints…" : "Choose a sprint",
					loading: i.loading,
					disabled: o === null || i.loading,
					emptyMessage: "This board has no active or future sprints",
					renderItem: (e) => Qe(e, g),
					searchable: !0
				})
			}),
			u.status === "loading" && /* @__PURE__ */ F(W, { label: "Loading sprint issues" }),
			u.status === "error" && /* @__PURE__ */ F("p", {
				className: "pk-bulkLoader__error",
				children: u.error
			}),
			u.status === "ready" && u.batch && /* @__PURE__ */ F(Le, {
				batch: u.batch,
				limit: 100,
				emptyMessage: Ye,
				onAdd: t
			}, u.version)
		]
	});
}
// src/modules/poker/ProviderIssuePicker.tsx
var et = {
	jira: "Issue",
	sprint: "Sprint",
	query: "JQL",
	custom: "Custom"
};
function tt(e) {
	let t = ["jira"];
	return e.sprints && t.push("sprint"), e.query && t.push("query"), t.push("custom"), t;
}
function nt(e, t) {
	return t.includes(e);
}
function rt({ provider: e, mode: t, onModeChange: n, onPick: r, onPickMany: i }) {
	let a = E(() => tt(e), [e]), o = E(() => a.map((e) => ({
		value: e,
		label: et[e]
	})), [a]);
	return /* @__PURE__ */ I("div", {
		className: "pk-issuePicker",
		children: [
			/* @__PURE__ */ F(ie, {
				items: o,
				value: t,
				onChange: (e) => {
					nt(e.value, a) && n(e.value);
				},
				variant: "segmented",
				fullWidth: !0,
				ariaLabel: "How to add issues"
			}),
			t === "jira" && /* @__PURE__ */ F(Fe, { onPick: r }),
			t === "sprint" && e.sprints && /* @__PURE__ */ F($e, {
				source: e.sprints,
				onAdd: i
			}),
			t === "query" && e.query && /* @__PURE__ */ F(Ge, {
				source: e.query,
				onAdd: i
			}),
			t === "custom" && /* @__PURE__ */ F(Ne, { onPick: r })
		]
	});
}
// src/modules/poker/IssuePicker.tsx
function it({ onPick: e, onPickMany: t }) {
	let { issues: r } = n(), [i, a] = O(null), [o, s] = O("jira");
	return T(() => {
		if (r === null) {
			a(!1);
			return;
		}
		let e = !1;
		return r.isAvailable().then((t) => {
			e || a(t);
		}).catch((t) => {
			console.error("Could not check the issue source", t), e || a(!1);
		}), () => {
			e = !0;
		};
	}, [r]), i === null ? /* @__PURE__ */ F(N, {
		value: "",
		placeholder: "Checking for an issue source…",
		disabled: !0
	}) : !i || r === null ? /* @__PURE__ */ F(Ne, { onPick: e }) : /* @__PURE__ */ F(rt, {
		provider: r,
		mode: o,
		onModeChange: s,
		onPick: e,
		onPickMany: t
	});
}
// src/modules/poker/IssuePanel.tsx
function at(e) {
	return e === 1 ? "Added 1 issue to the backlog." : `Added ${e} issues to the backlog.`;
}
var ot = d.map((e) => ({
	value: e,
	label: s[e]
}));
function st() {
	let e = z((e) => e.showIssuePanel), t = z((e) => e.room), r = z((e) => e.viewingIssueId), i = z((e) => e.votesMap), a = z(U), o = z((e) => e.pendingIssues), { hideIssuePanel: s, addIssue: c, addIssues: l } = J(), { message: u } = n(), d = w(async (e) => {
		let t = await l(e);
		return t > 0 && u.success(at(t)), t;
	}, [l, u]), f = t?.issues ?? [], p = f.length + o.length;
	return /* @__PURE__ */ F(j, {
		open: e,
		onClose: s,
		position: "right",
		size: "420px",
		title: a ? "Issues & settings" : "Issues",
		children: /* @__PURE__ */ I("div", {
			className: "pk-panel",
			children: [
				a && /* @__PURE__ */ I("section", {
					className: "pk-panel__section",
					children: [/* @__PURE__ */ F("h3", {
						className: "pk-panel__sectionTitle",
						children: "Add issues"
					}), /* @__PURE__ */ F(it, {
						onPick: c,
						onPickMany: d
					})]
				}),
				/* @__PURE__ */ I("section", {
					className: "pk-panel__section",
					children: [
						/* @__PURE__ */ I("h3", {
							className: "pk-panel__sectionTitle",
							children: ["Backlog", /* @__PURE__ */ F("span", {
								className: "pk-panel__count",
								children: p
							})]
						}),
						a && p > 0 && /* @__PURE__ */ F("p", {
							className: "pk-panel__fieldHint",
							children: "Click an issue to show it to everyone, then press Start round."
						}),
						p === 0 ? /* @__PURE__ */ F("p", {
							className: "pk-panel__empty",
							children: a ? "Use Add issues above to fill the backlog." : "The moderator has not added any issues yet."
						}) : /* @__PURE__ */ I("ul", {
							className: "pk-panel__list",
							children: [f.map((e) => /* @__PURE__ */ F(lt, {
								issue: e,
								isSelected: r === e.id,
								isEstimating: t?.currentIssueId === e.id,
								finalScore: i[e.id]?.reveal ? i[e.id]?.finalScore : void 0,
								isSynced: i[e.id]?.syncedScore !== void 0,
								isModerator: a
							}, e.id)), o.map((e) => /* @__PURE__ */ F(ct, { issue: e }, e.pendingId))]
						})
					]
				}),
				a && t !== null && /* @__PURE__ */ F(ut, {})
			]
		})
	});
}
function ct({ issue: e }) {
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
			/* @__PURE__ */ F(W, { label: "Adding" })
		]
	}) });
}
function lt({ issue: e, isSelected: t, isEstimating: n, finalScore: r, isSynced: i, isModerator: a }) {
	let { selectIssue: o, removeIssue: s } = J(), c = K(G.issue(e.id));
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
			c ? /* @__PURE__ */ F(W, { label: "Removing" }) : /* @__PURE__ */ I("div", {
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
function ut() {
	let e = z((e) => e.room), { updateSettings: t, updateAccess: i } = J(), { host: o } = n(), s = K(G.settings), l = z((e) => e.estimateTarget);
	if (e === null) return null;
	let { settings: u, scoreType: d } = e, f = r(d);
	return /* @__PURE__ */ I("section", {
		className: "pk-panel__section",
		children: [/* @__PURE__ */ I("h3", {
			className: "pk-panel__sectionTitle",
			children: ["Round settings", s && /* @__PURE__ */ F(W, { label: "Saving" })]
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
				l !== null && c(d) && /* @__PURE__ */ I("div", {
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
							options: ot,
							disabled: !l.ready
						}),
						/* @__PURE__ */ F("p", {
							className: "pk-panel__fieldHint",
							children: l.ready ? `Saved to the "${l.fieldName}" field. You can always change the value and update it by hand after the reveal.` : l.reason
						})
					]
				})
			]
		})]
	});
}
// src/modules/poker/JoinRequestsPanel.tsx
function dt() {
	let e = z((e) => e.showJoinRequests), t = z((e) => e.joinRequests), n = z((e) => e.room?.access.requireApproval ?? !1), r = z(U), { hideJoinRequests: i, approveJoin: a, rejectJoin: o, approveAllJoin: s, rejectAllJoin: c } = J(), [l, u] = O(!1);
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
								/* @__PURE__ */ F(Y, {
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
function ft(e) {
	return e === void 0 ? "–" : e === "?" ? "?" : e === "~" ? "☕" : String(e);
}
function pt() {
	let e = z((e) => e.members), t = z((e) => e.sid), n = z((e) => e.room?.moderatorId ?? ""), r = z((e) => e.room?.currentIssueId ?? null), i = z((e) => e.viewingIssueId), a = z((e) => e.viewingIssueId ? e.votesMap[e.viewingIssueId] : void 0), o = z(U), s = !!i && i === r, c = !!a?.reveal, l = E(() => [...e].sort((e, r) => e.id === t ? -1 : r.id === t ? 1 : e.id === n ? -1 : r.id === n ? 1 : e.name.localeCompare(r.name)), [
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
			children: l.map((e) => /* @__PURE__ */ F(mt, {
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
function mt({ member: e, vote: t, issueId: n, isSelf: r, isRoomModerator: i, isVotingActive: a, revealed: o, canManage: s }) {
	let { kickMember: c, transferModerator: l } = J(), u = K(G.member(e.id)), d = n !== null && e.votedIssueIds.includes(n), f = o ? "revealed" : a ? d ? "locked" : "thinking" : "idle";
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
					children: ft(t)
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
				children: [/* @__PURE__ */ F(Y, {
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
			u && /* @__PURE__ */ F(W, {
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
function ht({ reason: e, onExit: t }) {
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
function gt({ isOpen: e, onClose: t, onHandOver: n, onCloseRoom: r }) {
	let i = z((e) => e.members), a = z((e) => e.sid), o = E(() => i.filter((e) => e.id !== a), [i, a]), [s, c] = O(""), l = K(G.leave);
	T(() => {
		e && c((e) => o.some((t) => t.id === e) ? e : o[0]?.id ?? "");
	}, [e, o]);
	let u = o.length > 0;
	return /* @__PURE__ */ F(re, {
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
// src/modules/poker/useCanInvite.ts
function _t() {
	let e = z(U), { host: t, userPicker: r } = n();
	return e && t.capabilities.invitations && r !== null;
}
// src/modules/poker/RoomHeader.tsx
var vt = {
	idle: "Connecting",
	connecting: "Connecting",
	connected: "Live",
	reconnecting: "Reconnecting",
	degraded: "Retrying",
	closed: "Offline"
};
function yt({ onExit: e }) {
	let t = z((e) => e.room), r = z(U), i = z((e) => e.connectionStatus), a = z((e) => e.membersMap[e.sid]), o = z((e) => e.members.length), s = z((e) => e.joinRequests.length), c = z((e) => (e.room?.issues.length ?? 0) + e.pendingIssues.length), { identity: l } = n(), u = _t(), { copyInviteLink: d, copyRoomCode: f, showIssuePanel: p, showJoinRequests: m, showInvitePanel: g, leaveRoom: _, closeRoom: ee } = J(), [v, y] = O(!1), [b, x] = O(!1), S = D(null), C = r && (t?.access.requireApproval || s > 0);
	T(() => {
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
	let w = async (t) => {
		await t() && (y(!1), x(!1), e());
	}, E = async () => {
		r ? (y(!1), x(!0)) : await w(() => _());
	};
	return /* @__PURE__ */ I("header", {
		className: "pk-roomHeader",
		children: [
			/* @__PURE__ */ I("button", {
				type: "button",
				className: L("pk-roomHeader__issues", { "is-attention": r && c === 0 }),
				onClick: p,
				title: r ? "Issues and room settings" : "Issues",
				"aria-label": r ? `Open issues and room settings, ${c} in backlog` : `Open issues, ${c} in backlog`,
				children: [
					/* @__PURE__ */ F("span", {
						className: "pk-roomHeader__issuesIcon",
						"aria-hidden": !0,
						children: "☰"
					}),
					/* @__PURE__ */ F("span", {
						className: "pk-roomHeader__issuesLabel",
						children: "Issues"
					}),
					/* @__PURE__ */ F("span", {
						className: "pk-roomHeader__issuesCount",
						"aria-hidden": !0,
						children: c
					})
				]
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
							}), vt[i] ?? i]
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
					C && /* @__PURE__ */ F(k, {
						variant: s > 0 ? "primary" : "secondary",
						layout: "outlined",
						size: "sm",
						onClick: m,
						label: s > 0 ? `Requests (${s})` : "Requests"
					}),
					u && /* @__PURE__ */ F(k, {
						variant: "secondary",
						layout: "outlined",
						size: "sm",
						onClick: g,
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
					/* @__PURE__ */ F(h, {}),
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
							children: [/* @__PURE__ */ F(Y, {
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
								l.allowsAvatarPicker && /* @__PURE__ */ F("div", {
									className: "pk-roomHeader__menuBody",
									children: /* @__PURE__ */ F(bt, {
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
										onClick: E,
										label: "Leave or close room"
									}) : /* @__PURE__ */ F(k, {
										variant: "danger",
										layout: "plain",
										size: "sm",
										fullWidth: !0,
										onClick: E,
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
			/* @__PURE__ */ F(gt, {
				isOpen: b,
				onClose: () => x(!1),
				onHandOver: (e) => w(() => _(e)),
				onCloseRoom: () => w(() => ee())
			})
		]
	});
}
function bt({ currentAvatarId: e, profileImageUrl: t }) {
	let { setAvatar: n } = J(), r = K(G.avatar);
	return /* @__PURE__ */ I("div", {
		className: "pk-roomHeader__avatarPicker",
		children: [/* @__PURE__ */ F(b, {
			value: e,
			onChange: (e) => void n(e),
			className: "pk-roomHeader__avatarGrid",
			profileImageUrl: t
		}), r && /* @__PURE__ */ F(W, {
			label: "Saving",
			className: "pk-roomHeader__avatarSaving"
		})]
	});
}
// src/modules/poker/EstimateSync.tsx
function xt({ room: e, issue: t, vote: n }) {
	let r = z(U), a = z((e) => e.estimateTarget);
	if (!n.reveal || !t.root || !c(e.scoreType)) return null;
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
	let s = i(n.finalScore) ? n.finalScore : void 0, l = i(n.syncedScore) ? n.syncedScore : s;
	return /* @__PURE__ */ F(St, {
		room: e,
		issueId: t.id,
		fieldName: a.fieldName,
		initial: l,
		synced: o
	}, `${t.id}:${l ?? ""}`);
}
function St({ room: e, issueId: t, fieldName: n, initial: r, synced: a }) {
	let [s, c] = O(r), l = K(G.estimate(t)), { saveEstimate: u } = J(), d = o(e.scoreType, e.settings.maxPoints, e.settings.showHalfScore).filter(i), f = (r === void 0 || d.includes(r) ? d : [...d, r].sort((e, t) => e - t)).map((e) => ({
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
// src/modules/poker/guide/GuideStep.tsx
function Z({ index: e, title: t, text: n, done: r = !1, children: i }) {
	return /* @__PURE__ */ I("li", {
		className: L("pk-guide__step", { "is-done": r }),
		children: [/* @__PURE__ */ F("span", {
			className: "pk-guide__marker",
			"aria-hidden": !0,
			children: r ? "✓" : e
		}), /* @__PURE__ */ I("div", {
			className: "pk-guide__body",
			children: [
				/* @__PURE__ */ I("p", {
					className: "pk-guide__stepTitle",
					children: [t, r && /* @__PURE__ */ F("span", {
						className: "pk-visually-hidden",
						children: " (done)"
					})]
				}),
				/* @__PURE__ */ F("p", {
					className: "pk-guide__stepText",
					children: n
				}),
				i && /* @__PURE__ */ F("div", {
					className: "pk-guide__actions",
					children: i
				})
			]
		})]
	});
}
// src/modules/poker/guide/ModeratorGuide.tsx
var Ct = "Search for a single issue, load a whole sprint, or run a JQL query. You can also add your own items.", wt = "Search for issues one at a time, or add your own items by title.", Tt = "Add each story you want to estimate by its key or a short title.", Et = "Share the room link. Anyone who opens it can join and vote.", Dt = "Press Start round to open voting. Everyone picks a card in private, then you press Reveal votes and agree on a final score.";
function Ot(e) {
	return e === 1 ? "1 person has joined so far." : `${e} people have joined so far.`;
}
function kt() {
	let e = z((e) => e.members.length), t = z((e) => (e.room?.issues.length ?? 0) + e.pendingIssues.length), { issues: r } = n(), i = _t(), { copyInviteLink: a, showInvitePanel: o, showIssuePanel: s } = J(), c = e - 1, l = r === null ? Tt : r.sprints || r.query ? Ct : wt;
	return /* @__PURE__ */ I("section", {
		className: "pk-guide",
		"aria-labelledby": "pk-guide-title",
		children: [
			/* @__PURE__ */ F("h2", {
				id: "pk-guide-title",
				className: "pk-guide__title",
				children: "Get your room ready"
			}),
			/* @__PURE__ */ F("p", {
				className: "pk-guide__lead",
				children: "Three steps to your first estimate. You can invite people and add issues in any order."
			}),
			/* @__PURE__ */ I("ol", {
				className: "pk-guide__steps",
				children: [
					/* @__PURE__ */ I(Z, {
						index: 1,
						title: "Invite your team",
						text: c > 0 ? Ot(c) : Et,
						done: c > 0,
						children: [/* @__PURE__ */ F(k, {
							variant: "secondary",
							layout: "outlined",
							size: "sm",
							onClick: a,
							label: "Copy invite link"
						}), i && /* @__PURE__ */ F(k, {
							variant: "secondary",
							layout: "outlined",
							size: "sm",
							onClick: o,
							label: "Invite people"
						})]
					}),
					/* @__PURE__ */ F(Z, {
						index: 2,
						title: "Add issues to estimate",
						text: l,
						done: t > 0,
						children: /* @__PURE__ */ F(k, {
							variant: "primary",
							size: "sm",
							onClick: s,
							label: "Add issues"
						})
					}),
					/* @__PURE__ */ F(Z, {
						index: 3,
						title: "Run a round",
						text: Dt
					})
				]
			}),
			/* @__PURE__ */ I("p", {
				className: "pk-guide__tip",
				children: [
					"Tip: the ",
					/* @__PURE__ */ F("strong", { children: "Issues" }),
					" button in the top bar opens the backlog and the round settings, such as auto-reveal and the highest card."
				]
			})
		]
	});
}
// src/modules/poker/guide/PlayerGuide.tsx
function At() {
	let { showIssuePanel: e } = J();
	return /* @__PURE__ */ I("section", {
		className: "pk-guide",
		"aria-labelledby": "pk-guide-title",
		children: [
			/* @__PURE__ */ F("h2", {
				id: "pk-guide-title",
				className: "pk-guide__title",
				children: "You are in"
			}),
			/* @__PURE__ */ F("p", {
				className: "pk-guide__lead",
				children: "The moderator has not added any issues yet. Here is how a round works."
			}),
			/* @__PURE__ */ I("ol", {
				className: "pk-guide__steps",
				children: [
					/* @__PURE__ */ F(Z, {
						index: 1,
						title: "Wait for a round",
						text: "The moderator picks an issue and starts a round. It appears right here."
					}),
					/* @__PURE__ */ F(Z, {
						index: 2,
						title: "Pick your card",
						text: "Choose your estimate from the cards at the bottom. Nobody sees it until the votes are revealed."
					}),
					/* @__PURE__ */ F(Z, {
						index: 3,
						title: "Compare and discuss",
						text: "Once the votes are revealed, everyone sees each estimate, the average, and the final score."
					})
				]
			}),
			/* @__PURE__ */ F("div", {
				className: "pk-guide__actions",
				children: /* @__PURE__ */ F(k, {
					variant: "secondary",
					layout: "outlined",
					size: "sm",
					onClick: e,
					label: "View backlog"
				})
			})
		]
	});
}
// src/modules/poker/guide/GettingStarted.tsx
function jt() {
	return z(U) ? /* @__PURE__ */ F(kt, {}) : /* @__PURE__ */ F(At, {});
}
// src/modules/poker/IssueNavigator.tsx
function Mt() {
	let e = z((e) => e.room?.issues), t = z((e) => e.viewingIssueId), { selectIssue: n, showIssuePanel: r } = J();
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
var Nt = {
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
}, Pt = {
	idle: "Press Start round when the team is ready to vote on this issue.",
	voting: "Votes stay hidden until you press Reveal votes.",
	revealed: "Agree on a final score, then move on to the next issue."
};
function Ft() {
	let e = z((e) => e.room), t = z((e) => e.viewingIssueId), n = z((e) => e.viewingIssueId ? e.issuesMap[e.viewingIssueId] : void 0), r = z((e) => e.viewingIssueId ? e.votesMap[e.viewingIssueId] : void 0), i = z((e) => e.members), a = z(U), { startRound: o, restartRound: s, revealVotes: c, showIssuePanel: l } = J(), u = !!t && t === e?.currentIssueId, d = !!r?.reveal, f = d ? "revealed" : u ? "voting" : "idle", p = u ? i.filter((e) => e.votedIssueIds.includes(t)).length : 0, m = i.length, h = m > 0 ? Math.round(p / m * 100) : 0;
	return (e?.issues.length ?? 0) > 0 ? /* @__PURE__ */ I("section", {
		className: "pk-stage",
		children: [
			/* @__PURE__ */ I("div", {
				className: "pk-stage__head",
				children: [/* @__PURE__ */ I("div", {
					className: "pk-stage__lead",
					children: [/* @__PURE__ */ I("span", {
						className: `pk-stage__status is-${Nt[f].tone}`,
						children: [/* @__PURE__ */ F("span", {
							className: "pk-stage__statusDot",
							"aria-hidden": !0
						}), Nt[f].label]
					}), /* @__PURE__ */ F(Mt, {})]
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
				children: [
					/* @__PURE__ */ I("div", {
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
					}),
					n.summary && /* @__PURE__ */ F("p", {
						className: "pk-stage__issueSummary",
						children: n.summary
					}),
					a && /* @__PURE__ */ F("p", {
						className: "pk-stage__hint",
						children: Pt[f]
					})
				]
			}) : /* @__PURE__ */ I("div", {
				className: "pk-stage__empty",
				children: [
					/* @__PURE__ */ F("p", {
						className: "pk-stage__emptyTitle",
						children: "No issue selected"
					}),
					/* @__PURE__ */ F("p", {
						className: "pk-stage__emptyText",
						children: a ? "Choose an issue from the backlog to show it to everyone." : "Waiting for the moderator to choose an issue."
					}),
					/* @__PURE__ */ F(k, {
						variant: "secondary",
						layout: "outlined",
						size: "sm",
						onClick: l,
						label: "Open backlog"
					})
				]
			}),
			/* @__PURE__ */ I("div", {
				className: "pk-stage__stats",
				children: [
					/* @__PURE__ */ F(Q, {
						label: "Final",
						value: d && r?.finalScore !== void 0 ? String(r.finalScore) : "—",
						accent: !0
					}),
					/* @__PURE__ */ F(Q, {
						label: "Average",
						value: d && r?.average !== void 0 ? r.average.toFixed(1) : "—"
					}),
					/* @__PURE__ */ F(Q, {
						label: "Highest",
						value: d && r?.maxVote !== void 0 ? String(r.maxVote) : "—"
					}),
					/* @__PURE__ */ F(Q, {
						label: "Voted",
						value: u ? `${p}/${m}` : "—"
					})
				]
			}),
			e && n && r && /* @__PURE__ */ F(xt, {
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
	}) : /* @__PURE__ */ F("section", {
		className: "pk-stage",
		children: /* @__PURE__ */ F(jt, {})
	});
}
function Q({ label: e, value: t, accent: n = !1 }) {
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
var It = 1500;
function Lt() {
	let { revealVotes: e } = J(), t = D(/* @__PURE__ */ new Set()), n = z(U), r = z((e) => e.room?.settings.autoReveal ?? !1), i = z((e) => e.room?.currentIssueId ?? null), a = z((e) => e.room?.currentIssueId ? !!e.votesMap[e.room.currentIssueId]?.reveal : !1), o = z((e) => {
		let t = e.room?.currentIssueId;
		return !!t && e.members.length > 0 && e.members.every((e) => e.votedIssueIds.includes(t));
	});
	T(() => {
		if (!n || !r || i === null || a || !o || t.current.has(i)) return;
		let s = setTimeout(() => {
			t.current.add(i), e();
		}, It);
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
function Rt() {
	let { issues: e } = n(), { saveEstimate: t } = J(), r = D(/* @__PURE__ */ new Set()), i = z(U), a = z((e) => e.estimateTarget), o = z((e) => e.room?.settings.estimateSync ?? "manual"), s = z((e) => e.room?.scoreType), l = z((e) => e.room?.currentIssueId ? e.issuesMap[e.room.currentIssueId] : void 0), u = z((e) => e.room?.currentIssueId ? e.votesMap[e.room.currentIssueId] : void 0);
	T(() => {
		if (!i || e === null) {
			B({ estimateTarget: null });
			return;
		}
		let t = !0;
		return e.getEstimateTarget().then((e) => {
			t && B({ estimateTarget: e });
		}).catch((e) => {
			console.error("Could not check where estimates are saved", e), t && B({ estimateTarget: null });
		}), () => {
			t = !1;
		};
	}, [i, e]), T(() => {
		if (!i || !a?.ready || s === void 0 || !c(s) || !l?.root || !u || u.syncedScore !== void 0 || r.current.has(u.issueId)) return;
		let e = f(o, u);
		e !== void 0 && (r.current.add(u.issueId), t(u.issueId, e));
	}, [
		i,
		a,
		s,
		l,
		u,
		o,
		t
	]);
}
// src/modules/poker/presence.ts
function zt(e, t, n, r) {
	return e.filter((e) => {
		if (!e.isOnline || e.id === r || !e.lastSeenAt) return !1;
		let i = Date.parse(e.lastSeenAt);
		return Number.isFinite(i) && t - i > n;
	}).map((e) => e.id);
}
function Bt(e, t) {
	if (!e) return null;
	let n = Date.parse(e);
	return Number.isFinite(n) ? n - t : null;
}
// src/modules/poker/revision.ts
function Vt(e, t) {
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
var Ht = "RATE_LIMITED", Ut = /* @__PURE__ */ new Set([
	"submitVote",
	"revealVotes",
	"startRound",
	"restartRound"
]), Wt = /* @__PURE__ */ new Set([
	"roomState",
	"heartbeatResult",
	"ack"
]);
function $(e, t) {
	return {
		members: t,
		membersMap: H(t),
		offlineSince: me(t, e.offlineSince, Date.now(), e.serverOffsetMs)
	};
}
function Gt(e, t) {
	let n = e.viewingIssueId !== null && t.room.issues.some((t) => t.id === e.viewingIssueId) ? e.viewingIssueId : t.room.currentIssueId ?? t.room.issues[0]?.id ?? null, r = Bt(t.serverTime, Date.now()) ?? e.serverOffsetMs;
	return {
		room: t.room,
		members: t.members,
		membersMap: H(t.members),
		issuesMap: H(t.room.issues),
		votesMap: pe(t.votes),
		onlineIds: t.members.filter((e) => e.isOnline).map((e) => e.id),
		serverOffsetMs: r,
		offlineSince: me(t.members, e.offlineSince, Date.now(), r),
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
function Kt(e, t) {
	let n = new Map(e.members.map((e) => [e.id, e]));
	for (let e of t) n.set(e.id, e);
	return [...n.values()];
}
function qt(e, t, n = e.members) {
	let r = new Set(t);
	return {
		onlineIds: t,
		...$(e, n.map((e) => ({
			...e,
			isOnline: r.has(e.id)
		})))
	};
}
function Jt(e, t) {
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
function Yt(e, t) {
	let n = new Set(t.votedIds), r = !1, i = e.members.map((e) => !n.has(e.id) || e.votedIssueIds.includes(t.issueId) ? e : (r = !0, {
		...e,
		votedIssueIds: [...e.votedIssueIds, t.issueId]
	}));
	return r ? {
		members: i,
		membersMap: H(i)
	} : {};
}
function Xt(e, t) {
	if (e.room === null) return {};
	let n = e.viewingIssueId !== null && t.issues.some((t) => t.id === e.viewingIssueId) ? e.viewingIssueId : t.currentIssueId ?? t.issues[0]?.id ?? null;
	return {
		room: {
			...e.room,
			issues: t.issues,
			currentIssueId: t.currentIssueId
		},
		issuesMap: H(t.issues),
		viewingIssueId: n
	};
}
function Zt(e, t) {
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
		issuesMap: H(t.issues),
		members: n,
		membersMap: H(n),
		votesMap: {
			...e.votesMap,
			[t.vote.issueId]: t.vote
		},
		viewingIssueId: t.currentIssueId
	};
}
function Qt(e, t, n) {
	return e.joinRequests.some((e) => e.requestId === t.request.requestId) ? {
		patch: {},
		effects: []
	} : {
		patch: { joinRequests: [...e.joinRequests, t.request] },
		effects: [() => n.message.info(`${t.request.name} wants to join the room`)]
	};
}
function $t(e, t, n) {
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
function en(e, t, n) {
	let r = Bt(t.serverTime, Date.now()) ?? e.serverOffsetMs, i = t.lastSeen, a = i ? e.members.map((e) => i[e.id] ? {
		...e,
		lastSeenAt: i[e.id]
	} : e) : e.members, o = t.revision > e.lastRevision || e.room !== null && e.room.moderatorId === e.sid && t.pendingJoinRequests !== e.joinRequests.length;
	return {
		patch: {
			serverOffsetMs: r,
			...qt({
				...e,
				serverOffsetMs: r
			}, t.onlineIds, a)
		},
		effects: o ? [n.resync] : []
	};
}
function tn(e, t, n) {
	let r = [];
	if (t?.code === Ht) r.push(() => n.message.error(v));
	else if (t?.message) {
		let e = t.message;
		r.push(() => n.message.error(e));
	}
	return (t?.code === Ht || t?.action && Ut.has(t.action)) && r.push(n.resync), {
		patch: e.bulkJoinAction === null ? {} : {
			bulkJoinAction: null,
			bulkDisableApproval: !1
		},
		effects: r
	};
}
function nn(e, t, n) {
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
function rn(e, t, n) {
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
			patch: Gt(e, t.payload),
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
				patch: $(e, Kt(e, [r])),
				effects: [() => n.message.info(`${r.name} joined the room`)]
			};
		}
		case "membersJoined": return {
			patch: $(e, Kt(e, t.payload.members)),
			effects: r
		};
		case "memberUpdated": return {
			patch: $(e, Kt(e, [t.payload.member])),
			effects: r
		};
		case "memberLeft": {
			let n = t.payload.sid;
			return {
				patch: $(e, e.members.filter((e) => e.id !== n)),
				effects: r
			};
		}
		case "presenceUpdate": return {
			patch: qt(e, t.payload.onlineIds),
			effects: r
		};
		case "heartbeatResult": return en(e, t.payload, n);
		case "issuesUpdated": return {
			patch: Xt(e, t.payload),
			effects: r
		};
		case "roundStarted": return {
			patch: Zt(e, t.payload),
			effects: r
		};
		case "voteProgress": return {
			patch: Yt(e, t.payload),
			effects: r
		};
		case "voteUpdated": return {
			patch: Jt(e, t.payload.vote),
			effects: r
		};
		case "votesRevealed": return {
			patch: Jt(e, t.payload.vote),
			effects: r
		};
		case "joinRequested": return Qt(e, t.payload, n);
		case "joinRequestResolved": return $t(e, t.payload, n);
		case "invitationsUpdated": return {
			patch: { invitations: t.payload.invitations },
			effects: r
		};
		case "moderatorChanged": return nn(e, t.payload, n);
		case "kicked":
		case "roomClosed": return {
			patch: { closedReason: t.payload.reason },
			effects: r
		};
		case "sessionTakenOver": return {
			patch: { closedReason: "You joined this room from another tab or device." },
			effects: r
		};
		case "error": return tn(e, t.payload, n);
		default: return {
			patch: {},
			effects: r
		};
	}
}
function an(e, t, n) {
	if (Wt.has(t.action)) return rn(e, t, n);
	let r = Vt(e.lastRevision, t.revision);
	if (!r.apply) return {
		patch: {},
		effects: []
	};
	let i = rn({
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
function on(e, t) {
	let n = [];
	V((r) => {
		let i = an(r, e, t);
		return n = i.effects, i.patch;
	}, () => n.forEach((e) => e()));
}
function sn() {
	V((e) => {
		let t = new Set(zt(e.members, Date.now() + e.serverOffsetMs, m, e.sid));
		return t.size === 0 ? {} : {
			onlineIds: e.onlineIds.filter((e) => !t.has(e)),
			...$(e, e.members.map((e) => t.has(e.id) ? {
				...e,
				isOnline: !1
			} : e))
		};
	});
}
// src/modules/poker/useRoomConnection.ts
function cn(e, t) {
	let { realtime: r, message: i, host: a } = n(), o = a.capabilities.presenceHeartbeat;
	T(() => {
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
		}, s = r.onMessage((e) => on(e, a)), c = r.onStatusChange((e) => B({ connectionStatus: e })), l = r.onReconnectChange?.((e) => B({ reconnect: e }));
		r.connect(e);
		let u = null, d = null, f = !1, p = () => {
			f || (f = !0, r.send("exitRoom"));
		};
		return o && (u = setInterval(() => {
			r.send("heartbeat");
		}, _), d = setInterval(sn, g), window.addEventListener("pagehide", p)), () => {
			n !== null && clearTimeout(n), u !== null && clearInterval(u), d !== null && clearInterval(d), o && (window.removeEventListener("pagehide", p), R.getState().closedReason === null && p()), s(), c(), l?.(), r.disconnect(), B({ reconnect: null });
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
var ln = "We could not open this room. It may have been closed, or you may no longer be a member.";
function un() {
	let { roomId: r = "" } = te(), i = t(), { session: a, room: o } = n(), [s, c] = O(null), l = z((e) => e.isLoaded), u = z((e) => e.closedReason), d = z((e) => e.connectionStatus);
	T(() => {
		if (!r) {
			i.toHome();
			return;
		}
		let e = a.sessionFor(r);
		if (e === null) i.toJoin(r);
		else return B({
			roomId: r,
			sid: e.sid,
			role: e.role
		}), c(!0), o.refreshSession?.().catch((e) => {
			console.error("Could not refresh the room session", e);
		}), () => {
			le();
		};
	}, [
		r,
		i,
		a,
		o
	]), cn(r, s === !0 && u === null), Rt(), Lt();
	let f = () => {
		a.clear(), le(), i.toHome();
	};
	return s === null ? /* @__PURE__ */ F(e, { label: "Checking your session" }) : u === null ? !l && d === "closed" ? /* @__PURE__ */ F(ht, {
		reason: ln,
		onExit: f
	}) : l ? /* @__PURE__ */ I("div", {
		className: "pk-room",
		children: [
			/* @__PURE__ */ F(yt, { onExit: f }),
			/* @__PURE__ */ F(Ae, {}),
			/* @__PURE__ */ F(je, {}),
			/* @__PURE__ */ F("main", {
				className: "pk-room__main pk-scroll",
				children: /* @__PURE__ */ I("div", {
					className: "pk-room__content",
					children: [/* @__PURE__ */ F(Ft, {}), /* @__PURE__ */ F(pt, {})]
				})
			}),
			/* @__PURE__ */ F(xe, {}),
			/* @__PURE__ */ F(st, {}),
			/* @__PURE__ */ F(dt, {}),
			/* @__PURE__ */ F(Me, {}),
			/* @__PURE__ */ F(Ee, {})
		]
	}) : /* @__PURE__ */ I("div", {
		className: "pk-room",
		children: [/* @__PURE__ */ F(Ae, {}), /* @__PURE__ */ F(e, { label: d === "reconnecting" ? "Reconnecting" : "Joining the room" })]
	}) : /* @__PURE__ */ F(ht, {
		reason: u,
		onExit: f
	});
}
export { un as default };
