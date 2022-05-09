export const venla2019 = {
    name: 'Venlojen viesti 2019',
    relayClass: 'Venla',
    legCount: 4,
    legs: [
        {
            name: 'V1',
            course: [
                'V1', 'L1',
                {A1: [50, 60], B1: [97, 41], B2: [42, 58], A2: [138, 102]},
                37,
                {C: 119, D: 51},
                64, 'V5',
                129, 73,
                130,
                {E: 170, F: 83, G: 135},
                162, 'V8',
                333, 'V10', 'M1'
            ]
        },
        {
            name: 'V2',
            course: [
                'V3', 'L1',
                {A1: [50, 60], B1: [97, 41], B2: [42, 58], A2: [138, 102]},
                37,
                {C: 119, D: 51},
                64, 'V5',
                129, 176, 132,
                130,
                {E: 170, F: 83, G: 135},
                162, 'V8',
                741, 'V10', 'M1'
            ]
        },
        {
            name: 'V3',
            course: [
                'V3', 'L1',
                {A1: [50, 60], B1: [97, 41], B2: [42, 58], A2: [138, 102]},
                37,
                {H: 125, I: 171},
                54, 91,
                64, 'V5',
                45, 52,
                136,
                {A: [106, 43, 87], B: [79, 43, 59]},
                103,
                130,
                {E: 170, F: 83, G: 135},
                162, 'V8',
                741, 'V10', 'M1'
            ]
        },
        {
            name: 'V4',
            course: [
                'V3', 'L1',
                {A1: [50, 60], B1: [97, 41], B2: [42, 58], A2: [138, 102]},
                37,
                {H: 125, I: 171},
                54, 91,
                64, 'V5',
                142, 46, 175,
                136,
                {A: [106, 43, 87], B: [79, 43, 59]},
                103,
                96, 113, 'V9',
                333, 'V10', 'M1'
            ]
        }
    ],
    forkingRules: [
        {
            leg: 'V3',
            if: 'A',
            not: ['B1','B2']
        },
        {
            leg: 'V3',
            if: 'B',
            not: ['A1','A2']
        },
        {
            leg: 'V4',
            if: 'A',
            not: ['B1','B2']
        },
        {
            leg: 'V4',
            if: 'B',
            not: ['A1','A2']
        },
    ]
}

