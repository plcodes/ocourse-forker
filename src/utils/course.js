// helper method
export const arrayEquals = (a,b) => a.length === b.length && a.every((value, index) => value === b[index]);

const toTwoDigits = (number) => {
    return (number).toLocaleString(undefined, {minimumIntegerDigits: 2})
}

/**
 * returns only the forking parts of the course
 * Example:
 * [ { "A1": [ 31, 32 ], "A2": [ 41, 42 ] }, { "B1": 61, "B2": 71 } ]
 */
export const getForkingsFromCourse = (course) => {
    return course.filter(element => typeof element === 'object');
}

/**
 * returns an Object mapping the forkings
 * Example:
 * { "A1": [ 31, 32 ], "A2": [ 41, 42 ], "B1": 61, "B2": 71 }
 */ 
export const getAllForkingsObject = (course) => {
    return getForkingsFromCourse(course).reduce(((r, c) => Object.assign(r, c)), {})
}

/**
 * checks that the definitions for forkings are correct
 * Examples:
 * {A: [31,32]} {A: [31,32]}    => true
 * {A: [31,32]} {A: 31}         => false
 * {A: [31,32]} {A: [31,32,33]} => false
 * {A: [31,32]} {A: [41,42]}    => false
 * 
 * @return {Array} An array containing the status and a possible error message
 */
export const checkForkingsAreDefinedCorrectly = (legs) => {
    let definitions = {};
    for(const leg of legs) {
        const forkings = getForkingsFromCourse(leg.course);
        for(const forking of forkings) {
            for(const [key, value] of Object.entries(forking)) {
                if(key in definitions) {
                    const existing = definitions[key];
                    if(typeof existing !== typeof value || 
                        typeof value === 'number'? value !== existing : !arrayEquals(existing, value)) {
   
                        return {
                            status: false,
                            msg: `Settings for forking ${key} don\'t match. Previous: ${existing}, new: ${value}`
                        }
                    }
                } else {
                    definitions[key] = value;
                }
            };
        };
    }
    return {
        status: true,
        msg: ''
    }
};

/** 
 * Example
 * [ [ "L1" ], [ "A1", "A2" ], [ 33 ], [ 34 ], [ "B1", "B2" ], [ 35 ], [ "M" ] ]
 */
export const getCourseWithForkingIds = (course) => {
    return course.map((n) => 
        (typeof n === 'object') ? 
            Object.keys(n) :
            [n]);
};

/** 
 * cartesian product: [[1,2],[3,4]] =>  [[1,3],[1,4],[2,3],[2,4]]
 * Example:
 * [ [ "L1" ], [ "A1", "A2" ], [ 33 ], [ 34 ], [ "B1", "B2" ], [ 35 ], [ "M" ] ]
 * => [ 
 *      [ "L1", "A1", 33, 34, "B1", 35, "M" ], 
 *      [ "L1", "A1", 33, 34, "B2", 35, "M" ], 
 *      [ "L1", "A2", 33, 34, "B1", 35, "M" ], 
 *      [ "L1", "A2", 33, 34, "B2", 35, "M" ], 
 *      [ "L1", "A3", 33, 34, "B1", 35, "M" ], 
 *      [ "L1", "A3", 33, 34, "B2", 35, "M" ] 
 *    ]
 */
export const cartesian = (a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

/** 
 * returns full Object containing leg course data
 * Example: 
 * {
 *  legName: 'H1',
 *  courses: [
 *      {
 *          legName: 'H1',
 *          courseId: 'H101',
 *          courseName: 'H1A1B1',
 *          definition: ['L1', 'A1', 72, 73, 'B1', 75, 'M'],
 *          forkings: [ 'A1', 'B1' ],
 *          controls: ['L1', 31,  32, 72, 73, 35, 75, 'M']
 *      },
 *      {
 *          legName: 'H1',
 *          courseId: 'H102',
 *          courseName: 'H1A1B2', 
 *          ...
 *      }
 *   ]
 * }
*/
export const getFullCourseDataFromLeg = (leg, includeCombinationsForLeg, excludeCombinationsForLeg) => {
    let result = [];
    const forkingsById = getAllForkingsObject(leg.course);
    const allCourseVariants = cartesian(getCourseWithForkingIds(leg.course));
    let courseIndex = 1;
    for(const variant of allCourseVariants) {
        let variantControls = [];
        let variantCourse = [];
        for(const routepart of variant) {
            if(routepart in forkingsById) {
                variantCourse.push(forkingsById[routepart])
                variantControls.push(routepart);
            } else {
                variantCourse.push(routepart);
            }
        }
        if(checkForkingAllowed(variantControls, includeCombinationsForLeg, excludeCombinationsForLeg)) {
            result.push({
                legName: leg.name,
                courseId: leg.name + toTwoDigits(courseIndex),
                courseName: leg.name + variantControls.join(''),
                definition: variant,
                forkings: variantControls,
                controls: variantCourse.flat()
            })
            courseIndex++;
        }
    }
    //console.log('Full leg convert', leg, result);
    return result;
}

/**
 * Checks the given forking array against the include and exclude rules
 */
export const checkForkingAllowed = (forkings, includeCombinations, excludeCombinations) => {
    // check against all combination rules
    // if the forking contains the "if" variant of the include rule,
    // then it must contain all "then" variants
    if(includeCombinations) {
        for(const combination of includeCombinations) {
            if(forkings.includes(combination.if)) {
                if(!combination.then.every(c => forkings.includes(c))) {
                    return false;
                }
            }
        }
    }
    // if the forking contains the "if" variant of the exclude rule,
    // then it must contain none of the "not" variants
    if(excludeCombinations) {
        for(const combination of excludeCombinations) {
            if(forkings.includes(combination.if)) {
                if(combination.not.some(c => forkings.includes(c))) {
                    return false;
                }
            }
        }
    }
    return true
}


export const findCourseByName = (courses, name) => courses.find(course => course.courseName === name);
export const filterCombinationRulesByLegName = (combinations, name) => {
    return combinations.filter(combination => (combination.leg === name || combination.leg === ''));
}

/**
 * Creates the needed data for the relay (all legs)
 */
export const createRelayData = (legs, includeCombinations, excludeCombinations) => {
    let data = [];
    for(const leg of legs) {
        const includeCombinationsForLeg = includeCombinations ? filterCombinationRulesByLegName(includeCombinations, leg.name) : undefined;
        const excludeCombinationsForLeg = excludeCombinations ? filterCombinationRulesByLegName(excludeCombinations, leg.name) : undefined;
        data.push({
            legName: leg.name,
            courses: getFullCourseDataFromLeg(leg, includeCombinationsForLeg, excludeCombinationsForLeg)
        });
    }
    return data;
}
