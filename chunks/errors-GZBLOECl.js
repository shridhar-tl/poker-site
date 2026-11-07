// src/services/errors.ts
function e(e, t = "Something went wrong. Please try again.") {
	return e instanceof Error && e.message.length > 0 ? e.message : t;
}
export { e as t };
