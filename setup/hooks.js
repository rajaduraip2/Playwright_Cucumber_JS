const {BeforeAll,Before,After,AfterAll,BeforeStep,AfterStep,setDefaultTimeout,Status}= require('@cucumber/cucumber');
const{devices}=require('@playwright/test');
const path = require('path');
const playwright= require('playwright');
const fs = require('fs');
const device = process.env.DEVICE;
const folderName = 'test-results';
const screenshotFolder='test-results/screenshots';

async function ensureFolderExists(folderName) {
  const baseDir = path.join(__dirname, '..');
  const folderPath = path.join(baseDir, folderName);
  if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Folder created: ${folderName}`);
  } else {
      console.log(`Folder already exists: ${folderName}`);
  }
}
const ENV= require('../support/env/env.js');

const options ={
    headless:ENV.HEADLESS === 'true',
    slowMo:10
}
setDefaultTimeout(12*1000);

BeforeAll({timeout:10*1000},async()=>{
  await ensureFolderExists(folderName);
  await ensureFolderExists(screenshotFolder);
    fs.rmSync('./test-results/screenshots', { recursive: true, force: true });
    const currentBrowser = devices[device];

    switch (currentBrowser?.defaultBrowserType) {
        case 'chromium':
          global.browser = await playwright.chromium.launch(options);
          break;
        case 'firefox':
          global.browser = await playwright.firefox.launch(options);
          break;
        case 'webkit':
          global.browser = await playwright.chromium.launch(options);
          break;
        default:
          global.browser = await playwright.chromium.launch(options);
      }
    });



Before({timeout:10*1000},async()=>{
   
    const currentBrowser = devices[device];
    //Setting the device view port and screensize using playwright default config
    global.context= await global.browser.newContext({
        ...currentBrowser,
        baseURL:ENV.BASE_URL,
    });
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