var emptyCharacter = {
    name: "",
    background: "",
    class: "",
    partial: "",
    xp: 0,
    hp: 0,
    hpMax: 0,
    credits: 0,
    attackBonus: 0,
    customEquipment: {
        name: "",
        description: ""
    },
    effort: {
        current: 0,
        max: 0
    },
    settings: {
        usePsionics: false,
        showTitles: true,
        showSteps: false,
        showDetails: false,
        useManual: false,
        showBreakdown: false,
        compactButtons: false
    },
    manual: {
        ac: 10,
        speed: 10,
        savingThrows: {
            physical: 15,
            evasion: 15,
            mental: 15
        }
    },
    attributes: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
    },
    skills: {
        administer: { trained: false, lvl: 0 },
        connect: { trained: false, lvl: 0 },
        exert: { trained: false, lvl: 0 },
        fix: { trained: false, lvl: 0 },
        heal: { trained: false, lvl: 0 },
        know: { trained: false, lvl: 0 },
        lead: { trained: false, lvl: 0 },
        notice: { trained: false, lvl: 0 },
        perform: { trained: false, lvl: 0 },
        pilot: { trained: false, lvl: 0 },
        program: { trained: false, lvl: 0 },
        punch: { trained: false, lvl: 0 },
        shoot: { trained: false, lvl: 0 },
        sneak: { trained: false, lvl: 0 },
        stab: { trained: false, lvl: 0 },
        survive: { trained: false, lvl: 0 },
        talk: { trained: false, lvl: 0 },
        trade: { trained: false, lvl: 0 },
        work: { trained: false, lvl: 0 }
    },
    foci: [],
    equipment: [],
    psionics: [],
    containers: []
}

export default emptyCharacter;