<script>
import * as relayFn from '../utils/relay';
import * as csvFn from '../utils/csv';

export default {
    props: [
        'courseData'
    ],
    data() {
        return {
            validCombinations: undefined,
            relayData: undefined,
            teamData: undefined
        }
    },
    computed: {
    },
    methods: {
        createRelayCourses: function() {
            this.validCombinations = relayFn.getValidTeamCombinations(this.courseData);
            this.relayData = relayFn.mapRelayCoursesToContainFullData(this.validCombinations, this.courseData);
            this.teamData = this.relayData.map(function(teamCourse, index) {
                return {
                    number: index+1,
                    name: 'Joukkue '+(index+1),
                    courses: teamCourse
                }
            })
        },
        toNamesCsv: function (teamForking) {
            return csvFn.teamForkingNamesToCsvRowPart(teamForking);
        },
        toIdsCsv: function (teamForking) {
            return csvFn.teamForkingIdsToCsvRowPart(teamForking);
        },
    }
}
</script>

<template>
  <h2>Relay</h2>
  <button type="button" v-on:click="createRelayCourses">Create relay courses</button>
  <br>
  <code v-if="relayData">
    <template v-for="(team, index) in teamData">
        {{team.number}};{{team.name}};{{toNamesCsv(team.courses)}};{{toIdsCsv(team.courses)}};<br>
    </template>
  </code>
</template>
