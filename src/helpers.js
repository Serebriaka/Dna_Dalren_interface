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

}