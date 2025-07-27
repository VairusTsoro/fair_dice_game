import CliInterface from './CliInterface.js';
import SecureRandomGenerator from './SecureRandomGenerator.js';
export default class GameController {
    static async play(dices, table) {
        console.log("Dices:", dices.map(dice => dice.join(', ')).join(' | '));

        console.log("Let's determine who makes the first move.");
        let { computer_selection, key } = CliInterface.guess(2);
        let user_selection;
        let computer_roll_value, user_roll_value;
        let computer_dice, user_dice;
        let left_dices;
        while (true) {
            user_selection = await CliInterface.askQuestion('Your selection: ');
            CliInterface.other_selections(user_selection, table);
            if (!isNaN(user_selection) && user_selection >= 0 && user_selection < 2) break;
            console.log("Enter a number between: 0 or 1.");
        }

        console.log("My selection: " + computer_selection);
        console.log("(KEY=" + key + ").");
        const player_starts = computer_selection === parseInt(user_selection);
        if (player_starts) {
            console.log("You make the first move, choose your dice:");
            dices.forEach((d, i) => console.log(`${i}: [${d.join(', ')}]`));
            console.log("X - exit\nO - help");
            
            while (true) {
                user_selection = await CliInterface.askQuestion('Your selection: ');
                CliInterface.other_selections(user_selection, table);
                if (!isNaN(user_selection) && user_selection >= 0 && user_selection < dices.length) break;
                console.log(`Enter a number between 0 and ${dices.length - 1}.`);
            }
            user_dice = dices[user_selection]
            console.log("You choose the [" + user_dice.join(', ') + "] dice.");

            left_dices = dices.filter(d => d !== user_dice);
            console.log("I choose my dice:" + left_dices.forEach((d, i) => console.log(`[${d.join(', ')}]`)));
            computer_dice = left_dices[SecureRandomGenerator.generate(0, left_dices.length)];
            console.log("I choose the [" + computer_dice.join(', ') + "] dice.");
        } else {
            computer_dice = dices[SecureRandomGenerator.generate(0, dices.length)];
            console.log("I make the first move and choose the [" + computer_dice.join(', ') + "] dice.");
            left_dices = dices.filter(d => d !== computer_dice);
            console.log("Choose your dice:");
            left_dices.forEach((d, i) => console.log(`${i}: [${d.join(', ')}]`));
            console.log("X - exit\nO - help");

            while (true) {
                user_selection = await CliInterface.askQuestion('Your selection: ');
                CliInterface.other_selections(user_selection, table);
                if (!isNaN(user_selection) && user_selection >= 0 && user_selection < left_dices.length) break;
                console.log(`Enter a number between 0 and ${left_dices.length - 1}.`);
            }
            user_dice = left_dices[user_selection];
            console.log("You choose the [" + user_dice.join(', ') + "] dice."); 
        }

        computer_roll_value = await CliInterface.roll(6, computer_dice);

        user_roll_value = await CliInterface.roll(6, user_dice);

        if (computer_roll_value > user_roll_value) console.log(`I win! My roll: ${computer_roll_value} > Your roll: ${user_roll_value}`);
        else if (computer_roll_value < user_roll_value) console.log(`You win! My roll: ${computer_roll_value} < Your roll: ${user_roll_value}`);
        else console.log(`It's a draw! My roll: ${computer_roll_value} = Your roll: ${user_roll_value}`);
    }
}