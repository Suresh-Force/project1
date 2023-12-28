import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CONSULTANT_OBJECT from '@salesforce/schema/Consultant__c';
import CONSULTANT_NAME_FIELD from '@salesforce/schema/Consultant__c.Name';
import CONSULTANT_TYPE_FIELD from '@salesforce/schema/Consultant__c.Type__c';
import CONSULTANT_STATUS_FIELD from '@salesforce/schema/Consultant__c.Status__c';
import CONSULTANT_EMAIL_FIELD from '@salesforce/schema/Consultant__c.Email__c';
import CONSULTANT_PHONE_FIELD from '@salesforce/schema/Consultant__c.Phone__c';
import CONSULTANT_SUPERVISOR_FIELD from '@salesforce/schema/Consultant__c.Supervisor__c';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import PASTINFO_CONSULTANT_FIELD from '@salesforce/schema/Past_Information__c.Consultant__c';

let recName; // Variable to store value of Consultant Name field

const consultantField = [PASTINFO_CONSULTANT_FIELD];
export default class ConsultantOfPastInfo extends LightningElement {
    @api recordId;
    consultantId;
    data;
    error;
    objectApiName = CONSULTANT_OBJECT;

    fields = [
        CONSULTANT_NAME_FIELD, CONSULTANT_TYPE_FIELD, CONSULTANT_STATUS_FIELD,
        CONSULTANT_EMAIL_FIELD, CONSULTANT_PHONE_FIELD, CONSULTANT_SUPERVISOR_FIELD
    ];

    

    // record containing Consultant Id
    @wire(getRecord, {recordId: "$recordId", fields: consultantField})
    conId({data, error}) {
        if (data) {
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    // getting Consultant Id using getFieldValue 
    @api
    get consultantId() {
        return getFieldValue(this.data, PASTINFO_CONSULTANT_FIELD);
    }

    // handle actions after submitting the form
    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        recName = fields.Name;
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    // handle actions after record is successfully updated
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: recName+' Consultant record updated',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}