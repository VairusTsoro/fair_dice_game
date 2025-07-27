import HmacProtocol from "./HmacProtocol.js";
import readline from "readline";
export default class CliInterface {
    static askQuestion(query) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => rl.question(query, ans => {
            rl.close();
            resolve(ans);
        }));
    }

    static other_selections(seleciton, table) {
        if (seleciton.toLowerCase() === 'x') process.exit(0);
        else if (seleciton.toLowerCase() === 'o') console.log(table);
    }

    static guess(range) {
        console.log(`I selected a random value in the range 0...${range - 1}`);
        if (range == 2) console.log("Try to guess my selection.");
        else if (range == 6) console.log("Add your number modulo 6.");
        for (let i = 0; i < range; i++) { console.log(i + ": " + i); }
        console.log("X - exit\nO - help");
        const { value, key } = HmacProtocol.generateHmac(range);
        return { computer_selection: value, key: key };
    }

    static async roll(range, dice) {
        const { computer_selection, key } = this.guess(6);
        let user_num;
        while (true) {
            user_num = await this.askQuestion(`Enter your number (0...${range - 1}): `);
            this.other_selections(user_num, dice);
            if (!isNaN(user_num) && user_num >= 0 && user_num < range) break;
            console.log(`Invalid number. Please enter a number between 0 and ${range - 1}`);
        }
        user_num = parseInt(user_num);
        const fair_index = (computer_selection + user_num) % 6;
        const roll_value = dice[fair_index];
        console.log("My number is", computer_selection, `\n(KEY=${key}).`);
        console.log("Fair result:", fair_index, `(${computer_selection}+ ${user_num} = ${fair_index} (mod 6))`);
        console.log("Roll result:", roll_value);
        return roll_value;
    }
}