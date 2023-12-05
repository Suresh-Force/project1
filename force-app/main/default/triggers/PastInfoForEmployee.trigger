trigger PastInfoForEmployee on Consultant__c (after insert) {
    PastInfoForEmployeeHandler.createEmployeePastInfo(Trigger.new);
}