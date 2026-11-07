import { t as e } from "./AppLoader-D9yvNwlE.js";
import { a as t, o as n } from "./theme-BRWg1AQm.js";
import { a as r, n as i, o as a, u as o } from "./scores-BUpnRFKN.js";
import { i as s, n as c, o as l, r as u, t as d } from "./estimates-Dobh8bG9.js";
import { c as f, d as p, l as m, n as h, r as g, u as _ } from "./constants-BkFPV1oy.js";
import { n as v, r as y, t as b } from "./LabeledField-DyAMkIEx.js";
import { i as x, t as S } from "./avatars-r3RGoSWH.js";
import { useCallback as C, useEffect as w, useMemo as T, useRef as E, useState as D } from "react";
import { useParams as O } from "react-router";
import { Autocomplete as k, Button as A, Checkbox as j, Drawer as M, Dropdown as N, Modal as ee, SelectButton as te, TextInput as P } from "fluxo-ui";
import { Fragment as F, jsx as I, jsxs as L } from "react/jsx-runtime";
import R from "classnames";
import { create as z, createHook as ne } from "fluxo-ui/store";
// src/store/poker-store.ts
var re = {
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
}, B = z(() => ({ ...re })), V = ne(B);
function H(e) {
	B.setState(e);
}
function ie() {
	B.setState({ ...re });
}
function U(e, t) {
	B.setState(e, t);
}
function ae(e) {
	U((t) => ({ pendingActions: {
		...t.pendingActions,
		[e]: (t.pendingActions[e] ?? 0) + 1
	} }));
}
function oe(e) {
	U((t) => {
		let n = (t.pendingActions[e] ?? 0) - 1, r = { ...t.pendingActions };
		return n > 0 ? r[e] = n : delete r[e], { pendingActions: r };
	});
}
function se(e, t) {
	return (e.pendingActions[t] ?? 0) > 0;
}
function W(e) {
	return e.reduce((e, t) => (e[t.id] = t, e), {});
}
function ce(e) {
	return e.reduce((e, t) => (e[t.issueId] = t, e), {});
}
function le(e, t, n, r = 0) {
	let i = {};
	for (let a of e) if (!a.isOnline) {
		let e = a.lastSeenAt ? Date.parse(a.lastSeenAt) - r : NaN;
		i[a.id] = t[a.id] ?? (Number.isFinite(e) ? Math.min(e, n) : n);
	}
	return i;
}
function G(e) {
	return e.room !== null && e.room.moderatorId === e.sid;
}
// src/components/InlineSpinner.tsx
function K({ label: e, className: t }) {
	return /* @__PURE__ */ L("span", {
		className: R("pk-inlineSpinner", t),
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ I("span", {
			className: "pk-inlineSpinner__ring",
			"aria-hidden": !0
		}), e && /* @__PURE__ */ I("span", {
			className: "pk-inlineSpinner__label",
			children: e
		})]
	});
}
// src/modules/poker/pending.ts
var q = {
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
function J(e) {
	return V((t) => se(t, e));
}
// src/modules/poker/usePokerActions.ts
var ue = 0, Y = /* @__PURE__ */ new Set(), de = "Could not update the story points in Jira.";
function fe(e, t) {
	return e instanceof Error && e.message ? e.message : t;
}
function X() {
	let { realtime: e, session: t, message: r, host: i, issues: a } = n(), o = C(async (t, n, r) => {
		r && ae(r);
		try {
			let r = await e.send(t, n);
			return r || e.requestResync(), r;
		} catch (n) {
			return console.error(`Could not send '${t}'`, n), e.requestResync(), !1;
		} finally {
			r && oe(r);
		}
	}, [e]), s = C(async (e, t, n) => {
		if (Y.has(n)) return !1;
		Y.add(n);
		try {
			return await o(e, t, n);
		} finally {
			Y.delete(n);
		}
	}, [o]), c = C(async (e) => {
		let t = B.getState(), n = t.room?.currentIssueId;
		return !n || t.votesMap[n]?.reveal ? !1 : (U((t) => {
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
		}, q.vote));
	}, [o]), l = C(async () => {
		let { viewingIssueId: e } = B.getState();
		return e !== null && await s("startRound", { issueId: e }, q.round);
	}, [s]), u = C(async () => {
		let { viewingIssueId: e } = B.getState();
		return e !== null && await s("restartRound", { issueId: e }, q.round);
	}, [s]), d = C(async () => {
		let { room: e } = B.getState();
		return e?.currentIssueId != null && await s("revealVotes", { issueId: e.currentIssueId }, q.round);
	}, [s]), f = C(async (e) => {
		let { viewingIssueId: t } = B.getState();
		return t !== null && await s("setFinalScore", {
			issueId: t,
			finalScore: e
		}, q.round);
	}, [s]), p = C(async (e, t) => {
		let n = B.getState().issuesMap[e], i = q.estimate(e);
		if (!a || !n || Y.has(i)) return !1;
		Y.add(i), ae(i);
		try {
			try {
				await a.updateEstimate(n, t);
			} catch (e) {
				return console.error(`Could not update the estimate of ${n.key}`, e), r.error(fe(e, de)), !1;
			}
			return U((n) => {
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
			oe(i), Y.delete(i);
		}
	}, [
		a,
		r,
		o
	]), m = C(async (e) => {
		let t = e.key?.trim();
		if (!t) return !1;
		ue += 1;
		let n = `pending-${ue}`;
		U((r) => ({ pendingIssues: [...r.pendingIssues, {
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
			U((e) => ({ pendingIssues: e.pendingIssues.filter((e) => e.pendingId !== n) }));
		}
	}, [o]), h = C((e) => s("removeIssue", { issueId: e }, q.issue(e)), [s]), g = C((e) => o("reorderIssues", { issueIds: e }), [o]), _ = C((e) => {
		H({ viewingIssueId: e });
	}, []), v = C((e) => (U((t) => t.room === null ? {} : { room: {
		...t.room,
		settings: {
			...t.room.settings,
			...e
		}
	} }), o("updateSettings", e, q.settings)), [o]), y = C((e) => (U((t) => t.room === null ? {} : { room: {
		...t.room,
		access: {
			...t.room.access,
			...e
		}
	} }), o("updateAccess", e, q.settings)), [o]), b = C((e) => o("renameRoom", { roomName: e }, q.settings), [o]), x = C((e) => (U((t) => {
		let n = t.members.map((n) => n.id === t.sid ? {
			...n,
			avatarId: e
		} : n);
		return {
			members: n,
			membersMap: W(n)
		};
	}), o("updateAvatar", { avatarId: e }, q.avatar)), [o]), S = C((e) => s("kickMember", { sid: e }, q.member(e)), [s]), w = C((e) => s("transferModerator", { sid: e }, q.member(e)), [s]), T = C(() => s("claimModerator", {}, q.host), [s]), E = C((e) => s("approveJoin", { requestId: e }, q.joinRequest(e)), [s]), D = C((e) => s("rejectJoin", { requestId: e }, q.joinRequest(e)), [s]), O = C((e) => (H({
		bulkJoinAction: "approveAllJoin",
		bulkDisableApproval: e
	}), o("approveAllJoin", { disableApproval: e })), [o]), k = C(() => (H({
		bulkJoinAction: "rejectAllJoin",
		bulkDisableApproval: !1
	}), o("rejectAllJoin", {})), [o]), A = C((e) => s("inviteMembers", { users: e }, q.invite), [s]), j = C((e) => s("revokeInvite", { userId: e }, q.invitation(e)), [s]), M = C(() => {
		t.clear(), i.onRoomLeft?.();
	}, [t, i]), N = C(async (e) => {
		let t = await s("leaveRoom", e ? { successorSid: e } : {}, q.leave);
		return t && M(), t;
	}, [s, M]), ee = C(async () => {
		let e = await s("closeRoom", {}, q.leave);
		return e && M(), e;
	}, [s, M]), te = C(() => H({ showIssuePanel: !0 }), []), P = C(() => H({ showIssuePanel: !1 }), []), F = C(() => H({ showJoinRequests: !0 }), []), I = C(() => H({ showJoinRequests: !1 }), []), L = C(() => H({ showInvitePanel: !0 }), []), R = C(() => H({ showInvitePanel: !1 }), []), z = C(async (e, t, n) => {
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
		reorderIssues: g,
		selectIssue: _,
		updateSettings: v,
		updateAccess: y,
		renameRoom: b,
		setAvatar: x,
		kickMember: S,
		transferModerator: w,
		claimModerator: T,
		approveJoin: E,
		rejectJoin: D,
		approveAllJoin: O,
		rejectAllJoin: k,
		inviteMembers: A,
		revokeInvite: j,
		leaveRoom: N,
		closeRoom: ee,
		showIssuePanel: te,
		hideIssuePanel: P,
		showJoinRequests: F,
		hideJoinRequests: I,
		showInvitePanel: L,
		hideInvitePanel: R,
		copyInviteLink: C(async () => {
			let { roomId: e } = B.getState();
			e && await z(i.shareUrl(e), "Invite link copied", "Could not copy the invite link.");
		}, [z, i]),
		copyRoomCode: C(async () => {
			let { roomId: e } = B.getState();
			e && await z(e, "Room code copied", "Could not copy the room code.");
		}, [z]),
		resync: C(() => e.requestResync(), [e])
	};
}
// src/modules/poker/CardDeck.tsx
function pe() {
	let e = V((e) => e.room), t = V((e) => e.sid), n = V((e) => e.viewingIssueId), r = V((e) => e.viewingIssueId ? e.votesMap[e.viewingIssueId] : void 0), { submitVote: i } = X(), a = J(q.vote), s = !!n && n === e?.currentIssueId, c = !!r?.reveal, l = s && !c, u = r?.values?.[t], d = T(() => e === null ? [] : [
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
	return e === null || d.length === 0 ? null : /* @__PURE__ */ L("div", {
		className: `pk-deck ${l ? "" : "is-disabled"}`,
		children: [/* @__PURE__ */ L("div", {
			className: "pk-deck__bar",
			children: [
				/* @__PURE__ */ I("p", {
					className: "pk-deck__hint",
					children: n ? c ? "Round revealed — waiting for the next round" : s ? u === void 0 ? "Pick your estimate" : "Tap another card to change your estimate" : "Waiting for the moderator to start the round" : "Select an issue to see the deck"
				}),
				a && /* @__PURE__ */ I(K, { label: "Saving your estimate" }),
				!a && u !== void 0 && l && /* @__PURE__ */ L("span", {
					className: "pk-deck__myVote",
					children: ["Your estimate: ", /* @__PURE__ */ I("strong", { children: u === "~" ? "☕" : String(u) })]
				})
			]
		}), /* @__PURE__ */ I("div", {
			className: "pk-deck__cards pk-scroll",
			role: "group",
			"aria-label": "Estimation cards",
			children: d.map((e) => /* @__PURE__ */ L("button", {
				type: "button",
				className: `pk-card ${u === e.value ? "is-selected" : ""}`,
				onClick: () => void i(e.value),
				disabled: !l,
				title: e.hint ? `${e.hint} (${e.label})` : e.label,
				"aria-pressed": u === e.value,
				children: [
					/* @__PURE__ */ I("span", {
						className: "pk-card__corner",
						children: e.label
					}),
					/* @__PURE__ */ I("span", {
						className: "pk-card__value",
						children: e.label
					}),
					/* @__PURE__ */ I("span", {
						className: "pk-card__corner is-bottom",
						children: e.label
					})
				]
			}, String(e.value)))
		})]
	});
}
// src/modules/poker/ConsensusCelebration.tsx
var me = 4200, he = 28, ge = [
	330,
	345,
	312,
	20,
	48
];
function _e() {
	return Array.from({ length: he }, (e, t) => ({
		left: Math.random() * 100,
		delay: Math.random() * 1.2,
		duration: 2.6 + Math.random() * 1.6,
		size: 14 + Math.random() * 16,
		drift: (Math.random() - .5) * 160,
		spin: (Math.random() > .5 ? 1 : -1) * (180 + Math.random() * 360),
		hue: ge[t % ge.length]
	}));
}
function ve() {
	let e = V((e) => e.room?.currentIssueId ?? null), t = V((e) => e.room?.currentIssueId ? e.votesMap[e.room.currentIssueId] : void 0), [n, r] = D(null), i = E(null), a = !!t?.reveal, o = t?.reveal ? c(t.values) : void 0;
	w(() => {
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
	]), w(() => {
		if (n === null) return;
		let e = setTimeout(() => r(null), me);
		return () => clearTimeout(e);
	}, [n]);
	let s = T(() => n ? _e() : [], [n]);
	return n === null ? null : /* @__PURE__ */ L("div", {
		className: "pk-celebration",
		"aria-live": "polite",
		children: [/* @__PURE__ */ I("div", {
			className: "pk-celebration__blossoms",
			"aria-hidden": !0,
			children: s.map((e, t) => /* @__PURE__ */ I("span", {
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
				children: /* @__PURE__ */ I(ye, {})
			}, t))
		}), /* @__PURE__ */ L("div", {
			className: "pk-celebration__badge",
			role: "status",
			children: [
				/* @__PURE__ */ I("span", {
					className: "pk-celebration__glow",
					"aria-hidden": !0
				}),
				/* @__PURE__ */ I("span", {
					className: "pk-celebration__title",
					children: "Consensus!"
				}),
				/* @__PURE__ */ L("span", {
					className: "pk-celebration__text",
					children: ["Everyone picked ", /* @__PURE__ */ I("strong", { children: n.score })]
				})
			]
		})]
	}, n.id);
}
function ye() {
	return /* @__PURE__ */ L("svg", {
		viewBox: "0 0 40 40",
		width: "100%",
		height: "100%",
		children: [[
			0,
			72,
			144,
			216,
			288
		].map((e) => /* @__PURE__ */ I("ellipse", {
			cx: "20",
			cy: "10",
			rx: "7",
			ry: "10",
			transform: `rotate(${e} 20 20)`,
			className: "pk-celebration__petal"
		}, e)), /* @__PURE__ */ I("circle", {
			cx: "20",
			cy: "20",
			r: "4.5",
			className: "pk-celebration__core"
		})]
	});
}
// src/modules/poker/HostAwayBanner.tsx
function be() {
	let e = V((e) => e.room?.moderatorId ?? ""), t = V((e) => e.sid), n = V((e) => e.offlineSince[e.room?.moderatorId ?? ""] ?? null), { claimModerator: r } = X(), [i, a] = D(() => Date.now());
	w(() => {
		if (n === null) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), g);
		return () => clearInterval(e);
	}, [n]);
	let o = n !== null && i - n >= 18e4;
	return !e || e === t || !o ? null : /* @__PURE__ */ L("div", {
		className: "pk-away",
		role: "status",
		children: [/* @__PURE__ */ I("p", {
			className: "pk-away__text",
			children: "The host is away. You can take over so the round can continue."
		}), /* @__PURE__ */ I(A, {
			variant: "primary",
			size: "sm",
			onClick: r,
			label: "Take over as host"
		})]
	});
}
// src/components/MemberAvatar.tsx
function Z({ avatarId: e, avatarUrl: t, className: n }) {
	let [r, i] = D(null), a = !x(e) && t && r !== t ? t : null;
	return /* @__PURE__ */ I("span", {
		className: R("pk-memberAvatar", n),
		"aria-hidden": !0,
		children: a ? /* @__PURE__ */ I("img", {
			src: a,
			alt: "",
			loading: "lazy",
			referrerPolicy: "no-referrer",
			onError: () => i(a)
		}) : S(e)
	});
}
// src/modules/poker/InvitePanel.tsx
function xe() {
	let e = V((e) => e.showInvitePanel), t = V((e) => e.invitations), n = V(G), { hideInvitePanel: r, inviteMembers: i, revokeInvite: a } = X(), [o, s] = D([]);
	if (w(() => {
		e || s([]);
	}, [e]), !n) return null;
	let c = t.map((e) => e.invitee.id);
	return /* @__PURE__ */ I(M, {
		open: e,
		onClose: r,
		position: "right",
		size: "420px",
		title: "Invite people",
		children: /* @__PURE__ */ L("div", {
			className: "pk-panel",
			children: [/* @__PURE__ */ L("section", {
				className: "pk-panel__section",
				children: [
					/* @__PURE__ */ I("h3", {
						className: "pk-panel__sectionTitle",
						children: "Add people"
					}),
					/* @__PURE__ */ I(v, {
						selected: o,
						onChange: s,
						excludeIds: c
					}),
					/* @__PURE__ */ I(A, {
						variant: "primary",
						size: "sm",
						disabled: o.length === 0,
						onClick: async () => {
							await i(o) && s([]);
						},
						label: o.length > 0 ? `Invite ${o.length}` : "Invite"
					}),
					/* @__PURE__ */ I("p", {
						className: "pk-form__hint",
						children: "Invited people join directly and see this room under Invited to you."
					})
				]
			}), /* @__PURE__ */ L("section", {
				className: "pk-panel__section",
				children: [/* @__PURE__ */ L("h3", {
					className: "pk-panel__sectionTitle",
					children: ["Invited", /* @__PURE__ */ I("span", {
						className: "pk-panel__count",
						children: t.length
					})]
				}), t.length === 0 ? /* @__PURE__ */ I("p", {
					className: "pk-panel__empty",
					children: "No pending invitations."
				}) : /* @__PURE__ */ I("ul", {
					className: "pk-requests__list",
					children: t.map((e) => /* @__PURE__ */ L("li", {
						className: "pk-requests__item",
						children: [
							/* @__PURE__ */ I(Z, {
								avatarId: null,
								avatarUrl: e.invitee.avatarUrl,
								className: "pk-requests__avatar"
							}),
							/* @__PURE__ */ L("div", {
								className: "pk-requests__info",
								children: [/* @__PURE__ */ I("p", {
									className: "pk-requests__name",
									title: e.invitee.name,
									children: e.invitee.name
								}), e.invitee.email && /* @__PURE__ */ I("p", {
									className: "pk-requests__email",
									title: e.invitee.email,
									children: e.invitee.email
								})]
							}),
							/* @__PURE__ */ I("div", {
								className: "pk-requests__actions",
								children: /* @__PURE__ */ I(A, {
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
var Se = [{
	value: "jira",
	label: "Search Jira"
}, {
	value: "custom",
	label: "Custom item"
}];
function Ce({ onPick: e }) {
	let { issues: t } = n(), [r, i] = D(null), [a, o] = D("jira");
	return w(() => {
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
	}, [t]), r === null ? /* @__PURE__ */ I(P, {
		value: "",
		placeholder: "Checking for an issue source…",
		disabled: !0
	}) : r ? /* @__PURE__ */ L("div", {
		className: "pk-issuePicker",
		children: [/* @__PURE__ */ I(te, {
			items: Se,
			value: a,
			onChange: (e) => o(e.value === "custom" ? "custom" : "jira"),
			variant: "segmented",
			fullWidth: !0,
			ariaLabel: "How to add an issue"
		}), I(a === "jira" ? we : Te, { onPick: e })]
	}) : /* @__PURE__ */ I(Te, { onPick: e });
}
function we({ onPick: e }) {
	let { issues: t } = n(), [r, i] = D(""), [a, o] = D([]), [s, c] = D(!1), l = C(async (e) => {
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
	}, [t]), u = C((t) => {
		e(t), i(""), o([]);
	}, [e]);
	return /* @__PURE__ */ L("div", {
		className: "pk-issuePicker__mode",
		children: [/* @__PURE__ */ I(k, {
			items: a,
			value: r,
			onChange: (e) => i(String(e.value)),
			onFilter: l,
			onSelect: (e) => u(e.value),
			loading: s,
			placeholder: "Type a key or words from the summary…",
			minLength: 2,
			debounceMs: 300,
			emptyMessage: "No matching issues. Use Custom item to add it by hand."
		}), /* @__PURE__ */ I("p", {
			className: "pk-issuePicker__hint",
			children: "Choosing an issue from the results adds it to the backlog straight away."
		})]
	});
}
function Te({ onPick: e }) {
	let [t, n] = D(""), [r, i] = D(""), a = t.trim().length > 0, o = () => {
		a && (e({
			key: t.trim(),
			summary: r.trim() || void 0
		}), n(""), i(""));
	}, s = (e) => {
		e.key === "Enter" && (e.preventDefault(), o());
	};
	return /* @__PURE__ */ L("div", {
		className: "pk-issuePicker__mode",
		children: [
			/* @__PURE__ */ I(b, {
				label: "Title or key",
				required: !0,
				children: /* @__PURE__ */ I(P, {
					value: t,
					onChange: (e) => n(String(e.value)),
					onKeyDown: s,
					placeholder: "PROJ-123 or a short title",
					maxLength: 64
				})
			}),
			/* @__PURE__ */ I(b, {
				label: "Description",
				children: /* @__PURE__ */ I(P, {
					value: r,
					onChange: (e) => i(String(e.value)),
					onKeyDown: s,
					placeholder: "Optional details shown to players",
					maxLength: 500
				})
			}),
			/* @__PURE__ */ I(A, {
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
var Ee = s.map((e) => ({
	value: e,
	label: u[e]
}));
function De() {
	let e = V((e) => e.showIssuePanel), t = V((e) => e.room), n = V((e) => e.viewingIssueId), r = V((e) => e.votesMap), i = V(G), a = V((e) => e.pendingIssues), { hideIssuePanel: o, addIssue: s } = X(), c = t?.issues ?? [], l = c.length + a.length;
	return /* @__PURE__ */ I(M, {
		open: e,
		onClose: o,
		position: "right",
		size: "420px",
		title: i ? "Issues & settings" : "Issues",
		children: /* @__PURE__ */ L("div", {
			className: "pk-panel",
			children: [
				i && /* @__PURE__ */ L("section", {
					className: "pk-panel__section",
					children: [/* @__PURE__ */ I("h3", {
						className: "pk-panel__sectionTitle",
						children: "Add an issue"
					}), /* @__PURE__ */ I(Ce, { onPick: s })]
				}),
				/* @__PURE__ */ L("section", {
					className: "pk-panel__section",
					children: [/* @__PURE__ */ L("h3", {
						className: "pk-panel__sectionTitle",
						children: ["Backlog", /* @__PURE__ */ I("span", {
							className: "pk-panel__count",
							children: l
						})]
					}), l === 0 ? /* @__PURE__ */ I("p", {
						className: "pk-panel__empty",
						children: i ? "Add an issue to start estimating." : "The moderator has not added any issues yet."
					}) : /* @__PURE__ */ L("ul", {
						className: "pk-panel__list",
						children: [c.map((e) => /* @__PURE__ */ I(ke, {
							issue: e,
							isSelected: n === e.id,
							isEstimating: t?.currentIssueId === e.id,
							finalScore: r[e.id]?.reveal ? r[e.id]?.finalScore : void 0,
							isSynced: r[e.id]?.syncedScore !== void 0,
							isModerator: i
						}, e.id)), a.map((e) => /* @__PURE__ */ I(Oe, { issue: e }, e.pendingId))]
					})]
				}),
				i && t !== null && /* @__PURE__ */ I(Ae, {})
			]
		})
	});
}
function Oe({ issue: e }) {
	return /* @__PURE__ */ I("li", { children: /* @__PURE__ */ L("div", {
		className: "pk-issueRow is-pending",
		"aria-busy": !0,
		children: [
			/* @__PURE__ */ I("div", {
				className: "pk-issueRow__icon",
				"aria-hidden": !0,
				children: /* @__PURE__ */ I("span", { children: "◇" })
			}),
			/* @__PURE__ */ L("div", {
				className: "pk-issueRow__body",
				children: [/* @__PURE__ */ I("div", {
					className: "pk-issueRow__keyLine",
					children: /* @__PURE__ */ I("span", {
						className: "pk-issueRow__key",
						children: e.key
					})
				}), e.summary && /* @__PURE__ */ I("p", {
					className: "pk-issueRow__summary",
					children: e.summary
				})]
			}),
			/* @__PURE__ */ I(K, { label: "Adding" })
		]
	}) });
}
function ke({ issue: e, isSelected: t, isEstimating: n, finalScore: r, isSynced: i, isModerator: a }) {
	let { selectIssue: o, removeIssue: s } = X(), c = J(q.issue(e.id));
	return /* @__PURE__ */ I("li", { children: /* @__PURE__ */ L("div", {
		className: R("pk-issueRow", {
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
			/* @__PURE__ */ I("div", {
				className: "pk-issueRow__icon",
				"aria-hidden": !0,
				children: e.icon ? /* @__PURE__ */ I("img", {
					src: e.icon,
					alt: ""
				}) : /* @__PURE__ */ I("span", { children: "◇" })
			}),
			/* @__PURE__ */ L("div", {
				className: "pk-issueRow__body",
				children: [/* @__PURE__ */ L("div", {
					className: "pk-issueRow__keyLine",
					children: [
						/* @__PURE__ */ I("span", {
							className: "pk-issueRow__key",
							children: e.key
						}),
						n && /* @__PURE__ */ I("span", {
							className: "pk-issueRow__tag is-warning",
							children: "Voting"
						}),
						r !== void 0 && /* @__PURE__ */ I("span", {
							className: "pk-issueRow__tag is-success",
							title: i ? "Saved in Jira" : void 0,
							children: i ? `${String(r)} ✓` : String(r)
						})
					]
				}), e.summary && /* @__PURE__ */ I("p", {
					className: "pk-issueRow__summary",
					children: e.summary
				})]
			}),
			c ? /* @__PURE__ */ I(K, { label: "Removing" }) : /* @__PURE__ */ L("div", {
				className: "pk-issueRow__actions",
				children: [e.url && /* @__PURE__ */ I("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					onClick: (e) => e.stopPropagation(),
					className: "pk-issueRow__action",
					title: "Open in Jira",
					children: "↗"
				}), a && /* @__PURE__ */ I("button", {
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
function Ae() {
	let e = V((e) => e.room), { updateSettings: t, updateAccess: i } = X(), { host: o } = n(), s = J(q.settings), c = V((e) => e.estimateTarget);
	if (e === null) return null;
	let { settings: u, scoreType: d } = e, f = r(d);
	return /* @__PURE__ */ L("section", {
		className: "pk-panel__section",
		children: [/* @__PURE__ */ L("h3", {
			className: "pk-panel__sectionTitle",
			children: ["Round settings", s && /* @__PURE__ */ I(K, { label: "Saving" })]
		}), /* @__PURE__ */ L("div", {
			className: "pk-panel__settings",
			children: [
				/* @__PURE__ */ L("p", {
					className: "pk-panel__deck",
					children: ["Deck: ", /* @__PURE__ */ I("strong", { children: a[d] })]
				}),
				/* @__PURE__ */ I(j, {
					checked: e.access.requireApproval,
					onChange: (e) => i({ requireApproval: !!e.value }),
					label: "Require host approval before new players join"
				}),
				o.capabilities.listing && /* @__PURE__ */ I(j, {
					checked: e.access.listed,
					onChange: (e) => i({ listed: !!e.value }),
					label: "List this room in the directory"
				}),
				/* @__PURE__ */ I(j, {
					checked: u.autoReveal,
					onChange: (e) => t({ autoReveal: !!e.value }),
					label: "Reveal automatically once everyone has voted"
				}),
				/* @__PURE__ */ I(j, {
					checked: u.allowRevote,
					onChange: (e) => t({ allowRevote: !!e.value }),
					label: "Allow players to change their estimate before reveal"
				}),
				d !== 3 && /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ I(j, {
					checked: u.showHalfScore,
					onChange: (e) => t({ showHalfScore: !!e.value }),
					label: "Show the 0.5 card"
				}), /* @__PURE__ */ L("div", {
					className: "pk-panel__field",
					children: [/* @__PURE__ */ I("label", {
						className: "pk-panel__fieldLabel",
						htmlFor: "pk-maxPoints",
						children: "Highest card"
					}), /* @__PURE__ */ I(N, {
						id: "pk-maxPoints",
						value: u.maxPoints,
						onChange: (e) => t({ maxPoints: Number(e.value) }),
						options: f.map((e) => ({
							value: e,
							label: String(e)
						}))
					})]
				})] }),
				c !== null && l(d) && /* @__PURE__ */ L("div", {
					className: "pk-panel__field",
					children: [
						/* @__PURE__ */ I("label", {
							className: "pk-panel__fieldLabel",
							htmlFor: "pk-estimateSync",
							children: "Update story points in Jira"
						}),
						/* @__PURE__ */ I(N, {
							id: "pk-estimateSync",
							value: u.estimateSync,
							onChange: (e) => t({ estimateSync: e.value }),
							options: Ee,
							disabled: !c.ready
						}),
						/* @__PURE__ */ I("p", {
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
function je() {
	let e = V((e) => e.showJoinRequests), t = V((e) => e.joinRequests), n = V((e) => e.room?.access.requireApproval ?? !1), r = V(G), { hideJoinRequests: i, approveJoin: a, rejectJoin: o, approveAllJoin: s, rejectAllJoin: c } = X(), [l, u] = D(!1);
	if (!r) return null;
	let d = t.length > 0;
	return /* @__PURE__ */ I(M, {
		open: e,
		onClose: i,
		position: "right",
		size: "420px",
		title: "Join requests",
		children: /* @__PURE__ */ I("div", {
			className: "pk-panel",
			children: /* @__PURE__ */ L("section", {
				className: "pk-panel__section",
				children: [
					/* @__PURE__ */ L("h3", {
						className: "pk-panel__sectionTitle",
						children: ["Waiting to join", /* @__PURE__ */ I("span", {
							className: "pk-panel__count",
							children: t.length
						})]
					}),
					/* @__PURE__ */ L("div", {
						className: "pk-requests__bulk",
						children: [/* @__PURE__ */ I(A, {
							variant: "primary",
							size: "sm",
							disabled: !d,
							onClick: () => s(l),
							label: d ? `Approve all (${t.length})` : "Approve all"
						}), /* @__PURE__ */ I(A, {
							variant: "danger",
							layout: "outlined",
							size: "sm",
							disabled: !d,
							onClick: c,
							label: "Reject all"
						})]
					}),
					n && /* @__PURE__ */ I(j, {
						checked: l,
						onChange: (e) => u(!!e.value),
						label: "Turn off approval for this room when I approve all"
					}),
					d ? /* @__PURE__ */ I("ul", {
						className: "pk-requests__list",
						children: t.map((e) => /* @__PURE__ */ L("li", {
							className: "pk-requests__item",
							children: [
								/* @__PURE__ */ I(Z, {
									avatarId: e.avatarId,
									avatarUrl: e.avatarUrl,
									className: "pk-requests__avatar"
								}),
								/* @__PURE__ */ L("div", {
									className: "pk-requests__info",
									children: [/* @__PURE__ */ I("p", {
										className: "pk-requests__name",
										title: e.name,
										children: e.name
									}), /* @__PURE__ */ I("p", {
										className: "pk-requests__time",
										children: new Date(e.createdAt).toLocaleTimeString()
									})]
								}),
								/* @__PURE__ */ L("div", {
									className: "pk-requests__actions",
									children: [/* @__PURE__ */ I(A, {
										variant: "primary",
										size: "sm",
										onClick: () => a(e.requestId),
										label: "Approve"
									}), /* @__PURE__ */ I(A, {
										variant: "danger",
										layout: "outlined",
										size: "sm",
										onClick: () => o(e.requestId),
										label: "Reject"
									})]
								})
							]
						}, e.requestId))
					}) : /* @__PURE__ */ I("p", {
						className: "pk-panel__empty",
						children: "No one is waiting to join."
					})
				]
			})
		})
	});
}
// src/modules/poker/MembersTable.tsx
function Me(e) {
	return e === void 0 ? "–" : e === "?" ? "?" : e === "~" ? "☕" : String(e);
}
function Ne() {
	let e = V((e) => e.members), t = V((e) => e.sid), n = V((e) => e.room?.moderatorId ?? ""), r = V((e) => e.room?.currentIssueId ?? null), i = V((e) => e.viewingIssueId), a = V((e) => e.viewingIssueId ? e.votesMap[e.viewingIssueId] : void 0), o = V(G), s = !!i && i === r, c = !!a?.reveal, l = T(() => [...e].sort((e, r) => e.id === t ? -1 : r.id === t ? 1 : e.id === n ? -1 : r.id === n ? 1 : e.name.localeCompare(r.name)), [
		e,
		t,
		n
	]);
	return e.length === 0 ? /* @__PURE__ */ I("section", {
		className: "pk-table",
		children: /* @__PURE__ */ I("div", {
			className: "pk-table__empty",
			children: /* @__PURE__ */ I("p", { children: "Waiting for players to join…" })
		})
	}) : /* @__PURE__ */ L("section", {
		className: "pk-table",
		children: [/* @__PURE__ */ L("header", {
			className: "pk-table__head",
			children: [
				/* @__PURE__ */ I("h2", {
					className: "pk-table__title",
					children: "Players"
				}),
				c && /* @__PURE__ */ I("span", {
					className: "pk-table__badge is-success",
					children: "Cards revealed"
				}),
				s && !c && /* @__PURE__ */ I("span", {
					className: "pk-table__badge is-warning",
					children: "Round in progress"
				})
			]
		}), /* @__PURE__ */ I("ul", {
			className: "pk-table__grid",
			children: l.map((e) => /* @__PURE__ */ I(Pe, {
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
function Pe({ member: e, vote: t, issueId: n, isSelf: r, isRoomModerator: i, isVotingActive: a, revealed: o, canManage: s }) {
	let { kickMember: c, transferModerator: l } = X(), u = J(q.member(e.id)), d = n !== null && e.votedIssueIds.includes(n), f = o ? "revealed" : a ? d ? "locked" : "thinking" : "idle";
	return /* @__PURE__ */ L("li", {
		className: R("pk-seat", `is-${f}`, {
			"is-offline": !e.isOnline,
			"is-pending": u
		}),
		"aria-busy": u,
		children: [
			/* @__PURE__ */ I("div", {
				className: "pk-seat__card",
				"aria-hidden": !0,
				children: f === "revealed" ? /* @__PURE__ */ I("span", {
					className: "pk-seat__vote",
					children: Me(t)
				}) : f === "locked" ? /* @__PURE__ */ I("span", {
					className: "pk-seat__cardBack",
					children: "✓"
				}) : f === "thinking" ? /* @__PURE__ */ L("span", {
					className: "pk-seat__dots",
					children: [
						/* @__PURE__ */ I("i", {}),
						/* @__PURE__ */ I("i", {}),
						/* @__PURE__ */ I("i", {})
					]
				}) : /* @__PURE__ */ I("span", { className: "pk-seat__cardIdle" })
			}),
			/* @__PURE__ */ L("div", {
				className: "pk-seat__person",
				children: [/* @__PURE__ */ I(Z, {
					avatarId: e.avatarId,
					avatarUrl: e.avatarUrl,
					className: "pk-seat__avatar"
				}), /* @__PURE__ */ L("div", {
					className: "pk-seat__info",
					children: [/* @__PURE__ */ L("p", {
						className: "pk-seat__name",
						title: e.name,
						children: [e.name, r && /* @__PURE__ */ I("span", {
							className: "pk-seat__you",
							children: "you"
						})]
					}), /* @__PURE__ */ I("p", {
						className: "pk-seat__role",
						children: i ? "♛ Moderator" : e.isOnline ? "Online" : "Offline"
					})]
				})]
			}),
			u && /* @__PURE__ */ I(K, {
				label: "Updating",
				className: "pk-seat__pending"
			}),
			s && !u && /* @__PURE__ */ L("div", {
				className: "pk-seat__manage",
				children: [/* @__PURE__ */ I("button", {
					type: "button",
					className: "pk-seat__manageButton",
					onClick: () => void l(e.id),
					title: `Make ${e.name} the moderator`,
					children: "♛"
				}), /* @__PURE__ */ I("button", {
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
function Fe({ reason: e, onExit: t }) {
	return /* @__PURE__ */ I("div", {
		className: "pk-closed",
		children: /* @__PURE__ */ L("div", {
			className: "pk-closed__card",
			children: [
				/* @__PURE__ */ I("span", {
					className: "pk-closed__icon",
					"aria-hidden": !0,
					children: "🚪"
				}),
				/* @__PURE__ */ I("h1", {
					className: "pk-closed__title",
					children: "You are no longer in this room"
				}),
				/* @__PURE__ */ I("p", {
					className: "pk-closed__text",
					children: e
				}),
				/* @__PURE__ */ I(A, {
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
function Ie({ isOpen: e, onClose: t, onHandOver: n, onCloseRoom: r }) {
	let i = V((e) => e.members), a = V((e) => e.sid), o = T(() => i.filter((e) => e.id !== a), [i, a]), [s, c] = D(""), l = J(q.leave);
	w(() => {
		e && c((e) => o.some((t) => t.id === e) ? e : o[0]?.id ?? "");
	}, [e, o]);
	let u = o.length > 0;
	return /* @__PURE__ */ I(ee, {
		isOpen: e,
		onClose: () => {
			l || t();
		},
		title: "Leave as host",
		size: "sm",
		footer: /* @__PURE__ */ I("div", {
			className: "pk-leave__footer",
			children: /* @__PURE__ */ I(A, {
				variant: "secondary",
				layout: "plain",
				onClick: t,
				disabled: l,
				label: "Cancel"
			})
		}),
		children: /* @__PURE__ */ L("div", {
			className: "pk-leave",
			children: [u && /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ L("section", {
				className: "pk-leave__option",
				children: [
					/* @__PURE__ */ I("h4", {
						className: "pk-leave__title",
						children: "Hand over hosting"
					}),
					/* @__PURE__ */ I("p", {
						className: "pk-leave__text",
						children: "The room stays open and the new host carries on with the estimates."
					}),
					/* @__PURE__ */ L("div", {
						className: "pk-leave__row",
						children: [/* @__PURE__ */ I(N, {
							id: "pk-successor",
							className: "pk-leave__successor",
							value: s,
							onChange: (e) => c(String(e.value)),
							options: o.map((e) => ({
								value: e.id,
								label: e.name
							})),
							ariaLabel: "New host"
						}), /* @__PURE__ */ I(A, {
							variant: "primary",
							onClick: () => n(s),
							disabled: !s || l,
							label: "Hand over and leave"
						})]
					})
				]
			}), /* @__PURE__ */ I("div", {
				className: "pk-leave__divider",
				role: "separator",
				children: /* @__PURE__ */ I("span", { children: "or" })
			})] }), /* @__PURE__ */ L("section", {
				className: "pk-leave__option",
				children: [
					/* @__PURE__ */ I("h4", {
						className: "pk-leave__title",
						children: "Close the room"
					}),
					/* @__PURE__ */ I("p", {
						className: "pk-leave__text",
						children: u ? "Everyone is sent out and every issue and estimate is removed." : "You are the only one here, so leaving closes the room and removes every issue and estimate."
					}),
					/* @__PURE__ */ I("div", {
						className: "pk-leave__row",
						children: /* @__PURE__ */ I(A, {
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
var Le = {
	idle: "Connecting",
	connecting: "Connecting",
	connected: "Live",
	reconnecting: "Reconnecting",
	degraded: "Retrying",
	closed: "Offline"
};
function Re({ onExit: e }) {
	let t = V((e) => e.room), r = V(G), i = V((e) => e.connectionStatus), a = V((e) => e.membersMap[e.sid]), o = V((e) => e.members.length), s = V((e) => e.joinRequests.length), { host: c, userPicker: l, identity: u } = n(), { copyInviteLink: d, copyRoomCode: f, showIssuePanel: m, showJoinRequests: h, showInvitePanel: g, leaveRoom: _, closeRoom: v } = X(), [y, b] = D(!1), [x, S] = D(!1), C = E(null), T = r && c.capabilities.invitations && l !== null, O = r && (t?.access.requireApproval || s > 0);
	w(() => {
		if (!y) return;
		let e = (e) => {
			C.current?.contains(e.target) || b(!1);
		}, t = (e) => {
			e.key === "Escape" && b(!1);
		};
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t);
		};
	}, [y]);
	let k = async (t) => {
		await t() && (b(!1), S(!1), e());
	}, j = async () => {
		r ? (b(!1), S(!0)) : await k(() => _());
	};
	return /* @__PURE__ */ L("header", {
		className: "pk-roomHeader",
		children: [
			/* @__PURE__ */ L("button", {
				type: "button",
				className: "pk-roomHeader__iconButton",
				onClick: m,
				title: "Issues and settings",
				children: [/* @__PURE__ */ I("span", {
					"aria-hidden": !0,
					children: "☰"
				}), /* @__PURE__ */ I("span", {
					className: "pk-visually-hidden",
					children: "Open issues and settings"
				})]
			}),
			/* @__PURE__ */ L("div", {
				className: "pk-roomHeader__identity",
				children: [/* @__PURE__ */ I("h1", {
					className: "pk-roomHeader__name",
					title: t?.roomName,
					children: t?.roomName ?? "Planning Poker"
				}), /* @__PURE__ */ L("div", {
					className: "pk-roomHeader__meta",
					children: [
						/* @__PURE__ */ L("button", {
							type: "button",
							className: "pk-roomHeader__code",
							onClick: f,
							title: "Copy room code",
							children: [/* @__PURE__ */ I("span", {
								className: "pk-roomHeader__codeValue",
								children: t?.roomId
							}), /* @__PURE__ */ I("span", {
								"aria-hidden": !0,
								children: "⧉"
							})]
						}),
						/* @__PURE__ */ L("span", {
							className: `pk-roomHeader__status is-${i}`,
							children: [/* @__PURE__ */ I("span", {
								className: "pk-roomHeader__statusDot",
								"aria-hidden": !0
							}), Le[i] ?? i]
						}),
						/* @__PURE__ */ L("span", {
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
			/* @__PURE__ */ L("div", {
				className: "pk-roomHeader__actions",
				children: [
					O && /* @__PURE__ */ I(A, {
						variant: s > 0 ? "primary" : "secondary",
						layout: "outlined",
						size: "sm",
						onClick: h,
						label: s > 0 ? `Requests (${s})` : "Requests"
					}),
					T && /* @__PURE__ */ I(A, {
						variant: "secondary",
						layout: "outlined",
						size: "sm",
						onClick: g,
						label: "Invite people"
					}),
					/* @__PURE__ */ I(A, {
						variant: "secondary",
						layout: "outlined",
						size: "sm",
						onClick: d,
						label: "Copy link",
						className: "pk-roomHeader__invite"
					}),
					/* @__PURE__ */ I(p, {}),
					/* @__PURE__ */ L("div", {
						className: "pk-roomHeader__user",
						ref: C,
						children: [/* @__PURE__ */ L("button", {
							type: "button",
							className: "pk-roomHeader__avatarButton",
							onClick: () => b((e) => !e),
							"aria-expanded": y,
							"aria-haspopup": "menu",
							title: "Your profile",
							children: [/* @__PURE__ */ I(Z, {
								avatarId: a?.avatarId,
								avatarUrl: a?.avatarUrl,
								className: "pk-roomHeader__avatar"
							}), r && /* @__PURE__ */ I("span", {
								className: "pk-roomHeader__crown",
								title: "Moderator",
								"aria-label": "Moderator",
								children: "♛"
							})]
						}), y && /* @__PURE__ */ L("div", {
							className: "pk-roomHeader__menu",
							role: "menu",
							children: [
								/* @__PURE__ */ L("div", {
									className: "pk-roomHeader__menuHead",
									children: [/* @__PURE__ */ I("p", {
										className: "pk-roomHeader__menuRole",
										children: r ? "Moderator" : "Player"
									}), /* @__PURE__ */ I("p", {
										className: "pk-roomHeader__menuName",
										children: a?.name ?? "You"
									})]
								}),
								u.allowsAvatarPicker && /* @__PURE__ */ I("div", {
									className: "pk-roomHeader__menuBody",
									children: /* @__PURE__ */ I(ze, {
										currentAvatarId: a?.avatarId ?? null,
										profileImageUrl: a?.avatarUrl
									})
								}),
								/* @__PURE__ */ I("div", {
									className: "pk-roomHeader__menuFoot",
									children: r ? /* @__PURE__ */ I(A, {
										variant: "danger",
										layout: "plain",
										size: "sm",
										fullWidth: !0,
										onClick: j,
										label: "Leave or close room"
									}) : /* @__PURE__ */ I(A, {
										variant: "danger",
										layout: "plain",
										size: "sm",
										fullWidth: !0,
										onClick: j,
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
			/* @__PURE__ */ I(Ie, {
				isOpen: x,
				onClose: () => S(!1),
				onHandOver: (e) => k(() => _(e)),
				onCloseRoom: () => k(() => v())
			})
		]
	});
}
function ze({ currentAvatarId: e, profileImageUrl: t }) {
	let { setAvatar: n } = X(), r = J(q.avatar);
	return /* @__PURE__ */ L("div", {
		className: "pk-roomHeader__avatarPicker",
		children: [/* @__PURE__ */ I(y, {
			value: e,
			onChange: (e) => void n(e),
			className: "pk-roomHeader__avatarGrid",
			profileImageUrl: t
		}), r && /* @__PURE__ */ I(K, {
			label: "Saving",
			className: "pk-roomHeader__avatarSaving"
		})]
	});
}
// src/modules/poker/EstimateSync.tsx
function Be({ room: e, issue: t, vote: n }) {
	let r = V(G), a = V((e) => e.estimateTarget);
	if (!n.reveal || !t.root || !l(e.scoreType)) return null;
	let o = n.syncedScore === void 0 ? null : /* @__PURE__ */ L("span", {
		className: "pk-estimateSync__saved",
		children: [
			"✓ ",
			String(n.syncedScore),
			" saved in Jira"
		]
	});
	if (!r || a === null) return o && /* @__PURE__ */ I("div", {
		className: "pk-estimateSync",
		children: o
	});
	if (!a.ready) return /* @__PURE__ */ I("div", {
		className: "pk-estimateSync",
		children: /* @__PURE__ */ I("span", {
			className: "pk-estimateSync__hint",
			children: a.reason
		})
	});
	let s = i(n.finalScore) ? n.finalScore : void 0, c = i(n.syncedScore) ? n.syncedScore : s;
	return /* @__PURE__ */ I(Ve, {
		room: e,
		issueId: t.id,
		fieldName: a.fieldName,
		initial: c,
		synced: o
	}, `${t.id}:${c ?? ""}`);
}
function Ve({ room: e, issueId: t, fieldName: n, initial: r, synced: a }) {
	let [s, c] = D(r), l = J(q.estimate(t)), { saveEstimate: u } = X(), d = o(e.scoreType, e.settings.maxPoints, e.settings.showHalfScore).filter(i), f = (r === void 0 || d.includes(r) ? d : [...d, r].sort((e, t) => e - t)).map((e) => ({
		value: e,
		label: String(e)
	}));
	return /* @__PURE__ */ L("div", {
		className: "pk-estimateSync",
		children: [
			/* @__PURE__ */ I("label", {
				className: "pk-estimateSync__label",
				htmlFor: `pk-estimate-${t}`,
				children: n
			}),
			/* @__PURE__ */ I(N, {
				id: `pk-estimate-${t}`,
				className: "pk-estimateSync__value",
				value: s,
				placeholder: "Pick",
				options: f,
				disabled: l,
				onChange: (e) => c(Number(e.value))
			}),
			/* @__PURE__ */ I(A, {
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
function He() {
	let e = V((e) => e.room?.issues), t = V((e) => e.viewingIssueId), { selectIssue: n, showIssuePanel: r } = X();
	if (!e || e.length < 2) return null;
	let i = e.findIndex((e) => e.id === t), a = i > 0 ? e[i - 1] : void 0, o = i >= 0 && i < e.length - 1 ? e[i + 1] : void 0;
	return /* @__PURE__ */ L("nav", {
		className: "pk-issueNav",
		"aria-label": "Move between issues",
		children: [
			/* @__PURE__ */ I("button", {
				type: "button",
				className: "pk-issueNav__step",
				onClick: () => a && n(a.id),
				disabled: !a,
				title: a ? `Previous issue: ${a.key}` : "No previous issue",
				"aria-label": "Previous issue",
				children: "‹"
			}),
			/* @__PURE__ */ I("button", {
				type: "button",
				className: "pk-issueNav__position",
				onClick: r,
				title: "Open the backlog",
				children: i >= 0 ? `${i + 1} / ${e.length}` : `– / ${e.length}`
			}),
			/* @__PURE__ */ I("button", {
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
var Ue = {
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
function We() {
	let e = V((e) => e.room), t = V((e) => e.viewingIssueId), n = V((e) => e.viewingIssueId ? e.issuesMap[e.viewingIssueId] : void 0), r = V((e) => e.viewingIssueId ? e.votesMap[e.viewingIssueId] : void 0), i = V((e) => e.members), a = V(G), { startRound: o, restartRound: s, revealVotes: c, showIssuePanel: l } = X(), u = !!t && t === e?.currentIssueId, d = !!r?.reveal, f = d ? "revealed" : u ? "voting" : "idle", p = u ? i.filter((e) => e.votedIssueIds.includes(t)).length : 0, m = i.length, h = m > 0 ? Math.round(p / m * 100) : 0;
	return /* @__PURE__ */ L("section", {
		className: "pk-stage",
		children: [
			/* @__PURE__ */ L("div", {
				className: "pk-stage__head",
				children: [/* @__PURE__ */ L("div", {
					className: "pk-stage__lead",
					children: [/* @__PURE__ */ L("span", {
						className: `pk-stage__status is-${Ue[f].tone}`,
						children: [/* @__PURE__ */ I("span", {
							className: "pk-stage__statusDot",
							"aria-hidden": !0
						}), Ue[f].label]
					}), /* @__PURE__ */ I(He, {})]
				}), a && /* @__PURE__ */ L("div", {
					className: "pk-stage__controls",
					children: [
						!u && /* @__PURE__ */ I(A, {
							variant: "success",
							size: "sm",
							onClick: o,
							disabled: !t,
							label: "Start round"
						}),
						u && !d && /* @__PURE__ */ I(A, {
							variant: "primary",
							size: "sm",
							onClick: c,
							label: "Reveal votes"
						}),
						u && /* @__PURE__ */ I(A, {
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
			n ? /* @__PURE__ */ L("div", {
				className: "pk-stage__issue",
				children: [/* @__PURE__ */ L("div", {
					className: "pk-stage__issueKey",
					children: [n.icon && /* @__PURE__ */ I("img", {
						src: n.icon,
						alt: "",
						className: "pk-stage__issueIcon"
					}), n.url ? /* @__PURE__ */ I("a", {
						href: n.url,
						target: "_blank",
						rel: "noopener noreferrer",
						children: n.key
					}) : /* @__PURE__ */ I("span", { children: n.key })]
				}), n.summary && /* @__PURE__ */ I("p", {
					className: "pk-stage__issueSummary",
					children: n.summary
				})]
			}) : /* @__PURE__ */ L("div", {
				className: "pk-stage__empty",
				children: [
					/* @__PURE__ */ I("p", {
						className: "pk-stage__emptyTitle",
						children: "No issue selected"
					}),
					/* @__PURE__ */ I("p", {
						className: "pk-stage__emptyText",
						children: a ? "Add an issue from the issues panel to start estimating." : "Waiting for the moderator to add an issue."
					}),
					/* @__PURE__ */ I(A, {
						variant: "secondary",
						layout: "outlined",
						size: "sm",
						onClick: l,
						label: "Open issues"
					})
				]
			}),
			/* @__PURE__ */ L("div", {
				className: "pk-stage__stats",
				children: [
					/* @__PURE__ */ I(Q, {
						label: "Final",
						value: d && r?.finalScore !== void 0 ? String(r.finalScore) : "—",
						accent: !0
					}),
					/* @__PURE__ */ I(Q, {
						label: "Average",
						value: d && r?.average !== void 0 ? r.average.toFixed(1) : "—"
					}),
					/* @__PURE__ */ I(Q, {
						label: "Highest",
						value: d && r?.maxVote !== void 0 ? String(r.maxVote) : "—"
					}),
					/* @__PURE__ */ I(Q, {
						label: "Voted",
						value: u ? `${p}/${m}` : "—"
					})
				]
			}),
			e && n && r && /* @__PURE__ */ I(Be, {
				room: e,
				issue: n,
				vote: r
			}),
			u && /* @__PURE__ */ L("div", {
				className: "pk-stage__progress",
				children: [/* @__PURE__ */ I("div", {
					className: "pk-stage__progressTrack",
					children: /* @__PURE__ */ I("div", {
						className: `pk-stage__progressFill ${d ? "is-revealed" : ""}`,
						style: { width: `${h}%` }
					})
				}), /* @__PURE__ */ L("span", {
					className: "pk-stage__progressLabel",
					children: [h, "% voted"]
				})]
			})
		]
	});
}
function Q({ label: e, value: t, accent: n = !1 }) {
	return /* @__PURE__ */ L("div", {
		className: `pk-stat ${n ? "is-accent" : ""}`,
		children: [/* @__PURE__ */ I("span", {
			className: "pk-stat__label",
			children: e
		}), /* @__PURE__ */ I("span", {
			className: "pk-stat__value",
			children: t
		})]
	});
}
// src/modules/poker/useAutoRevealCatchUp.ts
var Ge = 1500;
function Ke() {
	let { revealVotes: e } = X(), t = E(/* @__PURE__ */ new Set()), n = V(G), r = V((e) => e.room?.settings.autoReveal ?? !1), i = V((e) => e.room?.currentIssueId ?? null), a = V((e) => e.room?.currentIssueId ? !!e.votesMap[e.room.currentIssueId]?.reveal : !1), o = V((e) => {
		let t = e.room?.currentIssueId;
		return !!t && e.members.length > 0 && e.members.every((e) => e.votedIssueIds.includes(t));
	});
	w(() => {
		if (!n || !r || i === null || a || !o || t.current.has(i)) return;
		let s = setTimeout(() => {
			t.current.add(i), e();
		}, Ge);
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
function qe() {
	let { issues: e } = n(), { saveEstimate: t } = X(), r = E(/* @__PURE__ */ new Set()), i = V(G), a = V((e) => e.estimateTarget), o = V((e) => e.room?.settings.estimateSync ?? "manual"), s = V((e) => e.room?.scoreType), c = V((e) => e.room?.currentIssueId ? e.issuesMap[e.room.currentIssueId] : void 0), u = V((e) => e.room?.currentIssueId ? e.votesMap[e.room.currentIssueId] : void 0);
	w(() => {
		if (!i || e === null) {
			H({ estimateTarget: null });
			return;
		}
		let t = !0;
		return e.getEstimateTarget().then((e) => {
			t && H({ estimateTarget: e });
		}).catch((e) => {
			console.error("Could not check where estimates are saved", e), t && H({ estimateTarget: null });
		}), () => {
			t = !1;
		};
	}, [i, e]), w(() => {
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
function Je(e, t, n, r) {
	return e.filter((e) => {
		if (!e.isOnline || e.id === r || !e.lastSeenAt) return !1;
		let i = Date.parse(e.lastSeenAt);
		return Number.isFinite(i) && t - i > n;
	}).map((e) => e.id);
}
function Ye(e, t) {
	if (!e) return null;
	let n = Date.parse(e);
	return Number.isFinite(n) ? n - t : null;
}
// src/modules/poker/revision.ts
function Xe(e, t) {
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
var Ze = "RATE_LIMITED", Qe = /* @__PURE__ */ new Set([
	"submitVote",
	"revealVotes",
	"startRound",
	"restartRound"
]), $e = /* @__PURE__ */ new Set([
	"roomState",
	"heartbeatResult",
	"ack"
]);
function $(e, t) {
	return {
		members: t,
		membersMap: W(t),
		offlineSince: le(t, e.offlineSince, Date.now(), e.serverOffsetMs)
	};
}
function et(e, t) {
	let n = e.viewingIssueId !== null && t.room.issues.some((t) => t.id === e.viewingIssueId) ? e.viewingIssueId : t.room.currentIssueId ?? t.room.issues[0]?.id ?? null, r = Ye(t.serverTime, Date.now()) ?? e.serverOffsetMs;
	return {
		room: t.room,
		members: t.members,
		membersMap: W(t.members),
		issuesMap: W(t.room.issues),
		votesMap: ce(t.votes),
		onlineIds: t.members.filter((e) => e.isOnline).map((e) => e.id),
		serverOffsetMs: r,
		offlineSince: le(t.members, e.offlineSince, Date.now(), r),
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
function tt(e, t) {
	let n = new Map(e.members.map((e) => [e.id, e]));
	for (let e of t) n.set(e.id, e);
	return [...n.values()];
}
function nt(e, t, n = e.members) {
	let r = new Set(t);
	return {
		onlineIds: t,
		...$(e, n.map((e) => ({
			...e,
			isOnline: r.has(e.id)
		})))
	};
}
function rt(e, t) {
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
function it(e, t) {
	let n = new Set(t.votedIds), r = !1, i = e.members.map((e) => !n.has(e.id) || e.votedIssueIds.includes(t.issueId) ? e : (r = !0, {
		...e,
		votedIssueIds: [...e.votedIssueIds, t.issueId]
	}));
	return r ? {
		members: i,
		membersMap: W(i)
	} : {};
}
function at(e, t) {
	if (e.room === null) return {};
	let n = e.viewingIssueId !== null && t.issues.some((t) => t.id === e.viewingIssueId) ? e.viewingIssueId : t.currentIssueId ?? t.issues[0]?.id ?? null;
	return {
		room: {
			...e.room,
			issues: t.issues,
			currentIssueId: t.currentIssueId
		},
		issuesMap: W(t.issues),
		viewingIssueId: n
	};
}
function ot(e, t) {
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
		issuesMap: W(t.issues),
		members: n,
		membersMap: W(n),
		votesMap: {
			...e.votesMap,
			[t.vote.issueId]: t.vote
		},
		viewingIssueId: t.currentIssueId
	};
}
function st(e, t, n) {
	return e.joinRequests.some((e) => e.requestId === t.request.requestId) ? {
		patch: {},
		effects: []
	} : {
		patch: { joinRequests: [...e.joinRequests, t.request] },
		effects: [() => n.message.info(`${t.request.name} wants to join the room`)]
	};
}
function ct(e, t, n) {
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
function lt(e, t, n) {
	let r = Ye(t.serverTime, Date.now()) ?? e.serverOffsetMs, i = t.lastSeen, a = i ? e.members.map((e) => i[e.id] ? {
		...e,
		lastSeenAt: i[e.id]
	} : e) : e.members, o = t.revision > e.lastRevision || e.room !== null && e.room.moderatorId === e.sid && t.pendingJoinRequests !== e.joinRequests.length;
	return {
		patch: {
			serverOffsetMs: r,
			...nt({
				...e,
				serverOffsetMs: r
			}, t.onlineIds, a)
		},
		effects: o ? [n.resync] : []
	};
}
function ut(e, t, n) {
	let r = [];
	if (t?.code === Ze) r.push(() => n.message.error(_));
	else if (t?.message) {
		let e = t.message;
		r.push(() => n.message.error(e));
	}
	return (t?.code === Ze || t?.action && Qe.has(t.action)) && r.push(n.resync), {
		patch: e.bulkJoinAction === null ? {} : {
			bulkJoinAction: null,
			bulkDisableApproval: !1
		},
		effects: r
	};
}
function dt(e, t, n) {
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
function ft(e, t, n) {
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
			patch: et(e, t.payload),
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
				patch: $(e, tt(e, [r])),
				effects: [() => n.message.info(`${r.name} joined the room`)]
			};
		}
		case "membersJoined": return {
			patch: $(e, tt(e, t.payload.members)),
			effects: r
		};
		case "memberUpdated": return {
			patch: $(e, tt(e, [t.payload.member])),
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
			patch: nt(e, t.payload.onlineIds),
			effects: r
		};
		case "heartbeatResult": return lt(e, t.payload, n);
		case "issuesUpdated": return {
			patch: at(e, t.payload),
			effects: r
		};
		case "roundStarted": return {
			patch: ot(e, t.payload),
			effects: r
		};
		case "voteProgress": return {
			patch: it(e, t.payload),
			effects: r
		};
		case "voteUpdated": return {
			patch: rt(e, t.payload.vote),
			effects: r
		};
		case "votesRevealed": return {
			patch: rt(e, t.payload.vote),
			effects: r
		};
		case "joinRequested": return st(e, t.payload, n);
		case "joinRequestResolved": return ct(e, t.payload, n);
		case "invitationsUpdated": return {
			patch: { invitations: t.payload.invitations },
			effects: r
		};
		case "moderatorChanged": return dt(e, t.payload, n);
		case "kicked":
		case "roomClosed": return {
			patch: { closedReason: t.payload.reason },
			effects: r
		};
		case "sessionTakenOver": return {
			patch: { closedReason: "You joined this room from another tab or device." },
			effects: r
		};
		case "error": return ut(e, t.payload, n);
		default: return {
			patch: {},
			effects: r
		};
	}
}
function pt(e, t, n) {
	if ($e.has(t.action)) return ft(e, t, n);
	let r = Xe(e.lastRevision, t.revision);
	if (!r.apply) return {
		patch: {},
		effects: []
	};
	let i = ft({
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
function mt(e, t) {
	let n = [];
	U((r) => {
		let i = pt(r, e, t);
		return n = i.effects, i.patch;
	}, () => n.forEach((e) => e()));
}
function ht() {
	U((e) => {
		let t = new Set(Je(e.members, Date.now() + e.serverOffsetMs, f, e.sid));
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
function gt(e, t) {
	let { realtime: r, message: i, host: a } = n(), o = a.capabilities.presenceHeartbeat;
	w(() => {
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
		}, s = r.onMessage((e) => mt(e, a)), c = r.onStatusChange((e) => H({ connectionStatus: e }));
		r.connect(e);
		let l = null, u = null, d = !1, f = () => {
			d || (d = !0, r.send("exitRoom"));
		};
		return o && (l = setInterval(() => {
			r.send("heartbeat");
		}, h), u = setInterval(ht, m), window.addEventListener("pagehide", f)), () => {
			n !== null && clearTimeout(n), l !== null && clearInterval(l), u !== null && clearInterval(u), o && (window.removeEventListener("pagehide", f), f()), s(), c(), r.disconnect();
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
var _t = "We could not open this room. It may have been closed, or you may no longer be a member.";
function vt() {
	let { roomId: r = "" } = O(), i = t(), { session: a, room: o } = n(), [s, c] = D(null), l = V((e) => e.isLoaded), u = V((e) => e.closedReason), d = V((e) => e.connectionStatus);
	w(() => {
		if (!r) {
			i.toHome();
			return;
		}
		let e = a.sessionFor(r);
		if (e === null) i.toJoin(r);
		else return H({
			roomId: r,
			sid: e.sid,
			role: e.role
		}), c(!0), o.refreshSession?.().catch((e) => {
			console.error("Could not refresh the room session", e);
		}), () => {
			ie();
		};
	}, [
		r,
		i,
		a,
		o
	]), gt(r, s === !0), qe(), Ke();
	let f = () => {
		a.clear(), ie(), i.toHome();
	};
	return s === null ? /* @__PURE__ */ I(e, { label: "Checking your session" }) : u === null ? !l && d === "closed" ? /* @__PURE__ */ I(Fe, {
		reason: _t,
		onExit: f
	}) : l ? /* @__PURE__ */ L("div", {
		className: "pk-room",
		children: [
			/* @__PURE__ */ I(Re, { onExit: f }),
			/* @__PURE__ */ I(be, {}),
			/* @__PURE__ */ I("main", {
				className: "pk-room__main pk-scroll",
				children: /* @__PURE__ */ L("div", {
					className: "pk-room__content",
					children: [/* @__PURE__ */ I(We, {}), /* @__PURE__ */ I(Ne, {})]
				})
			}),
			/* @__PURE__ */ I(pe, {}),
			/* @__PURE__ */ I(De, {}),
			/* @__PURE__ */ I(je, {}),
			/* @__PURE__ */ I(xe, {}),
			/* @__PURE__ */ I(ve, {})
		]
	}) : /* @__PURE__ */ I(e, { label: d === "reconnecting" ? "Reconnecting" : "Joining the room" }) : /* @__PURE__ */ I(Fe, {
		reason: u,
		onExit: f
	});
}
export { vt as default };
