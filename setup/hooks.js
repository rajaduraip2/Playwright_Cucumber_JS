const {BeforeAll,Before,After,AfterAll,BeforeStep,AfterStep}= require('@cucumber/cucumber');
const{chromium}=require('@playwright/test');




BeforeAll(async()=>{
    global.browser= await chromium.launch({ headless:false });

    
});

Before(async()=>{
    global.context= await global.browser.newContext();
    global.page=await global.context.newPage();
});
AfterAll(async()=>{
    await global.page.close();
});
