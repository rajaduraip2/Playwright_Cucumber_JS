const {Given,When,Then}=require("@cucumber/cucumber");
// const {chromium,Browser, page,expect}=require("@playwright/test");
// let browser=Browser;
// let  global.page= global.page;



Given('User navigates to the application', async function () {
    // browser= await chromium.launch({ headless:false });
    //  global.page=await browser.new global.page();
    await  global.page.goto("https://tutorialsninja.com/demo/");
   // await expect(await  global.page.title()).tobe('Your Store');
 
  });


Given('User click on the login link', async function () {
    await  global.page.locator("//span[contains(text(),'My Account')]").click();
    await  global.page.locator("//a[contains(text(),'Login')]").click();
    await  global.page.waitForTimeout(3000);
         
         });
      

Given('User enter the username as {string}', async function (username) {
   // await expect(await  global.page.title()).tobe('Account Login');
   const title= await  global.page.title();
   console.log(title);
await  global.page.locator("#input-email").fill(username);
         
         });


      
 Given('User enter the password as {string}', async function (password) {
    await  global.page.locator("#input-password").fill(password);
         
         });


      

When('User click on the login button', async function () {

    await  global.page.locator("//*[@type='submit']").click();

         
         });


Then('Login should be success', async function () {
   const title= await  global.page.title()
   console.log(title );
    // global.page.close();
         
         });


When('Login should fail', async function () {
    await expect(await  global.page.locator("//*[contains(@class,'alert-dismissible')]")).toBeVisible();
    const alertText=await  global.page.locator("//*[contains(@class,'alert-dismissible')]").textContent();
    console.log(alertText );
    //  global.page.close();
         
         });