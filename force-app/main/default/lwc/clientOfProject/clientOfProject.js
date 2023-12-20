import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CLIENT_OBJECT from '@salesforce/schema/Client__c';
import CLIENT_NAME_FIELD from '@salesforce/schema/Client__c.Name';
import CLIENT_COMPANY_NAME_FIELD from '@salesforce/schema/Client__c.Company_Name__c';
import CLIENT_WEBSITE_FIELD from '@salesforce/schema/Client__c.Website__c';
import CLIENT_PHONE_FIELD from '@salesforce/schema/Client__c.Phone__c';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import PROJECT_CLIENT_FIELD from '@salesforce/schema/Project__c.Client__c';

let recName; // Variable to store value of Client Name field
const clientField = [PROJECT_CLIENT_FIELD];

export default class ClientOfProject extends LightningElement {
    @api recordId;
    clientId;
    data;
    error;
    objectApiName = CLIENT_OBJECT;

    fields = [
        CLIENT_NAME_FIELD, CLIENT_COMPANY_NAME_FIELD, CLIENT_WEBSITE_FIELD, CLIENT_PHONE_FIELD
    ];

    // record containing Consultant Id
    @wire(getRecord, {recordId: "$recordId", fields: clientField})
    getClientId({data, error}) {
        if (data) {
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    // getting CLient Id using getFieldValue adapter
    @api
    get clientId() {
        return getFieldValue(this.data, PROJECT_CLIENT_FIELD);
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
            title: recName+' Client record updated',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}