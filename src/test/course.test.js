import { assert, expect, test } from 'vitest'
import * as courseFn from '../utils/course';
import * as csvFn from '../utils/csv';

const sampleLeg = {
    name: 'H1',
    course: [
        'L1',
        {A1: [31,32], A2: [33,34]},
        72, 73,
        {B1: 35, B2: 36},
        75, 
        'M'
    ]}
const sampleLeg2 = {
    name: 'H2',
    course: [
        'L1',
        {A1: [31,32], A2: [33,34], A3: [51,52], A4: [61,62]},
        72, 73,
        {B1: 35, B2: 36, B3: 37},
        {C1: 91, C2: 92},
        75, 
        'M'
    ]}
const invalidSampleLeg = {
    name: 'H2',
    course: [
        'L1',
        {A1: [31,32], A2: [33,34]},
        {A1: [31], A2: 33},
        'M'
    ]}

const sampleCombinedForkings = [
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
]

test('Array equals', () => {
    expect(courseFn.arrayEquals([31,32],[31,32])).toBe(true);
    expect(courseFn.arrayEquals([31,32],['31','32'])).toBe(false);
    expect(courseFn.arrayEquals([31,32],[31])).toBe(false);
    expect(courseFn.arrayEquals([31,32],31)).toBe(false);
})

test('Forkings are defined correctly', () => {
    const [status, msg] = courseFn.checkForkingsAreDefinedCorrectly(sampleLeg.course);
    expect(status).toBe(true);
    expect(msg).eq('')
    const [status2, msg2] = courseFn.checkForkingsAreDefinedCorrectly(invalidSampleLeg.course);
    expect(status2).toBe(false);
    expect(msg2).not.eq('')
})

test('Get all forkings object', () => {
    const result = courseFn.getAllForkingsObject(sampleLeg.course);
    expect(Object.keys(result)).toHaveLength(4);
    expect(Object.keys(result)).toContain('A1');
    expect(Object.keys(result)).toContain('A2');
    expect(Object.keys(result)).toContain('B1');
    expect(Object.keys(result)).toContain('B2');
    expect(Object.keys(result)).not.toContain('A');
    expect(Object.keys(result)).not.toContain('B');
})

test('Get course objects', () => {
    const courseData = courseFn.getFullCourseDataFromLeg(sampleLeg);
    expect(Object.keys(courseData)).toHaveLength(4);
    expect(courseFn.findCourseByName(courseData, 'H1A1B1'), 'H1A1B1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1A1B2'), 'H1A1B2').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1A2B1'), 'H1A2B1').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1A2B2'), 'H1A2B2').toBeDefined();
    expect(courseFn.findCourseByName(courseData, 'H1AB'), 'H1AB').toBeUndefined();
})

test('Course as csv', () => {
    const courseData = courseFn.getFullCourseDataFromLeg(sampleLeg),
        course1 = courseFn.findCourseByName(courseData, 'H1A1B1'),
        course2 = courseFn.findCourseByName(courseData, 'H1A2B2');
    expect(csvFn.courseToCsvRow(course1.controls)).toEqual('L1;31;32;72;73;35;75;M')
    expect(csvFn.courseToCsvRow(course2.controls)).toEqual('L1;33;34;72;73;36;75;M')
})

test('Filter combinations by name', () => {
    const result1 = courseFn.filterCombinationsByLegName(sampleCombinedForkings, 'H1'),
        result2 =  courseFn.filterCombinationsByLegName(sampleCombinedForkings, 'H2');
    expect(result1, 'H1').toHaveLength(2);
    expect(result2, 'H2').toHaveLength(6);

})

test('Filter courses by combinations - simple', () => {
    const allCourseData = courseFn.getFullCourseDataFromLeg(sampleLeg, sampleCombinedForkings);
    const filteredCourseData = courseFn.filterCoursesByCombinations(sampleLeg, sampleCombinedForkings);
    expect(Object.keys(allCourseData), 'All possible courses').toHaveLength(4);
    expect(Object.keys(filteredCourseData), 'Filtered courses').toHaveLength(3);
    expect(Object.keys(filteredCourseData)).toHaveLength(3);
    expect(courseFn.findCourseByName(filteredCourseData, 'H1A1B1'), 'H1A1B1').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H1A1B2'), 'H1A1B2').toBeUndefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H1A2B1'), 'H1A2B1').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H1A2B2'), 'H1A2B2').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H1AB'), 'H1AB').toBeUndefined();
})

test('Filter courses by combinations - complex', () => {
    const allCourseData = courseFn.getFullCourseDataFromLeg(sampleLeg2, sampleCombinedForkings);
    const filteredCourseData = courseFn.filterCoursesByCombinations(sampleLeg2, sampleCombinedForkings);
    /* 
    all combinations
    A1 B1 C1
    A1 B1 C2
    A1 B2 C1    - filtered out by rule A1 -> B1
    A1 B2 C2    - filtered out by rule A1 -> B1
    A1 B3 C1    - filtered out by rule A1 -> B1
    A1 B3 C2    - filtered out by rule A1 -> B1
    A2 B1 C1    - filtered out by rule A2 -> B2
    A2 B1 C2    - filtered out by rule A2 -> B2
    A2 B2 C1
    A2 B2 C2
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

    expect(Object.keys(allCourseData), 'All possible courses').toHaveLength(24);
    expect(Object.keys(filteredCourseData), 'Filtered courses').toHaveLength(11);
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A1B1C1'), 'H2A1B1C1').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A1B1C2'), 'H2A1B1C2').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A2B2C1'), 'H2A2B2C1').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A2B2C2'), 'H2A2B2C2').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A3B2C1'), 'H2A3B2C1').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A3B2C2'), 'H2A3B2C2').toBeDefined();

    expect(courseFn.findCourseByName(filteredCourseData, 'H2A4B1C1'), 'H2A4B1C1').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A4B1C2'), 'H2A4B1C2').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A4B2C1'), 'H2A4B2C1').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A4B2C2'), 'H2A4B2C2').toBeDefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A4B3C1'), 'H2A4B3C1').toBeUndefined();
    expect(courseFn.findCourseByName(filteredCourseData, 'H2A4B3C2'), 'H2A4B3C2').toBeDefined();
})
