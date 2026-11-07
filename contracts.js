// src/contracts/index.ts
var e = {
	room: "PokerRoomService",
	session: "PokerSessionService",
	realtime: "PokerRealtimeService",
	identity: "PokerIdentityService",
	issues: "PokerIssueProvider",
	host: "PokerHostService",
	directory: "PokerDirectoryService",
	userPicker: "PokerUserPicker"
};
function t(e, t, n) {
	e.registerSingletonFactory(t, t, n);
}
function n(e, t) {
	return e.resolve(t)[t];
}
function r(e, t) {
	return e.has(t);
}
var i = [
	e.room,
	e.session,
	e.realtime,
	e.identity,
	e.host
], a = {
	baseDelayMs: 2e3,
	maxDelayMs: 12e3,
	maxAttempts: 5,
	jitterRatio: .25
};
export { a as defaultRetryPolicy, r as hasPokerService, e as pokerServices, t as registerPokerService, i as requiredPokerServices, n as resolvePokerService };
