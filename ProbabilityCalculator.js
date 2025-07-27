export default class ProbabilityCalculator {
    static compute(dices) {
        const N = dices.length;
        const P = Array.from({ length: N }, () => Array(N).fill(0));
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (i === j) {
                    P[i][j] = 1 / 3; // 'Dice vs similar one' always gives 1/3 chance
                    continue;
                }
                const a = dices[i];
                const b = dices[j];
                const totalPairs = a.length * b.length;
                let wins = 0;
                for (const va of a) { for (const vb of b) { if (va > vb) wins++; } }
                P[i][j] = wins / totalPairs;
            }
        }
        return P;
    }
}