export default {
    /* eslint-disable */
    setExpForLevel(level) {
        let result = 0
        switch (level) {
            case 1:
                result = 0
                break
            case 2:
                result = 500
                break
            case 3:
                result = 1000
                break
            case 4:
                result = 1500
                break
            case 5:
                result = 2000
                break
            case 6:
                result = 3000
                break
        }
        return result
    },
    getCurrentLevelForExp(exp) {
        let result = 0
        if(500 > exp && exp > -1) {
            result = 1
        }
        if(1000 > exp && exp > 499) {
            result = 2
        }
        if(1500 > exp && exp > 999) {
            result = 3
        }
        if(2000 > exp && exp > 1499) {
            result = 4
        }
        if(3000 > exp && exp > 1999) {
            result = 5
        }
        if(exp > 2999) {
            result = 6
        }
        return result
    },
    generateId() {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 15; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return id;
    }
}