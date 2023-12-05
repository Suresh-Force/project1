public class PastInfoForEmployeeHandler {

    // Method to handle the logic of PastInfoForEmployee Trigger
    public static void createEmployeePastInfo(List<Consultant__c> conList){
        List<Past_Information__c> pastInfoList = new List<Past_Information__c>();
        for(Consultant__c con : conList){
            if(con.Type__c == 'Employee'){
                pastInfoList.add(createPastInfo(con));
            }
        }

        if(!pastInfoList.isEmpty()){
            insert pastInfoList;
        }
    }


    // Helper Method to create a Past Information record for a Consultant record
    static Past_Information__c createPastInfo(Consultant__c con){
        Past_Information__c pastInfo = new Past_Information__c(
            Consultant__c = con.Id,
            Name = con.Job_Role__c,
            Company_Name__c = 'Test Company Name',
            Start_Date__c = con.Date_of_Joining__c
        );

        return pastInfo;
    }
}