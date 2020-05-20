const Elements = function () {
	return {
		/**
		 * Retorna todos os elementos registrados no DOM
		 *
		 * @param {Element} e
		 */
		all: function (e) {
			return document.querySelectorAll(e);
		},
		/**
		 * Retorna um único elemento registrado no DOM
		 *
		 * @param {Element} e
		 */
		single: function (e) {
			return document.querySelector(e);
		},
		/**
		 * Retorna todos os elementos registrado no DOM, passando a TAG
		 *
		 * @param {Element} e
		 */
		tag: function (e) {
			return document.getElementsByTagName(e);
		},
		/**
		 * Retorna todos os elementos registrados no DOM
		 * Utilizado apenas pro nomenclatura
		 *
		 * @param {Element} e
		 */
		attr: function (e) {
			return this.all(e);
		},
	};
};

export default Elements;
