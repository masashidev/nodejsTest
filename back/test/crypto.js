import crypto from 'crypto';

// using secure hash algorithm 256
const hash = crypto.createHash('sha256');
hash.update('acountojfoinr');
console.log(hash.digest('hex'));

// will cause an error for the second time
// console.log(hash.digest('hex'));

// from 64 random bytes, get a base64 string
crypto.randomBytes(64, (err, buf) => {
  if(err) throw err;
  const salt = buf.toString('base64');
  console.log('salt:', salt);
});

//Buffer objects are used to represent a fixed-length sequence of bytes.

// one byes = 8 bits = 2^8 = 256
const a = crypto.randomBytes(10);
console.log(a);
console.log(a.toString("hex"));
console.log(a.toString('base64'));


//iv = initialization vector

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
const key = crypto.randomBytes(24);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(`${password}`, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('encrypted:', encrypted);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('decrypted:', decrypted);

