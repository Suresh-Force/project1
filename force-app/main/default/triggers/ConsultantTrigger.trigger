trigger ConsultantTrigger on Consultant__c (before delete, after insert) {
    if(Trigger.isBefore){
        if(Trigger.isDelete){
            // Check the logic for before delete
            ConsultantTriggerHandler.onBeforeDelete(Trigger.old);
        }
    }
    if(Trigger.isAfter){
        if(Trigger.isInsert){
            //Check the logic for after insert
            ConsultantTriggerHandler.onAfterInsert(Trigger.new);
        }
    }
}