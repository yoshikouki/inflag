import { it } from "vitest";
import { startBattle } from "../server/services/battle.service";
import { type BattleCharacter } from "../types/character.type";

type BattleLog = {
	battleLogsLength: number;
	player: BattleCharacter;
	enemy: BattleCharacter;
	isPlayerWin: 0 | 1;
	isTurnsUpperBound: 0 | 1;
	runSeconds: number;
};

it("measure the results of a battle", () => {
	const logs: BattleLog[] = [];
	for (let i = 1; i <= 100000; i++) {
		const playerStart = performance.now();
		const { player, enemy, battleLogs, isPlayerWin } = startBattle();
		const playerEnd = performance.now();
		const runSeconds = (playerEnd - playerStart) / 1000;

		logs.push({
			battleLogsLength: battleLogs.length,
			player: player,
			enemy: enemy,
			isPlayerWin: isPlayerWin ? 1 : 0,
			isTurnsUpperBound: battleLogs.length >= 100 ? 1 : 0,
			runSeconds: runSeconds,
		});
	}

	const {
		battleLogsLengthsAnalysis,
		isPlayerWinAnalysis,
		isTurnsUpperBoundAnalysis,
		runSecondsAnalysis,
	} = getLogStats(logs, false);

	const players = logs.map((log) =>
		pick(log.player, [
			"level",
			"currentHitPoint",
			"currentAttack",
			"currentDefense",
			"currentSpeed",
		]),
	);
	const playersAnalysis = extractStats(players);

	// console.table(logs);
	// console.table(battleLogsLengthsAnalysis)
	console.log("run battles number:", logs.length);
	console.log(battleLogsLengthsAnalysis);
	console.log(playersAnalysis);
	console.log(isPlayerWinAnalysis);
	console.log(isTurnsUpperBoundAnalysis);
	console.log(runSecondsAnalysis);
});

function getLogStats(logs: BattleLog[], round = false) {
	const battleLogsLengths = logs.map((log) => log.battleLogsLength);
	const isPlayerWin = logs.map((log) => log.isPlayerWin);
	const isTurnsUpperBound = logs.map((log) => log.isTurnsUpperBound);
	const runSeconds = logs.map((log) => log.runSeconds);

	const battleLogsLengthsAnalysis = {
		turnsNumber_Median: round
			? Math.round(median(battleLogsLengths))
			: median(battleLogsLengths),
		turnsNumber_Average: round
			? Math.round(calculateAverage(battleLogsLengths))
			: calculateAverage(battleLogsLengths),
		turnsNumber_StandardDeviation: round
			? Math.round(calculateStandardDeviation(battleLogsLengths))
			: calculateStandardDeviation(battleLogsLengths),
	};

	const isPlayerWinAnalysis = {
		isPlayerWin_Median: round
			? Math.round(median(isPlayerWin))
			: median(isPlayerWin),
		isPlayerWin_Average: round
			? Math.round(calculateAverage(isPlayerWin))
			: calculateAverage(isPlayerWin),
		isPlayerWin_StandardDeviation: round
			? Math.round(calculateStandardDeviation(isPlayerWin))
			: calculateStandardDeviation(isPlayerWin),
	};

	const isTurnsUpperBoundAnalysis = {
		isTurnsUpperBound_Median: round
			? Math.round(median(isTurnsUpperBound))
			: median(isTurnsUpperBound),
		isTurnsUpperBound_Average: round
			? Math.round(calculateAverage(isTurnsUpperBound))
			: calculateAverage(isTurnsUpperBound),
		isTurnsUpperBound_StandardDeviation: round
			? Math.round(calculateStandardDeviation(isTurnsUpperBound))
			: calculateStandardDeviation(isTurnsUpperBound),
	};

	const runSecondsAnalysis = {
		runSeconds_Median: round
			? Math.round(median(runSeconds))
			: median(runSeconds),
		runSeconds_Average: round
			? Math.round(calculateAverage(runSeconds))
			: calculateAverage(runSeconds),
		runSeconds_StandardDeviation: round
			? Math.round(calculateStandardDeviation(runSeconds))
			: calculateStandardDeviation(runSeconds),
	};

	return {
		battleLogsLengthsAnalysis,
		isPlayerWinAnalysis,
		isTurnsUpperBoundAnalysis,
		runSecondsAnalysis,
	};
}

function median(numbers: number[]): number {
	const sorted = [...numbers].sort((a, b) => a - b);
	const length = sorted.length;
	const middle = Math.floor(length / 2);

	if (length % 2 === 0) {
		return (sorted[middle - 1] + sorted[middle]) / 2;
	} else {
		return sorted[middle];
	}
}

function calculateAverage(numbers: number[]): number {
	const sum = numbers.reduce((acc, curr) => acc + curr, 0);
	return sum / numbers.length;
}

function calculateStandardDeviation(numbers: number[]): number {
	const average = calculateAverage(numbers);
	const variance =
		numbers.reduce((sum, num) => sum + Math.pow(num - average, 2), 0) /
		numbers.length;
	return Math.sqrt(variance);
}

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	const result: Pick<T, K> = {} as Pick<T, K>;
	keys.forEach((key) => {
		result[key] = obj[key];
	});
	return result;
}

const extractStats = (characters) => {
	const stats = {} as Record<string, number>;
	const properties = [
		"level",
		"currentHitPoint",
		"currentAttack",
		"currentDefense",
		"currentSpeed",
	];
	properties.forEach((prop) => {
		const values = characters.map((char) => char[prop]);
		stats[`${prop}_Median`] = Math.round(median(values));
		stats[`${prop}_Average`] = Math.round(calculateAverage(values));
		stats[`${prop}_StandardDeviation`] = Math.round(
			calculateStandardDeviation(values),
		);
	});
	return stats;
};
