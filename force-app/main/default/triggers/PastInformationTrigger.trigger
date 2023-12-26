trigger PastInformationTrigger on Past_Information__c (before delete) {

    // Set of Ids of all the Past Information Records that are being deleted
    Set<Id> pastInfoIdSet = new Set<Id>();
    for(Past_Information__c pi : Trigger.old){
        pastInfoIdSet.add(pi.Id);
    }

    if(Trigger.isBefore){
        if(Trigger.isDelete){
            if(!pastInfoIdSet.isEmpty()){

                // Check the logic for before delete 
                PastInformationTriggerHandler.onBeforeDelete(pastInfoIdSet);
            }
        }
    }
    
}