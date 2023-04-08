import { calculateCumulativeExpForLevel, calculateCumulativeExpForNextLevel } from '~/server/services/level.service';

import fs from "fs";
import { it } from "vitest";

it("measure the results of a battle", () => {
  const expToNextLevels = [];
  const numberOfDailyBattles = (24 * 60 * 60) / 10; // 8640回

  for (let i = 1; i <= 10000; i++) {
    const initializeExp = calculateCumulativeExpForLevel(i);
    const expToNextLevel = calculateCumulativeExpForNextLevel(i);
    const expToAdding100Level = calculateCumulativeExpForLevel(i + 100);
    expToNextLevels.push({
      level: i,
      initializeExp,
      expToNextLevel,
      expToAdding100Level,
      averageExpPerBattle: expToAdding100Level / numberOfDailyBattles,
    });
  }
  // expToNextLevels.map((expToNextLevel) => console.log(Object.values(expToNextLevel).join('\t')));

  fs.writeFileSync(
    "output.csv",
    [
      Object.keys(expToNextLevels[0]).join("\t"),
      ...expToNextLevels.map((expToNextLevel) =>
        Object.values(expToNextLevel).join("\t")
      ),
    ].join("\r")
  );
});
