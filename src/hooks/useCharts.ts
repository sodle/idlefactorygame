import GAME from "../values";
import { Items, itemsMap, partialItems } from "../content/itemNames";
import { useCalculateRates } from "./useCalculateRates";

const MAX_SAMPLES = 50;

export class ProductionSample {
    date: Date;
    sample: number;

    constructor(sample: number) {
        this.date = new Date();
        this.sample = sample;
    }
}

export class SampleBuffer {
    readonly data: [
        { label: "production"; data: ProductionSample[] },
        { label: "consumption"; data: ProductionSample[] },
    ];

    constructor() {
        this.data = [
            {
                label: "production",
                data: [],
            },
            {
                label: "consumption",
                data: [],
            },
        ];
    }

    observeProduction(sample: number) {
        this.data[0].data.push(new ProductionSample(sample));

        if (this.data[0].data.length > MAX_SAMPLES) this.data[0].data.shift();
    }

    observeConsumption(sample: number) {
        this.data[1].data.push(new ProductionSample(sample));

        if (this.data[1].data.length > MAX_SAMPLES) this.data[1].data.shift();
    }
}

const charts: itemsMap<SampleBuffer> = Object.fromEntries(
    GAME.allItemNames.map((i) => [i, new SampleBuffer()]),
) as itemsMap<SampleBuffer>;

export function useCharts(rates: ReturnType<typeof useCalculateRates>) {
    for (let item of GAME.allItemNames) {
        const producers = rates.effectiveProductionRates[item];
        if (producers) {
            let productionRate = 0;
            for (let producer of GAME.allItemNames) {
                productionRate += producers[producer] ?? 0;
            }
            charts[item].observeProduction(productionRate);
        }

        const consumers = rates.effectiveConsumptionRates[item];
        const powerConsumers = rates.powerConsumptionRates[item];

        if (consumers) {
            let consumptionRate = 0;
            for (let consumer of GAME.allItemNames) {
                consumptionRate += consumers[consumer] ?? 0;
            }
            charts[item].observeConsumption(consumptionRate);
        } else if (powerConsumers) {
            let consumptionRate = 0;
            for (let consumer of GAME.allItemNames) {
                const [, , consumption] = powerConsumers[consumer] ?? [0, 0, 0];
                consumptionRate += consumption;
            }
            charts[item].observeConsumption(consumptionRate);
        } else {
            charts[item].observeConsumption(0);
        }
    }

    return charts;
}
