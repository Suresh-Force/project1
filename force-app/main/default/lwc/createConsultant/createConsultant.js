// import { LightningElement } from "lwc";
import lightningModal from "lightning/modal";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CONSULTANT_OBJECT from "@salesforce/schema/Consultant__c";
import { createRecord } from "lightning/uiRecordApi";

let recName; // Variable to store value of Client Name field

export default class CreateConsultant extends lightningModal {
  objectApiName = CONSULTANT_OBJECT;

  // action on click of save button: to craete a new Consultant record
  async handleSave() {
    try {
      const fields = this.template.querySelectorAll("lightning-input-field");
      const fieldsMap = {};

      fields.forEach((field) => {
        fieldsMap[field.fieldName] = field.value;
      });

      const recordInput = {
        apiName: this.objectApiName.objectApiName,
        fields: fieldsMap
      };

      const result = await createRecord(recordInput);
      console.log("result from createRecord is: ", result);

      recName = result.fields.Name.value;
      this.close();
      this.dispatchEvent(
        new ShowToastEvent({
          title: recName + " Consultant record created",
          message: "Record ID: " + result.id,
          variant: "success",
          mode: "sticky"
        })
      );
    } catch (error) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error creating record",
          message: error.body.message,
          variant: "error",
          mode: "sticky"
        })
      );
    }
  }

  // handle click of cancel button to close modal component
  handleDismiss() {
    this.close();
  }
}
