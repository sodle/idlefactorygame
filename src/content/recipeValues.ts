import { Items, itemsMap, partialItems } from "./itemNames";

export type Recipe = {
    [p in Items]?: number;
};

export type Recipes = {
    [p in Items]: Recipe;
};

// do not add zero
type allowedRecipeTimes =
    | 0.5
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 8
    | 10
    | 12
    | 15
    | 20
    | 25
    | 30
    | 45
    | 50
    | 60
    | 75
    | 100;

const timePerRecipe: itemsMap<allowedRecipeTimes> = {
    "": 1,

    begin: 1,

    prospector: 1,
    lumberjack: 1,
    "lumberjack-school": 1,
    electricity: 1,
    food: 10,
    "wet-land": 1,
    "coal-node": 10,
    "copper-node": 10,
    "iron-node": 10,
    "gold-node": 10,
    "oil-node": 10,
    "sandy-land": 10,
    "stony-land": 10,
    "bauxite-node": 10,
    "studonite-node": 10,
    "uranium-node": 10,
    wood: 2,
    "research-metal": 1,
    "research-woodcutting": 1,

    "coal-power": 10,

    "boost-lumberjack": 10,
    "boost-miner-mk1": 10,
    "boost-chemical-plant": 10,
    "boost-adamantium-drill": 10,
    "boost-gas-extractor": 10,
    "boost-lumberjack-school": 10,
    "boost-oil-pump": 10,
    "boost-rock-crusher": 10,
    "boost-smelter-mk1": 10,
    "boost-smelter-mk2": 10,
    "boost-assembler": 10,
    "boost-water-pump": 10,
    "boost-centrifuge": 10,
    "boost-explorer": 10,
    "boost-greenhouse": 10,
    "boost-manufacturer": 10,
    "boost-constructor": 10,

    //region : science 0 -----------------------------------------------------------------
    //                           ___
    //                          / _ \
    //                         | | | |
    //                         | | | |
    //                         | |_| |
    //                          \___/
    // raw
    "iron-ore": 1,
    "copper-ore": 1,
    coal: 1,
    stone: 1,
    sand: 1,

    // processed
    "copper-bar": 2,
    "iron-bar": 2,
    glass: 1,

    // materials
    gear: 0.5,
    pipe: 0.5,
    "small-battery": 1,

    // research
    "research-science-1": 1,
    "research-frames": 1,
    "research-box": 1,
    "research-small-battery": 1,

    // science
    science0: 1,

    // buildings
    "smelter-mk1": 10,

    // containers
    box: 2,

    //endregion : science 0 -----------------------------------------------------------------

    //region : science 1 -----------------------------------------------------------------
    //                          __
    //                         /_ |
    //                          | |
    //                          | |
    //                          | |
    //                          |_|

    // processed
    steel: 2,
    "iron-frame": 2,
    "copper-wire": 0.5,

    // research
    "research-constructor": 1,
    "research-miner-mk1": 1,
    "research-wire": 1,
    "research-box2": 1,
    "research-box3": 1,
    "research-box4": 1,
    "research-box5": 1,
    "research-mass-click": 1,
    "research-steel": 1,
    "research-science-2": 1,

    // science
    science1: 1,

    // containers
    "box-box": 2,
    box3: 2,
    box4: 2,
    box5: 2,

    // buildings
    constructer: 10,
    "smelter-mk2": 15,
    "wind-turbine": 10,

    //endregion : science 1 -----------------------------------------------------------------

    //region : science 2 -----------------------------------------------------------------
    //                          ___
    //                         |__ \
    //                            ) |
    //                           / /
    //                          / /_
    //                         |____|

    // raw
    "water-pump-mk1": 15,
    "miner-mk1": 10,
    water: 1,
    nitrogen: 1,
    gold: 10,
    oil: 1,

    // processed
    "basic-circuit": 1,
    "clean-water": 1,

    fertilizer: 1,
    seed: 1,
    tree: 10,

    plastic: 2,

    // science
    science2: 2,

    // research
    "research-assembler": 1,
    "research-nitrogen": 1,
    "research-fluids": 1,
    "research-arbol": 1,
    "research-basic-circuit": 1,
    "research-oil": 1,
    "research-science-3": 1,

    // buildings
    "oil-pump": 15,
    assembler: 15,
    "gas-extractor": 30,
    greenhouse: 10,
    "water-filter": 10,
    "water-evaporator": 10,

    "evaporate-water": 1,

    // containers
    tank: 10,

    //endregion : science 2 -----------------------------------------------------------------

    //region : science 3 -----------------------------------------------------------------
    //                              ____
    //                             |___ \
    //                               __) |
    //                              |__ <
    //                              ___) |
    //                             |____/

    //raw
    gas: 3,

    // processed
    "sulfuric-acid": 5,
    sulfur: 3,
    "gold-filament": 3,

    // materials
    "advanced-circuit": 1,

    // buildings
    manufacturer: 25,
    "chemical-plant": 15,
    explorer: 20,

    // science
    science3: 3,

    // research
    "research-advanced-circuitry": 1,
    "research-natural-gas": 1,
    "research-manufacturer": 1,
    "research-explorer": 1,
    "research-science-4": 1,

    // endregion : science 3 -----------------------------------------------------------------

    // region : science 4 -----------------------------------------------------------------
    //                               __   __
    //                              |  | |  |
    //                              |  \_|  |
    //                               \____  |
    //                                   |  |
    //                                   |__|

    // raw
    bauxite: 1,
    studonite: 3,

    // processed
    solvent: 4,
    adamantium: 5,
    aluminum: 2,

    // materials
    "adamantium-frame": 5,
    computer: 10,

    // containers

    // research
    "research-studonite": 1,
    "research-aluminum": 1,
    "research-adamantium-drill": 1,
    "research-computer": 1,
    "research-science-5": 1,

    // science
    science4: 4,

    // buildings
    "adamantium-drill": 50,

    // endregion : science 4 -----------------------------------------------------------------

    // region : science 5 -----------------------------------------------------------------
    //                               ________
    //                              |  ______|
    //                              |  |__
    //                              \____  \
    //                              _____|  |
    //                             |_______/

    // raw
    "uranium-ore": 5,

    // recipes

    // processed raw
    "crushed-uranium": 2,
    u235: 10,
    u234: 10,
    slag: 1,

    // materials
    "nuclear-fuel": 10,

    // science
    science5: 5,

    // research
    "research-uranium": 1, // science 5

    // buildings
    hydroponics: 20,
    "rock-crusher": 10,
    centrifuge: 10,
};

const recipes: Recipes = {
    "": {},
    begin: {},
    prospector: { food: 2 },
    lumberjack: { food: 2, "iron-bar": 1 },
    "lumberjack-school": { wood: 500, steel: 30 },

    electricity: {}, // attach buildings that consume different kinds of fuel

    "research-small-battery": { "copper-wire": 5, science1: 5 },
    "small-battery": { "copper-wire": 3, "iron-frame": 1 },
    "wind-turbine": { "iron-frame": 2, "copper-wire": 5, "iron-bar": 2 },

    food: {}, // attach buildings that consume different kinds of fuel

    "wet-land": {},
    "sandy-land": {},
    "copper-node": {},
    "iron-node": {},
    "coal-node": {},
    "stony-land": {},
    "oil-node": {},
    "studonite-node": {},
    "bauxite-node": {},
    "uranium-node": {},
    "gold-node": {},

    // raw
    "iron-ore": { "iron-node": 0.01 },
    gas: {},
    gold: { "gold-node": 0.01 },
    "uranium-ore": { "uranium-node": 0.2, "sulfuric-acid": 1 },
    "copper-ore": { "copper-node": 0.01 },
    oil: { "oil-node": 0.01 },
    stone: { "stony-land": 0.01 },
    water: { "wet-land": 0.01 },
    coal: { "coal-node": 0.01 },
    wood: { tree: 0.25 },
    seed: { wood: 1 },
    tree: {},
    fertilizer: { nitrogen: 10, "wet-land": 0.01 },
    nitrogen: {},
    sand: { "sandy-land": 0.01 },
    studonite: { solvent: 0.1, "studonite-node": 0.02 },
    bauxite: { "bauxite-node": 0.01 },
    adamantium: { studonite: 1 },
    aluminum: { bauxite: 1, "clean-water": 1 },
    "crushed-uranium": { "uranium-ore": 1 },
    u235: { "crushed-uranium": 1 },
    u234: {},
    slag: {},

    // processed raw
    "iron-bar": { "iron-ore": 1 },
    "copper-bar": { "copper-ore": 1 },
    sulfur: { gas: 0.5 },
    steel: { "iron-bar": 1, coal: 1 },

    "copper-wire": { "copper-bar": 0.5 },
    "clean-water": { water: 1 },
    glass: { sand: 2 },

    // building materials
    gear: { "iron-bar": 0.5 },
    pipe: { steel: 2 },
    "iron-frame": { "iron-bar": 2 },

    // advanced materials
    "sulfuric-acid": { sulfur: 1, water: 5 },
    "basic-circuit": { "copper-wire": 2, wood: 0.25 },
    solvent: { "sulfuric-acid": 2, nitrogen: 1 },
    plastic: { oil: 1 },
    "advanced-circuit": {
        "basic-circuit": 1,
        "gold-filament": 1,
        plastic: 0.5,
    },
    "adamantium-frame": { adamantium: 2, plastic: 1 },
    computer: { "advanced-circuit": 5, plastic: 1 },
    "gold-filament": { gold: 1, "sulfuric-acid": 0.5 },

    // buildings
    constructer: { gear: 10, "iron-frame": 2 },
    assembler: { constructer: 1, "copper-wire": 15, "iron-frame": 4 },
    manufacturer: { assembler: 1, steel: 10, "basic-circuit": 10 },
    "gas-extractor": { gear: 20, steel: 5, "iron-frame": 15 },
    "chemical-plant": {
        gear: 20,
        "iron-frame": 15,
        steel: 15,
        "basic-circuit": 10,
    },
    "miner-mk1": { gear: 20, "copper-wire": 20 },
    "smelter-mk1": { stone: 10 },
    "smelter-mk2": { "iron-frame": 10, "copper-wire": 10, "smelter-mk1": 1 },
    "oil-pump": { steel: 10, pipe: 10, "iron-frame": 10 },
    "water-pump-mk1": { "iron-bar": 15, pipe: 5 },
    greenhouse: { steel: 10, glass: 20, seed: 1 },
    hydroponics: { steel: 50, "basic-circuit": 20, "iron-frame": 2 },
    "water-filter": { steel: 5, pipe: 5 },
    "water-evaporator": { steel: 5, pipe: 5 },
    "evaporate-water": { water: 50, "clean-water": 50 },
    "coal-power": { steel: 100 },

    explorer: { steel: 10, "basic-circuit": 8 },

    "adamantium-drill": { "adamantium-frame": 20, computer: 5 },
    "rock-crusher": { aluminum: 10, "advanced-circuit": 5 },
    centrifuge: { "adamantium-frame": 50, "chemical-plant": 2 },
    "nuclear-fuel": { "adamantium-frame": 1, u235: 10 },

    box: { "iron-frame": 1, "iron-bar": 3 },
    "box-box": { box: 5 },
    box3: { "box-box": 5 },
    box4: { box3: 5 },
    box5: { box4: 5 },
    tank: { steel: 20, pipe: 10 },

    science0: { "copper-bar": 1, "iron-bar": 1 },
    science1: { "copper-wire": 1, gear: 1 },
    science2: { science1: 2, steel: 3 },
    science3: { science2: 3, plastic: 5 },
    science4: { science3: 4, "advanced-circuit": 2 },
    science5: { science4: 5, aluminum: 5 },

    // research
    "research-woodcutting": { food: 10 },
    "research-metal": { food: 10, wood: 10 },
    "research-frames": { science0: 5 },
    "research-wire": { science0: 10 },
    "research-steel": { science1: 50 },
    "research-arbol": { science2: 200 },
    "research-basic-circuit": { science2: 50, wood: 100 },
    "research-assembler": { science2: 15, gear: 50 },
    "research-nitrogen": { science2: 50 },
    "research-fluids": { science2: 50 },
    "research-oil": { science2: 100 },
    "research-natural-gas": { science3: 50, nitrogen: 1000 },
    "research-explorer": { science2: 200 },
    "research-manufacturer": { science3: 200 },
    "research-studonite": { science4: 500 },
    "research-aluminum": { science4: 200 },
    "research-adamantium-drill": { science4: 200 },
    "research-computer": { science4: 500 },
    "research-uranium": { science5: 500 },
    "research-constructor": { science1: 5 },
    "research-miner-mk1": { science1: 30 },
    "research-advanced-circuitry": { science3: 500 },
    "research-mass-click": { science1: 100 },

    "research-science-1": { "copper-wire": 10, gear: 10 },
    "research-science-2": { science1: 200, steel: 50 },
    "research-science-3": { science2: 300, plastic: 50, "basic-circuit": 50 },
    "research-science-4": { science3: 400, "advanced-circuit": 100 },
    "research-science-5": { science4: 500, aluminum: 500, computer: 50 },

    "boost-lumberjack": { science1: 100 },
    "boost-miner-mk1": { science2: 100 },
    "boost-chemical-plant": { science2: 100 },
    "boost-adamantium-drill": { science5: 100 },
    "boost-gas-extractor": { science3: 100 },
    "boost-lumberjack-school": { science4: 100 },
    "boost-oil-pump": { science3: 100 },
    "boost-rock-crusher": { science4: 100 },
    "boost-smelter-mk1": { science2: 100 },
    "boost-smelter-mk2": { science2: 100 },
    "boost-assembler": { science3: 100 },
    "boost-water-pump": { science3: 100 },
    "boost-centrifuge": { science5: 100 },
    "boost-explorer": { science3: 100 },
    "boost-greenhouse": { science3: 100 },
    "boost-manufacturer": { science4: 100 },
    "boost-constructor": { science2: 100 },

    "research-box": { science1: 1 },
    "research-box2": { science1: 1, box: 10 },
    "research-box3": { science1: 10, box: 100 },
    "research-box4": { science1: 100, box: 1000 },
    "research-box5": { science1: 1000, bauxite: 1000 },
};

const recipeScaleFactor: partialItems<number> = {
    // default 1.0

    "boost-lumberjack": 3,
    "boost-miner-mk1": 3,
    "boost-chemical-plant": 3,
    "boost-adamantium-drill": 3,
    "boost-gas-extractor": 3,
    "boost-lumberjack-school": 3,
    "boost-oil-pump": 3,
    "boost-rock-crusher": 3,
    "boost-smelter-mk1": 3,
    "boost-smelter-mk2": 3,
    "boost-assembler": 3,
    "boost-water-pump": 3,
    "boost-centrifuge": 3,
    "boost-explorer": 3,
    "boost-greenhouse": 3,
    "boost-manufacturer": 3,
    "boost-constructor": 3,
};

export default {
    recipeScaleFactor,
    timePerRecipe,
    recipes,
};
