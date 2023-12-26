@IsTest
public class TestPastInformationTrigger {
  @IsTest
  static void testBeforeDelete() {
    List<Consultant__c> conList = TestData.createTestData(300);
    insert conList;
    for (Consultant__c con : conList) {
      con.Status__c = 'Approved';
    }
    update conList;

    List<Past_Information__c> pastInfoList = new List<Past_Information__c>(
      [SELECT Id FROM Past_Information__c WHERE Consultant__c IN :conList]
    );

    Test.startTest();
    try {
      delete pastInfoList;
    } catch (Exception e) {
      // Verify Test Results: Verify if the Past Info Records are not deleted
      String message = e.getMessage();
      System.debug(message);
      Boolean expectedExceptionThrown = message.contains(
        'FIELD_CUSTOM_VALIDATION_EXCEPTION'
      );
      System.assertEquals(
        expectedExceptionThrown,
        true,
        'Error! FIELD_CUSTOM_VALIDATION_EXCEPTION was not thrown'
      );
    }
    Test.stopTest();
  }

  @IsTest
  static void testNegativeBeforeDelete() {
    List<Consultant__c> conList = TestData.createNegativeTestData(300);
    insert conList;

    List<Past_Information__c> pastInfoList = new List<Past_Information__c>();
    for (Consultant__c con : conList) {
      pastInfoList.add(
        new Past_Information__c(
          Consultant__c = con.Id,
          Name = 'test name',
          Company_Name__c = 'Test Company Name'
        )
      );
    }
    insert pastInfoList;

    Test.startTest();
    Database.DeleteResult[] deleteResult = Database.delete(pastInfoList);
    Test.stopTest();

    for (Database.DeleteResult dr : deleteResult) {
      System.assert(
        dr.isSuccess(),
        'Error! Past Information records were not deleted'
      );
      System.assert(
        dr.getErrors().isEmpty(),
        'Error! Some Past Info records were deleted'
      );
    }
  }
}
