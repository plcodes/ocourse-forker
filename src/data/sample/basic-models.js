export const Motala = {
    name: 'Motala',
    relayClass: 'H',
    legCount: 3,
    legs: [
        {
            name: 'H',
            displayName: 'Motala H',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                100, 'V1', 'M1'
            ]
        },
        {
            name: 'H',
            displayName: 'Motala H',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                100, 'V1', 'M1'
            ]
        },
        {
            name: 'H',
            displayName: 'Motala H',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                100, 'V1', 'M1'
            ]
        },
    ],
    forkingRules: [],
}

export const MotalaWithLegs = {
    name: 'Motala osuusputkilla',
    relayClass: 'H',
    legCount: 3,
    legs: [
        {
            name: 'H1',
            displayName: 'Motala H 1. osuus',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                34,35,
                100, 'V1', 'M1'
            ]
        },
        {
            name: 'H2',
            displayName: 'Motala H 2. osuus',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                34,36,37,
                100, 'V1', 'M1'
            ]
        },
        {
            name: 'H3',
            displayName: 'Motala H 3. osuus',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                34,38,39,40,
                100, 'V1', 'M1'
            ]
        },
    ]
}

export const Vannes = {
    name: 'Vännes',
    relayClass: 'H',
    legCount: 3,
    legs: [
        {
            name: 'H',
            displayName: 'Vännes H',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                34,
                {D: [35], E: [36],F: [37]},
                100, 'V1', 'M1'
            ]
        },
        {
            name: 'H',
            displayName: 'Vännes H',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                34,
                {D: [35], E: [36],F: [37]},
                100, 'V1', 'M1'
            ]
        },
        {
            name: 'H',
            displayName: 'Vännes H',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                34,
                {D: [35], E: [36],F: [37]},
                100, 'V1', 'M1'
            ]
        },
    ],
    forkingRules: [],
}

export const VannesWithLegs = {
    name: 'Vännes osuusputkilla',
    relayClass: 'H',
    legCount: 3,
    legs: [
        {
            name: 'H1',
            displayName: 'Vännes H 1. osuus',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                34,
                {D: [35], E: [36],F: [37]},
                100, 'V1', 'M1'
            ]
        },
        {
            name: 'H2',
            displayName: 'Vännes H 2. osuus',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                34,35,36,
                {D: [35], E: [36],F: [37]},
                100, 'V1', 'M1'
            ]
        },
        {
            name: 'H3',
            displayName: 'Vännes H 3. osuus',
            course: [
                'L1',
                {A: [31], B: [32],C: [33]},
                34,37,38,39,
                {D: [35], E: [36],F: [37]},
                100, 'V1', 'M1'
            ]
        },
    ],
    forkingRules: [],
}

export const Farsta = {
    name: 'Farsta',
    relayClass: 'H',
    legCount: 2,
    legs: [
        {
            name: 'H1',
            displayName: 'Farsta H 1. osuus',
            course: [
                'L1',
                {A: [31], B: [32]},
                33,
                {C: [34], D: [35]},
                36,
                {E: [37], F: [38]},
                39,
                {G: [40], H: [41]},
                42,
                100, 'V1', 'M1'
            ]
        },
        {
            name: 'H2',
            displayName: 'Farsta H 2. osuus',
            course: [
                'L1',
                {A: [31], B: [32]},
                33,
                {C: [34], D: [35]},
                36,
                {E: [37], F: [38]},
                39,
                {G: [40], H: [41]},
                42,
                100, 'V1', 'M1'
            ]
        },
    ],
    forkingRules: [
        {
            leg: '',
            if: 'A',
            then: ['E'] 
        },
        {
            leg: '',
            if: 'B',
            then: ['F'] 
        },
        {
            leg: '',
            if: 'C',
            then: ['G'] 
        },
        {
            leg: '',
            if: 'D',
            then: ['H'] 
        },
    ],
}
