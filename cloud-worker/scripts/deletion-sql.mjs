// Prepares SQL only; never connects to a database or executes a deletion.
import {deletionSQL} from '../src/privacy.js';
import {createInterface} from 'node:readline/promises';
import {stdin,stdout} from 'node:process';
const rl=createInterface({input:stdin,output:stdout});
try {
 const code=(await rl.question('Receipt code: ')).trim();
 const userId=(await rl.question('Account ID: ')).trim();
 const sql=await deletionSQL(code,userId);
 console.log('\n1. Inspect (must return exactly one matching account):\n'+sql.inspect);
 console.log('\n2. Delete ONLY after confirming the request and stopping sync:\n'+sql.remove);
} catch {console.error('Invalid code or account ID. No SQL generated.');process.exitCode=1;}
finally {rl.close();}
