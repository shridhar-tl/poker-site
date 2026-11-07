import { o as e } from "./theme-BRWg1AQm.js";
import { n as t } from "./avatars-r3RGoSWH.js";
import { cloneElement as n, useId as r } from "react";
import { FieldLabel as i } from "fluxo-ui";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import s from "classnames";
// src/components/AvatarPicker.tsx
var c = "🎲";
function l({ value: e, onChange: n, label: r, profileImageUrl: i, offersRandom: l = !1, className: u }) {
	let d = !!i || l;
	return /* @__PURE__ */ o("div", {
		className: s("pk-avatarPicker", u),
		children: [r && /* @__PURE__ */ a("p", {
			className: "pk-avatarPicker__label",
			children: r
		}), /* @__PURE__ */ o("div", {
			className: "pk-avatarPicker__grid pk-scroll",
			role: "radiogroup",
			"aria-label": r ?? "Choose your avatar",
			children: [d && /* @__PURE__ */ a("button", {
				type: "button",
				role: "radio",
				"aria-checked": e === null,
				"aria-label": i ? "Use your profile picture" : "Pick one for me",
				title: i ? "Use your profile picture" : "Pick one for me",
				className: s("pk-avatarPicker__item", { "is-selected": e === null }),
				onClick: () => n(null),
				children: i ? /* @__PURE__ */ a("img", {
					src: i,
					alt: "",
					className: "pk-avatarPicker__image",
					referrerPolicy: "no-referrer"
				}) : c
			}), t.map((t, r) => /* @__PURE__ */ a("button", {
				type: "button",
				role: "radio",
				"aria-checked": e === r,
				"aria-label": `Avatar ${t}`,
				className: s("pk-avatarPicker__item", { "is-selected": e === r }),
				onClick: () => n(r),
				children: t
			}, t))]
		})]
	});
}
// src/components/InviteesField.tsx
function u({ selected: t, onChange: n, excludeIds: r = [], disabled: i }) {
	let { userPicker: o } = e();
	return o === null ? null : /* @__PURE__ */ a("div", {
		className: "pk-invitees",
		children: /* @__PURE__ */ a(o, {
			excludeIds: r,
			selected: t,
			onChange: n,
			multiple: !0,
			disabled: i
		})
	});
}
// src/components/LabeledField.tsx
function d({ label: e, required: t, error: o, hint: s, children: c }) {
	let l = r(), u = c.props.id ?? l;
	return /* @__PURE__ */ a(i, {
		label: e,
		required: t,
		error: o,
		hint: s,
		htmlFor: u,
		children: n(c, { id: u })
	});
}
export { u as n, l as r, d as t };
