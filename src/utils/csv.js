export const COURSE_HEADER_ROW = '[TYPE];[IDENT];[CLASS];[COMBINATION];[LENGTH];[CLIMB];[START];[CTRL1]; … ;[CTRLn];[FINISH];';

export const courseToCsvRow = (relayName, courseName, length, climb, courseId, controls) => {
    return `Relay;${courseId};${relayName};${courseName};${length};${climb};`+ controls.join(';');
};

export const teamForkingNamesToCsvRowPart = (teamForking) => {
    return teamForking.map(course => course.courseName).join(';');
};
export const teamForkingIdsToCsvRowPart = (teamForking) => {
    return teamForking.map(course => course.courseId).join(';');
};
