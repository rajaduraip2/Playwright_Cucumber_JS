const {BeforeAll,Before,After,AfterAll,BeforeStep,AfterStep,setDefaultTimeout,attach}= require('@cucumber/cucumber');
const{chromium}=require('@playwright/test');
const path = require('path');
const playwright= require('playwright')

const options ={
    headless:false,
    slowMo:10
}
setDefaultTimeout(12*1000);

BeforeAll({timeout:10*1000},async()=>{
    global.browser= await playwright.chromium.launch(options);

    
});

Before({timeout:10*1000},async()=>{

    global.context= await global.browser.newContext();
    global.page=await global.context.newPage();
});

After({timeout:10*1000},async()=>{
    await global.page.close();
    await global.context.close();
});

// After({timeout:10*1000},async(scenario)=>{
//     if(scenario.result.status=FAILED){

//     const img= await global.page.screenshot({
//         path:`test-results/screenshots/${scenario.pickle.name}.png`,
//         fullPage: true
//     });
//  await this.attach(img,"image/png");

      
        
//     }
//     await global.page.close();
//     await global.context.close();

// })



AfterAll({timeout:10*1000},async()=>{
    await global.browser.close();
});