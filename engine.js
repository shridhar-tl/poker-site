import { i as e, r as t } from "./chunks/avatars-r3RGoSWH.js";
import { c as n, n as r, s as i } from "./chunks/issues-DMEWaS4E.js";
import { a, i as o, l as s, n as c, r as l, t as u } from "./chunks/scores-BUpnRFKN.js";
// shared/poker/permissions.ts
var d = [
	"startRound",
	"restartRound",
	"revealVotes",
	"setFinalScore",
	"addIssue",
	"addIssues",
	"removeIssue",
	"reorderIssues",
	"updateSettings",
	"renameRoom",
	"kickMember",
	"transferModerator",
	"closeRoom",
	"approveJoin",
	"rejectJoin",
	"approveAllJoin",
	"rejectAllJoin",
	"inviteMembers",
	"revokeInvite",
	"updateAccess"
];
function f(e) {
	return d.includes(e);
}
function p(e) {
	return e.revealed || !e.isCurrentIssue ? !1 : e.allowRevote || !e.hasVoted;
}
// shared/poker/settings.ts
function m(e) {
	return {
		autoReveal: !1,
		showHalfScore: e !== 3,
		maxPoints: u[e],
		allowRevote: !0,
		estimateSync: "manual"
	};
}
function h(e, t) {
	let n = m(e);
	return {
		autoReveal: typeof t.autoReveal == "boolean" ? t.autoReveal : n.autoReveal,
		showHalfScore: typeof t.showHalfScore == "boolean" ? t.showHalfScore : n.showHalfScore,
		maxPoints: typeof t.maxPoints == "number" ? t.maxPoints : n.maxPoints,
		allowRevote: typeof t.allowRevote == "boolean" ? t.allowRevote : n.allowRevote,
		estimateSync: i(t.estimateSync) ? t.estimateSync : n.estimateSync
	};
}
// engine/errors.ts
var g = {
	VALIDATION_FAILED: 400,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	RATE_LIMITED: 429,
	UNSUPPORTED: 501,
	SERVER_ERROR: 500
}, _ = class extends Error {
	code;
	status;
	constructor(e, t) {
		super(t), this.code = e, this.status = g[e];
	}
};
function v(e) {
	return new _("VALIDATION_FAILED", e);
}
function y(e) {
	return new _("NOT_FOUND", e);
}
function b(e) {
	return new _("FORBIDDEN", e);
}
function x(e) {
	return new _("CONFLICT", e);
}
function S(e) {
	return new _("UNSUPPORTED", e);
}
// engine/mappers.ts
function C(e) {
	return {
		roomId: e.roomId,
		roomName: e.roomName,
		scoreType: e.scoreType,
		moderatorId: e.moderatorId,
		currentIssueId: e.currentIssueId,
		issues: e.issues,
		settings: h(e.scoreType, e.settings),
		access: e.access,
		revision: e.revision,
		created: e.created,
		lastActivity: e.lastActivity
	};
}
function w(e, t) {
	return {
		id: e.sid,
		name: e.name,
		role: e.role,
		avatarId: e.avatarId,
		avatarUrl: e.avatarUrl,
		joinedAt: e.joinedAt,
		isOnline: t,
		lastSeenAt: e.lastSeenAt,
		votedIssueIds: e.votedIssueIds ?? []
	};
}
function T(e, t) {
	if (e.reveal) return {
		issueId: e.issueId,
		reveal: !0,
		values: e.values,
		average: e.average,
		maxVote: e.maxVote,
		finalScore: e.finalScore,
		syncedScore: e.syncedScore,
		revealedAt: e.revealedAt
	};
	let n = e.values[t];
	return {
		issueId: e.issueId,
		reveal: !1,
		values: n === void 0 ? {} : { [t]: n }
	};
}
function E(e) {
	return e.reveal ? T(e, "") : {
		issueId: e.issueId,
		reveal: !1,
		values: {}
	};
}
function D(e) {
	return {
		issueId: e.issueId,
		reveal: e.reveal,
		values: {}
	};
}
function O(e) {
	return {
		requestId: e.requestId,
		roomId: e.roomId,
		memberKey: e.memberKey,
		name: e.name,
		avatarId: e.avatarId,
		avatarUrl: e.avatarUrl,
		status: e.status,
		createdAt: e.createdAt,
		reason: e.reason,
		restrictedIssueKeys: e.restrictedIssueKeys
	};
}
function k(e) {
	return e;
}
// engine/util.ts
var A = "0123456789abcdef";
function ee(e) {
	let t = new Uint8Array(e);
	globalThis.crypto.getRandomValues(t);
	let n = "";
	for (let e of t) n += A[e % 16];
	return n;
}
var j = "abcdefghijklmnopqrstuvwxyz0123456789", M = 8;
function N() {
	let e = new Uint8Array(M);
	globalThis.crypto.getRandomValues(e);
	let t = "";
	for (let n of e) t += j[n % 36];
	return t;
}
var P = 31, te = 127;
function F(e) {
	let t = "";
	for (let n of e) {
		let e = n.codePointAt(0) ?? 0;
		e > P && e !== te && (t += n);
	}
	return t.trim();
}
function I(e, t, n) {
	if (typeof e != "string" || !e.trim()) throw v(`${t} is required.`);
	let r = F(e);
	if (!r) throw v(`${t} is required.`);
	if (n?.min && r.length < n.min) throw v(`${t} must be at least ${n.min} characters.`);
	if (n?.max && r.length > n.max) throw v(`${t} must be at most ${n.max} characters.`);
	return r;
}
function L(e, t, n) {
	if (e != null && e !== "") return I(e, t, n);
}
var R = /^https?:\/\//i;
function z(e, t) {
	let n = L(e, t, { max: 2048 });
	if (n !== void 0) {
		if (!R.test(n)) throw v(`${t} must be an http or https URL.`);
		return n;
	}
}
var ne = /^[a-z0-9]{4,15}$/;
function B(e) {
	let t = I(e, "Room id", {
		min: 4,
		max: 15
	}).toLowerCase();
	if (!ne.test(t)) throw v("Room id is not valid.");
	return t;
}
function re(e) {
	return typeof e == "object" && e && !Array.isArray(e) ? e : {};
}
function V(e, t) {
	let n = e[t];
	return typeof n == "string" && n.length > 0 ? n : null;
}
function H(e, t) {
	let n = e[t];
	return typeof n == "boolean" ? n : void 0;
}
function ie(e, t) {
	let n = e[t];
	return typeof n == "number" && Number.isFinite(n) ? n : void 0;
}
function U(e, t) {
	let n = e[t];
	return typeof n == "string" && n.length > 0 || typeof n == "number" && Number.isFinite(n) ? n : null;
}
// engine/rooms.ts
var W = "This room does not exist or has already been closed.", ae = "This room is full. Ask the moderator to remove inactive players.", G = "You have created too many rooms recently. Please try again later.", K = 5, q = /^[A-Za-z0-9_-]{1,40}$/, J = 200;
function oe(e) {
	let t = typeof e == "string" ? parseInt(e, 10) : e;
	if (!l(t)) throw v("The selected score type is not valid.");
	return t;
}
function Y(t) {
	return t == null ? null : e(t) ? t : null;
}
function X(e, t) {
	return {
		id: e.id === void 0 || e.id === null || e.id === "" ? t(10) : se(e.id),
		key: I(e.key, "Issue key", { max: 64 }),
		summary: e.summary ? String(e.summary).slice(0, 500) : void 0,
		url: z(e.url, "Issue URL"),
		icon: z(e.icon, "Issue icon"),
		root: z(e.root, "Jira site")
	};
}
function se(e) {
	let t = typeof e == "number" && Number.isInteger(e) ? String(e) : e;
	if (typeof t != "string" || !q.test(t)) throw v("The issue id is not valid.");
	return t;
}
function ce(e) {
	let t = typeof e == "object" && e ? e : {};
	return {
		id: I(t.id, "User id", { max: 128 }),
		name: I(t.name, "User name", { max: 100 }),
		email: L(t.email, "User email", { max: 254 }),
		avatarUrl: z(t.avatarUrl, "Avatar URL")
	};
}
function Z(e) {
	let { store: n, config: r } = e, i = () => e.now ? e.now() : /* @__PURE__ */ new Date(), a = () => i().toISOString(), o = e.newId ?? ee;
	async function s(e) {
		let t = await n.getRoom(e);
		if (!t) throw y(W);
		return t;
	}
	async function c(e, t) {
		return (await n.listMembers(e)).find((e) => e.memberKey === t);
	}
	function l(e) {
		return {
			requireApproval: e.requireApproval ?? r.defaultAccess.requireApproval,
			listed: r.directoryEnabled ? e.listed ?? r.defaultAccess.listed : !1
		};
	}
	async function u(i) {
		e.rateLimiter && await e.rateLimiter.enforce(`create-room#${i.memberKey}`, r.maxRoomsPerMemberPerHour, G);
		let s = a(), c = o(12);
		for (let r = 0; r < K; r += 1) {
			let r = e.newRoomId ? e.newRoomId() : N(), a = {
				roomId: r,
				roomName: i.roomName,
				scoreType: i.scoreType,
				moderatorId: c,
				moderatorKey: i.memberKey,
				currentIssueId: null,
				issues: [],
				settings: m(i.scoreType),
				access: l(i),
				memberCount: 1,
				revision: 0,
				created: s,
				lastActivity: s
			}, o = {
				sid: c,
				memberKey: i.memberKey,
				name: i.name,
				role: "mod",
				avatarId: t(i.avatarId, i.avatarUrl),
				avatarUrl: i.avatarUrl,
				votedIssueIds: [],
				joinedAt: s,
				lastSeenAt: s
			};
			if (await n.createRoom(a, o)) return await d(r, c, i.invitees ?? []), {
				room: a,
				member: o
			};
		}
		throw new _("SERVER_ERROR", "Could not allocate a room id. Please try again.");
	}
	async function d(t, n, i) {
		if (i.length === 0 || !e.invitations || !r.invitationsEnabled) return;
		let o = a(), s = new Map(i.map((e) => [e.id, e]));
		for (let i of [...s.values()].slice(0, r.maxInvitationsPerRoom)) await e.invitations.putInvitation({
			roomId: t,
			invitee: i,
			invitedBy: n,
			createdAt: o
		});
	}
	async function f(e, i) {
		let s = await n.listMembers(e.roomId);
		if (s.length >= r.maxRoomMembers) throw x(ae);
		let c = a(), l = {
			sid: o(12),
			memberKey: i.memberKey,
			name: i.name,
			role: "player",
			avatarId: t(i.avatarId, i.avatarUrl),
			avatarUrl: i.avatarUrl,
			votedIssueIds: [],
			joinedAt: c,
			lastSeenAt: c
		};
		return await n.putMember(e.roomId, l), {
			room: await n.updateRoom(e.roomId, {
				memberCount: s.length + 1,
				lastActivity: c
			}) ?? {
				...e,
				memberCount: s.length + 1
			},
			member: l
		};
	}
	async function p(r) {
		let i = await s(r.roomId), o = a(), l = await c(r.roomId, r.memberKey);
		if (l) {
			let e = await n.updateMember(r.roomId, l.sid, {
				name: r.name,
				avatarId: r.avatarId ?? l.avatarId ?? t(null, r.avatarUrl ?? l.avatarUrl),
				avatarUrl: r.avatarUrl,
				lastSeenAt: o
			});
			return await n.updateRoom(r.roomId, { lastActivity: o }), {
				kind: "joined",
				room: i,
				member: e ?? l,
				isNew: !1
			};
		}
		let u = e.invitations ? await e.invitations.getInvitation(r.roomId, r.memberKey) : null, d = (r.restrictedIssueKeys ?? []).length > 0;
		if (u || !i.access.requireApproval && !d) {
			let t = await f(i, r);
			return u && e.invitations && await e.invitations.removeInvitation(r.roomId, r.memberKey), {
				kind: "joined",
				room: t.room,
				member: t.member,
				isNew: !0
			};
		}
		return await g(i, r);
	}
	async function h(e, t) {
		let a = i().getTime() - r.joinRequestLifetimeMs, o = t.filter((e) => new Date(e.createdAt).getTime() < a), s = t.filter((e) => !o.includes(e)).filter((e) => e.status !== "pending").sort((e, t) => t.createdAt.localeCompare(e.createdAt)).slice(r.maxPendingJoinRequestsPerRoom), c = /* @__PURE__ */ new Set([...o, ...s]);
		for (let t of c) await n.removeJoinRequest(e, t.requestId);
		return t.filter((e) => !c.has(e));
	}
	async function g(e, i) {
		let o = await h(e.roomId, await n.listJoinRequests(e.roomId)), s = o.filter((e) => e.status === "pending"), c = s.find((e) => e.memberKey === i.memberKey);
		if (c) return {
			kind: "pending",
			room: e,
			request: c,
			events: []
		};
		if (s.length >= r.maxPendingJoinRequestsPerRoom) throw x("This room has too many pending join requests. Try again later.");
		for (let t of o.filter((e) => e.memberKey === i.memberKey)) await n.removeJoinRequest(e.roomId, t.requestId);
		let l = {
			requestId: i.memberKey,
			roomId: e.roomId,
			memberKey: i.memberKey,
			name: i.name,
			avatarId: t(i.avatarId, i.avatarUrl),
			avatarUrl: i.avatarUrl,
			status: "pending",
			createdAt: a()
		}, u = (i.restrictedIssueKeys ?? []).slice(0, J);
		return u.length && (l.restrictedIssueKeys = u), await n.putJoinRequest(l), {
			kind: "pending",
			room: e,
			request: l,
			events: [{
				audience: {
					kind: "member",
					sid: e.moderatorId
				},
				action: "joinRequested",
				payload: { request: O(l) }
			}]
		};
	}
	async function v(e, t) {
		if (await c(e, t)) return {
			status: "approved",
			admitted: !0
		};
		let r = await n.getJoinRequest(e, t);
		return r ? {
			status: r.status,
			reason: r.reason,
			admitted: !1
		} : {
			status: "cancelled",
			admitted: !1
		};
	}
	async function E(e, t) {
		let r = await n.getJoinRequest(e, t);
		if (!r) return [];
		await n.removeJoinRequest(e, t);
		let i = await n.getRoom(e);
		return i ? [{
			audience: {
				kind: "member",
				sid: i.moderatorId
			},
			action: "joinRequestResolved",
			payload: {
				requestIds: [r.requestId],
				status: "cancelled"
			}
		}] : [];
	}
	async function D(e) {
		let t = await s(B(e));
		return {
			roomId: t.roomId,
			roomName: t.roomName,
			scoreType: t.scoreType,
			memberCount: t.memberCount,
			created: t.created,
			requireApproval: t.access.requireApproval
		};
	}
	async function A(t, r) {
		let [i, o, c] = await Promise.all([
			s(t),
			n.listMembers(t),
			n.listVotes(t)
		]), l = await e.presence.onlineSids(t, o), u = i.moderatorId === r, d = [], f = [];
		return u && (d = (await n.listJoinRequests(t)).filter((e) => e.status === "pending"), f = e.invitations ? await e.invitations.listInvitations(t) : []), {
			room: C(i),
			members: o.map((e) => w(e, l.has(e.sid))),
			votes: c.map((e) => T(e, r)),
			sid: r,
			role: u ? "mod" : "player",
			joinRequests: d.map(O),
			invitations: f.map(k),
			serverTime: a()
		};
	}
	async function j(t) {
		let i = e.directory;
		if (!r.directoryEnabled || !i) throw S("The room directory is not available.");
		let a = r.directoryLimit, [o, s, c, l] = await Promise.all([
			i.listListedRooms(a),
			i.listRoomsOfMember(t, a),
			i.listInvitationsFor(t, a),
			i.listJoinRequestsBy(t, a)
		]), u = new Map(l.map((e) => [e.roomId, e])), d = new Set(c.map((e) => e.roomId)), f = new Set(s.map((e) => e.roomId)), p = (await i.getRooms([...d])).filter((e) => !f.has(e.roomId)), m = o.filter((e) => !f.has(e.roomId) && !d.has(e.roomId)), h = await i.hostNames([
			...p,
			...s,
			...m
		]), g = /* @__PURE__ */ new Map();
		for (let e of s.filter((e) => e.moderatorKey === t && e.access.requireApproval)) {
			let t = (await n.listJoinRequests(e.roomId)).filter((e) => e.status === "pending");
			g.set(e.roomId, t.length);
		}
		let _ = (e) => ({
			roomId: e.roomId,
			roomName: e.roomName,
			scoreType: e.scoreType,
			hostName: h.get(e.roomId) ?? "",
			memberCount: e.memberCount,
			requireApproval: e.access.requireApproval,
			created: e.created,
			lastActivity: e.lastActivity,
			isMember: f.has(e.roomId),
			isHost: e.moderatorKey === t,
			invited: d.has(e.roomId),
			requestStatus: u.get(e.roomId)?.status,
			requestId: u.get(e.roomId)?.requestId,
			pendingRequests: g.get(e.roomId)
		});
		return {
			invited: p.map(_),
			mine: s.map(_),
			open: m.map(_)
		};
	}
	async function M(t, r) {
		let i = await n.getMember(t, r);
		if (!i) return [];
		let a = await n.listMembers(t), o = await e.presence.onlineSids(t, a);
		return o.add(r), [{
			audience: {
				kind: "room",
				exceptSid: r
			},
			action: "memberJoined",
			payload: { member: w(i, !0) }
		}, {
			audience: { kind: "room" },
			action: "presenceUpdate",
			payload: { onlineIds: [...o] }
		}];
	}
	function P(e, t) {
		return {
			audience: { kind: "room" },
			action: "membersJoined",
			payload: { members: e.map((e) => w(e, t.has(e.sid))) }
		};
	}
	return {
		createRoom: u,
		joinRoom: p,
		admit: f,
		purgeStaleRequests: h,
		getJoinRequest: v,
		cancelJoinRequest: E,
		getSummary: D,
		buildSnapshot: A,
		listDirectory: j,
		announceMember: M,
		membersJoinedEvent: P,
		requireRoom: s,
		forbidden: b
	};
}
// engine/dispatch.ts
var Q = "There is no active estimation round for this issue.", le = "Votes for this round have already been revealed.", ue = "You have already voted in this round.", de = "That issue is not part of this room.", fe = "This room has reached the maximum number of issues.", pe = "Add between 1 and 20 issues at a time.", me = "Only the moderator can perform this action.", he = "1970-01-01T00:00:00.000Z", ge = "The moderator closed this room.", _e = 40;
function ve(e) {
	let t = e.estimateSync;
	if (t !== void 0) {
		if (!i(t)) throw v("The selected estimate update option is not valid.");
		return t;
	}
}
function ye(i, l) {
	let { store: u, config: d } = i, m = () => i.now ? i.now() : /* @__PURE__ */ new Date(), g = () => m().toISOString(), _ = i.newId ?? ee;
	function O(e, t) {
		return {
			audience: { kind: "room" },
			action: e,
			payload: t
		};
	}
	function k(e, t, n) {
		return {
			audience: {
				kind: "member",
				sid: e
			},
			action: t,
			payload: n
		};
	}
	async function A(e) {
		let t = await u.listMembers(e);
		return O("presenceUpdate", { onlineIds: [...await i.presence.onlineSids(e, t)] });
	}
	async function j(e, t) {
		let n = await u.listMembers(e);
		await Promise.all(n.filter((e) => (e.votedIssueIds ?? []).includes(t)).map(async (n) => {
			let r = (n.votedIssueIds ?? []).filter((e) => e !== t);
			try {
				await u.updateMember(e, n.sid, { votedIssueIds: r });
			} catch (e) {
				console.error("[engine.clearVotedIssueId] failed for member:", n.sid, e);
			}
		}));
	}
	function M(e) {
		return {
			issueId: e,
			reveal: !1,
			values: {},
			createdAt: g()
		};
	}
	async function N(e, t, n) {
		let r = await u.getVote(e, n);
		if (!r) throw x(Q);
		if (r.reveal) return r;
		let i = await u.listMembers(e), a = s(r.values, i.map((e) => e.sid), t), o = await u.revealVote(e, n, a);
		if (!o) throw x(Q);
		return o;
	}
	let P = async ({ room: e, member: t, payload: n }) => {
		let r = V(n, "issueId"), i = U(n, "vote");
		if (!r || i === null) throw v("An issue and an estimate are required.");
		if (!o(e.scoreType, i)) throw v("That is not a valid estimate for this deck.");
		let a = await u.getVote(e.roomId, r);
		if (!a) throw x(Q);
		let s = a.values[t.sid] !== void 0;
		if (!p({
			revealed: a.reveal,
			isCurrentIssue: e.currentIssueId === r,
			hasVoted: s,
			allowRevote: e.settings.allowRevote
		})) throw a.reveal ? x(le) : e.currentIssueId === r ? x(ue) : x(Q);
		let c = await u.submitVote(e.roomId, r, t.sid, i);
		if (c.kind === "revealed") throw x(le);
		if (c.kind === "missing") throw x(Q);
		let l = c.vote;
		s || await u.updateMember(e.roomId, t.sid, {
			votedIssueIds: [...t.votedIssueIds ?? [], r],
			lastSeenAt: g()
		});
		let d = Object.keys(l.values), f = await u.listMembers(e.roomId), m = e.settings.autoReveal && f.every((e) => l.values[e.sid] !== void 0), h = [O("voteProgress", {
			issueId: r,
			votedIds: d
		}), k(t.sid, "voteUpdated", { vote: T(l, t.sid) })], _ = l;
		return m && (_ = await N(e.roomId, e.scoreType, r), h.push(O("votesRevealed", { vote: E(_) }))), await u.updateRoom(e.roomId, { lastActivity: g() }), {
			events: h,
			result: {
				vote: T(_, t.sid),
				votedIds: d
			}
		};
	}, te = async ({ room: e, payload: t }) => {
		let n = V(t, "issueId");
		if (!n) throw v("An issue is required to start a round.");
		if (!e.issues.some((e) => e.id === n)) throw y(de);
		let r = M(n);
		return await u.startRound(e.roomId, {
			vote: r,
			roomPatch: {
				currentIssueId: n,
				lastActivity: g()
			}
		}), { events: [O("roundStarted", {
			currentIssueId: n,
			issues: e.issues,
			vote: D(r)
		})] };
	}, F = async ({ room: e, payload: t }) => {
		let n = V(t, "issueId");
		if (!n) throw v("An issue is required to restart a round.");
		if (!e.issues.some((e) => e.id === n)) throw y(de);
		let r = _(10), i = e.issues.map((e) => e.id === n ? {
			...e,
			id: r
		} : e), a = M(r);
		return await u.startRound(e.roomId, {
			vote: a,
			removeIssueId: n,
			roomPatch: {
				currentIssueId: r,
				issues: i,
				lastActivity: g()
			}
		}), await j(e.roomId, n), { events: [O("roundStarted", {
			currentIssueId: r,
			issues: i,
			vote: D(a)
		})] };
	}, I = async ({ room: e, payload: t }) => {
		let n = V(t, "issueId") ?? e.currentIssueId;
		if (!n) throw v("There is no round to reveal.");
		let r = await N(e.roomId, e.scoreType, n);
		return await u.updateRoom(e.roomId, { lastActivity: g() }), { events: [O("votesRevealed", { vote: E(r) })] };
	}, L = async ({ room: e, payload: t }) => {
		let n = V(t, "issueId"), r = U(t, "finalScore");
		if (!n || r === null) throw v("An issue and a final score are required.");
		if (!o(e.scoreType, r)) throw v("That is not a valid final score for this deck.");
		let i = H(t, "synced") === !0;
		if (i && !c(r)) throw v("Only numeric scores can be saved as story points.");
		let a = await u.setFinalScore(e.roomId, n, i ? {
			finalScore: r,
			syncedScore: r
		} : { finalScore: r });
		if (!a) throw x("Reveal the votes before setting a final score.");
		return { events: [O("votesRevealed", { vote: E(a) })] };
	};
	function R(e, t) {
		return O("issuesUpdated", {
			issues: e,
			currentIssueId: t
		});
	}
	let z = async ({ room: e, payload: t }) => {
		let n = X(t.issue ?? t, _);
		if (e.issues.length >= d.maxRoomIssues) throw x(fe);
		let r = [...e.issues, n];
		return await u.updateRoom(e.roomId, {
			issues: r,
			lastActivity: g()
		}), { events: [R(r, e.currentIssueId)] };
	}, ne = async ({ room: e, payload: t }) => {
		let n = t.issues;
		if (!Array.isArray(n) || n.length === 0 || n.length > 20) throw v(pe);
		let i = n.map((e) => X(typeof e == "object" && e ? e : {}, _)), a = r(e.issues, i);
		if (a.length === 0) return {
			result: { added: 0 },
			events: []
		};
		let o = d.maxRoomIssues - e.issues.length;
		if (a.length > o) throw x(o > 0 ? `Only ${o} more issue${o === 1 ? "" : "s"} fit in this room.` : fe);
		let s = [...e.issues, ...a];
		return await u.updateRoom(e.roomId, {
			issues: s,
			lastActivity: g()
		}), {
			result: { added: a.length },
			events: [R(s, e.currentIssueId)]
		};
	}, B = async ({ room: e, payload: t }) => {
		let n = V(t, "issueId");
		if (!n) throw v("An issue is required.");
		let r = e.issues.filter((e) => e.id !== n), i = e.currentIssueId === n ? null : e.currentIssueId;
		return await u.updateRoom(e.roomId, {
			issues: r,
			currentIssueId: i,
			lastActivity: g()
		}), await u.removeVote(e.roomId, n), await j(e.roomId, n), { events: [R(r, i)] };
	}, W = async ({ room: e, payload: t }) => {
		let n = t.issueIds, r = Array.isArray(n) ? n.filter((e) => typeof e == "string") : [], i = new Map(e.issues.map((e) => [e.id, e])), a = r.map((e) => i.get(e)).filter((e) => e !== void 0);
		if (a.length !== e.issues.length) throw v("The issue order does not match this room.");
		return await u.updateRoom(e.roomId, {
			issues: a,
			lastActivity: g()
		}), { events: [R(a, e.currentIssueId)] };
	};
	function ae(e, t) {
		let r = h(e.scoreType, e.settings);
		if (typeof t.autoReveal == "boolean" && (r.autoReveal = t.autoReveal), typeof t.allowRevote == "boolean" && (r.allowRevote = t.allowRevote), typeof t.showHalfScore == "boolean" && e.scoreType !== 3 && (r.showHalfScore = t.showHalfScore), typeof t.maxPoints == "number" && e.scoreType !== 3) {
			if (!a(e.scoreType).includes(t.maxPoints)) throw v("The selected max score is not valid for this deck.");
			r.maxPoints = t.maxPoints;
		}
		return t.estimateSync !== void 0 && n(e.scoreType) && (r.estimateSync = t.estimateSync), r;
	}
	async function G(e) {
		return O("roomUpdated", { room: C(await l.requireRoom(e)) });
	}
	let K = async ({ room: e, payload: t }) => {
		let n = ae(e, {
			autoReveal: H(t, "autoReveal"),
			showHalfScore: H(t, "showHalfScore"),
			allowRevote: H(t, "allowRevote"),
			maxPoints: ie(t, "maxPoints"),
			estimateSync: ve(t)
		}), r = await u.updateRoom(e.roomId, {
			settings: n,
			lastActivity: g()
		});
		if (!r) throw y("This room does not exist or has already been closed.");
		return { events: [O("roomUpdated", { room: C(r) })] };
	}, q = async ({ room: e, payload: t }) => {
		let n = V(t, "roomName");
		if (!n) throw v("A room name is required.");
		let r = await u.updateRoom(e.roomId, {
			roomName: n.slice(0, _e),
			lastActivity: g()
		});
		if (!r) throw y("This room does not exist or has already been closed.");
		return { events: [O("roomUpdated", { room: C(r) })] };
	}, J = async ({ room: e, payload: t }) => {
		let n = { ...e.access }, r = H(t, "requireApproval"), i = H(t, "listed");
		r !== void 0 && (n.requireApproval = r), i !== void 0 && (n.listed = d.directoryEnabled ? i : !1);
		let a = await u.updateRoom(e.roomId, {
			access: n,
			lastActivity: g()
		});
		if (!a) throw y("This room does not exist or has already been closed.");
		return { events: [O("roomUpdated", { room: C(a) })] };
	}, oe = async ({ room: n, member: r, payload: a }) => {
		let o = a.avatarId, s = typeof o == "number" ? o : null;
		if (s !== null && !e(s)) throw v("The selected avatar is not valid.");
		let c = t(s, r.avatarUrl), l = await u.updateMember(n.roomId, r.sid, {
			avatarId: c,
			lastSeenAt: g()
		});
		if (!l) throw y("You are no longer a member of this room.");
		let d = await u.listMembers(n.roomId);
		return { events: [O("memberUpdated", { member: w(l, (await i.presence.onlineSids(n.roomId, d)).has(l.sid)) })] };
	};
	async function Y(e, t) {
		await u.removeMember(e, t);
		let n = await u.listMembers(e);
		await u.updateRoom(e, {
			memberCount: n.length,
			lastActivity: g()
		});
	}
	let se = async ({ room: e, member: t, payload: n }) => {
		let r = V(n, "sid");
		if (!r) throw v("A member is required.");
		if (r === t.sid) throw v("You cannot remove yourself. Close the room instead.");
		let a = await u.getMember(e.roomId, r);
		return await Y(e.roomId, r), a && i.invitations && await i.invitations.removeInvitation(e.roomId, a.memberKey), {
			events: [
				k(r, "kicked", { reason: "The moderator removed you from this room." }),
				O("memberLeft", { sid: r }),
				await A(e.roomId)
			],
			disconnect: { sids: [r] }
		};
	};
	async function Z(e, t, n) {
		return await u.transferModerator(e.roomId, t, n.sid, n.memberKey);
	}
	let ye = async ({ room: e, member: t, payload: n }) => {
		let r = V(n, "sid");
		if (!r) throw v("A member is required.");
		let i = await u.getMember(e.roomId, r);
		if (!i) throw b("You are not a member of this room.");
		if (!await Z(e, t.sid, i)) throw x("The moderator has already changed.");
		return { events: [O("moderatorChanged", {
			moderatorId: r,
			previousModeratorId: t.sid
		}), await G(e.roomId)] };
	}, be = async ({ room: e, member: t }) => {
		if (e.moderatorId === t.sid) throw x("You are already the host of this room.");
		let n = await u.listMembers(e.roomId), r = n.find((t) => t.sid === e.moderatorId);
		if (r) {
			let t = await i.presence.onlineSids(e.roomId, n), a = m().getTime() - new Date(r.lastSeenAt).getTime();
			if (t.has(r.sid) || a < d.hostAwayGraceMs) throw x("The host is still in this room.");
		}
		let a = e.moderatorId;
		if (await u.updateMember(e.roomId, t.sid, { lastSeenAt: g() }), !await Z(e, a, t)) throw x("Someone else has already taken over as host.");
		return { events: [O("moderatorChanged", {
			moderatorId: t.sid,
			previousModeratorId: a
		}), await G(e.roomId)] };
	}, xe = async ({ room: e, member: t, payload: n }) => {
		if (e.moderatorId !== t.sid) return await Y(e.roomId, t.sid), {
			events: [O("memberLeft", { sid: t.sid }), await A(e.roomId)],
			disconnect: { sids: [t.sid] }
		};
		let r = (await u.listMembers(e.roomId)).filter((e) => e.sid !== t.sid);
		if (r.length === 0) return await Se(e.roomId, ge);
		let i = V(n, "successorSid"), a = r.find((e) => e.sid === i);
		if (!a) throw v("Choose who should host this room before you leave.");
		if (!await Z(e, t.sid, a)) throw x("The moderator has already changed.");
		return await Y(e.roomId, t.sid), {
			events: [
				O("moderatorChanged", {
					moderatorId: a.sid,
					previousModeratorId: t.sid
				}),
				await G(e.roomId),
				O("memberLeft", { sid: t.sid }),
				await A(e.roomId)
			],
			disconnect: { sids: [t.sid] }
		};
	};
	async function Se(e, t) {
		let n = O("roomClosed", { reason: t });
		if (await u.removeRoom(e), i.invitations) {
			let t = await i.invitations.listInvitations(e);
			await Promise.all(t.map((t) => i.invitations?.removeInvitation(e, t.invitee.id)));
		}
		return {
			events: [n],
			disconnect: { all: !0 },
			roomClosed: !0
		};
	}
	let Ce = async ({ room: e }) => await Se(e.roomId, ge), we = async ({ room: e, member: t }) => ({
		events: [],
		result: await l.buildSnapshot(e.roomId, t.sid)
	}), Te = async ({ room: e, member: t }) => {
		await u.updateMember(e.roomId, t.sid, { lastSeenAt: g() });
		let n = await u.listMembers(e.roomId), r = await i.presence.onlineSids(e.roomId, n);
		r.add(t.sid);
		let a = 0;
		e.moderatorId === t.sid && (a = (await u.listJoinRequests(e.roomId)).filter((e) => e.status === "pending").length);
		let o = await u.getRoom(e.roomId);
		return {
			events: [],
			result: {
				serverTime: g(),
				revision: o?.revision ?? e.revision,
				onlineIds: [...r],
				lastSeen: Object.fromEntries(n.map((e) => [e.sid, e.lastSeenAt])),
				pendingJoinRequests: a
			}
		};
	}, Ee = async ({ room: e, member: t }) => (await u.updateMember(e.roomId, t.sid, { lastSeenAt: he }), { events: [await A(e.roomId)] }), De = async ({ room: e, payload: t }) => {
		let n = V(t, "requestId");
		if (!n) throw v("A join request is required.");
		let r = await u.getJoinRequest(e.roomId, n), a = await u.listMembers(e.roomId);
		if (!r) {
			if (a.some((e) => e.memberKey === n)) return {
				events: [k(e.moderatorId, "joinRequestResolved", {
					requestIds: [n],
					status: "approved"
				})],
				result: {
					approved: 0,
					remaining: 0
				}
			};
			throw y("That join request is no longer pending.");
		}
		if (r.status !== "pending") throw y("That join request is no longer pending.");
		let o = a.some((e) => e.memberKey === r.memberKey), s = k(e.moderatorId, "joinRequestResolved", {
			requestIds: [n],
			status: "approved"
		});
		if (o) return await u.removeJoinRequest(e.roomId, n), {
			events: [s],
			result: {
				approved: 0,
				remaining: 0
			}
		};
		let { member: c } = await l.admit(e, r);
		await u.removeJoinRequest(e.roomId, n);
		let d = await i.presence.onlineSids(e.roomId, [c]);
		return {
			events: [l.membersJoinedEvent([c], d), s],
			result: {
				approved: 1,
				remaining: 0
			}
		};
	}, Oe = async ({ room: e, payload: t }) => {
		let n = V(t, "requestId");
		if (!n) throw v("A join request is required.");
		let r = V(t, "reason")?.slice(0, 200);
		if (!await u.updateJoinRequest(e.roomId, n, {
			status: "rejected",
			reason: r
		})) throw y("That join request is no longer pending.");
		return { events: [k(e.moderatorId, "joinRequestResolved", {
			requestIds: [n],
			status: "rejected"
		})] };
	};
	async function ke(e) {
		return (await l.purgeStaleRequests(e, await u.listJoinRequests(e))).filter((e) => e.status === "pending").sort((e, t) => e.createdAt.localeCompare(t.createdAt));
	}
	let Ae = async ({ room: e, payload: t }) => {
		let n = await ke(e.roomId), r = await u.listMembers(e.roomId), a = new Set(r.map((e) => e.memberKey)), o = n.slice(0, d.bulkJoinBatchSize), s = [], c = [], f = g(), p = r.length;
		for (let t of o) {
			if (a.has(t.memberKey)) {
				await u.removeJoinRequest(e.roomId, t.requestId), c.push(t.requestId);
				continue;
			}
			if (p >= d.maxRoomMembers) continue;
			let n = {
				sid: _(12),
				memberKey: t.memberKey,
				name: t.name,
				role: "player",
				avatarId: t.avatarId,
				avatarUrl: t.avatarUrl,
				votedIssueIds: [],
				joinedAt: f,
				lastSeenAt: f
			};
			await u.putMember(e.roomId, n), await u.removeJoinRequest(e.roomId, t.requestId), a.add(t.memberKey), s.push(n), c.push(t.requestId), p += 1;
		}
		let m = H(t, "disableApproval") === !0, h = {
			memberCount: p,
			lastActivity: f
		}, v = await u.updateRoom(e.roomId, m ? {
			...h,
			access: {
				...e.access,
				requireApproval: !1
			}
		} : h), y = [];
		if (s.length > 0) {
			let t = await i.presence.onlineSids(e.roomId, s);
			y.push(l.membersJoinedEvent(s, t));
		}
		return y.push(k(e.moderatorId, "joinRequestResolved", {
			requestIds: c,
			status: "approved"
		})), m && v && y.push(O("roomUpdated", { room: C(v) })), {
			events: y,
			result: {
				approved: s.length,
				remaining: n.length - c.length
			}
		};
	}, je = async ({ room: e, payload: t }) => {
		let n = await ke(e.roomId), r = n.slice(0, d.bulkJoinBatchSize), i = V(t, "reason")?.slice(0, 200);
		for (let t of r) await u.updateJoinRequest(e.roomId, t.requestId, {
			status: "rejected",
			reason: i
		});
		return {
			events: [k(e.moderatorId, "joinRequestResolved", {
				requestIds: r.map((e) => e.requestId),
				status: "rejected"
			})],
			result: {
				rejected: r.length,
				remaining: n.length - r.length
			}
		};
	};
	function Me() {
		if (!d.invitationsEnabled || !i.invitations) throw S("Invitations are not available.");
		return i.invitations;
	}
	let $ = {
		requestResync: we,
		submitVote: P,
		startRound: te,
		restartRound: F,
		revealVotes: I,
		setFinalScore: L,
		addIssue: z,
		addIssues: ne,
		removeIssue: B,
		reorderIssues: W,
		updateSettings: K,
		renameRoom: q,
		updateAvatar: oe,
		kickMember: se,
		transferModerator: ye,
		leaveRoom: xe,
		closeRoom: Ce,
		approveJoin: De,
		rejectJoin: Oe,
		approveAllJoin: Ae,
		rejectAllJoin: je,
		inviteMembers: async ({ room: e, member: t, payload: n }) => {
			let r = Me(), i = (Array.isArray(n.users) ? n.users : []).map(ce);
			if (i.length === 0) throw v("Choose at least one person to invite.");
			let a = await u.listMembers(e.roomId), o = new Set(a.map((e) => e.memberKey)), s = await r.listInvitations(e.roomId), c = new Set(s.map((e) => e.invitee.id)), l = i.filter((e, t) => !o.has(e.id) && i.findIndex((t) => t.id === e.id) === t);
			if (s.length + l.filter((e) => !c.has(e.id)).length > d.maxInvitationsPerRoom) throw x("This room has reached the maximum number of invitations.");
			let f = g();
			for (let n of l) await r.putInvitation({
				roomId: e.roomId,
				invitee: n,
				invitedBy: t.sid,
				createdAt: f
			});
			let p = await r.listInvitations(e.roomId);
			return {
				events: [k(e.moderatorId, "invitationsUpdated", { invitations: p })],
				result: { invitations: p }
			};
		},
		revokeInvite: async ({ room: e, payload: t }) => {
			let n = Me(), r = V(t, "userId");
			if (!r) throw v("A user is required.");
			await n.removeInvitation(e.roomId, r);
			let i = await n.listInvitations(e.roomId);
			return {
				events: [k(e.moderatorId, "invitationsUpdated", { invitations: i })],
				result: { invitations: i }
			};
		},
		updateAccess: J,
		claimModerator: be,
		heartbeat: Te,
		exitRoom: Ee
	}, Ne = /* @__PURE__ */ new Set(["requestResync", "heartbeat"]);
	function Pe(e) {
		return Object.hasOwn($, e) && $[e] !== void 0;
	}
	async function Fe(e) {
		let t = Object.hasOwn($, e.action) ? $[e.action] : void 0;
		if (!t) throw S(`Action '${e.action}' is not available.`);
		let n = await l.requireRoom(e.principal.roomId), r = await u.getMember(n.roomId, e.principal.sid);
		if (!r) throw b("You are not a member of this room.");
		if (f(e.action) && n.moderatorId !== r.sid) throw b(me);
		let i = await t({
			room: n,
			member: r,
			payload: re(e.payload)
		});
		if (i.events.some((e) => e.audience.kind === "room") && !i.roomClosed && !Ne.has(e.action)) {
			let e = await u.bumpRevision(n.roomId);
			return {
				...i,
				revision: e
			};
		}
		return i;
	}
	return {
		dispatch: Fe,
		isHandled: Pe
	};
}
// engine/ports.ts
var be = {
	maxRoomMembers: 50,
	maxRoomIssues: 200,
	maxRoomsPerMemberPerHour: 20,
	maxInvitationsPerRoom: 100,
	maxPendingJoinRequestsPerRoom: 100,
	maxPendingJoinRequestsPerMember: 5,
	bulkJoinBatchSize: 25,
	joinRequestLifetimeMs: 864e5,
	hostAwayGraceMs: 18e4,
	defaultAccess: {
		requireApproval: !1,
		listed: !1
	},
	directoryEnabled: !1,
	invitationsEnabled: !1,
	directoryLimit: 100
};
// engine/index.ts
function xe(e) {
	let t = Z(e), n = ye(e, t);
	return {
		rooms: t,
		dispatch: n.dispatch,
		isHandled: n.isHandled,
		deps: e
	};
}
export { _ as EngineError, x as conflictError, xe as createEngine, be as defaultEngineConfig, b as forbiddenError, X as normalizeIssue, ce as normalizeUserRef, y as notFoundError, z as optionalHttpUrl, L as optionalText, Y as parseAvatarId, oe as parseScoreType, B as requireRoomId, I as requireText, F as sanitizeText, s as summarizeVotes, D as toEmptyVote, k as toInvitation, O as toJoinRequest, w as toMember, E as toRevealedVote, C as toRoom, T as toVote, S as unsupportedError, v as validationError };
