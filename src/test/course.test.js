import { assert, expect, test } from 'vitest'
import * as courseFn from '../utils/course';

const simpleLeg = {
    name: 'H1',
    course: [
        'L1',
        {A1: [31,32], A2: [33,34]},
        72, 73,
        {B1: 35, B2: 36},
        75, 
        'M'
    ]}
const complexLeg = {
    name: 'H2',
    course: [
        'L1',
        {A1: [31,32], A2: [33,34], A3: [51,52], A4: [61,62]},
        72, 73,
        {B1: 35, B2: 36, B3: 37},
        74,
        {C1: 91, C2: 92},
        75, 
        'M'
    ]}
const invalidLeg = {
    name: 'H2',
    course: [
        'L1',
        {A1: [31,32], A2: [33,34]},
        {A1: [31], A2: 33},
        'M'
    ]}

const invalidLegWithoutCommonControl = {
    name: 'X',
    course: [
        'L1',
        {A1: [31,32], A2: [33,34], A3: [51,52], A4: [61,62]},
        {B1: 35, B2: 36, B3: 37},
        75, 
        'M'
    ]}

const simpleForkingRules = [
    {
        leg: '',
        if: 'A1',
        then: ['B1']
    },
]    
const complexForkingRules = [
    {
        leg: '',
        if: 'A1',
        then: ['B1']
    },
    {
        leg: 'H2',
        if: 'A2',
        then: ['B2']
    },
    {
        leg: 'H2',
        if: 'A3',
        then: ['B2']
    },
    {
        leg: 'H2',
        if: 'B3',
        then: ['A4', 'C2']
    },
    {
        leg: '',
        if: 'Z',
        then: ['X']
    },
    {
        leg: 'H2',
        if: 'S',
        then: ['T','V']
    },
    {
        leg: 'H1',
        if: 'A1',
        not: ['B1']
    },
    {
        leg: '',
        if: 'A2',
        not: ['B1','B2']
    },
    {
        leg: '',
        if: 'Z',
        not: ['W','Q']
    },
]

const sampleRelay = {
    name: 'Test relay',
    relayClass: 'D',
    legCount: 3,
    legs: [
        {
            name: 'D1',
            course: [
                'L1',
                {A: [31,32], B: [33,34],C: [44,45]},
                35, 36,
                {D: 37, E: 38},
                39, 'M1'
            ]
        },
        {
            name: 'D2',
            course: [
                'L1',
                {A: [31,32], B: [33,34],C: [44,45]},
                35, 36,
                39, 'M1'
            ]
        },
        {
            name: 'D3',
            course: [
                'L1',
                {A: [31,32], B: [33,34],C: [44,45]},
                35, 36,
                {D: 37, E: 38},
                39, 'M1'
            ]
        },
    ]
}

test('Array equals', () => {
    expect(courseFn.arrayEquals([31,32],[31,32])).toBe(true);
    expect(courseFn.arrayEquals([31,32],['31','32'])).toBe(false);
    expect(courseFn.arrayEquals([31,32],[31])).toBe(false);
    expect(courseFn.arrayEquals([31,32],31)).toBe(false);
})

test('Forkings are defined correctly', () => {
    const check1 = courseFn.checkForkingsAreDefinedCorrectly([simpleLeg]);
    expect(check1.status).toBe(true);
    expect(check1.key).eq('')
    const check2 = courseFn.checkForkingsAreDefinedCorrectly([invalidLeg]);
    expect(check2.status).toBe(false);
    expect(check2.key).not.eq('')
})

test('Forkings start from common control and end with one', () => {
    const check1 = courseFn.checkForkingsStartAndEndWithCommonControl([simpleLeg]);
    expect(check1.status).toBe(true);
    expect(check1.forking).eq('')
    const check2 = courseFn.checkForkingsStartAndEndWithCommonControl([invalidLeg]);
    expect(check2.status).toBe(false);
    expect(check2.forking).eq('{"A1":[31],"A2":33}')
    const check3 = courseFn.checkForkingsStartAndEndWithCommonControl([invalidLegWithoutCommonControl]);
    expect(check3.status).toBe(false);
    expect(check3.forking).eq('{"B1":35,"B2":36,"B3":37}')
})

test('Get all forkings object', () => {
    const result = courseFn.getAllForkingsObject(simpleLeg.course);
    expect(Object.keys(result)).toHaveLength(4);
    expect(Object.keys(result)).toContain('A1');
    expect(Object.keys(result)).toContain('A2');
    expect(Object.keys(result)).toContain('B1');
    expect(Object.keys(result)).toContain('B2');
    expect(Object.keys(result)).not.toContain('A');
    expect(Object.keys(result)).not.toContain('B');
})

test('Get course objects', () => {
    /* 
    all combinations
    A1 B1
    A1 B2
    A2 B1
    A2 B2
    */
    const courseData = courseFn.getFullCourseDataFromLeg(simpleLeg);
    expect(Object.keys(courseData)).toHaveLength(4);
    expect(courseFn.findCourseByName(courseData, 'H1A1B1'), 'H1A1B1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1A1B2'), 'H1A1B2').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1A2B1'), 'H1A2B1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1A2B2'), 'H1A2B2').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1AB'), 'H1AB').toBeUndefined();
})

test('Filter combinations by name', () => {
    const rulesForH1 = courseFn.filterCombinationRulesByLegName(complexForkingRules, 'H1'),
        rulesForH2 =  courseFn.filterCombinationRulesByLegName(complexForkingRules, 'H2');
    expect(rulesForH1, 'H1').toHaveLength(5);
    expect(rulesForH2, 'H2').toHaveLength(8);

})

test('Filter courses by combinations - simple', () => {
    const rulesForLeg = courseFn.filterCombinationRulesByLegName(simpleForkingRules, simpleLeg.name),
        courseData = courseFn.getFullCourseDataFromLeg(simpleLeg, rulesForLeg);
    /* 
    all combinations
    A1 B1 
    A1 B2   - filtered out by rule A1 -> B1
    A2 B1   - filtered out by rule A2 -> B2
    A2 B2
    */

    expect(Object.keys(courseData), 'Filtered courses').toHaveLength(3);
    expect(courseFn.findCourseByName(courseData, 'H1A1B1'), 'H1A1B1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1A1B2'), 'H1A1B2').toBeUndefined();
    expect(courseFn.findCourseByName(courseData, 'H1A2B1'), 'H1A2B1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1A2B2'), 'H1A2B2').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1AB'), 'H1AB').toBeUndefined();
})

test('Filter courses by include and exclude combinations - complex', () => {
    const rulesForLeg = courseFn.filterCombinationRulesByLegName(complexForkingRules, complexLeg.name),
        courseData = courseFn.getFullCourseDataFromLeg(complexLeg, rulesForLeg);

    /* 
    all combinations
    A1 B1 C1    - should be in, as rule A1 -> NOT B1 is for H1
    A1 B1 C2    - should be in, as rule A1 -> NOT B1 is for H1
    A1 B2 C1    - filtered out by rule A1 -> B1
    A1 B2 C2    - filtered out by rule A1 -> B1
    A1 B3 C1    - filtered out by rule A1 -> B1
    A1 B3 C2    - filtered out by rule A1 -> B1
    A2 B1 C1    - filtered out by rule A2 -> B2
    A2 B1 C2    - filtered out by rule A2 -> B2
    A2 B2 C1    - filtered out by rule A2 -> NOT B1,B2
    A2 B2 C2    - filtered out by rule A2 -> NOT B1,B2
    A2 B3 C1    - filtered out by rule A2 -> B2
    A2 B3 C2    - filtered out by rule A2 -> B2
    A3 B1 C1    - filtered out by rule A3 -> B2
    A3 B1 C2    - filtered out by rule A3 -> B2
    A3 B2 C1
    A3 B2 C2
    A3 B3 C1    - filtered out by rule A3 -> B2
    A3 B3 C2    - filtered out by rule A3 -> B2
    A4 B1 C1
    A4 B1 C2
    A4 B2 C1
    A4 B2 C2
    A4 B3 C1    - filtered out by rule B3 -> A4,C2
    A4 B3 C2
    */

    expect(Object.keys(courseData), 'Filtered courses').toHaveLength(9);
    expect(courseFn.findCourseByName(courseData, 'H2A1B1C1'), 'H2A1B1C1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H2A1B1C2'), 'H2A1B1C2').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H2A2B2C1'), 'H2A2B2C1').toBeUndefined();
    expect(courseFn.findCourseByName(courseData, 'H2A2B2C2'), 'H2A2B2C2').toBeUndefined();
    expect(courseFn.findCourseByName(courseData, 'H2A3B2C1'), 'H2A3B2C1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H2A3B2C2'), 'H2A3B2C2').toBeDefined();

    expect(courseFn.findCourseByName(courseData, 'H2A4B1C1'), 'H2A4B1C1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H2A4B1C2'), 'H2A4B1C2').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H2A4B2C1'), 'H2A4B2C1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H2A4B2C2'), 'H2A4B2C2').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H2A4B3C1'), 'H2A4B3C1').toBeUndefined();
    expect(courseFn.findCourseByName(courseData, 'H2A4B3C2'), 'H2A4B3C2').toBeDefined();
})

test('Check full relay data', () => {
    const relayData = courseFn.createRelayData(sampleRelay.legs);
    expect(relayData.length).toBe(3);
    expect(relayData[0].courses.length, 'D1 courses').toBe(6)
    expect(relayData[1].courses.length, 'D2 courses').toBe(3)
    expect(relayData[2].courses.length, 'D3 courses').toBe(6)
})