@isTest
private class TestProjectController {
    // setup data for for testing the Apex controller
    @TestSetup
    static void makeData(){
        List<Project__c> projectList = new List<Project__c>();
        for(Integer i=1; i<=5; i++){
            projectList.add(new Project__c(
                Name = 'Test Project '+i,
                Estimate_Budget__c = 100000,
                Start_Date__c = Date.valueOf('2023-12-1'),
                End_Date__c = Date.valueOf('2023-12-31')
            ));
        }
        insert projectList;
    }

    // testing the getProjectListWithName method for positive scenario
    @isTest
    static void testGetProjectListWithName_Positive() {

        Test.startTest();
        // Test the getProjectListWithName method with an existing Project name
        List<Project__c> result = ProjectController.getProjectListWithName('Test Project', 5, 0);
        Test.stopTest();

        // Assertions
        System.assertEquals(5, result.size(), 'Incorrect number of projects retrieved');
    }

    // testing the getProjectListWithName method for negative scenario
    @isTest
    static void testGetProjectListWithName_Negative() {
        Test.startTest();
        // Test the getProjectListWithName method with a non-existant Project Name
        List<Project__c> result = ProjectController.getProjectListWithName('NonExistentProject', 5, 0);
        Test.stopTest();

        // Assertions
        System.assertEquals(0, result.size(), 'Unexpected projects retrieved');
    }
    
    //testing the getProjectList method
    @IsTest
    static void testGetProjectList(){
        Test.startTest();
        List<Project__c> result = ProjectController.getProjectList(5, 0);
        Test.stopTest();

        // assertions
        System.assertEquals(5, result.size(), 'Incorrect number of projects retrieved');
    }
}