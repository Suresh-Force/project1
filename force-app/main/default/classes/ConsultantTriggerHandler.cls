public class ConsultantTriggerHandler {

    // Method to handle logic of after insert Trigger of Consultant Object records named ConsultantTrigger.trigger
    public static void onAfterInsert(List<Consultant__c> conList){
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

    // Method to handle logic of before delete Trigger of Consultant Object records named ConsultantTrigger.trigger
    public static void onBeforeDelete(List<Consultant__c> conList){
        for(Consultant__c con : conList){
            if(con.Status__c == 'Approved' && con.Type__c == 'Employee'){
                con.addError('You cannot delete an Approved Employee Record');
            }
        }
    }
    
}