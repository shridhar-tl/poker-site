import { pokerServices as e } from "./contracts.js";
import { a as t, i as n, o as r, r as i } from "./chunks/createPokerContainer-f4kZLtXZ.js";
import { t as a } from "./chunks/errors-GZBLOECl.js";
// src/standalone/ajax-service.ts
var o = class extends Error {
	statusFlag;
	httpStatus;
	body;
	constructor(e, t, n, r = null) {
		super(n), this.name = "ApiError", this.statusFlag = e, this.httpStatus = t, this.body = r;
	}
}, s = "You appear to be offline. Check your connection and try again.", c = "Something went wrong. Please try again.", l = class {
	static dependencies = [r, t];
	$message;
	apiBaseUrl;
	tokenResolver = null;
	constructor(e, t) {
		this.$message = e, this.apiBaseUrl = t.apiBaseUrl;
	}
	setTokenResolver(e) {
		this.tokenResolver = e;
	}
	async get(e, t = {}) {
		return this.request("GET", e, void 0, t);
	}
	async post(e, t, n = {}) {
		return this.request("POST", e, t, n);
	}
	async put(e, t, n = {}) {
		return this.request("PUT", e, t, n);
	}
	async delete(e, t, n = {}) {
		return this.request("DELETE", e, t, n);
	}
	resolveToken(e) {
		return e.token == null ? this.tokenResolver?.() ?? null : e.token;
	}
	async request(e, t, n, r) {
		let i = { Accept: "application/json" };
		if (n !== void 0 && (i["Content-Type"] = "application/json"), r.auth !== !1) {
			let e = this.resolveToken(r);
			e != null && (i.Authorization = `Bearer ${e}`);
		}
		let a;
		try {
			a = await fetch(`${this.apiBaseUrl}${t}`, {
				method: e,
				headers: i,
				body: n === void 0 ? void 0 : JSON.stringify(n),
				signal: r.signal
			});
		} catch (n) {
			throw n instanceof DOMException && n.name === "AbortError" ? n : (console.error(`AjaxService ${e} ${t} network failure`, n), new o("NETWORK_ERROR", 0, s));
		}
		if (a.status === 204) return;
		let l = null, u = await a.text();
		if (u.length > 0) try {
			l = JSON.parse(u);
		} catch (n) {
			console.error(`AjaxService ${e} ${t} returned non-JSON payload`, n);
		}
		if (a.ok) return l;
		let d = typeof l == "object" && l ? l : null, f = typeof d?.status == "string" ? d.status : "SERVER_ERROR", p = typeof d?.message == "string" && d.message.length > 0 ? d.message : c;
		throw console.error(`AjaxService ${e} ${t} failed with ${a.status} (${f})`, d), new o(f, a.status, p, d);
	}
	notifyError(e, t) {
		console.error("AjaxService reported an error to the user", e), this.$message.error(a(e, t));
	}
};
// src/standalone/api-config.ts
function u(e) {
	return {
		apiBaseUrl: e.apiBaseUrl.replace(/\/+$/, ""),
		wsBaseUrl: e.wsBaseUrl.replace(/\/+$/, "")
	};
}
// src/standalone/realtime-service.ts
var d = 45e3, f = 1e3, p = 15e3, m = 10, h = 2e4, g = class {
	static dependencies = [e.session, t];
	$session;
	wsBaseUrl;
	socket = null;
	status = "idle";
	roomId = null;
	reconnectAttempts = 0;
	reconnectTimer = null;
	pingTimer = null;
	intentionallyClosed = !1;
	messageListeners = /* @__PURE__ */ new Set();
	statusListeners = /* @__PURE__ */ new Set();
	pendingRequests = /* @__PURE__ */ new Map();
	requestSequence = 0;
	constructor(e, t) {
		this.$session = e, this.wsBaseUrl = t.wsBaseUrl;
	}
	onMessage(e) {
		return this.messageListeners.add(e), () => this.messageListeners.delete(e);
	}
	onStatusChange(e) {
		return this.statusListeners.add(e), () => this.statusListeners.delete(e);
	}
	getStatus() {
		return this.status;
	}
	setStatus(e) {
		this.status !== e && (this.status = e, this.statusListeners.forEach((t) => {
			try {
				t(e);
			} catch (e) {
				console.error("RealtimeService status listener failed", e);
			}
		}));
	}
	emit(e) {
		this.messageListeners.forEach((t) => {
			try {
				t(e);
			} catch (e) {
				console.error("RealtimeService message listener failed", e);
			}
		});
	}
	connect(e) {
		let t = this.$session.sessionFor(e);
		if (t === null) {
			console.error("RealtimeService cannot connect without a valid room session"), this.setStatus("closed");
			return;
		}
		if (this.socket !== null && this.roomId === e && (this.status === "connected" || this.status === "connecting")) return;
		this.disconnect(!1), this.roomId = e, this.intentionallyClosed = !1, this.setStatus(this.reconnectAttempts > 0 ? "reconnecting" : "connecting");
		let n = `${this.wsBaseUrl}?roomId=${encodeURIComponent(e)}&token=${encodeURIComponent(t.token)}`;
		try {
			this.socket = new WebSocket(n);
		} catch (e) {
			console.error("RealtimeService could not open the WebSocket", e), this.scheduleReconnect();
			return;
		}
		this.socket.onopen = () => {
			this.reconnectAttempts = 0, this.setStatus("connected"), this.post({
				action: "auth",
				payload: {
					token: t.token,
					roomId: e
				}
			}), this.startPing();
		}, this.socket.onmessage = (e) => {
			let t;
			try {
				t = JSON.parse(e.data);
			} catch (e) {
				console.error("RealtimeService received a malformed message", e);
				return;
			}
			this.settleRequest(t), this.emit(t);
		}, this.socket.onerror = (e) => {
			console.error("RealtimeService socket error", e);
		}, this.socket.onclose = () => {
			this.stopPing(), this.socket = null, this.failPendingRequests(), this.intentionallyClosed ? this.setStatus("closed") : this.scheduleReconnect();
		};
	}
	scheduleReconnect() {
		if (this.roomId === null || this.intentionallyClosed) {
			this.setStatus("closed");
			return;
		}
		if (this.reconnectAttempts >= m) {
			console.error("RealtimeService gave up reconnecting after repeated failures"), this.setStatus("closed");
			return;
		}
		this.reconnectAttempts += 1, this.setStatus("reconnecting");
		let e = Math.min(f * 2 ** (this.reconnectAttempts - 1), p);
		this.clearReconnectTimer(), this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null, this.roomId !== null && this.connect(this.roomId);
		}, e);
	}
	clearReconnectTimer() {
		this.reconnectTimer !== null && (clearTimeout(this.reconnectTimer), this.reconnectTimer = null);
	}
	startPing() {
		this.stopPing(), this.pingTimer = setInterval(() => this.post({ action: "ping" }), d);
	}
	stopPing() {
		this.pingTimer !== null && (clearInterval(this.pingTimer), this.pingTimer = null);
	}
	send(e, t) {
		this.requestSequence += 1;
		let n = `r${Date.now().toString(36)}${this.requestSequence.toString(36)}`;
		return this.post({
			action: e,
			payload: t,
			requestId: n
		}) ? new Promise((t) => {
			let r = setTimeout(() => {
				this.pendingRequests.delete(n), console.error(`RealtimeService got no acknowledgement for '${e}'`), t(!1);
			}, h);
			this.pendingRequests.set(n, {
				resolve: t,
				timer: r
			});
		}) : Promise.resolve(!1);
	}
	post(e) {
		if (this.socket === null || this.socket.readyState !== WebSocket.OPEN) return console.error(`RealtimeService cannot send '${e.action}' while the socket is not open`), !1;
		try {
			return this.socket.send(JSON.stringify(e)), !0;
		} catch (t) {
			return console.error(`RealtimeService failed to send '${e.action}'`, t), !1;
		}
	}
	settleRequest(e) {
		if (!e.requestId || e.action !== "ack" && e.action !== "error") return;
		let t = this.pendingRequests.get(e.requestId);
		t !== void 0 && (clearTimeout(t.timer), this.pendingRequests.delete(e.requestId), t.resolve(e.action === "ack"));
	}
	failPendingRequests() {
		this.pendingRequests.forEach((e) => {
			clearTimeout(e.timer), e.resolve(!1);
		}), this.pendingRequests.clear();
	}
	requestResync() {
		this.send("requestResync");
	}
	disconnect(e = !0) {
		this.intentionallyClosed = e, this.clearReconnectTimer(), this.stopPing(), e && (this.roomId = null, this.reconnectAttempts = 0);
		let t = this.socket;
		this.socket = null, this.failPendingRequests(), t !== null && (t.onopen = null, t.onmessage = null, t.onerror = null, t.onclose = null, (t.readyState === WebSocket.OPEN || t.readyState === WebSocket.CONNECTING) && t.close()), e && this.setStatus("closed");
	}
}, _ = class {
	static dependencies = [n, e.session];
	$ajax;
	$session;
	constructor(e, t) {
		this.$ajax = e, this.$session = t, this.$ajax.setTokenResolver(() => this.$session.getToken());
	}
	async createRoom(e) {
		let t = await this.$ajax.post("/rooms", e, { auth: !1 });
		return this.$session.store(t, e.name), t;
	}
	async joinRoom(e) {
		let { roomId: t, ...n } = e, r = await this.$ajax.post(`/rooms/${t}/join`, n, { auth: !1 });
		return "token" in r && this.$session.store(r, e.name), r;
	}
	async getJoinStatus(e) {
		let { roomId: t, ...n } = e, r = await this.$ajax.post(`/rooms/${t}/join-status`, n, { auth: !1 });
		return r.session && this.$session.store(r.session, e.name ?? ""), r;
	}
	async cancelJoinRequest(e) {
		let { roomId: t, ...n } = e;
		await this.$ajax.post(`/rooms/${t}/join-cancel`, n, { auth: !1 });
	}
	async getRoomSummary(e) {
		return await this.$ajax.get(`/rooms/${e}/summary`, { auth: !1 });
	}
	async getSnapshot() {
		return await this.$ajax.get("/rooms/snapshot");
	}
	async refreshSession() {
		let e = this.$session.getSession();
		if (e === null) return null;
		try {
			let t = await this.$ajax.post("/rooms/session/refresh");
			return this.$session.store(t, e.name), t;
		} catch (e) {
			return console.error("RoomService could not refresh the room session", e), this.$session.clear(), null;
		}
	}
}, v = "pokerSession";
function y(e) {
	return new Date(e.expiresAt).getTime() <= Date.now();
}
var b = class {
	session = null;
	constructor() {
		this.session = this.readFromStorage();
	}
	readFromStorage() {
		try {
			let e = window.sessionStorage.getItem(v) ?? window.localStorage.getItem(v);
			if (!e) return null;
			let t = JSON.parse(e);
			return !t.token || !t.roomId || !t.sid || y(t) ? null : t;
		} catch (e) {
			return console.error("SessionService failed to read the stored session", e), null;
		}
	}
	writeToStorage(e) {
		try {
			if (e === null) {
				window.localStorage.removeItem(v), window.sessionStorage.removeItem(v);
				return;
			}
			window.localStorage.setItem(v, JSON.stringify(e));
		} catch (e) {
			console.error("SessionService failed to persist the session", e);
		}
	}
	store(e, t) {
		this.session = {
			token: e.token,
			sid: e.sid,
			roomId: e.roomId,
			role: e.role,
			expiresAt: e.expiresAt,
			name: t
		}, this.writeToStorage(this.session);
	}
	clear() {
		this.session = null, this.writeToStorage(null);
	}
	getSession() {
		return this.session !== null && y(this.session) && this.clear(), this.session;
	}
	getToken() {
		return this.getSession()?.token ?? null;
	}
	sessionFor(e) {
		let t = this.getSession();
		return t !== null && t.roomId === e ? t : null;
	}
};
// src/standalone/register.ts
function x(e, t, n) {
	e.registerSingleton(t, n, n);
}
function S(r, a) {
	i(r);
	let o = u(a);
	r.registerSingletonFactory(t, t, () => o), x(r, l, n), x(r, b, e.session), x(r, _, e.room), x(r, g, e.realtime);
}
export { S as registerPokerApiServices };
