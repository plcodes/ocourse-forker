export const shuffleArray = array => {
    return array.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
}

/**
 * 
 * @param {*} relayData
 * @param {*} randomizerRules 
 * @returns {
 *   'success': if a match was found,
 *   'data': randomized data,
 *   'loops': number of tries,
 *   'max': max amount of loops tried,
 * }
 */

export const shuffleUntilRulesMet = (relayData, randomizerRules) => {
    const maxloops = 200000;
    let rulesOk = false,
        loop = 0,
        randomData = undefined;

    do {
        randomData = shuffleArray(relayData);
        rulesOk = checkAllRulesAreFullfilled(randomData, randomizerRules);
        loop++;

    } while (!rulesOk && loop < maxloops);

    return {
        'success': rulesOk,
        'data': randomData,
        'loops': loop,
        'max': maxloops
    }
}

const checkAllRulesAreFullfilled = (teamData, randomizerRules) => {
    for(const rule of randomizerRules) {
        if(!checkRule(teamData, rule.top, rule.leg, rule.forkings, rule.tolerance)) return false;
    }

    return true;
}

const checkRule = (teamData, top, leg, forkings, tolerance) => {
    const topTeams = teamData.slice(0, top);
    let forkingAmountsPerLeg = getForkingAmountsPerLeg(topTeams);
    
    const inspectedLeg = forkingAmountsPerLeg[(leg-1)];
    let forkingsToCheck = forkings.map((forkingCode) => inspectedLeg.get(forkingCode)),
        rangeMin = Math.floor(top / forkingsToCheck.length) - tolerance,
        rangeMax = Math.ceil(top / forkingsToCheck.length) + tolerance;
        
    let check = checkWithinTolerance(forkingsToCheck, rangeMin, rangeMax);
    //if(!check) console.log('failed rule', leg, top, forkings, tolerance);
    return check;
}

const checkWithinTolerance = (amounts, rangeMin, rangeMax) => {
    for(const amount of amounts) {
        const ref = amount || 0; // undefined is the same as 0
        if(ref < rangeMin || ref > rangeMax) return false;
    }
    return true;
}

/**
 * Returns amounts in an array of maps, e.g.
 * [
 *   {'A'=>3, 'B'=>2, 'C'=>1, 'D'=>3, 'E'=>3, 'F'=>4, 'G'=>2},
 *   {'A'=>2, 'B'=>2, 'C'=>2, 'F'=>2, 'G'=>4, 'H'=>2, 'I'=4},
 *   {'A'=>1, 'B'=>2, 'C'=>3, 'D'=>3, 'E'=>3, 'H'=>4, 'I'=2}
 * ]
 */
const getForkingAmountsPerLeg = (teamData) => {
    if(!teamData || !teamData.length) return;
    let forkingAmountsPerLeg = [];
    const legs = teamData[0].length;
    for(let leg = 0; leg < legs; leg++) {
        let forkingAmounts = new Map();
        for(const team of teamData) {
            let currentLegForkingAmounts = team[leg].forkings;
            for(const forking of currentLegForkingAmounts) {
                let amount = forkingAmounts.get(forking) || 0;
                amount++;
                forkingAmounts.set(forking, amount);
            }
        }
        forkingAmountsPerLeg[leg] = forkingAmounts;
    }
    return forkingAmountsPerLeg;
}
