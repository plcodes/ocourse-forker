<script>
import * as relayFn from '../utils/relay';
import * as csvFn from '../utils/csv';

export default {
    props: [
        'courseData'
    ],
    data() {
        return {
            droppedOutCourses: []
        }
    },
    computed: {
        allCourses: function() {
            // take only the courses of all legs and add them to one array
            // and then take only the course id
            return this.courseData.reduce((all,current) => [...all, ...current.courses], [])
                    .map(course => course.courseId);
                
        },
        validCombinations: function() {
            if(!this.courseData) return;
            return relayFn.getValidTeamCombinations(this.courseData)
        },
        validCombinationsWithId: function() {
            if (!this.validCombinations) return;
            return this.validCombinations.map(combination => ({
                id: combination.map(course => course.join('')).join(''),
                courses: combination.map(course => course.join('')).join(' - ')
            }))
        },
        relayData: function() {
            if(!this.courseData) return;
            return relayFn.mapRelayCoursesToContainFullData(this.validCombinations, this.courseData);
        },
        filteredRelayData: function() {
            if(!this.relayData) return;
            return this.relayData.filter(relayCombination => {
                // get the combined id's e.g. ADFBIGCEH and check if that's ruled out
                return !this.droppedOutCourses.includes(relayCombination.map(course => course.forkingId).join(''));
            })
        },
        teamData: function() {
            if(!this.filteredRelayData) return;
            return this.filteredRelayData.map(function(teamCourse, index) {
                return {
                    number: index+1,
                    name: 'Joukkue '+(index+1),
                    courses: teamCourse
                }
            })
        },
        teamCoursesArray: function() {
            if(!this.teamData) return;
            return this.createCoursesArray(this.teamData);
        },
        runnersForCourses: function() {
            if(!this.teamData) return;
            return this.createCoursesAmounts(this.teamData);
        }

    },
    methods: {
        createCoursesArray: function(teamData) {
            let teams = [];
            for(const team of teamData) {
                let teamArr = [];
                teamArr.push(team.number); 
                teamArr.push(team.name);
                teamArr.push(...team.courses.map(course => course.courseName));
                teamArr.push(...team.courses.map(course => course.courseId));
                let forkingsStr = team.courses.flatMap(course => course.forkings).join('');
                teamArr.push(forkingsStr);
                teamArr.push(forkingsStr.split('').sort().join('')); // sort alphabetically
                
                teams.push(teamArr); 
            }
            return teams;
        },
        createCoursesAmounts: function(teamData) {
            let runnersForCourses = new Map();
            for(const team of teamData) {
                for(const [index,course] of team.courses.entries()) {
                    let amount = runnersForCourses.get(course.courseId) || [];
                    amount.push({team: team.number, leg: index+1});
                    runnersForCourses.set(course.courseId, amount)
                }
            }
            return new Map([...runnersForCourses.entries()].sort());
        },
        toNamesCsv: function (teamForking) {
            return csvFn.teamForkingNamesToCsvRowPart(teamForking);
        },
        toIdsCsv: function (teamForking) {
            return csvFn.teamForkingIdsToCsvRowPart(teamForking);
        },
        getRunnersAmountForCourse: function (courseName) {
            if(!this.runnersForCourses) return;
            const value = this.runnersForCourses.get(courseName);
            return value ? value.length : 0;
        }
    }
}
</script>

<template>
    <h2>Relay</h2>
    <template v-if="relayData">
        <div>
            <div v-for="(combination, index) in validCombinationsWithId" :key="combination.id">
                {{index +1}}
                <input type="checkbox" v-model="droppedOutCourses" :value="combination.id" :id="combination.id">
                <label :for="combination.id"><code>{{combination.courses}}</code></label>
            </div>
        </div>
        <br>
        <div>
            <code v-for="team in teamCoursesArray">
                {{team.join(';')}}
            <br>
            </code>
        </div>
        <br>
        <div>
            <div v-for="course in allCourses">
                {{course}}: {{getRunnersAmountForCourse(course)}}
            </div>
        </div>
    </template>
</template>
