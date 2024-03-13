export default {
    getStrengthValidate(item, player) {
        let result = false
        let itemStats = {
            charisma: item.charisma ? item.charisma : 0,
            constitution: item.constitution ? item.constitution : 0,
            dexterity: item.dexterity ? item.dexterity : 0,
            intelligence: item.intelligence ? item.intelligence : 0,
            strength: item.strength ? item.strength : 0,
            wisdom: item.wisdom ? item.wisdom : 0,
        }
        for (const key in itemStats) {
            if (itemStats[key] <= player[key]) {
                result = true;
            } else {
                result = false
                break
            }
        }
        return result
    },
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
    }
}