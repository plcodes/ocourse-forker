const uniqueValues = (array) => [...new Set(array)].sort();

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

export const cartesianProductFromAllLegs = (array) => {
    return array.reduce(
        (a, b) => a.flatMap((x) => b.map((y) => [...x, y])),
        [[]]
    );
} 

export const arrayContainsAll = (a,b) => a.length === b.length && a.every(value => b.includes(value));

/**
 * Get all valid combinations for the full relay
 * Example:
 * Parameter courseData:
 * [
 *  {
 *      legName: V1,
 *      courses: [Array(24)]
 *  },
 *  {
 *      legName: V2,
 *      courses: [Array(24)]
 *  },
 *  {
 *      legName: V3,
 *      courses: [Array(24)]
 *  },
 *  {
 *      legName: V4,
 *      courses: [Array(8)]
 *  },
 * ]
 * 
 * Returns Array[384]:
 * [
 *   [
 *    [ 'A1', 'C', 'E' ],
 *    [ 'B1', 'D', 'F' ],
 *    [ 'B2', 'H', 'B', 'G' ],
 *    [ 'A2', 'I', 'A' ]
 *  ],
 *  [
 *    [ 'A1', 'C', 'E' ],
 *    [ 'B1', 'D', 'F' ],
 *    [ 'B2', 'I', 'B', 'G' ],
 *    [ 'A2', 'H', 'A' ]
 *  ],
 *  ...
 * ]
 */
export const getValidTeamCombinations = (courseData = []) => {
    if(!courseData || courseData.length == 0) return;
    
    const allCoursesForLegs = getAllCombinations(courseData),
        allPossibleCombinations = cartesianProductFromAllLegs(allCoursesForLegs),
        fullForkings = getFullForkingsFromAllCombinations(allCoursesForLegs);
    
    return allPossibleCombinations.filter(course => {
        return arrayContainsAll(uniqueValues(course.flat()),fullForkings)
    });
}


export const createCourseObjectsMapByCourseName = (courseData) => {
    let map = new Map();
    for(const legCourses of courseData) {
        for(const course of legCourses.courses) {
            map.set(course.courseName, course);
        }
    }
    return map;
}

export const createCourseObjectsMapPerLegByForkingId = (courseData) => {
    let legs = [];
    for(const legCourses of courseData) {
        let map = new Map();
        for(const course of legCourses.courses) {
            map.set(course.forkingId, course);
        }
        legs.push(map);
    }
    return legs;
}

/**
 * Map the valid relay combinations from forking arrays to full course data containing e.g. course id and course name
 */
export const mapRelayCoursesToContainFullData = (teamForkings = [], courseData = []) => {
    const courseObjectsMapsPerLegs = createCourseObjectsMapPerLegByForkingId(courseData);
    let result = [];

    for(const teamForking of teamForkings) {
        result.push(teamForking.map(function(courseForking, index) {
            return courseObjectsMapsPerLegs[index].get(courseForking.join(''));
        }))
    }
    return result;

}

export const shuffleArray = array => {
    return array.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
}

