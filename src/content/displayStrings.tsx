import { partialItems } from "./itemNames";

const byHandVerbs: partialItems<string> = {
    // default "make"
    "iron-ore": "gather",
    "copper-ore": "gather",
    stone: "gather",
    coal: "gather",
    seed: "gather",
    begin: "Begin",
};

const displayNames: partialItems<string> = {
    lumberjack: "Lumberjack",
    "lumberjack-school": "Lumberjack School",
    food: "Basic Food",
    assembler: "Assembler",
    constructer: "Constructor",

    electricity: "Electricity",

    "small-battery": "Small Battery",
    "research-small-battery": "Tech: Electricity",
    "wind-turbine": "Wind Turbine",

    "miner-mk1": "Miner Mark I",
    "smelter-mk1": "Smelter",
    "smelter-mk2": "Foundry",
    "basic-circuit": "Basic Circuit",
    "chemical-plant": "Chemical Plant",
    manufacturer: "Manufacturer",
    "clean-water": "Clean Water",
    "research-wire": "Tech: Copper Wire",
    "research-steel": "Tech: Steel",
    "research-arbol": "Tech: Arbology",
    box: "Box",
    "box-box": "Box Box",
    box3: "Big Box",
    box4: "Massive Box",
    box5: "Biggest Box",
    "": "oops!",
    "adamantium-drill": "Adamantium Drill",
    "adamantium-frame": "Adamantium Frame",
    "advanced-circuit": "Advanced Circuit",
    "copper-bar": "Copper Bar",
    "copper-ore": "Copper Ore",
    "copper-wire": "Copper Wire",
    "crushed-uranium": "Crushed Uranium",
    "gas-extractor": "Gas Extractor",
    "iron-bar": "Iron Slab",
    "iron-frame": "Frame",
    "iron-ore": "Iron Ore",
    "oil-pump": "Oil Pump",
    "research-basic-circuit": "Tech: Basic Circuit",
    "research-adamantium-drill": "Tech: Adamantium Drill",
    "research-aluminum": "Tech: Aluminium",
    "research-assembler": "Tech: Assembler",
    "research-computer": "Tech: Computers",
    "research-explorer": "Tech: Explorer",
    "research-manufacturer": "Tech: Manufacturer",
    "research-natural-gas": "Tech: Natural Gas",
    "research-nitrogen": "Tech: Nitrogen Extraction",
    "research-studonite": "Tech: Strange Rock",
    "research-uranium": "Tech: Glowy Rock That Makes Me Feel Bad",
    "research-fluids": "Tech: Fluids",
    "research-oil": "Tech: Essential Oils",
    "research-frames": "Tech: Applications of Iron",
    "research-box": "Tech: Containerization",
    "research-constructor": "Tech: More Automation",
    "research-miner-mk1": "Tech: Auto Mining",
    "research-advanced-circuitry": "Tech: Advanced Circuits",
    "research-mass-click": "Tech: Mass Click",
    "research-woodcutting": "Tech: Wood",
    "research-metal": "Tech: Metals",
    "rock-crusher": "Rock Crusher",
    adamantium: "Adamantium",
    "sulfuric-acid": "Sulfuric Acid",
    "uranium-ore": "Uranium Ore",
    "nuclear-fuel": "Nuclear Fuel Rod",
    "water-filter": "Water Filter",
    "water-pump-mk1": "Water Pump",
    gold: "Gold!",
    gear: "Iron Gear",
    "research-science-1": "Tech: Science 1",
    "research-science-3": "Tech: Science 3",
    "research-science-2": "Tech: Science 2",
    "research-science-4": "Tech: Science 4",
    "research-science-5": "Tech: Science 5",
    "research-box2": "Tech: Box of a Bigger Size 1",
    "research-box3": "Tech: Box of a Bigger Size 2",
    "research-box4": "Tech: Box of a Bigger Size 3",
    "research-box5": "Tech: Box of a Bigger Size 4",
    tank: "Fluid Tank",
    prospector: "Prospector",
    explorer: "Explorer",
    steel: "Steel Ingot",
    pipe: "Steel Pipe",
    "evaporate-water": "Recipe: Evaporate Water",
    plastic: "Plastic Rod",
    studonite: "Studo-nite",
    bauxite: "Bauxite",
    aluminum: "Aluminium",
    solvent: "Acidic Solvent",
    computer: "Processor Unit",
    stone: "Stone",
    coal: "Coal",
    gas: "Natural Gas",
    "gold-filament": "Gold Filament",
    "coal-power": "Coal Burner",

    begin: "Start Here",

    science0: "Basic Finding",
    science1: "Written Note",
    science2: "Documented Event",
    science3: "Intense Study",
    science4: "Research Paper",
    science5: "A.I. Generated Proof",

    "wet-land": "Wet Land",
    "sandy-land": "Sandy Land",
    "copper-node": "Copper Deposit",
    "iron-node": "Iron Deposit",
    "coal-node": "Coal Deposit",
    "stony-land": "Stony Land",
    "oil-node": "Oil Well",
    "gold-node": "Gold Deposit",
    "studonite-node": "Studonite Deposit",
    "bauxite-node": "Bauxite Deposit",
    "uranium-node": "Uranium Deposit",

    "boost-lumberjack": "Boost: Sharper Axes",
    "boost-miner-mk1": "Boost: Tougher Drills",
    "boost-chemical-plant": "Boost: Precise Chemicals",
    "boost-adamantium-drill": "Boost: Adamantium Drill",
    "boost-gas-extractor": "Boost: Gas Extractor",
    "boost-lumberjack-school": "Boost: Better Teachers",
    "boost-oil-pump": "Boost: More Oil",
    "boost-rock-crusher": "Boost: Rock Crusher",
    "boost-smelter-mk1": "Boost: Hotter Smelters",
    "boost-smelter-mk2": "Boost: Efficient Foundries",
    "boost-assembler": "Boost: Faster Assembler",
    "boost-water-pump": "Boost: Bigger Water Pump",
    "boost-centrifuge": "Boost: Better Centrifuge",
    "boost-explorer": "Boost: Efficient Explorer",
    "boost-greenhouse": "Boost: Greener Greenhouse",
    "boost-manufacturer": "Boost: Manufacturer",
};

const flavorText: partialItems<React.ReactNode> = {
    "research-mass-click":
        "Lets you place Boxes and Buildings 10 times as fast.",
    begin: <b>The Beginning</b>,
    prospector: <i>Lets you find some land!</i>,
    electricity: <i>Power is Knowledge</i>,
    "lumberjack-school": <i>They learn all night, and they sleep all day.</i>,

    "boost-lumberjack": "Increase Lumberjack output by 2x",
    "boost-miner-mk1": "Increase Miner Mark 1 output by 2x",
    "boost-chemical-plant": "Increase Chemical Plant output by 2x",
    "boost-adamantium-drill": "Increase Adamantium Drill output by 2x",
    "boost-gas-extractor": "Increase Gas Extractor output by 2x",
    "boost-lumberjack-school": "Increase Lumberjack School output by 2x",
    "boost-oil-pump": "Increase Oil Pumps output by 2x",
    "boost-rock-crusher": "Increase Rock Crusher output by 2x",
    "boost-smelter-mk1": "Increase Smelter output by 2x",
    "boost-smelter-mk2": "Increase Foundry output by 2x",
    "boost-assembler": "Increase Assembler output by 2x",
    "boost-water-pump": "Increase Water Pump output by 2x",
    "boost-centrifuge": "Increase Centrifuge output by 2x",
    "boost-explorer": "Increase Explorer output by 2x",
    "boost-greenhouse": "Increase Greenhouse output by 2x",
    "boost-manufacturer": "Increase Manufacturer output by 2x",
};

const units: partialItems<string> = {
    electricity: "J",
    water: "m³",
};

export default {
    byHandVerbs,
    displayNames,
    flavorText,
    units,
};
