import DiceParser from './DiceParser.js';
import ProbabilityCalculator from './ProbabilityCalculator.js';
import TableRenderer from './TableRenderer.js';
import GameController from './GameController.js';

async function main() {
    try {
        const dices = DiceParser.parse(process.argv.slice(2)).map(d => d.faces);
        const prob = ProbabilityCalculator.compute(dices);
        const table = TableRenderer.render(dices, prob);
        console.log('Type X to exit, O for help…');
        await GameController.play(dices, table);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        console.error('Example usage: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3');
        process.exit(1);
    }
}

main();