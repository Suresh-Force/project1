// Handler Class for PastInformationTrigger.trigger
public class PastInformationTriggerHandler {
    
    // Method to handle logic of before delete Trigger of Past Information Object records named PastInformationTrigger.trigger
    public static void onBeforeDelete(Set<Id> pastInfoIdSet){

        List<Past_Information__c> piList = [SELECT Id, Consultant__c FROM Past_Information__c WHERE Id IN: pastInfoIdSet];

        map<Id, Consultant__c> conMap = getConsultantMap(piList);
        for(Past_Information__c pi : piList){
            // Check for null value to avoid potential null pointer exception
            Consultant__c con = conMap.get(pi.Consultant__c);
            if(con != null && con.Status__c == 'Approved' && con.Type__c == 'Employee'){
                pi.addError('You cannot delete Past Information of an Approved Employee');
            }
        }
    }

    // private method to return a map<Consultant__c> records related to List<Past_Information__c> records passed with the function
    static map<Id, Consultant__c> getConsultantMap(List<Past_Information__c> piList){
        Set<Id> conIds = new Set<Id>();
        for(Past_Information__c pi: piList){
            conIds.add(pi.Consultant__c);
        }
        return new map<Id, Consultant__c>([SELECT Id, Type__c, Status__c FROM Consultant__c WHERE Id IN: conIds]);
    }

}