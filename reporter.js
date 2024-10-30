var reporter = require('cucumber-html-reporter');
const cukemerge = require('cucumber-json-merge');
const fs = require('fs');

try{

if(fs.existsSync('test-results/cucumber_reportRerun.json')){
   
    const jsonData = fs.readFileSync('test-results/cucumber_reportRerun.json', 'utf8');
    const jsonArray = JSON.parse(jsonData);
    const textToPrepend = ' Rerun_';
    for (const obj of jsonArray) {
      obj.name = textToPrepend + obj.name;
    }
    const updatedJsonData = JSON.stringify(jsonArray, null, 2);
    fs.writeFileSync('test-results/cucumber_reportRerun.json', updatedJsonData, 'utf8');

}

let filenames = cukemerge.listJsonFiles('test-results', false);
const filenameSubstringsToRemove = [ 'merged_cucumber_report.json'];
filenames = filenames.filter((filename) => !filenameSubstringsToRemove.some((substring) => filename.includes(substring)));

const merged = cukemerge.mergeFiles(filenames);
cukemerge.writeMergedFile(`test-results/merged_cucumber_report.json`, merged, 'test-results');

    const options = {
        theme: 'bootstrap',
        jsonFile: 'test-results/merged_cucumber_report.json',
        output: 'test-results/merged_cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Windows 10",
            'Test executed at': new Date().toJSON().slice(0, 16).replace(':', '-'),
            "Parallel": "Scenarios",
            "Executed": "Remote"
        },
        failedSummaryReport: true,
    };
    reporter.generate(options);

}

catch (e){
    throw new Error('error in report generation.Check into the test-esults folder fro json file =>',e)
}











// var options = {
//         theme: 'bootstrap',
//         jsonFile: 'test-results/cucumber_report.json',
//         output: 'test-results/merged_cucumber_report.html',
//         reportSuiteAsScenarios: true,
//         scenarioTimestamp: true,
//         launchReport: true,
//         metadata: {
//             "App Version":"0.3.2",
//             "Test Environment": "STAGING",
//             "Browser": "Chrome  54.0.2840.98",
//             "Platform": "Windows 10",
//             'Test executed at': new Date().toJSON().slice(0, 16).replace(':', '-'),
//             "Parallel": "Scenarios",
//             "Executed": "Remote"
//         },
//         failedSummaryReport: true,
//     };

//     reporter.generate(options);
    