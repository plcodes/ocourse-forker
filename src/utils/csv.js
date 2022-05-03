export const courseToCsvRow = (relayName, courseName, length, climb, courseId, controls) => {
    return `Relay;${courseId};${relayName};${courseName};${length};${climb};`+ controls.join(';');
};

export const getCoursesHeaderRow = () => {
    return '[TYPE];[IDENT];[CLASS];[COMBINATION];[LENGTH];[CLIMB];[START];[CTRL1]; … ;[CTRLn];[FINISH];';
}