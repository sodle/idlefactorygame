import { useCallback, useEffect, useRef, useState } from 'react';
import { recipes, Items, assemblerSpeeds } from './values';
import _ from 'lodash';
import { SMap } from './smap';

interface State {
    assemblers: {[p: string]: Partial<SMap<number>>};
    amountThatWeHave: { [p in Items]: number };
}

const defaultState = {
    amountThatWeHave: {
        "iron-bar": 0,
        "iron-ore": 0,
        assembler1: 0,
        assembler2: 0,
        assembler3: 0,
    },
    assemblers: {},
} satisfies State;

const ex = localStorage.getItem('state');
const existingStorage = ex ? JSON.parse(ex) : JSON.parse(JSON.stringify(defaultState));


function assemble(itemName: Items, assemblerCount: number, speed: number, timeStep: number, amounts: SMap<number>) {
    const recipe = recipes[itemName as Items];
    if (recipe === undefined) return;

    const amt = amounts[itemName as Items] ?? 0;

    let numberOfRecipesToMake = (assemblerCount ?? 0) * timeStep * speed;
    if (numberOfRecipesToMake <= 0)
        return;

    _.toPairs(recipe).forEach(pair => {
        const [ingredientName, requiredCount] = pair;
        const weHave = amounts[ingredientName as Items] ?? 0;
        numberOfRecipesToMake = Math.min(weHave * timeStep / requiredCount, numberOfRecipesToMake);
    });

    _.toPairs(recipe).forEach(pair => {
        const [ingredientName, requiredCount] = pair;
        const weHave = amounts[ingredientName as Items] ?? 0;
        amounts[ingredientName as Items] = Math.max(0, weHave - (numberOfRecipesToMake * requiredCount));
    });

    amounts[itemName] = amt + numberOfRecipesToMake;
}


function doProduction({
    assemblers,
    amountThatWeHave: _amountsThatWeHave,
}: State, timeStep: number) {
    const amounts: { [p: string]: number } = { ..._amountsThatWeHave };

    _.keys(assemblers).sort().forEach(level => {
        _.forEach(assemblers[level], (assemblerCount, itemName) => assemble(itemName as Items, assemblerCount ?? 0, assemblerSpeeds[level] ?? 0, timeStep, amounts));
    });

    return {
        amountThatWeHave: amounts as { [p in Items]: number },
    };
}

export function useProduction(ticksPerSecond: number) {

    const stateRef = useRef<State>(existingStorage);

    const setState = (state: Partial<State> = {}) => {
        stateRef.current = {...stateRef.current, ...state};
        localStorage.setItem('state', JSON.stringify(stateRef.current));
    };

    const [c, setCounter] = useState<number>(0);

    const addAmount = useCallback(
        (itemName: Items, amount: number) => {
            stateRef.current.amountThatWeHave[itemName] += amount;
            setState();
        },
        []
    );
    const addAssemblers = useCallback(
        (level: Items, itemName: Items, amount: number) => {
            const k = stateRef.current.assemblers[level] ?? {};
            const current = k[itemName] ?? 0;
            k[itemName] = current + amount;
            stateRef.current.assemblers[level] = k;
            stateRef.current.amountThatWeHave[level]! -= 1;
            setState();
        },
        []
    );

    const resetAll = useCallback(
        () => {
            setState(defaultState);
        },
        [],
    );

    useEffect(
        () => {
            const i = setTimeout(() => {
                setState(doProduction(stateRef.current, 1 / ticksPerSecond));
                setCounter(c + 1);
            }, 1000 / ticksPerSecond);
            return () => {
                clearTimeout(i);
            };
        }
    );
    return { ...stateRef.current, addAmount, addAssemblers, resetAll };
}