import React, { useMemo } from "react";
import _ from "lodash";
import { howManyRecipesCanBeMade } from "../assembly";
import GAME from "../values";
import { Items, itemsMap, partialItems } from "../content/itemNames";
import {
    Button,
    Row,
    Col,
    OverlayTrigger,
    Badge,
    Table,
} from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import { keys, values, mapPairs } from "../smap";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThumbsUp,
    faChevronCircleDown,
    faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { formatNumber as d, formatSeconds } from "../numberFormatter";
import { useCalculateRates } from "../hooks/useCalculateRates";
import { useProduction } from "../hooks/useSimulation";
import { Assembler } from "./Assembler";
import { ProductionSample, SampleBuffer } from "../hooks/useCharts";
import { AxisOptions, Chart } from "react-charts";

type func = () => void;

type Props = {
    amt: number;
    itemName: Items;
    state: ReturnType<typeof useProduction>["state"];
    assemblerButtons: JSX.Element[];
    assemblersMakingThis: partialItems<number>;
    boxButtons: JSX.Element[];
    makeByHand: func | false | null;
    onMouseover: func | undefined;
    disableRecipe: func;
    currentClickAmount: number;
    charts: itemsMap<SampleBuffer>;
} & ReturnType<typeof useCalculateRates>;

export function ItemDisplay({
    amt,
    itemName,
    assemblerButtons,
    boxButtons,
    makeByHand,
    onMouseover,
    charts,
    disableRecipe,
    assemblersMakingThis,
    state,
    currentClickAmount,
    effectiveConsumptionRates,
    effectiveProductionRates,
    powerConsumptionRates,
    assemblerIsStuckOrDisabled,
}: Props) {
    const byHandCb =
        makeByHand === false || makeByHand === null ? undefined : makeByHand;
    const canMakeByHand = Math.min(
        currentClickAmount,
        howManyRecipesCanBeMade(itemName, state.amountThatWeHave),
        state.calculateStorage(itemName) - amt,
        GAME.maxCraftAtATime(itemName),
    );
    const makeByHandButton =
        makeByHand === null ? undefined : (
            <Button
                className={"make-by-hand"}
                onClick={byHandCb}
                disabled={makeByHand === false}
            >
                {GAME.byHandVerbs(itemName)}{" "}
                {canMakeByHand > 1 ? Math.floor(canMakeByHand) : ""}
            </Button>
        );

    const recipeDisabled = state.disabledRecipes[itemName] === true;
    const thisPowerRequirements =
        GAME.buildingPowerRequirementsPerSecond(itemName);

    const assemblers = keys(assemblersMakingThis).map((name) => (
        <Assembler
            assemblerName={name}
            assemblersMakingThis={assemblersMakingThis}
            itemName={itemName}
            state={state}
            key={name}
        />
    ));

    const disableButton =
        assemblers.length > 0 ? (
            <Button
                className={"assembler-disable-button"}
                onClick={disableRecipe}
                variant={recipeDisabled ? "primary" : "secondary"}
            >
                {recipeDisabled ? "Start" : "Stop"}
            </Button>
        ) : null;

    const assemblerDisplay =
        assemblers.length > 0 ? (
            <span className="assembler-display">{assemblers}</span>
        ) : null;

    const byproducts = _.uniq(
        GAME.sideProducts(itemName).flatMap((x) => keys(x)),
    ).filter((x) => x != itemName);
    const byproductString = byproducts.map(GAME.displayNames).join(", ");

    const producingRate = _.sum(values(effectiveProductionRates[itemName]));
    const othersConsuming = effectiveConsumptionRates[itemName] ?? {};
    const othersConsumingAsPower = powerConsumptionRates[itemName] ?? {};
    const othersConsumingAsPowerRate = _.sumBy(
        values(othersConsumingAsPower),
        (k) => k[2],
    );
    const othersConsumingRate =
        _.sum(values(othersConsuming)) + othersConsumingAsPowerRate;

    const recipeScale = GAME.recipeScaleFactor(itemName);
    const recipe = GAME.recipes(itemName);
    const formatIngredients = keys(recipe)
        .map((name) => [name, recipe[name]!] as const)
        .filter(([_name, count]) => count > 0)
        .map(([name, count]) => (
            <tr key={name}>
                <td className={"popover-ingredient-count"}>
                    {count * Math.pow(recipeScale, amt)}
                </td>
                <td>{GAME.displayNames(name)}</td>
                <td>
                    <span className={"popover-ingredient-has"}>
                        ({d(state.amountThatWeHave[name] ?? 0)})
                    </span>
                </td>
            </tr>
        ));

    const byproductOf = GAME.makesAsASideProduct(itemName).map(
        GAME.displayNames,
    );
    const storageObjects = GAME.itemsCanBeStoreIn(itemName).map(
        GAME.displayNames,
    );

    const storageValueIfContainer = GAME.storageSizes(itemName);

    const maxValue = state.calculateStorage(itemName);

    const assemblerSpeed = GAME.assemblerSpeeds(itemName);
    const unlocks = GAME.unlocks(itemName).map(GAME.displayNames);
    const madeIn = GAME.requiredBuildings(itemName).map(GAME.displayNames);

    const historyVisible =
        assemblers.length > 0 ||
        producingRate > 0 ||
        keys(othersConsumingAsPower).length > 0
            ? "visible"
            : "";
    const netRate = producingRate - othersConsumingRate;

    const othersConsumingThis = GAME.recipesConsumingThis(itemName)
        .filter((recipeName) => state.assemblers[recipeName])
        .map((recipeName) => {
            const states = keys(state.assemblers[recipeName]).map((an) =>
                assemblerIsStuckOrDisabled(recipeName, an),
            );
            const fullness = states.filter((x) => x === "full");
            let s = "";
            let color = "";
            const rate = othersConsuming[recipeName];
            if (state.disabledRecipes[recipeName]) {
                s = "disabled";
                color = "text-danger";
            } else if (fullness.length > 0) {
                s = "full";
                color = "text-warning";
            }
            return (
                <tr key={recipeName}>
                    <td>{GAME.displayNames(recipeName)}</td>
                    <td>({d(rate)}/s)</td>
                    <td className={color}>{s}</td>
                </tr>
            );
        });

    othersConsumingThis.push(
        ...mapPairs(
            othersConsumingAsPower,
            ([count, total, consumption], name) => {
                const color = count < total ? "text-warning" : "";
                return (
                    <tr key={`power-${name}`}>
                        <td>
                            {total} {GAME.displayNames(name)}
                        </td>
                        <td>({d(consumption)}/s)</td>
                        <td className={color}>
                            {count} / {total}
                        </td>
                    </tr>
                );
            },
        ),
    );

    const g = (
        <FontAwesomeIcon
            icon={netRate >= 0 ? faThumbsUp : faChevronCircleDown}
            className={netRate >= 0 ? "" : "text-danger"}
        />
    );
    let historyDisplay = (
        <span className={`history-display ${historyVisible}`}>{g}</span>
    );

    const primaryAxis = useMemo(
        (): AxisOptions<ProductionSample> => ({
            getValue: (sample) => sample.date,
            scaleType: "localTime",
        }),
        [],
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<ProductionSample>[] => [
            {
                getValue: (sample) => sample.sample,
            },
            {
                getValue: (sample) => sample.sample,
            },
        ],
        [],
    );

    if (historyVisible) {
        const overlay = (
            <Popover className={"popover-no-max-width"}>
                <Popover.Body>
                    producing: {d(producingRate)}/s
                    <br />
                    consumed: {d(othersConsumingRate)}/s
                    <Table>
                        <tbody>{othersConsumingThis}</tbody>
                    </Table>
                    <br />
                    <Chart
                        options={{
                            data: charts[itemName].data,
                            primaryAxis,
                            secondaryAxes,
                        }}
                    />
                </Popover.Body>
            </Popover>
        );
        historyDisplay = (
            <OverlayTrigger placement="right" overlay={overlay}>
                {historyDisplay}
            </OverlayTrigger>
        );
    }

    const powerRequirementDisplay = mapPairs(
        thisPowerRequirements,
        (value, item) => (
            <tr key={item}>
                <td>
                    <FontAwesomeIcon icon={faBolt} />
                </td>
                <td style={{ paddingRight: "10px" }}>
                    {GAME.displayNames(item)}
                </td>
                <td>{d(value)}/s</td>
            </tr>
        ),
    );

    const unlockedAt = formatSeconds(state.timeUnlockedAt[itemName] ?? 0);

    const parts = [
        GAME.flavorText[itemName] && <div>{GAME.flavorText[itemName]}</div>,
        madeIn.length > 0 && (
            <div className={"made-in"}>Made with: {madeIn.join(", ")}</div>
        ),
        formatIngredients.length > 0 && (
            <div className={"ingredient-list"}>
                Ingredients:
                <table>
                    <tbody>{formatIngredients}</tbody>
                </table>
            </div>
        ),
        powerRequirementDisplay.length > 0 && (
            <Table className={"power-requirement-display"}>
                <tbody>{powerRequirementDisplay}</tbody>
            </Table>
        ),
        storageObjects.length > 0 && (
            <div className={"storage-options"}>
                Stored in: {storageObjects.join(", ")}
            </div>
        ),
        storageValueIfContainer > 0 && (
            <div className={"storage-size"}>
                Storage Size: {storageValueIfContainer}
            </div>
        ),
        assemblerSpeed > 0 && (
            <div className={"item-assembler-speed"}>
                Crafting Speed: {assemblerSpeed}x
            </div>
        ),
        byproducts.length > 0 && (
            <div className={"byproduct-list"}>
                Byproducts: {byproductString}
            </div>
        ),
        byproductOf.length > 0 && (
            <div className={"byproduct-of-list"}>
                Byproduct of: {byproductOf.join(", ")}
            </div>
        ),
        unlocks.length > 0 && (
            <div className={"unlock-list"}>
                <b>Unlocks:</b> {unlocks.join(", ")}
            </div>
        ),
        <i>Unlocked at: {unlockedAt}</i>,
    ];

    const displayParts: JSX.Element[] = [];
    parts.forEach((part, i) => {
        if (part) {
            displayParts.push(
                <div key={i} className={"item-popup-detail"}>
                    {part}
                </div>,
            );
        }
    });

    const tooltip = (props: any) => (
        <Popover id={`${itemName}-popover`} {...props}>
            <Popover.Header>
                <span className={"popover-name"}>
                    {GAME.displayNames(itemName)}
                </span>
            </Popover.Header>
            <Popover.Body>{displayParts}</Popover.Body>
        </Popover>
    );

    return (
        <div className="item-row" onMouseEnter={onMouseover}>
            <div className={"new-badge"}>{makeByHandButton}</div>
            <div className={"item-name-container"}>
                <OverlayTrigger placement="right" overlay={tooltip}>
                    <span>
                        {!state.acknowledged[itemName] && (
                            <Badge className={"new-item-badge"}>New</Badge>
                        )}
                        <span className="item-name">
                            {GAME.displayNames(itemName)}
                        </span>
                        {recipeDisabled ? (
                            <Badge bg={"danger"}>DISABLED</Badge>
                        ) : null}
                    </span>
                </OverlayTrigger>
            </div>
            <div className={"rate-container"}>
                <span className="item-count">
                    {historyDisplay} {d(amt)}
                </span>
                <span className="item-max">
                    {maxValue === Number.MAX_SAFE_INTEGER
                        ? ""
                        : `/ ${maxValue}`}
                </span>
                {producingRate > 0 && (
                    <span className={"speed"}> (+{d(producingRate)}/s)</span>
                )}
            </div>
            <div className={"assembler-display-container"}>
                {disableButton}
                {assemblerDisplay}
            </div>
            <div className={"add-button-container"}>
                <div className={"buttons-display"}>
                    {boxButtons}
                    {assemblerButtons}
                </div>
            </div>
        </div>
    );
}
