import { i as e, r as t } from "./chunks/avatars-r3RGoSWH.js";
import { a as n, o as r } from "./chunks/estimates-Dobh8bG9.js";
import { a as i, i as a, l as o, n as s, r as c, t as l } from "./chunks/scores-BUpnRFKN.js";
// shared/poker/permissions.ts
var u = [
	"startRound",
	"restartRound",
	"revealVotes",
	"setFinalScore",
	"addIssue",
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
function d(e) {
	return u.includes(e);
}
function f(e) {
	return e.revealed || !e.isCurrentIssue ? !1 : e.allowRevote || !e.hasVoted;
}
// shared/poker/settings.ts
function p(e) {
	return {
		autoReveal: !1,
		showHalfScore: e !== 3,
		maxPoints: l[e],
		allowRevote: !0,
		estimateSync: "manual"
	};
}
function m(e, t) {
	let r = p(e);
	return {
		autoReveal: typeof t.autoReveal == "boolean" ? t.autoReveal : r.autoReveal,
		showHalfScore: typeof t.showHalfScore == "boolean" ? t.showHalfScore : r.showHalfScore,
		maxPoints: typeof t.maxPoints == "number" ? t.maxPoints : r.maxPoints,
		allowRevote: typeof t.allowRevote == "boolean" ? t.allowRevote : r.allowRevote,
		estimateSync: n(t.estimateSync) ? t.estimateSync : r.estimateSync
	};
}
// engine/errors.ts
var h = {
	VALIDATION_FAILED: 400,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	RATE_LIMITED: 429,
	UNSUPPORTED: 501,
	SERVER_ERROR: 500
}, g = class extends Error {
	code;
	status;
	constructor(e, t) {
		super(t), this.code = e, this.status = h[e];
	}
};
function _(e) {
	return new g("VALIDATION_FAILED", e);
}
function v(e) {
	return new g("NOT_FOUND", e);
}
function y(e) {
	return new g("FORBIDDEN", e);
}
function b(e) {
	return new g("CONFLICT", e);
}
function x(e) {
	return new g("UNSUPPORTED", e);
}
// engine/mappers.ts
function S(e) {
	return {
		roomId: e.roomId,
		roomName: e.roomName,
		scoreType: e.scoreType,
		moderatorId: e.moderatorId,
		currentIssueId: e.currentIssueId,
		issues: e.issues,
		settings: m(e.scoreType, e.settings),
		access: e.access,
		revision: e.revision,
		created: e.created,
		lastActivity: e.lastActivity
	};
}
function C(e, t) {
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
function w(e, t) {
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
function T(e) {
	return e.reveal ? w(e, "") : {
		issueId: e.issueId,
		reveal: !1,
		values: {}
	};
}
function E(e) {
	return {
		issueId: e.issueId,
		reveal: e.reveal,
		values: {}
	};
}
function D(e) {
	return {
		requestId: e.requestId,
		roomId: e.roomId,
		memberKey: e.memberKey,
		name: e.name,
		avatarId: e.avatarId,
		avatarUrl: e.avatarUrl,
		status: e.status,
		createdAt: e.createdAt,
		reason: e.reason
	};
}
function O(e) {
	return e;
}
// engine/util.ts
var k = "0123456789abcdef";
function A(e) {
	let t = new Uint8Array(e);
	globalThis.crypto.getRandomValues(t);
	let n = "";
	for (let e of t) n += k[e % 16];
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
var P = 31, F = 127;
function I(e) {
	let t = "";
	for (let n of e) {
		let e = n.codePointAt(0) ?? 0;
		e > P && e !== F && (t += n);
	}
	return t.trim();
}
function L(e, t, n) {
	if (typeof e != "string" || !e.trim()) throw _(`${t} is required.`);
	let r = I(e);
	if (!r) throw _(`${t} is required.`);
	if (n?.min && r.length < n.min) throw _(`${t} must be at least ${n.min} characters.`);
	if (n?.max && r.length > n.max) throw _(`${t} must be at most ${n.max} characters.`);
	return r;
}
function R(e, t, n) {
	if (e != null && e !== "") return L(e, t, n);
}
var z = /^https?:\/\//i;
function B(e, t) {
	let n = R(e, t, { max: 2048 });
	if (n !== void 0) {
		if (!z.test(n)) throw _(`${t} must be an http or https URL.`);
		return n;
	}
}
var ee = /^[a-z0-9]{4,15}$/;
function V(e) {
	let t = L(e, "Room id", {
		min: 4,
		max: 15
	}).toLowerCase();
	if (!ee.test(t)) throw _("Room id is not valid.");
	return t;
}
function te(e) {
	return typeof e == "object" && e && !Array.isArray(e) ? e : {};
}
function H(e, t) {
	let n = e[t];
	return typeof n == "string" && n.length > 0 ? n : null;
}
function U(e, t) {
	let n = e[t];
	return typeof n == "boolean" ? n : void 0;
}
function ne(e, t) {
	let n = e[t];
	return typeof n == "number" && Number.isFinite(n) ? n : void 0;
}
function W(e, t) {
	let n = e[t];
	return typeof n == "string" && n.length > 0 || typeof n == "number" && Number.isFinite(n) ? n : null;
}
// engine/rooms.ts
var G = "This room does not exist or has already been closed.", K = "This room is full. Ask the moderator to remove inactive players.", q = "You have created too many rooms recently. Please try again later.", J = 5;
function Y(e) {
	let t = typeof e == "string" ? parseInt(e, 10) : e;
	if (!c(t)) throw _("The selected score type is not valid.");
	return t;
}
function re(t) {
	return t == null ? null : e(t) ? t : null;
}
function ie(e, t) {
	return {
		id: e.id || t(10),
		key: L(e.key, "Issue key", { max: 64 }),
		summary: e.summary ? String(e.summary).slice(0, 500) : void 0,
		url: e.url,
		icon: e.icon,
		root: e.root
	};
}
function ae(e) {
	let t = typeof e == "object" && e ? e : {};
	return {
		id: L(t.id, "User id", { max: 128 }),
		name: L(t.name, "User name", { max: 100 }),
		email: R(t.email, "User email", { max: 254 }),
		avatarUrl: B(t.avatarUrl, "Avatar URL")
	};
}
function X(e) {
	let { store: n, config: r } = e, i = () => e.now ? e.now() : /* @__PURE__ */ new Date(), a = () => i().toISOString(), o = e.newId ?? A;
	async function s(e) {
		let t = await n.getRoom(e);
		if (!t) throw v(G);
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
		e.rateLimiter && await e.rateLimiter.enforce(`create-room#${i.memberKey}`, r.maxRoomsPerMemberPerHour, q);
		let s = a(), c = o(12);
		for (let r = 0; r < J; r += 1) {
			let r = e.newRoomId ? e.newRoomId() : N(), a = {
				roomId: r,
				roomName: i.roomName,
				scoreType: i.scoreType,
				moderatorId: c,
				moderatorKey: i.memberKey,
				currentIssueId: null,
				issues: [],
				settings: p(i.scoreType),
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
		throw new g("SERVER_ERROR", "Could not allocate a room id. Please try again.");
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
		if (s.length >= r.maxRoomMembers) throw b(K);
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
	async function m(r) {
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
		let u = e.invitations ? await e.invitations.getInvitation(r.roomId, r.memberKey) : null;
		if (u || !i.access.requireApproval) {
			let t = await f(i, r);
			return u && e.invitations && await e.invitations.removeInvitation(r.roomId, r.memberKey), {
				kind: "joined",
				room: t.room,
				member: t.member,
				isNew: !0
			};
		}
		return await _(i, r);
	}
	async function h(e, t) {
		let a = i().getTime() - r.joinRequestLifetimeMs, o = t.filter((e) => new Date(e.createdAt).getTime() < a), s = t.filter((e) => !o.includes(e)).filter((e) => e.status !== "pending").sort((e, t) => t.createdAt.localeCompare(e.createdAt)).slice(r.maxPendingJoinRequestsPerRoom), c = /* @__PURE__ */ new Set([...o, ...s]);
		for (let t of c) await n.removeJoinRequest(e, t.requestId);
		return t.filter((e) => !c.has(e));
	}
	async function _(e, i) {
		let o = await h(e.roomId, await n.listJoinRequests(e.roomId)), s = o.filter((e) => e.status === "pending"), c = s.find((e) => e.memberKey === i.memberKey);
		if (c) return {
			kind: "pending",
			room: e,
			request: c,
			events: []
		};
		if (s.length >= r.maxPendingJoinRequestsPerRoom) throw b("This room has too many pending join requests. Try again later.");
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
		};
		return await n.putJoinRequest(l), {
			kind: "pending",
			room: e,
			request: l,
			events: [{
				audience: {
					kind: "member",
					sid: e.moderatorId
				},
				action: "joinRequested",
				payload: { request: D(l) }
			}]
		};
	}
	async function T(e, t) {
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
	async function k(e) {
		let t = await s(V(e));
		return {
			roomId: t.roomId,
			roomName: t.roomName,
			scoreType: t.scoreType,
			memberCount: t.memberCount,
			created: t.created,
			requireApproval: t.access.requireApproval
		};
	}
	async function j(t, r) {
		let [i, o, c] = await Promise.all([
			s(t),
			n.listMembers(t),
			n.listVotes(t)
		]), l = await e.presence.onlineSids(t, o), u = i.moderatorId === r, d = [], f = [];
		return u && (d = (await n.listJoinRequests(t)).filter((e) => e.status === "pending"), f = e.invitations ? await e.invitations.listInvitations(t) : []), {
			room: S(i),
			members: o.map((e) => C(e, l.has(e.sid))),
			votes: c.map((e) => w(e, r)),
			sid: r,
			role: u ? "mod" : "player",
			joinRequests: d.map(D),
			invitations: f.map(O),
			serverTime: a()
		};
	}
	async function M(t) {
		let i = e.directory;
		if (!r.directoryEnabled || !i) throw x("The room directory is not available.");
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
	async function P(t, r) {
		let i = await n.getMember(t, r);
		if (!i) return [];
		let a = await n.listMembers(t), o = await e.presence.onlineSids(t, a);
		return o.add(r), [{
			audience: {
				kind: "room",
				exceptSid: r
			},
			action: "memberJoined",
			payload: { member: C(i, !0) }
		}, {
			audience: { kind: "room" },
			action: "presenceUpdate",
			payload: { onlineIds: [...o] }
		}];
	}
	function F(e, t) {
		return {
			audience: { kind: "room" },
			action: "membersJoined",
			payload: { members: e.map((e) => C(e, t.has(e.sid))) }
		};
	}
	return {
		createRoom: u,
		joinRoom: m,
		admit: f,
		purgeStaleRequests: h,
		getJoinRequest: T,
		cancelJoinRequest: E,
		getSummary: k,
		buildSnapshot: j,
		listDirectory: M,
		announceMember: P,
		membersJoinedEvent: F,
		requireRoom: s,
		forbidden: y
	};
}
// engine/dispatch.ts
var Z = "There is no active estimation round for this issue.", oe = "Votes for this round have already been revealed.", se = "You have already voted in this round.", ce = "That issue is not part of this room.", le = "This room has reached the maximum number of issues.", ue = "Only the moderator can perform this action.", de = "1970-01-01T00:00:00.000Z", fe = "The moderator closed this room.", pe = 40;
function me(e) {
	let t = e.estimateSync;
	if (t !== void 0) {
		if (!n(t)) throw _("The selected estimate update option is not valid.");
		return t;
	}
}
function he(n, c) {
	let { store: l, config: u } = n, p = () => n.now ? n.now() : /* @__PURE__ */ new Date(), h = () => p().toISOString(), g = n.newId ?? A;
	function D(e, t) {
		return {
			audience: { kind: "room" },
			action: e,
			payload: t
		};
	}
	function O(e, t, n) {
		return {
			audience: {
				kind: "member",
				sid: e
			},
			action: t,
			payload: n
		};
	}
	async function k(e) {
		let t = await l.listMembers(e);
		return D("presenceUpdate", { onlineIds: [...await n.presence.onlineSids(e, t)] });
	}
	async function j(e, t) {
		let n = await l.listMembers(e);
		await Promise.all(n.filter((e) => (e.votedIssueIds ?? []).includes(t)).map(async (n) => {
			let r = (n.votedIssueIds ?? []).filter((e) => e !== t);
			try {
				await l.updateMember(e, n.sid, { votedIssueIds: r });
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
			createdAt: h()
		};
	}
	async function N(e, t, n) {
		let r = await l.getVote(e, n);
		if (!r) throw b(Z);
		if (r.reveal) return r;
		let i = await l.listMembers(e), a = o(r.values, i.map((e) => e.sid), t), s = await l.revealVote(e, n, a);
		if (!s) throw b(Z);
		return s;
	}
	let P = async ({ room: e, member: t, payload: n }) => {
		let r = H(n, "issueId"), i = W(n, "vote");
		if (!r || i === null) throw _("An issue and an estimate are required.");
		if (!a(e.scoreType, i)) throw _("That is not a valid estimate for this deck.");
		let o = await l.getVote(e.roomId, r);
		if (!o) throw b(Z);
		let s = o.values[t.sid] !== void 0;
		if (!f({
			revealed: o.reveal,
			isCurrentIssue: e.currentIssueId === r,
			hasVoted: s,
			allowRevote: e.settings.allowRevote
		})) throw o.reveal ? b(oe) : e.currentIssueId === r ? b(se) : b(Z);
		let c = await l.submitVote(e.roomId, r, t.sid, i);
		if (c.kind === "revealed") throw b(oe);
		if (c.kind === "missing") throw b(Z);
		let u = c.vote;
		s || await l.updateMember(e.roomId, t.sid, {
			votedIssueIds: [...t.votedIssueIds ?? [], r],
			lastSeenAt: h()
		});
		let d = Object.keys(u.values), p = await l.listMembers(e.roomId), m = e.settings.autoReveal && p.every((e) => u.values[e.sid] !== void 0), g = [D("voteProgress", {
			issueId: r,
			votedIds: d
		}), O(t.sid, "voteUpdated", { vote: w(u, t.sid) })], v = u;
		return m && (v = await N(e.roomId, e.scoreType, r), g.push(D("votesRevealed", { vote: T(v) }))), await l.updateRoom(e.roomId, { lastActivity: h() }), {
			events: g,
			result: {
				vote: w(v, t.sid),
				votedIds: d
			}
		};
	}, F = async ({ room: e, payload: t }) => {
		let n = H(t, "issueId");
		if (!n) throw _("An issue is required to start a round.");
		if (!e.issues.some((e) => e.id === n)) throw v(ce);
		let r = M(n);
		return await l.startRound(e.roomId, {
			vote: r,
			roomPatch: {
				currentIssueId: n,
				lastActivity: h()
			}
		}), { events: [D("roundStarted", {
			currentIssueId: n,
			issues: e.issues,
			vote: E(r)
		})] };
	}, I = async ({ room: e, payload: t }) => {
		let n = H(t, "issueId");
		if (!n) throw _("An issue is required to restart a round.");
		if (!e.issues.some((e) => e.id === n)) throw v(ce);
		let r = g(10), i = e.issues.map((e) => e.id === n ? {
			...e,
			id: r
		} : e), a = M(r);
		return await l.startRound(e.roomId, {
			vote: a,
			removeIssueId: n,
			roomPatch: {
				currentIssueId: r,
				issues: i,
				lastActivity: h()
			}
		}), await j(e.roomId, n), { events: [D("roundStarted", {
			currentIssueId: r,
			issues: i,
			vote: E(a)
		})] };
	}, L = async ({ room: e, payload: t }) => {
		let n = H(t, "issueId") ?? e.currentIssueId;
		if (!n) throw _("There is no round to reveal.");
		let r = await N(e.roomId, e.scoreType, n);
		return await l.updateRoom(e.roomId, { lastActivity: h() }), { events: [D("votesRevealed", { vote: T(r) })] };
	}, R = async ({ room: e, payload: t }) => {
		let n = H(t, "issueId"), r = W(t, "finalScore");
		if (!n || r === null) throw _("An issue and a final score are required.");
		if (!a(e.scoreType, r)) throw _("That is not a valid final score for this deck.");
		let i = U(t, "synced") === !0;
		if (i && !s(r)) throw _("Only numeric scores can be saved as story points.");
		let o = await l.setFinalScore(e.roomId, n, i ? {
			finalScore: r,
			syncedScore: r
		} : { finalScore: r });
		if (!o) throw b("Reveal the votes before setting a final score.");
		return { events: [D("votesRevealed", { vote: T(o) })] };
	};
	function z(e, t) {
		return D("issuesUpdated", {
			issues: e,
			currentIssueId: t
		});
	}
	let B = async ({ room: e, payload: t }) => {
		let n = ie(t.issue ?? t, g);
		if (e.issues.length >= u.maxRoomIssues) throw b(le);
		let r = [...e.issues, n];
		return await l.updateRoom(e.roomId, {
			issues: r,
			lastActivity: h()
		}), { events: [z(r, e.currentIssueId)] };
	}, ee = async ({ room: e, payload: t }) => {
		let n = H(t, "issueId");
		if (!n) throw _("An issue is required.");
		let r = e.issues.filter((e) => e.id !== n), i = e.currentIssueId === n ? null : e.currentIssueId;
		return await l.updateRoom(e.roomId, {
			issues: r,
			currentIssueId: i,
			lastActivity: h()
		}), await l.removeVote(e.roomId, n), await j(e.roomId, n), { events: [z(r, i)] };
	}, V = async ({ room: e, payload: t }) => {
		let n = t.issueIds, r = Array.isArray(n) ? n.filter((e) => typeof e == "string") : [], i = new Map(e.issues.map((e) => [e.id, e])), a = r.map((e) => i.get(e)).filter((e) => e !== void 0);
		if (a.length !== e.issues.length) throw _("The issue order does not match this room.");
		return await l.updateRoom(e.roomId, {
			issues: a,
			lastActivity: h()
		}), { events: [z(a, e.currentIssueId)] };
	};
	function G(e, t) {
		let n = m(e.scoreType, e.settings);
		if (typeof t.autoReveal == "boolean" && (n.autoReveal = t.autoReveal), typeof t.allowRevote == "boolean" && (n.allowRevote = t.allowRevote), typeof t.showHalfScore == "boolean" && e.scoreType !== 3 && (n.showHalfScore = t.showHalfScore), typeof t.maxPoints == "number" && e.scoreType !== 3) {
			if (!i(e.scoreType).includes(t.maxPoints)) throw _("The selected max score is not valid for this deck.");
			n.maxPoints = t.maxPoints;
		}
		return t.estimateSync !== void 0 && r(e.scoreType) && (n.estimateSync = t.estimateSync), n;
	}
	async function K(e) {
		return D("roomUpdated", { room: S(await c.requireRoom(e)) });
	}
	let q = async ({ room: e, payload: t }) => {
		let n = G(e, {
			autoReveal: U(t, "autoReveal"),
			showHalfScore: U(t, "showHalfScore"),
			allowRevote: U(t, "allowRevote"),
			maxPoints: ne(t, "maxPoints"),
			estimateSync: me(t)
		}), r = await l.updateRoom(e.roomId, {
			settings: n,
			lastActivity: h()
		});
		if (!r) throw v("This room does not exist or has already been closed.");
		return { events: [D("roomUpdated", { room: S(r) })] };
	}, J = async ({ room: e, payload: t }) => {
		let n = H(t, "roomName");
		if (!n) throw _("A room name is required.");
		let r = await l.updateRoom(e.roomId, {
			roomName: n.slice(0, pe),
			lastActivity: h()
		});
		if (!r) throw v("This room does not exist or has already been closed.");
		return { events: [D("roomUpdated", { room: S(r) })] };
	}, Y = async ({ room: e, payload: t }) => {
		let n = { ...e.access }, r = U(t, "requireApproval"), i = U(t, "listed");
		r !== void 0 && (n.requireApproval = r), i !== void 0 && (n.listed = u.directoryEnabled ? i : !1);
		let a = await l.updateRoom(e.roomId, {
			access: n,
			lastActivity: h()
		});
		if (!a) throw v("This room does not exist or has already been closed.");
		return { events: [D("roomUpdated", { room: S(a) })] };
	}, re = async ({ room: r, member: i, payload: a }) => {
		let o = a.avatarId, s = typeof o == "number" ? o : null;
		if (s !== null && !e(s)) throw _("The selected avatar is not valid.");
		let c = t(s, i.avatarUrl), u = await l.updateMember(r.roomId, i.sid, {
			avatarId: c,
			lastSeenAt: h()
		});
		if (!u) throw v("You are no longer a member of this room.");
		let d = await l.listMembers(r.roomId);
		return { events: [D("memberUpdated", { member: C(u, (await n.presence.onlineSids(r.roomId, d)).has(u.sid)) })] };
	};
	async function X(e, t) {
		await l.removeMember(e, t);
		let n = await l.listMembers(e);
		await l.updateRoom(e, {
			memberCount: n.length,
			lastActivity: h()
		});
	}
	let he = async ({ room: e, member: t, payload: r }) => {
		let i = H(r, "sid");
		if (!i) throw _("A member is required.");
		if (i === t.sid) throw _("You cannot remove yourself. Close the room instead.");
		let a = await l.getMember(e.roomId, i);
		return await X(e.roomId, i), a && n.invitations && await n.invitations.removeInvitation(e.roomId, a.memberKey), {
			events: [
				O(i, "kicked", { reason: "The moderator removed you from this room." }),
				D("memberLeft", { sid: i }),
				await k(e.roomId)
			],
			disconnect: { sids: [i] }
		};
	};
	async function Q(e, t, n) {
		return await l.transferModerator(e.roomId, t, n.sid, n.memberKey);
	}
	let ge = async ({ room: e, member: t, payload: n }) => {
		let r = H(n, "sid");
		if (!r) throw _("A member is required.");
		let i = await l.getMember(e.roomId, r);
		if (!i) throw y("You are not a member of this room.");
		if (!await Q(e, t.sid, i)) throw b("The moderator has already changed.");
		return { events: [D("moderatorChanged", {
			moderatorId: r,
			previousModeratorId: t.sid
		}), await K(e.roomId)] };
	}, _e = async ({ room: e, member: t }) => {
		if (e.moderatorId === t.sid) throw b("You are already the host of this room.");
		let r = await l.listMembers(e.roomId), i = r.find((t) => t.sid === e.moderatorId);
		if (i) {
			let t = await n.presence.onlineSids(e.roomId, r), a = p().getTime() - new Date(i.lastSeenAt).getTime();
			if (t.has(i.sid) || a < u.hostAwayGraceMs) throw b("The host is still in this room.");
		}
		let a = e.moderatorId;
		if (await l.updateMember(e.roomId, t.sid, { lastSeenAt: h() }), !await Q(e, a, t)) throw b("Someone else has already taken over as host.");
		return { events: [D("moderatorChanged", {
			moderatorId: t.sid,
			previousModeratorId: a
		}), await K(e.roomId)] };
	}, ve = async ({ room: e, member: t, payload: n }) => {
		if (e.moderatorId !== t.sid) return await X(e.roomId, t.sid), {
			events: [D("memberLeft", { sid: t.sid }), await k(e.roomId)],
			disconnect: { sids: [t.sid] }
		};
		let r = (await l.listMembers(e.roomId)).filter((e) => e.sid !== t.sid);
		if (r.length === 0) return await ye(e.roomId, fe);
		let i = H(n, "successorSid"), a = r.find((e) => e.sid === i);
		if (!a) throw _("Choose who should host this room before you leave.");
		if (!await Q(e, t.sid, a)) throw b("The moderator has already changed.");
		return await X(e.roomId, t.sid), {
			events: [
				D("moderatorChanged", {
					moderatorId: a.sid,
					previousModeratorId: t.sid
				}),
				await K(e.roomId),
				D("memberLeft", { sid: t.sid }),
				await k(e.roomId)
			],
			disconnect: { sids: [t.sid] }
		};
	};
	async function ye(e, t) {
		let r = D("roomClosed", { reason: t });
		if (await l.removeRoom(e), n.invitations) {
			let t = await n.invitations.listInvitations(e);
			await Promise.all(t.map((t) => n.invitations?.removeInvitation(e, t.invitee.id)));
		}
		return {
			events: [r],
			disconnect: { all: !0 },
			roomClosed: !0
		};
	}
	let be = async ({ room: e }) => await ye(e.roomId, fe), xe = async ({ room: e, member: t }) => ({
		events: [],
		result: await c.buildSnapshot(e.roomId, t.sid)
	}), Se = async ({ room: e, member: t }) => {
		await l.updateMember(e.roomId, t.sid, { lastSeenAt: h() });
		let r = await l.listMembers(e.roomId), i = await n.presence.onlineSids(e.roomId, r);
		i.add(t.sid);
		let a = 0;
		e.moderatorId === t.sid && (a = (await l.listJoinRequests(e.roomId)).filter((e) => e.status === "pending").length);
		let o = await l.getRoom(e.roomId);
		return {
			events: [],
			result: {
				serverTime: h(),
				revision: o?.revision ?? e.revision,
				onlineIds: [...i],
				lastSeen: Object.fromEntries(r.map((e) => [e.sid, e.lastSeenAt])),
				pendingJoinRequests: a
			}
		};
	}, Ce = async ({ room: e, member: t }) => (await l.updateMember(e.roomId, t.sid, { lastSeenAt: de }), { events: [await k(e.roomId)] }), we = async ({ room: e, payload: t }) => {
		let r = H(t, "requestId");
		if (!r) throw _("A join request is required.");
		let i = await l.getJoinRequest(e.roomId, r), a = await l.listMembers(e.roomId);
		if (!i) {
			if (a.some((e) => e.memberKey === r)) return {
				events: [O(e.moderatorId, "joinRequestResolved", {
					requestIds: [r],
					status: "approved"
				})],
				result: {
					approved: 0,
					remaining: 0
				}
			};
			throw v("That join request is no longer pending.");
		}
		if (i.status !== "pending") throw v("That join request is no longer pending.");
		let o = a.some((e) => e.memberKey === i.memberKey), s = O(e.moderatorId, "joinRequestResolved", {
			requestIds: [r],
			status: "approved"
		});
		if (o) return await l.removeJoinRequest(e.roomId, r), {
			events: [s],
			result: {
				approved: 0,
				remaining: 0
			}
		};
		let { member: u } = await c.admit(e, i);
		await l.removeJoinRequest(e.roomId, r);
		let d = await n.presence.onlineSids(e.roomId, [u]);
		return {
			events: [c.membersJoinedEvent([u], d), s],
			result: {
				approved: 1,
				remaining: 0
			}
		};
	}, Te = async ({ room: e, payload: t }) => {
		let n = H(t, "requestId");
		if (!n) throw _("A join request is required.");
		let r = H(t, "reason")?.slice(0, 200);
		if (!await l.updateJoinRequest(e.roomId, n, {
			status: "rejected",
			reason: r
		})) throw v("That join request is no longer pending.");
		return { events: [O(e.moderatorId, "joinRequestResolved", {
			requestIds: [n],
			status: "rejected"
		})] };
	};
	async function Ee(e) {
		return (await c.purgeStaleRequests(e, await l.listJoinRequests(e))).filter((e) => e.status === "pending").sort((e, t) => e.createdAt.localeCompare(t.createdAt));
	}
	let De = async ({ room: e, payload: t }) => {
		let r = await Ee(e.roomId), i = await l.listMembers(e.roomId), a = new Set(i.map((e) => e.memberKey)), o = r.slice(0, u.bulkJoinBatchSize), s = [], d = [], f = h(), p = i.length;
		for (let t of o) {
			if (a.has(t.memberKey)) {
				await l.removeJoinRequest(e.roomId, t.requestId), d.push(t.requestId);
				continue;
			}
			if (p >= u.maxRoomMembers) continue;
			let n = {
				sid: g(12),
				memberKey: t.memberKey,
				name: t.name,
				role: "player",
				avatarId: t.avatarId,
				avatarUrl: t.avatarUrl,
				votedIssueIds: [],
				joinedAt: f,
				lastSeenAt: f
			};
			await l.putMember(e.roomId, n), await l.removeJoinRequest(e.roomId, t.requestId), a.add(t.memberKey), s.push(n), d.push(t.requestId), p += 1;
		}
		let m = U(t, "disableApproval") === !0, _ = {
			memberCount: p,
			lastActivity: f
		}, v = await l.updateRoom(e.roomId, m ? {
			..._,
			access: {
				...e.access,
				requireApproval: !1
			}
		} : _), y = [];
		if (s.length > 0) {
			let t = await n.presence.onlineSids(e.roomId, s);
			y.push(c.membersJoinedEvent(s, t));
		}
		return y.push(O(e.moderatorId, "joinRequestResolved", {
			requestIds: d,
			status: "approved"
		})), m && v && y.push(D("roomUpdated", { room: S(v) })), {
			events: y,
			result: {
				approved: s.length,
				remaining: r.length - d.length
			}
		};
	}, Oe = async ({ room: e, payload: t }) => {
		let n = await Ee(e.roomId), r = n.slice(0, u.bulkJoinBatchSize), i = H(t, "reason")?.slice(0, 200);
		for (let t of r) await l.updateJoinRequest(e.roomId, t.requestId, {
			status: "rejected",
			reason: i
		});
		return {
			events: [O(e.moderatorId, "joinRequestResolved", {
				requestIds: r.map((e) => e.requestId),
				status: "rejected"
			})],
			result: {
				rejected: r.length,
				remaining: n.length - r.length
			}
		};
	};
	function ke() {
		if (!u.invitationsEnabled || !n.invitations) throw x("Invitations are not available.");
		return n.invitations;
	}
	let $ = {
		requestResync: xe,
		submitVote: P,
		startRound: F,
		restartRound: I,
		revealVotes: L,
		setFinalScore: R,
		addIssue: B,
		removeIssue: ee,
		reorderIssues: V,
		updateSettings: q,
		renameRoom: J,
		updateAvatar: re,
		kickMember: he,
		transferModerator: ge,
		leaveRoom: ve,
		closeRoom: be,
		approveJoin: we,
		rejectJoin: Te,
		approveAllJoin: De,
		rejectAllJoin: Oe,
		inviteMembers: async ({ room: e, member: t, payload: n }) => {
			let r = ke(), i = (Array.isArray(n.users) ? n.users : []).map(ae);
			if (i.length === 0) throw _("Choose at least one person to invite.");
			let a = await l.listMembers(e.roomId), o = new Set(a.map((e) => e.memberKey)), s = await r.listInvitations(e.roomId), c = new Set(s.map((e) => e.invitee.id)), d = i.filter((e, t) => !o.has(e.id) && i.findIndex((t) => t.id === e.id) === t);
			if (s.length + d.filter((e) => !c.has(e.id)).length > u.maxInvitationsPerRoom) throw b("This room has reached the maximum number of invitations.");
			let f = h();
			for (let n of d) await r.putInvitation({
				roomId: e.roomId,
				invitee: n,
				invitedBy: t.sid,
				createdAt: f
			});
			let p = await r.listInvitations(e.roomId);
			return {
				events: [O(e.moderatorId, "invitationsUpdated", { invitations: p })],
				result: { invitations: p }
			};
		},
		revokeInvite: async ({ room: e, payload: t }) => {
			let n = ke(), r = H(t, "userId");
			if (!r) throw _("A user is required.");
			await n.removeInvitation(e.roomId, r);
			let i = await n.listInvitations(e.roomId);
			return {
				events: [O(e.moderatorId, "invitationsUpdated", { invitations: i })],
				result: { invitations: i }
			};
		},
		updateAccess: Y,
		claimModerator: _e,
		heartbeat: Se,
		exitRoom: Ce
	}, Ae = /* @__PURE__ */ new Set(["requestResync", "heartbeat"]);
	function je(e) {
		return $[e] !== void 0;
	}
	async function Me(e) {
		let t = $[e.action];
		if (!t) throw x(`Action '${e.action}' is not available.`);
		let n = await c.requireRoom(e.principal.roomId), r = await l.getMember(n.roomId, e.principal.sid);
		if (!r) throw y("You are not a member of this room.");
		if (d(e.action) && n.moderatorId !== r.sid) throw y(ue);
		let i = await t({
			room: n,
			member: r,
			payload: te(e.payload)
		});
		if (i.events.some((e) => e.audience.kind === "room") && !i.roomClosed && !Ae.has(e.action)) {
			let e = await l.bumpRevision(n.roomId);
			return {
				...i,
				revision: e
			};
		}
		return i;
	}
	return {
		dispatch: Me,
		isHandled: je
	};
}
// engine/ports.ts
var Q = {
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
function ge(e) {
	let t = X(e), n = he(e, t);
	return {
		rooms: t,
		dispatch: n.dispatch,
		isHandled: n.isHandled,
		deps: e
	};
}
export { g as EngineError, b as conflictError, ge as createEngine, Q as defaultEngineConfig, y as forbiddenError, ie as normalizeIssue, ae as normalizeUserRef, v as notFoundError, B as optionalHttpUrl, R as optionalText, re as parseAvatarId, Y as parseScoreType, V as requireRoomId, L as requireText, I as sanitizeText, o as summarizeVotes, E as toEmptyVote, O as toInvitation, D as toJoinRequest, C as toMember, T as toRevealedVote, S as toRoom, w as toVote, x as unsupportedError, _ as validationError };
