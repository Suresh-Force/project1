@IsTest
public class TestConsultantTrigger {
    @IsTest
    static void testAfterInsert(){
        // Load Test Data: create Consultant records with Type as Employee and Status as Approved
        List<Consultant__c> conList = TestData.createTestData(300);
        
        // Test the after insert trigger 
        Test.startTest();
        insert conList;
        Test.stopTest();

        // Verify Test Results: Verify if the Past Info Records are created after insert
        System.assertEquals(300, [SELECT COUNT() FROM Past_Information__c WHERE Consultant__c In :conList],
                            'Error! Past Information Records were not created properly');
    }
    
    @IsTest
    static void testNegativeAfterInsert(){
        // Load Test Data: create Consultant records where Consultant is not Approved Employee
        List<Consultant__c> conList = TestData.createNegativeTestData(300);
        
        // Test the after insert trigger for negative scenario
        Test.startTest();
        insert conList;
        Test.stopTest();

        // Verify Test Results: Verify if the Past Info Records are not created after insert
        System.assertEquals(0, [SELECT COUNT() FROM Past_Information__c WHERE Consultant__c In :conList],
                            'Error! Some Past Information Records were created');
    }

    @IsTest
    static void testBeforeDelete(){
        // Load Test Data: create Consultant records where Type is Employee and Status is Approved
        List<Consultant__c> conList = TestData.createTestData(300);
        insert conList;

        for(Consultant__c con : conList){
            con.Status__c = 'Approved';
        }
        update conList;

        // Test the before trigger for positive scenario
        Test.startTest();
        try {
            delete conList;
        } catch (Exception e) {
            // Verify Test Results: Verify if the Past Info Records are not deleted
            String message = e.getMessage();
            System.debug(message);
            Boolean expectedExceptionThrown =  message.contains('FIELD_CUSTOM_VALIDATION_EXCEPTION');
            System.assertEquals(expectedExceptionThrown, true, 'Error! FIELD_CUSTOM_VALIDATION_EXCEPTION was not thrown');
        }
        Test.stopTest();
    }

    @IsTest
    static void testNegativeBeforeDelete(){
        //Load Test Data: create Consultant records where Consultant is not an Approved Employee
        List<Consultant__c> conList= TestData.createNegativeTestData(300);
        insert conList;

        // Test the before trigger for positive scenario
        Test.startTest();
        Database.DeleteResult[] delResult = Database.delete(conList);
        Test.stopTest();

        // Verify Test Results: Verify if the Past Info Records are not deleted
        for(Database.DeleteResult dr : delResult){
            System.assert(dr.isSuccess(), 'Error! All Consultant Records were not deleted');
            System.assert(dr.getErrors().isEmpty(), 'Error! Some Consultant records were not deleted');
        }
    }

}

