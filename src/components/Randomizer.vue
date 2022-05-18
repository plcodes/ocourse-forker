<script>
const shuffleArray = array => {
    return array.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
}

export default {
    props: [
        'relayData',
        'allCourses'
    ],
    data() {
        return {
            randomRelayData: undefined
        }
    },
    computed: {
        sufficientAmountOfTeams: function() {
            if(!this.randomRelayData) return;
            const amount = 100,
                loops = Math.ceil(amount/this.randomRelayData.length);
            return Array(loops).fill(this.randomRelayData).flat().slice(0,amount);
            
        },
        teamData: function() {
            if(!this.sufficientAmountOfTeams) return;
            return this.sufficientAmountOfTeams.map(function(teamCourse, index) {
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
        randomizeCourses: function() {
            this.randomRelayData = shuffleArray(this.relayData);
        },
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
        getRunnersAmountForCourse: function (courseName) {
            if(!this.runnersForCourses) return;
            const value = this.runnersForCourses.get(courseName);
            return value ? value.length : 0;
        }
    }
}
</script>

<template>
    <h2>Random</h2>
    <button type="button" v-on:click="randomizeCourses">Randomize</button><br>
    <template v-if="randomRelayData">
        <div>
            <code v-for="team in teamCoursesArray">
                {{team.join(';')}}
            <br>
            </code>
        </div>
        <br>

        <h3>Personalization</h3>
        <h4>Amounts</h4>
        <div>
            <code v-for="course in allCourses">
                {{course}}: {{getRunnersAmountForCourse(course)}}
                <br>
            </code>
        </div>

        <div v-for="[key, value] in runnersForCourses">
            <h4>{{key}}</h4>
            <code v-for="team in value" style="display:block">
                {{team.team}};{{team.leg}}
            </code>
            <br>
        </div>
    </template>
</template>
