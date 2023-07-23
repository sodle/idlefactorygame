import { Buildings } from "./buildings";
import { partialItems } from "./itemNames";

const MIN_STORAGE = 10;

const storageSizes = {
    box: 100,
    "box-box": 100,
    box3: 100,
    box4: 100,
    box5: 100,
    tank: 1500,
    "adamantium-drill": 10,
    "chemical-plant": 100,
    "gas-extractor": 100,
    "miner-mk1": 5,
    "oil-pump": 100,
    "rock-crusher": 10,
    "smelter-mk1": 5,
    "smelter-mk2": 5,
    "water-evaporator": 0,
    "water-filter": 0,
    "water-pump-mk1": 0,
    assembler: 5,
    centrifuge: 5,
    constructer: 5,
    explorer: 0,
    greenhouse: 3,
    hydroponics: 3,
    manufacturer: 5,
    prospector: 0,
    lumberjack: 0,
    "lumberjack-school": 10,
} satisfies partialItems<number> & { [p in Buildings]: number };

// these items impose a limit on how much we can have.
// if the array is empty or missing, then it have an infinite amount.
const itemsCanBeStoreIn: partialItems<(keyof typeof storageSizes)[]> = {
    "": [],
    "stony-land": [],
    "wet-land": [],
    explorer: ["box4"],
    land: [],
    sand: ["box"],
    science0: ["box"],
    science1: ["box"],
    science2: ["box"],
    science3: ["box"],
    science4: ["box"],
    science5: ["box"],
    adamantium: ["box"],
    seed: ["box"],
    "rock-crusher": ["box3"],
    centrifuge: ["box3"],
    "gold-filament": ["box"],

    // raw
    gas: ["tank"],
    "iron-ore": ["box"],
    "copper-ore": ["box"],
    "uranium-ore": ["box"],
    water: ["tank"],
    oil: ["tank"],
    coal: ["box"],
    stone: ["box"],
    studonite: ["box"],
    dust: ["box"],
    // processed raw
    "iron-bar": ["box"],
    "copper-bar": ["box"],
    steel: ["box"],
    sulfur: ["box"],
    glass: ["box"],
    "copper-wire": ["box"],
    "clean-water": ["tank"],
    tree: ["box"],
    wood: ["box"],
    fertilizer: ["box"],
    nitrogen: ["tank"],
    // building materials
    gear: ["box"],
    pipe: ["box"],
    // advanced materials
    "sulfuric-acid": ["tank"],
    "basic-circuit": ["box"],
    solvent: ["tank"],
    // buildings
    "gas-extractor": ["box3"],
    manufacturer: ["box3"],
    assembler: ["box3"],
    constructer: ["box3"],
    "chemical-plant": ["box3"],
    "miner-mk1": ["box3"],
    "water-pump-mk1": ["box3"],
    "oil-pump": ["box3"],
    "smelter-mk1": ["box3"],
    "smelter-mk2": ["box3"],
    greenhouse: ["box3"],
    hydroponics: ["box3"],
    "water-filter": ["box3"],
    slag: ["box"],
    u234: ["box"],
    u235: ["box"],
    computer: ["box"],
    "adamantium-frame": ["box"],
    "adamantium-drill": ["box3"],
    "crushed-uranium": ["box"],
    aluminum: ["box"],
    bauxite: ["box"],
    "advanced-circuit": ["box"],
    plastic: ["box"],
    gold: ["box"],
    "iron-frame": ["box"],

    box: ["box-box"],
    "box-box": ["box3"],
    box3: ["box4"],
    box4: ["box5"],
    box5: ["box5"],
    tank: ["box3"],
};

export default {
    itemsCanBeStoreIn,
    storageSizes,
    MIN_STORAGE,
};
