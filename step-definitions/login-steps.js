const {Given,When,Then}=require("@cucumber/cucumber");
 const {expect}=require("@playwright/test");




Given('User navigates to the application', async function () {
    await  global.page.goto("https://tutorialsninja.com/demo/");
    await expect(global.page.title()).resolves.toBe('Your Store');
 
  });


Given('User click on the login link', async function () {
    await  global.page.locator("//span[contains(text(),'My Account')]").click();
    await  global.page.locator("//a[contains(text(),'Login')]").click();
    await  global.page.waitForTimeout(3000);
         
         });
      

Given('User enter the username as {string}', async function (username) {
     await expect(global.page.title()).resolves.toBe('Account Login');
await  global.page.locator("#input-email").fill(username);
         
         });


      
 Given('User enter the password as {string}', async function (password) {
    await  global.page.locator("#input-password").fill(password);
         
         });


      

When('User click on the login button', async function () {

    await  global.page.locator("//*[@type='submit']").click();

         
         });


Then('Login should be success', async function () {
   await expect(global.page.title()).resolves.toBe('My Account');
         });


When('Login should fail', async function () {
    await expect(await  global.page.locator("//*[contains(@class,'alert-dismissibles')]")).toBeVisible();
    const alertText=await  global.page.locator("//*[contains(@class,'alert-dismissible')]").textContent();
    console.log(alertText );
         
         });