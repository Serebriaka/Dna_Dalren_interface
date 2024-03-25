
export default {
    getIsEquip(item) {
        let result = false;
        if
            (      item.category === 'jewelry'
                || item.category === 'weapons'
                || item.category === 'cloth'
                || item.category === 'shields'
                || item.category === 'armors'
            ) {
                result = true
            }

        return result
    },
    counter(equipment) {
        let oneHandedCount = 0
        let twoHandedCount = 0
        let shieldsCount = 0
        let clothCount = 0
        let jeweleryCount = 0
        let armorCount = 0
        equipment.forEach((item) => {
            if(item.category === 'weapons' || item.category === 'shields') {
                if(item.handed === 'one-handed') oneHandedCount++
                if(item.handed === 'two-handed') twoHandedCount++
            }
            if(item.category === 'shields') shieldsCount++
            if(item.category === 'cloth') clothCount++
            if(item.category === 'jewelry') jeweleryCount++
            if(item.category === 'armors') armorCount++
        })
        return {
            oneHandedCount:oneHandedCount,
            twoHandedCount:twoHandedCount,
            shieldsCount:shieldsCount,
            clothCount:clothCount,
            jeweleryCount:jeweleryCount,
            armorCount:armorCount,
        }
    },
    getStatsValidate(item, player) {
        let result = false
        let itemStats = {
            charisma: item.charisma,
            constitution: item.constitution,
            dexterity: item.dexterity,
            intelligence: item.intelligence,
            strength: item.strength,
            wisdom: item.wisdom
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
    getShellVal(inv, equipment, stats) {
        let result = true
        if (inv.category === 'shields') {
            let strength = 0
            equipment.forEach((item)=>{
                if (item.handed === 'one-handed' && item.category === 'weapons') {
                    strength = +item.requirements.strength

                }
            })
            strength = strength + inv.requirements.strength
            if(stats.strength < strength) {
                result = false
            }
        }
        let isShield = equipment.some(equipment => equipment.category === 'shields')
        if (inv.category === 'weapons' && isShield) {
            let strength = 0
            equipment.forEach((item)=>{
                if (item.category === 'shields') {
                    strength += item.requirements.strength
                }
            })
            strength +=  inv.requirements.strength
            console.log(stats.strength, '=', strength)
            if(stats.strength < strength) {
                result = false
            }
        }
        return result
    },
}