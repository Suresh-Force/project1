@isTest
private class TestConsultantController {
    // setup data for for testing the Apex controller
    @TestSetup
    static void makeData(){
        List<Consultant__c> conList = TestData.createTestData(5);
        insert conList;
    }

    // testing the getConsultantListWithName method for positive scenario
    @isTest
    static void testGetConsultantListWithName_Positive() {

        Test.startTest();
        // Test the getConsultantListWithName method with an existing Consultant name
        List<Consultant__c> result = ConsultantController.getConsultantListWithName('Test Consultant', 5, 0);
        Test.stopTest();

        // Assertions
        System.assertEquals(5, result.size(), 'Incorrect number of consultants retrieved');
    }

    // testing the getConsultantListWithName method for negative scenario
    @isTest
    static void testGetConsultantListWithName_Negative() {
        Test.startTest();
        // Test the getConsultantListWithName method with a non-existant Consultant Name
        List<Consultant__c> result = ConsultantController.getConsultantListWithName('NonExistentConsultant', 5, 0);
        Test.stopTest();

        // Assertions
        System.assertEquals(0, result.size(), 'Unexpected consultants retrieved');
    }
    
    //testing the getConsultantList method
    @IsTest
    static void testGetConsultantList(){
        Test.startTest();
        List<Consultant__c> result = ConsultantController.getConsultantList(5, 0);
        Test.stopTest();

        // assertions
        System.assertEquals(5, result.size(), 'Incorrect number of consultants retrieved');
    }
}
