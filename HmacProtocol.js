import SecureRandomGenerator from './SecureRandomGenerator.js';
import crypto from 'crypto';
export default class HmacProtocol {
    static generateHmac(range) {
        const key = crypto.randomBytes(32);
        const random_int = SecureRandomGenerator.generate(0, range);
        console.log("(HMAC=" + crypto.createHmac('sha3-256', key).update(random_int.toString()).digest('hex') + ").");
        return { value: random_int, key: key.toString('hex') };
    }
}