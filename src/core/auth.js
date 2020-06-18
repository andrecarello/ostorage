/**
 * OSTON - Autenticação Front-End
 *
 * @returns {{getAnonymous: (function(): string), uuid: (function(): string), setAnonymous: setAnonymous, generateAnonymous: (function(): string)}}
 * @constructor
 */
export const OstonAuth = function () {

    const key = "IAMOston";

    return {

        setAnonymous: function (value) {
            localStorage.setItem(key, value);
        },

        getAnonymous: function () {
            return localStorage.getItem(key);
        },

        uuid: function () {
            let uuid = '', ii;
            for (ii = 0; ii < 32; ii += 1) {
                switch (ii) {
                    case 8:
                    case 20:
                        uuid += '-';
                        uuid += (Math.random() * 16 | 0).toString(16);
                        break;
                    case 12:
                        uuid += '-';
                        uuid += '4';
                        break;
                    case 16:
                        uuid += '-';
                        uuid += (Math.random() * 4 | 8).toString(16);
                        break;
                    default:
                        uuid += (Math.random() * 16 | 0).toString(16);
                }
            }
            return uuid;
        },

        generateAnonymous: function () {

            if (!this.getAnonymous()) {
                this.setAnonymous(this.uuid())
            }

            return this.getAnonymous();
        }

    }
};