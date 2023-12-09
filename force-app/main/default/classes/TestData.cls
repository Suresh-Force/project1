// Test Utility Class which contain methods to generate Test Data
@IsTest
public class TestData {

    // Method to create Consultant records with Type == Employee and and Status == Approved
    public static List<Consultant__c> createTestData(Integer numOfConsultant) {
        List<Consultant__c> conList = new List<Consultant__c>();
        
        for(Integer i=1; i<=numOfConsultant; i++) {
            Consultant__c con = new Consultant__c(
                Name = 'Test Consultant ' + i,
                Type__c = 'Employee',
                Status__c = 'Approved',
                Date_of_Joining__c = Date.valueOf('2023-12-1'),
                Job_Role__c = 'Test Role',
                Phone__c = '999-999-9999',
                Aadhar_Number__c = '9999 9999 9999',
                PAN__c = 'ABCDE12345');
            conList.add(con);
        }
        return conList;
    }

    // Method for Negative Scenario where Consultant is not an Approved Employee
    public static List<Consultant__c> createNegativeTestData(Integer numOfConsultant){
        List<Consultant__c> conList = new List<Consultant__c>();
        
        for(Integer i=1; i<=numOfConsultant; i++) {
            Consultant__c con = new Consultant__c(
                Name = 'Test Consultant ' + i,
                Type__c = 'Intern',
                Status__c = 'New',
                Phone__c = '999-999-9999',
                Aadhar_Number__c = '9999 9999 9999',
                PAN__c = 'ABCDE12345');
            conList.add(con);
        }
        return conList;
    }
}