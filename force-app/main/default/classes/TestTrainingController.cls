@isTest
private class TestTrainingController {
    // setup data for for testing the Apex controller
    @TestSetup
    static void makeData(){
        List<Training__c> trainingList = new List<Training__c>();
        for(Integer i=1; i<=5; i++){
            trainingList.add(new Training__c(
                Technology__c = 'Web Development',
                Training__c = 'JavaScript',
                Start_Date__c = Date.valueOf('2023-12-1'),
                End_Date__c = Date.valueOf('2023-12-31')
            ));
        }
        insert trainingList;
    }

    // testing the getTrainingListWithName method for positive scenario
    @isTest
    static void testGetTrainingListWithName_Positive() {

        Test.startTest();
        // Test the getTrainingListWithName method with an existing Training name
        List<Training__c> result = TrainingController.getTrainingListWithName('TRN', 5, 0);
        Test.stopTest();

        // Assertions
        System.assertEquals(5, result.size(), 'Incorrect number of trainings retrieved');
    }

    // testing the getTrainingListWithName method for negative scenario
    @isTest
    static void testGetTrainingListWithName_Negative() {
        Test.startTest();
        // Test the getTrainingListWithName method with a non-existant Training Name
        List<Training__c> result = TrainingController.getTrainingListWithName('NonExistentTraining', 5, 0);
        Test.stopTest();

        // Assertions
        System.assertEquals(0, result.size(), 'Unexpected trainings retrieved');
    }
    
    //testing the getTrainingList method
    @IsTest
    static void testGetTrainingList(){
        Test.startTest();
        List<Training__c> result = TrainingController.getTrainingList(5, 0);
        Test.stopTest();

        // assertions
        System.assertEquals(5, result.size(), 'Incorrect number of trainings retrieved');
    }
}