const {Given,When,Then}=require("@cucumber/cucumber");
// const {chromium,Browser, page,expect}=require("@playwright/test");
// let browser=Browser;
// let  page= page;

let searchTerm;

When('User search for {string} in the site', async function (keyword) {
    searchTerm=keyword;
  await  global.page.locator("input[placeholder='Search']").fill(keyword);
  await  global.page.locator('#search button').click();
 // await  global.page.waitForTimeout(5000);
 
  });

  Then('User verifies the products are related to the same keyword', async function () {



    const Locators=await global.page.locator('//*[@class="product-thumb"]//h4/a');
    const elements= await Locators.elementHandles();
    

    for(const ele of elements)
    {
        const prodName= await ele.textContent();
        if(prodName.includes(searchTerm))
        { console.log(prodName);}
        else{
            throw new Error('Product name "${prodName}" does not include the search term "${searchTerm}');
        }
       
    }
    await page.waitForTimeout(3000);
   
    });


