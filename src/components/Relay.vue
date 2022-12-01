<script>
import Randomizer from './Randomizer.vue'
import CodeBlock from './CodeBlock.vue'
import * as relayFn from '../utils/relay';
import * as csvFn from '../utils/csv';

export default {
    components: {
        Randomizer,
        CodeBlock
    },
    props: [
        'courseData'
    ],
    data() {
        return {
            droppedOutCourses: [],
            randomCombinationsAmount: undefined
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
        },
        pickRandomCombinations: function() {
            this.droppedOutCourses = [];
            if(this.randomCombinationsAmount && this.randomCombinationsAmount < this.relayData.length) {
                const combinationsToDrop = this.relayData.length - this.randomCombinationsAmount;
                let copiedArray = this.relayData.slice(0);
                for(let i=0; i<combinationsToDrop; i++) {
                    copiedArray = relayFn.shuffleArray(copiedArray);
                    const removed = copiedArray.shift();
                    const removedKey = removed.map(course => course.forkingId).join('');
                    this.droppedOutCourses.push(removedKey);
                }
            }
        }
    }
}
</script>

<template>
    <h2>{{ $t('Relay.title') }}</h2>
    <template v-if="courseData.length">
        <template v-if="relayData">
            <h3>{{ $t('Relay.skip-selection') }}</h3>
            <div>
                <div v-for="(combination, index) in validCombinationsWithId" :key="combination.id">
                    {{index +1}}
                    <input type="checkbox" v-model="droppedOutCourses" :value="combination.id" :id="combination.id">
                    <label :for="combination.id"><code>{{combination.courses}}</code></label>
                </div>
            </div>
            {{ $t('Relay.skip-random-amount') }}
            <input type="number" v-model="randomCombinationsAmount">&nbsp;
            <button class="btn" v-on:click="pickRandomCombinations" type="button">{{ $t('Relay.skip-random-cta') }}</button>


            <h3>{{ $t('Relay.team-combinations') }}</h3>
            <CodeBlock>
                <template v-for="team in teamCoursesArray">
                    {{team.join(';')}}
                    <br>
                </template>
            </CodeBlock>


            <h3>{{ $t('Relay.allcourses-amounts') }}</h3>
            <CodeBlock>
                <template v-for="course in allCourses">
                    {{course}}: {{getRunnersAmountForCourse(course)}}
                    <br>
                </template>
            </CodeBlock>

        </template>

    </template>
    <template v-else>
        <p>{{ $t('Relay.no-courses') }}</p>
    </template>
    <section id="randomize">
        <Randomizer :relayData="filteredRelayData" :allCourses="allCourses"/>
    </section>
</template>

<style scoped>
label code {
    display: inline-block;
    border: none;
    padding: 3px 10px;
}
</style>