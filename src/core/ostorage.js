/**

 */
const Ostorage = function () {

    let config = {
        preffix: '',
        name: 'ostorage'
    }

    const set = function (value) {
        localStorage.setItem(config.name, value)
    }

    const get = function () {
        return JSON.parse(localStorage.getItem(config.name))
    }

    const dispatch = function (key, value) {
        key = key.split('.')
        let i = 0
        let result = '[{'

        do {
            result += '"' + key[i] + '":'
            if ((i+1)<key.length) result += '{'

            i++;
        } while (i < key.length);
        
        result += JSON.stringify(value)
        
        i = 0
        do {
            result += '}'
            i++;
        } while (i < key.length);
        result += ']'

        console.log(result)

        // set(result)
    }


    return {
        config,
        dispatch
    }
}

export default Ostorage;
