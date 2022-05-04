const uniqueValues = (array) => [...new Set(array)];

export const getLegFromCourseData = (courseData = [], legName) => {
    return courseData.find(leg => leg.legName === legName)
}

/**
 * Get the forkings data out of course legs
 */
export const getUsedForkingsForLeg = (leg = {}) => {
    return leg.courses ? leg.courses.map(course => course.forkings) : undefined
}

/**
 * Get all forking variants for all legs as an array.
 * Example
 * [
 *  [ [ 'A' ], [ 'B' ], [ 'C' ] ],
 *  [ [ 'A' ], [ 'B' ], [ 'C' ] ],
 *  [ [ 'A' ], [ 'B' ], [ 'C' ] ]
 * ]
 */
export const getAllCombinations = (courseData = []) => {
    if(!courseData || courseData.length == 0) return;
    return courseData.map(leg => getUsedForkingsForLeg(leg))
}

/**
 * Get array containing unique forkings like [ 'A', 'B', 'C' ] 
 */
export const getFullForkings = (courseArray = []) => {
    const allCombinations = getAllCombinations(courseArray);
    return getFullForkingsFromAllCombinations(allCombinations);
}
const getFullForkingsFromAllCombinations = (allCombinations = []) => {
    return uniqueValues(allCombinations.flat().flat())
}

export const cartesian = (a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
export const arrayContainsAll = (a,b) => a.length === b.length && a.every(value => b.includes(value));

export const getAllValidCombinations = (courseData = []) => {
    if(!courseData || courseData.length == 0) return;
    const allCombinations = getAllCombinations(courseData),
        allPossibleCombinations = cartesian(allCombinations),
        fullForkings = getFullForkingsFromAllCombinations(allCombinations);

    return allPossibleCombinations.filter(course => {
        return arrayContainsAll(uniqueValues(course),fullForkings)
    });
}
