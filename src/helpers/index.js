import Elements from "../layout/element";

import settings from "../config/settings";

export const Helpers = function () {
	return {
		serialize: function (form) {
			let res = "{";
			form.forEach((f) => {
				let a = f.querySelectorAll("input, select");

				a.forEach((i) => {
					if (i.getAttribute("required") === "required")
						res +=
							'"' +
							i.getAttribute("name") +
							'":"' +
							i.value +
							'",';
				});
			});

			res = res.slice(0, -1);
			res += "}";

			return JSON.parse(res);
		},
		ddd: function (msisdn) {
			return msisdn.length > 11
				? msisdn.substring(2, 4)
				: msisdn.substring(0, 2);
		},
		formatMsisdn: function (msisdn) {
			let ddd, number;

			if (msisdn.length > 11) {
				ddd = msisdn.substring(2, 4);
				number = msisdn.substring(4, msisdn.length);
			} else {
				ddd = msisdn.substring(0, 2);
				number = msisdn.substring(2, msisdn.length);
			}

			return `( ${ddd} ) ${number.substring(0, 5)}.${number.substring(
				5,
				msisdn.length
			)}`;
		},
		notifier: function (config) {
			let configs = {
				class: config?.class || null,
				content: config?.content || null,
				success: config?.success || false,
				successClass: config?.successClass || "",
				error: config?.error || false,
				errorClass: config?.error || "",
				timing: config?.timing || 5000,
				single: config?.single || true,
				style: {
					center: config?.style?.center || false,
				},
			};

			const container = document.createElement("div");
			container.id = "notifier";

			const row = document.createElement("div");
			row.classList.add("notifier");

			// add class to notifier
			if (configs.success) row.classList.add(`success`);
			else if (configs.error) row.classList.add(`error`);

			if (configs.style.center === true) row.classList.add("text-center");

			/**
			 * TODO -> add multiples rows
			 */
			// append child to notifier
			if (configs.single) container.appendChild(row);

			// add content message
			if (typeof configs.content === "string")
				row.innerText = configs.content;

			// append
			document.body.appendChild(container);

			// timings
			setTimeout(() => {
				container.classList.add("active");
			}, 100);

			setTimeout(() => {
				container.classList.remove("active");
			}, configs.timing);

			setTimeout(() => {
				document.getElementById("notifier").remove();
			}, configs.timing + 1000);
		},
	};
};

export const mountBirthday = function (elem) {
	const element = new Elements();

	const selects = element.all(`${elem} .content .col`);

	selects.forEach((select) => {
		const range = select.dataset.range;

		if (range) {
			let content = "",
				min = range.split(",")[0],
				max = range.split(",")[1];

			for (let i = min; i <= max; i++) {
				content += `<div class="col-item">${i}</div>`;
			}

			select.innerHTML = content;
		}
	});

	const colItems = element.all(`${elem} .content .col-item`);
	const inputValue = element.all(`${elem} .input-value`);

	colItems.forEach((col) => {
		col.addEventListener("click", () => {
			const parent = col.parentNode;
			const { to } = parent.dataset;
			const value = col.innerText;

			parseInt(value) < 10
				? (settings.birthday[to] = `0${value}`)
				: (settings.birthday[to] = value);

			let res = `${settings.birthday.day} / ${settings.birthday.month} / ${settings.birthday.year}`;

			inputValue.forEach((__self) => {
				__self.innerHTML = res;
			});

			element.single(
				'[view="form"] form input[name="birthday"]'
			).value = res;
		});
	});
};

export const mountDate = function (day, month, year, format = "d/m/y") {
	format = format.replace("d", day);
	format = format.replace("m", month);
	format = format.replace("y", year);
	return format;
};

export const validateCpf = function (value) {
	let Soma;
	let Resto;

	Soma = 0;

	if (value == "00000000000") return false;

	for (let i = 1; i <= 9; i++)
		Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i);

	Resto = (Soma * 10) % 11;

	if (Resto == 10 || Resto == 11) Resto = 0;

	if (Resto != parseInt(value.substring(9, 10))) return false;

	Soma = 0;

	for (let i = 1; i <= 10; i++)
		Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i);

	Resto = (Soma * 10) % 11;

	if (Resto == 10 || Resto == 11) Resto = 0;

	if (Resto != parseInt(value.substring(10, 11))) return false;

	return true;
};
