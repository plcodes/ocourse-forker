<script>
import stringify from "json-stringify-pretty-compact";
import CodeBlock from './CodeBlock.vue';
import PrintArea from './PrintArea.vue';
import * as randomFn from '../utils/random';


export default {
    components: {
        CodeBlock,
        PrintArea
    },
    props: [
        'relayData',
        'allCourses',
        'randomRules'
    ],
    data() {
        return {            
            randomRelayData: undefined,
            teamcount: 50,
            inputtedRandomData: undefined,
            inputError: false, 
            randomWasSuccessful: false,
            randomTries: 0                  
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
            if(this.randomRules) {
                const status = randomFn.shuffleUntilRulesMet(this.relayData, this.randomRules);
                this.randomRelayData = status.data;
                this.randomWasSuccessful = status.success;
                this.randomTries = status.loops;
            } else {
                this.randomRelayData = randomFn.shuffleArray(this.relayData);
            }

        },
        copyPrevious: function() {
            this.inputError = false;
            try {
                this.randomRelayData = JSON.parse(this.inputtedRandomData);
            } catch (e) {
                this.inputError = true;
            }
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
        },
        prettyPrint: function(json) {
            return stringify(json, {});
        }
    }
}
</script>

<template>
    <h2>{{ $t('Randomizer.title') }}</h2>
    <p v-if="!relayData.length">{{ $t('Randomizer.no-data') }}</p>

    <template v-if="relayData.length || (randomRelayData && randomRelayData.length)">
        <p>{{ $t('Randomizer.amount') }} <input type="number" v-model="teamcount"></p>
        <button type="button" class="btn" v-on:click="randomizeCourses">{{ $t('Randomizer.cta') }}</button><br>
        <template v-if="randomRules && randomRelayData">
            <p v-if="randomWasSuccessful">{{ $t('Randomizer.randomizer-status-ok') }}</p>
            <p v-else>{{ $t('Randomizer.randomizer-status-fail', {'count': randomTries}) }}</p>
        </template>
        <template v-if="randomRelayData">
            <h2>{{ $t('Randomizer.data', {'teams': this.teamcount}) }}</h2>
            <CodeBlock :helptext="$t('Randomizer.explanation-data')">
                Numero;Joukkue;1.os koodi;2.os koodi;3.os koodi;1.os nimi;2.os nimi;3.os nimi;Hajontajärjestys;Tarkistus
                <br>
                <template v-for="team in teamCoursesArray">
                    {{team.join(';')}}
                    <br>
                </template>
            </CodeBlock>

            <h2>{{ $t('Randomizer.personalization') }}</h2>
            <h3>{{ $t('Randomizer.courses', {'teams': this.teamcount}) }}</h3>
            <CodeBlock>
                <template v-for="course in allCourses">
                    {{course}}: {{getRunnersAmountForCourse(course)}}
                    <br>
                </template>
            </CodeBlock>

            <h3>{{ $t('Randomizer.course-personalizations') }}</h3>
            <div v-for="[key, value] in runnersForCourses">
                <h4>{{key}}</h4>
                <CodeBlock>
                    <template v-for="team in value">
                        {{team.team}};{{team.leg}}
                        <br>
                    </template>
                </CodeBlock>
                <PrintArea :name="key">
                    <template v-for="team in value">
                        <div class="printpage">
                            <h1>{{team.team}}</h1>
                            <h2>{{team.leg}}. <span class="leg">{{ $t('Print.leg') }}</span></h2>
                        </div>
                    </template>
                </PrintArea>
            </div>
        </template>
    </template>

    <section>
        <h2>{{ $t('Randomizer.previous') }}</h2>
        <CodeBlock css-class="small" :helptext="$t('Randomizer.previous-export-explanation')">
            <pre>{{prettyPrint(randomRelayData)}}</pre>
        </CodeBlock>
        <h3>{{ $t('Randomizer.previous-import') }}</h3>
        <div class="with-explanation">
            <div class="main-area">
                <textarea class="small" v-model="inputtedRandomData"></textarea>
                <p v-if="inputError">
                    {{ $t('Randomizer.import-error') }}
                </p>
                <button type="button" class="btn" v-on:click="copyPrevious">{{ $t('Randomizer.previous-cta') }}</button><br>
            </div>
            <div class="help-area">
                <p class="help-text">
                    {{ $t('Randomizer.previous-import-explanation') }}
                </p>
            </div>
        </div>
    </section>
</template>
