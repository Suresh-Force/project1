@isTest
private class TestClientController {
    // setup data for for testing the Apex controller
    @TestSetup
    static void makeData(){
        List<Client__c> clientList = new List<Client__c>();
        for(Integer i=1; i<=5; i++){
            clientList.add(new Client__c(
                Name = 'Test Client '+i,
                Company_Name__c = 'Test Company',
                Website__c = 'www.test.com',
                Phone__c = '999-999-9999'
            ));
        }
        insert clientList;
    }

    // testing the getClientListWithName method for positive scenario
    @isTest
    static void testGetClientListWithName_Positive() {

        Test.startTest();
        // Test the getClientListWithName method with an existing Client name
        List<Client__c> result = ClientController.getClientListWithName('Test Client', 5, 0);
        Test.stopTest();

        // Assertions
        System.assertEquals(5, result.size(), 'Incorrect number of clients retrieved');
    }

    // testing the getClientListWithName method for negative scenario
    @isTest
    static void testGetClientListWithName_Negative() {
        Test.startTest();
        // Test the getClientListWithName method with a non-existant Client Name
        List<Client__c> result = ClientController.getClientListWithName('NonExistentClient', 5, 0);
        Test.stopTest();

        // Assertions
        System.assertEquals(0, result.size(), 'Unexpected clients retrieved');
    }
    
    //testing the getClientList method
    @IsTest
    static void testGetClientList(){
        Test.startTest();
        List<Client__c> result = ClientController.getClientList(5, 0);
        Test.stopTest();

        // assertions
        System.assertEquals(5, result.size(), 'Incorrect number of clients retrieved');
    }
}