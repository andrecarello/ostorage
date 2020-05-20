/**
 * Getters e Setters para manipulação do Storage
 * 
 * Utilizar o prefix @ na KEY
 * 
 * TODO: Criar um objeto para isso, ex: Vuex
 */
const Manager = function () {
    return {
        set: function (key, value) {
            localStorage.setItem(key, value)
        },
        get: function (key) {
            return localStorage.getItem(key)
        }
    }
}

export default Manager;
