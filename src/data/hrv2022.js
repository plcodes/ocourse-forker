export const hrv2022_H = {
    name: 'Hämeen Rastiviesti 2022',
    relayClass: 'H',
    legCount: 3,
    legs: [
        {
            name: 'H1',
            displayName: 'H 1. osuus',
            course: [
                'V1', 'L1',
                {A: [81,76], B: [70,80],C: [75,77]},
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
            displayName: 'H 2. osuus',
            course: [
                'V1', 'L1',
                {A: [81,76], B: [70,80],C: [75,77]},
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
            displayName: 'H 3. osuus',
            course: [
                'V1', 'L1',
                {A: [81,76], B: [70,80],C: [75,77]},
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
        {
            leg: 'H3',
            if: 'H',
            not: ['B']
        },
        {
            leg: 'H3',
            if: 'I',
            then: ['B']
        },
        {
            leg: 'H2',
            if: 'B',
            not: ['H']
        },

    ],
}

export const hrv2022_D = {
    name: 'Hämeen Rastiviesti 2022',
    relayClass: 'D',
    legCount: 3,
    legs: [
        {
            name: 'D1',
            displayName: 'D 1. osuus',
            course: [
                'V1', 'L1',
                {L: [82,79], M: [76,83], N: [76,80]},
                74,
                {O: 32, P: 55, Q: 33},
                72,
                {R: [34,42], S: [41,56]},
                61, 73,
                50,
                49,
                {T: 52, U: 36},
                100, 'V2', 'M1'
            ]
        },
        {
            name: 'D2',
            displayName: 'D 2. osuus',
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
            displayName: 'D 3. osuus',
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
    forkingRules: [
        {
            leg: '',
            if: 'R',
            then: ['N'] 
        },
        {
            leg: '',
            if: 'S',
            not: ['N'] 
        },
        {
            leg: 'D2',
            if: 'N',
            then: ['XXX'] 
        },
        {
            leg: '',
            if: 'T',
            not: ['P'] 
        },
        {
            leg: '',
            if: 'U',
            then: ['P'] 
        },
        {
            leg: 'D3',
            if: 'P',
            then: ['XXX'] 
        },
    ],
}