<script>
//import * as viestiliiga from '../data/viestiliiga_H';

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
            randomRelayData: undefined,
            teamcount: 50
        }
    },
    computed: {
        sufficientAmountOfTeams: function() {
            if(!this.randomRelayData) return;
            const loops = Math.ceil(this.teamcount/this.randomRelayData.length);
            return Array(loops).fill(this.randomRelayData).flat().slice(0,this.teamcount);
            
        },
        teamData: function() {
            if(!this.sufficientAmountOfTeams) return;
            return this.sufficientAmountOfTeams.map(function(teamCourse, index) {
                return {
                    number: index+1,
                    // number: 100 + index+1,
                    //name: viestiliiga.teams[index] || 'Joukkue '+(index+1),
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
    <br>
    Amount of teams: <input type="number" v-model="teamcount">
    <br>
    <button type="button" class="btn" v-on:click="randomizeCourses">Randomize</button><br>
    <template v-if="randomRelayData">
        <h2>Randomized data for {{this.teamcount}} teams</h2>
        <code>
            Numero;Joukkue;1.os koodi;2.os koodi;3.os koodi;1.os nimi;2.os nimi;3.os nimi;Hajontajärjestys;Tarkistus
            <br>
            <template v-for="team in teamCoursesArray">
                {{team.join(';')}}
                <br>
            </template>
        </code>

        <h2>Personalization</h2>
        <h3>Course amounts for {{this.teamcount}} teams</h3>
        <code>
            <template v-for="course in allCourses">
                {{course}}: {{getRunnersAmountForCourse(course)}}
                <br>
            </template>
        </code>

        <h3>Course personalizations (team;leg)</h3>
        <div v-for="[key, value] in runnersForCourses">
            <h4>{{key}}</h4>
            <code>
                <template v-for="team in value">
                    {{team.team}};{{team.leg}}
                    <br>
                </template>
            </code>
        </div>
    </template>
</template>
