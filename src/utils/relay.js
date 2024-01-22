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
    return uniqueValues(allCombinations.flat(2))
}

export const cartesianProductFromAllLegs = (array) => {
    return array.reduce(
        (a, b) => a.flatMap((x) => b.map((y) => [...x, y])),
        [[]]
    );
} 

export const arrayContainsAll = (a,b) => a.length === b.length && a.every(value => b.includes(value));

export const arrayHasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

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
        fullForkings = getFullForkingsFromAllCombinations(allCoursesForLegs);
    let allPossibleCombinations = [];

    if(courseData.length < 5) {
        // in simple relays we can just check every possible combination from all legs
        allPossibleCombinations = cartesianProductFromAllLegs(allCoursesForLegs);    
    } else {
        // when leg count and the amount of possible variants increase, we must do this in pieces
        // e.g. in Jukola 24*24*24*8*8*16*16 = 226.492.416 combinations 

        // combine 2 first legs
        allPossibleCombinations = removeDuplicateForkings(cartesianProductFromAllLegs([allCoursesForLegs[0], allCoursesForLegs[1]]));
        
        // add next ones one by one
        for(let i = 2; i < allCoursesForLegs.length; i++) {
            allPossibleCombinations = addNextLegToCombinations(allCoursesForLegs[i], allPossibleCombinations);
        }
    }

    return takeOnlyFullForkings(allPossibleCombinations, fullForkings);
}

export const removeDuplicateForkings = (combinations) => {
    return combinations.filter(combination => {
        return !arrayHasDuplicates(combination.flat(Infinity));
    });
}

/* 
 * Filter out combinations, where not all forkings are fulfilled
 */
export const takeOnlyFullForkings = (combinations, fullForkings) => {
    return combinations.filter(course => {
        return arrayContainsAll(uniqueValues(course.flat()),fullForkings)
    });
}

export const addNextLegToCombinations = (nextLeg, previousLegs) => {
    let arr = cartesianProductFromAllLegs([previousLegs, nextLeg]);
    
    //filter out ones, which have some forking multiple times
    let result = removeDuplicateForkings(arr);
    return modifyCombinationsToBeInSameLevel(result);
}

/**
 * Modify result arrays to be on the same level
 * In: 
 * [
 *  [[["A","D","F"],["B","I","G"]],["C","E","H"]],
 *  [[["A","D","F"],["B","I","H"]],["C","E","G"]]
 * ]
 * Out: 
 * [
 *  [["A","D","F"],["B","I","G"],["C","E","H"]],
 *  [["A","D","F"],["B","I","H"],["C","E","G"]]
 * ]
 */ 
export const modifyCombinationsToBeInSameLevel = (combinations) => {
    let result = combinations.map((arr) => {
        return arr.flatMap((inner) => {
            return Array.isArray(inner[0]) ? inner : [inner]
        });
    });
    return result;
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

