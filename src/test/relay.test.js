import { assert, expect, test } from 'vitest'
import * as courseFn from '../utils/course';
import * as relayFn from '../utils/relay';

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
                controls: ['L1', 31, 'M1']
            },
            {
                legName: 'H1',
                courseId: 'H102',
                courseName: 'H1B',
                definition: ['L1','B','M1'],
                forkings: ['B'],
                controls: ['L1', 32, 'M1']
            },
            {
                legName: 'H1',
                courseId: 'H103',
                courseName: 'H1C',
                definition: ['L1','C','M1'],
                forkings: ['C'],
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
                controls: ['L1', 31, 'M1']
            },
            {
                legName: 'H2',
                courseId: 'H202',
                courseName: 'H2B',
                definition: ['L1','B','M1'],
                forkings: ['B'],
                controls: ['L1', 32, 'M1']
            },
            {
                legName: 'H2',
                courseId: 'H203',
                courseName: 'H2C',
                definition: ['L1','C','M1'],
                forkings: ['C'],
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
                controls: ['L1', 31, 'M1']
            },
            {
                legName: 'H3',
                courseId: 'H302',
                courseName: 'H3B',
                definition: ['L1','B','M1'],
                forkings: ['B'],
                controls: ['L1', 32, 'M1']
            },
            {
                legName: 'H3',
                courseId: 'H303',
                courseName: 'H3C',
                definition: ['L1','C','M1'],
                forkings: ['C'],
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
    //console.log('allForkings', allForkings);
    expect(JSON.stringify(allForkings))
        .toEqual('[["A1","A2","C1","C2"],["A1","A2","D1","D2"],["B1","B2","C1","C2"],["B1","B2","D1","D2"]]')
})

test('All forkings', () => {
    const allForkings = courseFn.cartesian(sampleForkingsForRelay);
    //console.log('allForkings', allForkings);
    expect(allForkings.length).toBe(3*3*3);
})

test('All valid forkings', () => {
    const allValid = relayFn.getAllValidCombinations(sampleCourseData);
    //console.log('valid ones', allValid);
    expect(allValid.length).toBe(6);
})