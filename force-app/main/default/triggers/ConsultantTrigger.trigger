trigger ConsultantTrigger on Consultant__c (before delete, after insert) {
    if(Trigger.isBefore){
        if(Trigger.isDelete){
            ConsultantTriggerHandler.onBeforeDelete(Trigger.old);
        }
    }
    if(Trigger.isAfter){
        if(Trigger.isInsert){
            ConsultantTriggerHandler.onAfterInsert(Trigger.new);
        }
    }
}