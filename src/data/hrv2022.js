export const hrv2022_H = {
    name: 'Hämeen Rastiviesti 2022',
    relayClass: 'H',
    legCount: 3,
    legs: [
        {
            name: 'H1',
            course: [
                'V1', 'L1',
                {A: [81,76], B: [70,82],C: [75,77]},
                71,
                {D: [53,43,32], E: [38,39,55]},
                72,
                34, 44,
                73, 47,
                {F: [50,36], G: [31,58]},
                100, 'V2', 'M1'
            ]
        },
        {
            name: 'H2',
            course: [
                'V1', 'L1',
                {A: [81,76], B: [70,82],C: [75,77]},
                71,
                37, 60,
                {H: 40, I: 35}, 
                48, 
                73, 47,
                {F: [50,36], G: [31,58]},
                100, 'V2', 'M1'
            ]
        },
        {
            name: 'H3',
            course: [
                'V1', 'L1',
                {A: [81,76], B: [70,82],C: [75,77]},
                71,
                {D: [53,43,32], E: [38,39,55]},
                72,
                41, 60,
                {H: 40, I: 35}, 
                48,
                73, 47,
                46, 51, 54, 84,
                100, 'V2', 'M1'
            ]
        },
    ],
    forkingRules: [
        /*
        {
            leg: 'H1',
            if: 'A',
            then: ['G']
        },
        {
            leg: 'H1',
            if: 'B',
            then: ['F']
        },
        {
            leg: 'H1',
            if: 'C',
            then: ['G']
        },
        /*{
            leg: 'H2',
            if: 'A',
            then: ['F']
        },
        {
            leg: 'H2',
            if: 'B',
            then: ['G']
        },
        {
            leg: 'H2',
            if: 'C',
            then: ['F']
        },*/
        {
            leg: 'H3',
            if: 'A',
            then: ['H']
        },
        {
            leg: 'H3',
            if: 'B',
            then: ['I']
        },
        {
            leg: 'H3',
            if: 'C',
            then: ['H']
        },

    ]
}

export const hrv2022_D = {
    name: 'Hämeen Rastiviesti 2022',
    relayClass: 'D',
    legCount: 3,
    legs: [
        {
            name: 'D1',
            course: [
                'V1', 'L1',
                {L: [82,79], M: [76,83], N: [76,80]},
                74,
                {O: 32, P: 55, Q: 33},
                72,
                {R: [34,42], S: [41,56]},
                61, 73,
                57,
                49,
                {T: 52, U: 36},
                100, 'V2', 'M1'
            ]
        },
        {
            name: 'D2',
            course: [
                'V1', 'L1',
                {L: [82,79], M: [76,83], N: [76,80]},
                74,
                {O: 32, P: 55, Q: 33},
                72,
                41, 60,
                49,
                {T: 52, U: 36},
                100, 'V2', 'M1'
            ]
        },
        {
            name: 'D3',
            course: [
                'V1', 'L1',
                {L: [82,79], M: [76,83], N: [76,80]},
                74,
                {O: 32, P: 55, Q: 33},
                72,
                {R: [34,42], S: [41,56]},
                61, 73,
                46, 59, 54, 84,
                100, 'V2', 'M1'
            ]
        },
    ],
    forkingRulesZZ: [
        {
            leg: 'D1',
            if: 'L',
            then: ['R']
        },
        {
            leg: 'D1',
            if: 'M',
            then: ['R']
        },
        {
            leg: 'D1',
            if: 'N',
            then: ['S']
        },
        {
            leg: 'D1',
            if: 'O',
            then: ['U']
        },
        {
            leg: 'D1',
            if: 'P',
            then: ['T']
        },
        {
            leg: 'D1',
            if: 'Q',
            then: ['T']
        },/*
        {
            leg: 'D2',
            if: 'M',
            not: ['T']
        },
        */
        {
            leg: 'D3',
            if: 'L',
            then: ['R']
        },
        {
            leg: 'D3',
            if: 'M',
            then: ['S']
        },
        {
            leg: 'D3',
            if: 'N',
            then: ['R']
        },
    ]
}