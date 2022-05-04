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

test('Course as csv', () => {
    const courseData = courseFn.getFullCourseDataFromLeg(sampleLeg),
        course1 = courseFn.findCourseByName(courseData, 'H1A1B1'),
        course2 = courseFn.findCourseByName(courseData, 'H1A2B2');
    expect(csvFn.courseToCsvRow('relayName', 'courseName', 'length', 'climb', 'H1A1B1', course1.controls))
        .toEqual('Relay;H1A1B1;relayName;courseName;length;climb;L1;31;32;72;73;35;75;M')
    expect(csvFn.courseToCsvRow('relayName', 'courseName', 'length', 'climb', 'H1A2B2', course2.controls))
        .toEqual('Relay;H1A2B2;relayName;courseName;length;climb;L1;33;34;72;73;36;75;M')
})
