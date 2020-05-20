// -> Core
import { He } from "./src/core/he";
import { OstonAuth } from "./src/core/auth";

import { mountBirthday, validateCpf } from "./src/helpers";

import Elements from "./src/layout/element";

import Mask from "./src/layout/mask";
import Layout from "./src/layout/layout";
import Pipe from "./src/layout/pipe";
import Manipulators from "./src/core/manipulators";
import Navigation from "./src/layout/navigation";

import settings from "./src/config/settings";

// -> CSS
import "./app.scss";

//-> SETUP
document.addEventListener("readystatechange", () => {
	if (document.readyState === "complete") {
		// -> funcs
		const oston = new OstonAuth();
		// const he = new He()
		const element = new Elements();
		const mask = new Mask();
		const layout = new Layout();
		const navigation = new Navigation();
		const pipe = new Pipe();

		// -> set Anonymous ID
		oston.generateAnonymous();

		// -> validate he
		// he.request()

		const ___TOGGLERS_BIRTHDAY = element.all(
			"form .group.birthday [data-open-birthday]"
		);
		const __CUSTOM_SELECTS = ".pipe-select";
		const __NAVIGATIONS = element.all("[data-redirect]");

		mountBirthday("form .group.birthday");

		___TOGGLERS_BIRTHDAY.forEach((self) => {
			self.addEventListener("click", () => {
				const __status = self.dataset.openBirthday;
				let __class = "active";
				let __overflow = "hidden";

				if (!__status) {
					__class = "";
					__overflow = "visible";
				}

				element
					.single("form .group.birthday")
					.classList.toggle(__class);
				element.single("body").style.overflow = __overflow;
			});
		});

		__NAVIGATIONS.forEach((element) => {
			element.addEventListener("click", () => {
				const target = element.dataset.redirect;

				navigation.redirect(target);
			});
		});

		pipe.init(__CUSTOM_SELECTS);

		// -> set mask for inputs with data-mask attr.
		element.attr("[data-mask]").forEach((__input) => {
			__input.addEventListener("input", (e) => {
				mask.set(e.target);
			});
		});

		// alert(validateCpf('01440693005'));

		// remover
		const manipulators = new Manipulators();

		manipulators.requestStates();

		layout.mountPlans();
	}
});
