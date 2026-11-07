import { jsx as e, jsxs as t } from "react/jsx-runtime";
// src/components/AppLoader.tsx
function n({ label: n = "Loading" }) {
	return /* @__PURE__ */ t("div", {
		className: "pk-loader",
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ t("div", {
			className: "pk-loader__cards",
			"aria-hidden": !0,
			children: [
				/* @__PURE__ */ e("span", { className: "pk-loader__card" }),
				/* @__PURE__ */ e("span", { className: "pk-loader__card" }),
				/* @__PURE__ */ e("span", { className: "pk-loader__card" })
			]
		}), /* @__PURE__ */ e("p", {
			className: "pk-loader__label",
			children: n
		})]
	});
}
export { n as t };
