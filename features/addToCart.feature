Feature: User Authentication tests

  Background: 
    Given User navigates to the application
    And User click on the login link

  @smoke @reg
  Scenario: Login should be success
    And User enter the username as "Playwright001@rajtest.com"
    And User enter the password as "Crate@123"
    When User click on the login button
    Then Login should be success

    When User search for "Samsung" in the site
     Then User verifies the products are related to the same keyword