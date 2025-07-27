import AsciiTable from 'ascii-table';
export default class TableRenderer {
    static render (dices, prob) {
        const table = new AsciiTable('Dice Game');
        table.setHeading('Player dice vs', ...dices.map(d => d.join(' ')));
        for (let i = 0; i < dices.length; i++) {
            const row = [dices[i].join(' ')];
            for (let j = 0; j < dices.length; j++) { row.push(prob[i][j].toFixed(3)); }
            table.addRow(...row);
        }
        return table.toString();
    }
}