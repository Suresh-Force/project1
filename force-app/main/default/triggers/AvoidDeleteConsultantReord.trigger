// This Trigger avoids deletion of Approved Consultant(Employee) Records 
trigger AvoidDeleteConsultantReord on Consultant__c (before delete) {
    for(Consultant__c con : Trigger.old){
        if(con.Status__c == 'Approved' && con.Type__c == 'Employee'){
            con.addError('You cannot delete an Approved Employee Record');
        }
    }
}