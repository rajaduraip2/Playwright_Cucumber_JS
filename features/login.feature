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

  @smoke @reg
  Scenario: Login should not be success
    Given User enter the username as "koushik@rajTest.com"
    Given User enter the password as "Passkoushik"
    When User click on the login button
    But Login should fail