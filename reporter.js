var reporter = require('cucumber-html-reporter');
const cukemerge = require('cucumber-json-merge');
const fs = require('fs');


var options = {
        theme: 'bootstrap',
        jsonFile: 'test-results/cucumber_report.json',
        output: 'test-results/cucumber_report.html',
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
    