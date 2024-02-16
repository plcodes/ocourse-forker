export const jukola2019 = {
    name: 'Jukolan viesti 2019',
    relayClass: 'J',
    legCount: 7,
    legs: [
        {
            name: 'J1',
            displayName: 'J 1. osuus',
            course: [
                'V2', 'L2',
                {A: [164, 53], B: [31, 32], C: [95, 165]},
                33, 46,
                {D: 101, E: 34},
                140, 'V6',
                {F: 35, G: 82},
                54,
                {H: 128, I: 157},
                141, 37,
                {F1: 55, G1: 173},
                64, 'V5',
                129,
                {H1: [168, 71, 159], I1: [72, 71, 118]},
                39,
                103,
                47, 113, 'V9',
                333, 'V10', 'M1'
            ]
        },
        {
            name: 'J2',
            displayName: 'J 2. osuus',
            course: [
                'V4', 'L2',
                {A: [164, 53], B: [31, 32], C: [95, 165]},
                33, 46,
                152,
                140, 'V6',
                {F: 35, G: 82},
                54,
                {H: 128, I: 157},
                141, 37,
                {F1: 55, G1: 173},
                64, 'V5',
                129,
                69, 88, 146,
                103,
                {J: [104, 135], K: [67, 83]},
                162, 'V8',
                741, 'V10', 'M1'
            ]
        },
        {
            name: 'J3',
            displayName: 'J 3. osuus',
            course: [
                'V4', 'L2',
                {A: [164, 53], B: [31, 32], C: [95, 165]},
                33, 46,
                {D: 101, E: 34},
                140, 'V6',
                117, 77, 114, 94, 111, 62,
                64, 'V5',
                56,
                129,
                {H1: [168, 71, 159], I1: [72, 71, 118]},
                39,
                103,
                {J: [104, 135], K: [67, 83]},
                162, 'V8',
                333, 'V10', 'M1'
            ]
        },
        {
            name: 'J4',
            displayName: 'J 4. osuus',
            course: [
                'V4', 'L2',
                {L: [85, 139], M: [40, 105]},
                154,
                {N: 80, O: 156},
                75, 91,
                {P: 153, Q: 44},
                93, 'V7',
                115, 116, 108,
                65,
                {Lx: [166, 84, 151], Mx: [150, 169, 74]},
                103,
                107, 162, 'V8',
                741, 'V10', 'M1'
            ]
        },
        {
            name: 'J5',
            displayName: 'J 5. osuus',
            course: [
                'V4', 'L2',
                {L: [85, 139], M: [40, 105]},
                154,
                {N: 80, O: 156},
                75, 91,
                {P: 153, Q: 44},
                93, 'V7',
                163, 133, 81,
                65,
                {Lx: [166, 84, 151], Mx: [150, 169, 74]},
                103,
                158, 96, 162, 'V8',
                333, 'V10', 'M1'
            ]
        },
        {
            name: 'J6',
            displayName: 'J 6. osuus',
            course: [
                'V4', 'L2',
                {R: [137, 112], S: [63, 38]},
                94,
                {T: [172, 76], U: [48, 149]},
                36,
                92,
                131,
                {V: 148, X: 109},
                119, 91,
                {Y: 110, Z: 143},
                93, 'V7',
                147, 52,
                65,
                {R1: [160, 167], S1: [90, 145]},
                134,
                130,
                100, 162, 'V8',
                741, 'V10', 'M1'
            ]
        },
        {
            name: 'J7',
            displayName: 'J 7. osuus',
            course: [
                'V4', 'L2',
                {R: [137, 112], S: [63, 38]},
                94,
                {T: [172, 76], U: [48, 149]},
                36,
                155,
                131,
                {V: 148, X: 109},
                119, 91,
                {Y: 110, Z: 143},
                93, 'V7',
                78, 46, 49, 123, 39, 52,
                65,
                {R1: [160, 167], S1: [90, 145]},
                134,
                174,
                130,
                61, 113, 'V9',
                333, 'V10', 'M1'
            ]
        }
    ],
    forkingRules: [
        {
            leg: 'J1',
            if: 'F',
            then: ['F1']
        },
        {
            leg: 'J1',
            if: 'G',
            then: ['G1']
        },
        {
            leg: 'J1',
            if: 'H',
            then: ['H1']
        },
        {
            leg: 'J1',
            if: 'I',
            then: ['I1']
        },
        {
            leg: 'J2',
            if: 'F',
            then: ['F1']
        },
        {
            leg: 'J2',
            if: 'G',
            then: ['G1']
        },
        {
            leg: 'J3',
            if: 'H',
            then: ['H1']
        },
        {
            leg: 'J3',
            if: 'I',
            then: ['I1']
        },
        {
            leg: 'J4',
            if: 'L',
            then: ['Lx']
        },
        {
            leg: 'J4',
            if: 'M',
            then: ['Mx']
        },
        {
            leg: 'J5',
            if: 'L',
            then: ['Lx']
        },
        {
            leg: 'J5',
            if: 'M',
            then: ['Mx']
        },
        {
            leg: 'J6',
            if: 'R',
            then: ['R1']
        },
        {
            leg: 'J6',
            if: 'S',
            then: ['S1']
        },
        {
            leg: 'J7',
            if: 'R',
            then: ['R1']
        },
        {
            leg: 'J7',
            if: 'S',
            then: ['S1']
        }
    ]
}
