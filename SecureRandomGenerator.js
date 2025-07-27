import crypto from 'crypto';
export default class SecureRandomGenerator {
    static generate(min, max) {
        if (min >= max) throw new Error('Invalid range.');
        const range = max - min;
        return parseInt(crypto.randomInt(0, range) + min);
    }
}