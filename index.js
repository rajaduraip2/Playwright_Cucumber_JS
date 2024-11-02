const { spawnSync } = require('child_process');
const { ArgumentParser } = require('argparse');
const fs = require('fs');


const parser = new ArgumentParser();
parser.add_argument('--tags', { help: 'scenarios to run, e.g. @login' });
parser.add_argument('--env', { default: 'qa', help: 'site to target, e.g. qa,UAT,prod' });
parser.add_argument('--device', { default: 'Desktop Chrome', help: 'device to test on, e.g. iPhone 13' });
parser.add_argument('--report', { choices: ["local"], default: "", help: 'if included, generate report' });
parser.add_argument('--headless', { action: 'store_true', help: 'if included, run as headless' });
parser.add_argument('--rerun', { action: 'store_true', help: 'if included, rerun all failed tests' });


//destructuring the tags from args object
const args = parser.parse_args();

// To handle multiple tags input with OR conditions
args.tags = args.tags.toLowerCase().includes('or') ? `(${args.tags})` : args.tags;

let { tags } = args;

// Check if the tags string contains 'and'
if (tags.includes('and')) {
    // Replace 'and' with space (Cucumber uses space for AND condition)
    // tags = tags.replace(/and/g, ' ');
    args.tags = tags;
} else if (tags.includes(',')) {
    // If it contains a comma, wrap it in parentheses (for OR condition)
    tags = `(${tags.split(',').join(' or ')})`;
    args.tags = tags;
}


if (args.env.includes('qa')) {
    console.log(args.tags);
    args.tags = args.tags ? `(${args.tags}) and @qa` : '@qa';
} else if (args.env.includes('uat')) {
    args.tags = args.tags ? `(${args.tags}) and @uat` : '@uat';
} else if (args.env.includes('smoke')) {
    args.tags = args.tags ? `(${args.tags}) and @smoke` : '@smoke';
} else {
    args.tags = args.tags ? `${args.tags}` : '';
}


process.env.ENV = args.env;
process.env.DEVICE = args.device;
process.env.HEADLESS = args.headless;
process.env.TAGS = args.tags;

fs.writeFileSync('args.json', JSON.stringify(args, null, 2));

//require('dotenv').config({ path: `./support/env/${args.env}.env`, override: true });
require('dotenv').config({ path: `support/env/.env.${args.env}`, override: true });

spawnSync(`npm run cucumber -- --tags "${args.tags}"`, { env: process.env, shell: true, stdio: 'inherit' });

if (args.rerun) {
    spawnSync(`npm run cucumber -- --tags "${args.tags}" -p rerun @rerun.txt`, { env: process.env, shell: true, stdio: 'inherit' });
}

if (args.report) {
    require('./reporter.js');
}
