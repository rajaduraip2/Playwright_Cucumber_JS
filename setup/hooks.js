const {BeforeAll,Before,After,AfterAll,BeforeStep,AfterStep,setDefaultTimeout,Status}= require('@cucumber/cucumber');
const{chromium}=require('@playwright/test');
const path = require('path');
const playwright= require('playwright');
require('dotenv').config({ path: `support/env/.env.${process.env.test_env}` });

const options ={
    headless:false,
    slowMo:10
}
setDefaultTimeout(12*1000);

BeforeAll({timeout:10*1000},async()=>{
    global.browser= await playwright.chromium.launch(options);

    // switch (currentBrowser?.defaultBrowserType) {
    //     case 'chromium':
    //       global.browser = await playwright.chromium.launch(options);
    //       break;
    //     case 'firefox':
    //       global.browser = await playwright.firefox.launch(options);
    //       break;
    //     case 'webkit':
    //       global.browser = await playwright.webkit.launch(options);
    //       break;
    //     default:
    //       global.browser = await playwright.chromium.launch(options);
    //   }
    // });

    
});

Before({timeout:10*1000},async()=>{

    global.context= await global.browser.newContext();
    global.page=await global.context.newPage();
});

After({timeout:10*1000},async function({pickle,result}){
   if(result.status==Status.FAILED){

    var img= await global.page.screenshot({
        path:`test-results/screenshots/${pickle.name}.png`,
        fullPage: true
    });
 await this.attach(img,"image/png");   
   }
    await global.page.close();
    await global.context.close();

})

//close the page and context after each test.


AfterAll({timeout:10*1000},async()=>{
    await global.browser.close();
});