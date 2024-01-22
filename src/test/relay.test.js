import { assert, expect, test } from 'vitest'
import * as courseFn from '../utils/course';
import * as relayFn from '../utils/relay';
import * as venla from '../data/sample/2019venla';

const sampleForkings = [
    [['A1','A2'], ['B1','B2']],
    [['C1','C2'], ['D1','D2']]
]

const sampleForkingsForRelay = [
    [['A'],['B'],['C']],
    [['A'],['B'],['C']],
    [['A'],['B'],['C']],
]
const sampleForkingsForSimpleRelay = [
    [['A','B','C'], ['D','E','F']],
    [['A','B','C'], ['D','E','F']],
    [['A','B','C'], ['D','E','F']],
]

const sampleCourseData = [
    {
        legName: 'H1',
        courses: [
            {
                legName: 'H1',
                courseId: 'H101',
                courseName: 'H1A',
                definition: ['L1','A','M1'],
                forkings: ['A'],
                forkingId: 'A',
                controls: ['L1', 31, 'M1']
            },
            {
                legName: 'H1',
                courseId: 'H102',
                courseName: 'H1B',
                definition: ['L1','B','M1'],
                forkings: ['B'],
                forkingId: 'B',
                controls: ['L1', 32, 'M1']
            },
            {
                legName: 'H1',
                courseId: 'H103',
                courseName: 'H1C',
                definition: ['L1','C','M1'],
                forkings: ['C'],
                forkingId: 'C',
                controls: ['L1', 33, 'M1']
            },
        ]
    },
    {
        legName: 'H2',
        courses: [
            {
                legName: 'H2',
                courseId: 'H201',
                courseName: 'H2A',
                definition: ['L1','A','M1'],
                forkings: ['A'],
                forkingId: 'A',
                controls: ['L1', 31, 'M1']
            },
            {
                legName: 'H2',
                courseId: 'H202',
                courseName: 'H2B',
                definition: ['L1','B','M1'],
                forkings: ['B'],
                forkingId: 'B',
                controls: ['L1', 32, 'M1']
            },
            {
                legName: 'H2',
                courseId: 'H203',
                courseName: 'H2C',
                definition: ['L1','C','M1'],
                forkings: ['C'],
                forkingId: 'C',
                controls: ['L1', 33, 'M1']
            },
        ]
    },
    {
        legName: 'H3',
        courses: [
            {
                legName: 'H3',
                courseId: 'H301',
                courseName: 'H3A',
                definition: ['L1','A','M1'],
                forkings: ['A'],
                forkingId: 'A',
                controls: ['L1', 31, 'M1']
            },
            {
                legName: 'H3',
                courseId: 'H302',
                courseName: 'H3B',
                definition: ['L1','B','M1'],
                forkings: ['B'],
                forkingId: 'B',
                controls: ['L1', 32, 'M1']
            },
            {
                legName: 'H3',
                courseId: 'H303',
                courseName: 'H3C',
                definition: ['L1','C','M1'],
                forkings: ['C'],
                forkingId: 'C',
                controls: ['L1', 33, 'M1']
            },
        ]
    },
]

test('Full forkings', () => {
    const full = relayFn.getFullForkings(sampleCourseData);
    expect(JSON.stringify(full)).toEqual('["A","B","C"]')
})

test('Cartesian product from forkings', () => {
    const allForkings = courseFn.cartesian(sampleForkings);
    expect(JSON.stringify(allForkings))
        .toEqual('[["A1","A2","C1","C2"],["A1","A2","D1","D2"],["B1","B2","C1","C2"],["B1","B2","D1","D2"]]')
})

test('All team combinations', () => {
    const allTeamCombinations = courseFn.cartesian(sampleForkingsForRelay);
    expect(allTeamCombinations.length).toBe(3*3*3);
})

test('All valid team combinations', () => {
    const validTeamCombinations = relayFn.getValidTeamCombinations(sampleCourseData);
    expect(validTeamCombinations.length).toBe(6);
})

test('Course object map', () => {
    const courseObjectsMap = relayFn.createCourseObjectsMapByCourseName(sampleCourseData);
    const course = courseObjectsMap.get('H3C');
    expect(course.legName).toBe('H3');
    expect(course.courseId).toBe('H303');
})

test('All team combinations as objects', () => {
    const teamCombinations = relayFn.getValidTeamCombinations(sampleCourseData);
    const teamCombinationsFullData = relayFn.mapRelayCoursesToContainFullData(teamCombinations,sampleCourseData);
    expect(teamCombinationsFullData.length).toBe(6);
    expect(teamCombinationsFullData[0][0].legName).toBe('H1');
    expect(teamCombinationsFullData[0][0].courseId).toBe('H101');
    expect(teamCombinationsFullData[0][0].courseName).toBe('H1A');

    expect(teamCombinationsFullData[5][1].legName).toBe('H2');
    expect(teamCombinationsFullData[5][1].courseId).toBe('H202');
    expect(teamCombinationsFullData[5][1].courseName).toBe('H2B');

})

test('Venla 2019', () => {
    const courseData = courseFn.createRelayData(venla.venla2019.legs, venla.venla2019.forkingRules);
    const teamCombinations = relayFn.getValidTeamCombinations(courseData);
    expect(teamCombinations.length).toBe(384);
    const teamCombinationsFullData = relayFn.mapRelayCoursesToContainFullData(teamCombinations, courseData);
    expect(teamCombinationsFullData.length).toBe(384);
})

test('Test partial cartesian product level fix', () => {
    const input = [
        [[["A","D","F"],["B","I","G"]],["C","E","H"]],
        [[["A","D","F"],["B","I","H"]],["C","E","G"]]
    ];
    const out = [
        [["A","D","F"],["B","I","G"],["C","E","H"]],
        [["A","D","F"],["B","I","H"],["C","E","G"]]
    ];
    const outStr = JSON.stringify(out);
    expect(JSON.stringify(relayFn.modifyCombinationsToBeInSameLevel(input))).toEqual(outStr);
});

