import Dice from './Dice.js';
export default class DiceParser {
    static parse(args) {
        if (args.length < 3) throw new Error('Need >= 3 dices.');
        return args.map(str => {
            const nums = str.split(',').map(n => Number(n));
            if (nums.length !== 6 || nums.some(isNaN)) throw new Error(`Incorrect die: ${str}`);
            return new Dice(nums);
        });
    }
}