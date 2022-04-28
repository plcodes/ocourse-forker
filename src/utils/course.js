// helper method
export const arrayEquals = (a,b) => a.length === b.length && a.every((value, index) => value === b[index]);

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
export const checkForkingsAreDefinedCorrectly = (course) => {
    let definitions = {},
        forkings = getForkingsFromCourse(course);
    for(const forking of forkings) {
        for(const [key, value] of Object.entries(forking)) {
            if(key in definitions) {
                const existing = definitions[key];
                if(typeof existing !== typeof value || 
                    typeof value === 'number'? value !== existing : !arrayEquals(existing, value)) {

                    return [false, 'Error in forkings. Settings for forking %s don\'t match. Previous: %s, new: %s', key, existing, value]
                }
            } else {
                definitions[key] = value;
            }
        };
    };
    return [true, ''];
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
 * [{
 *  name: 'H1A1B1',
 *  definition: ['L1', 'A1', 72, 73, 'B1', 75, 'M'],
 *  forkings: [ 'A1', 'B1' ],
 *  controls: ['L1', 31,  32, 72, 73, 35, 75, 'M']
 * },
 * {
 *  name: 'H1A1B2', 
 *  ...
*/
export const getFullCourseDataFromLeg = (leg) => {
    let result = [];
    const forkingsById = getAllForkingsObject(leg.course);
    const allCourseVariants = cartesian(getCourseWithForkingIds(leg.course));
    for(const variant of allCourseVariants) {
        let variantId = [];
        let variantCourse = [];
        for(const routepart of variant) {
            if(routepart in forkingsById) {
                variantCourse.push(forkingsById[routepart])
                variantId.push(routepart);
            } else {
                variantCourse.push(routepart);
            }
        }
        result.push({
            leg: leg.name,
            name: leg.name + variantId.join(''),
            definition: variant,
            forkings: variantId,
            controls: variantCourse.flat()
        })
    }
    //console.log('Full leg convert', leg, result);
    return result;
}

export const findCourseByName = (courses, name) => courses.find(course => course.name === name);
export const filterCombinationsByLegName = (combinations, name) => {
    return combinations.filter(combination => (combination.leg === name || combination.leg === ''));
}

/**
 * Returns filtered list of course objects
 */
export const filterCoursesByCombinations = (leg, combinations) => {
    const courseData = getFullCourseDataFromLeg(leg);
    const usedCombinations = filterCombinationsByLegName(combinations, leg.name);

    return courseData.filter((course) => {
        // check against all combination rules
        // if the forking contains the "if" variant, then it must contain all "then" variants
        for(const combination of usedCombinations) {
            if(course.forkings.includes(combination.if)) {
                if(!combination.then.every(c => course.forkings.includes(c))) {
                    return false;
                }
            }
        }
        return true
    })
}
