import { requiredPokerServices as e } from "../contracts.js";
import { showSnackbar as t } from "fluxo-ui";
import { createContainer as n } from "fluxo-ui/services";
// src/services/names.ts
var r = "PokerMessageService", i = "PokerAjaxService", a = "PokerApiEndpoints", o = 3500, s = class {
	success(e, n = "") {
		t(e, n, {
			type: "success",
			timeout: o
		});
	}
	info(e, n = "") {
		t(e, n, {
			type: "info",
			timeout: o
		});
	}
	warning(e, n = "") {
		t(e, n, {
			type: "warning",
			timeout: o
		});
	}
	error(e, n = "") {
		t(e, n, {
			type: "error",
			timeout: 5e3
		});
	}
};
// src/embed/createPokerContainer.ts
function c(e) {
	e.has("PokerMessageService") || e.registerSingleton(s, r, r);
}
function l() {
	let e = n();
	return c(e), e;
}
function u(t) {
	let n = e.filter((e) => !t.has(e));
	if (n.length > 0) throw Error(`Planning poker cannot start. The host did not register: ${n.join(", ")}.`);
	c(t);
}
export { a, i, l as n, r as o, c as r, u as t };
