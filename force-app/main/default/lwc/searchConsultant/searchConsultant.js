import { LightningElement, track } from "lwc";

import getConsultantListWithName from "@salesforce/apex/ConsultantController.getConsultantListWithName";
import getConsultantList from "@salesforce/apex/ConsultantController.getConsultantList";

import CONSULTANT_NAME_FIELD from "@salesforce/schema/Consultant__c.Name";
import CONSULTANT_TYPE_FIELD from "@salesforce/schema/Consultant__c.Type__c";
import CONSULTANT_STATUS_FIELD from "@salesforce/schema/Consultant__c.Status__c";
import CONSULTANT_EMAIL_FIELD from "@salesforce/schema/Consultant__c.Email__c";
import CONSULTANT_PHONE_FIELD from "@salesforce/schema/Consultant__c.Phone__c";
import CONSULTANT_SUPERVISOR_FIELD from "@salesforce/schema/Consultant__c.Supervisor__c";
const COLUMNS = [
  {
    label: "Name",
    fieldName: CONSULTANT_NAME_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Type",
    fieldName: CONSULTANT_TYPE_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Status",
    fieldName: CONSULTANT_STATUS_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "E-mail",
    fieldName: CONSULTANT_EMAIL_FIELD.fieldApiName,
    type: "email"
  },
  {
    label: "Phone",
    fieldName: CONSULTANT_PHONE_FIELD.fieldApiName,
    type: "phone"
  },
  {
    label: "Supervisor",
    fieldName: CONSULTANT_SUPERVISOR_FIELD.fieldApiName,
    type: "text"
  }
];

const PAGE_SIZE = 10;

export default class SearchConsultant extends LightningElement {
  columns = COLUMNS;
  searchText;
  @track consultants = [];
  @track consultantsWithName = [];
  @track consultantsWithoutName = [];
  isLoading = false;
  isSearchEmpty = true;
  loadExtraData = false;
  loadMoreStatus;

  connectedCallback() {
    // load initial data
    this.loadData();
  }

  async handleSearch(event) {
    console.log("handleSearch started !!");
    this.isLoading = true;
    // Debouncing this method: do not update the reactive property as
    // long as this function is being called within a delay of 400 ms.
    // This is to avoid a very large number of Apex method calls.
    const searchText = event.target.value;

    if (typeof searchText === "string" && searchText.length === 0) {
      console.log("loadData for empty string initiated !!!");
      this.isSearchEmpty = true;
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      this.delayTimeout = setTimeout(() => {
        console.log("loadData for empty string started !!!");
        this.loadData();
      }, 400);
    } else {
      console.log("LoadDataWithName initiated !!");
      this.isSearchEmpty = false;
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      this.delayTimeout = setTimeout(() => {
        console.log("LoadDataWithName started !!");
        this.loadDataWithName();
      }, 400);
    }

    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      this.searchText = searchText;
    }, 400);
  }

  async loadMoreData() {
    if (this.isSearchEmpty && this.loadExtraData) {
      this.loadMoreDataWithoutName();
    } else if (!this.isSearchEmpty && this.loadExtraData) {
      this.loadMoreDataWithName();
    }
  }

  handleClick() {
    //TODO: handle click event on action button to display modal component
  }

  // async function to laod initial data or data when Search input is Empty
  async loadData() {
    this.isLoading = true;
    this.loadMoreStatus = "Loading some Data ...";
    try {
      const result = await getConsultantList({
        pageSize: PAGE_SIZE,
        offset: 0
      });
      console.log("Initial loaded data", result);
      this.consultantsWithoutName = result;
      this.consultants = this.consultantsWithoutName;
      if (result.length < PAGE_SIZE) {
        this.loadExtraData = false;
      } else {
        this.loadExtraData = true;
      }
    } catch (error) {
      console.error("Error loading initial data: ", error);
      this.loadMoreStatus = "Error loading initial data";
    } finally {
      this.isLoading = false;
      this.loadMoreStatus = "";
    }
  }

  // async function to load initial data with Name specified in the Search input
  async loadDataWithName() {
    this.isLoading = true;
    this.loadMoreStatus = "Loading some Data ...";
    try {
      const result = await getConsultantListWithName({
        name: this.searchText,
        pageSize: PAGE_SIZE,
        offset: 0
      });
      console.log("Loaded data with name:", result);
      this.consultantsWithName = result;
      this.consultants = this.consultantsWithName;
      if (result.length < PAGE_SIZE) {
        this.loadExtraData = false;
      } else {
        this.loadExtraData = true;
      }
    } catch (error) {
      console.error(
        "Error while loading initial data with name " + this.searchText + ": " + error
      );
      this.loadMoreStatus = "Error while loading initial data with name: " + this.searchText; 
    } finally {
      this.isLoading = false;
      this.loadMoreStatus = "";
    }
  }

  // async function to load more data when scolling with name in the Search input
  async loadMoreDataWithName() {
    this.isLoading = true;
    this.loadMoreStatus = "Loading some Data ...";
    try {
      const result = await getConsultantList({
        name: this.searchText,
        pageSize: PAGE_SIZE,
        offset: this.consultants.length
      });
      this.consultantsWithName = [...this.consultantsWithName, ...result];
      this.consultants = this.consultantsWithName;
    } catch (error) {
      console.log(
        "Error loading more data with " + this.searchText + " as name: ",
        error
      );
      this.loadMoreStatus =
        "Error loading more data with " + this.searchText + " as name";
    } finally {
      this.isLoading = false;
      this.loadMoreStatus = "";
    }
  }

  // async function to return more data when scrolling
  async loadMoreDataWithoutName() {
    this.isLoading = true;
    this.loadMoreStatus = "Loading some Data ...";
    try {
      const result = await getConsultantList({
        pageSize: PAGE_SIZE,
        offset: this.consultants.length
      });
      this.consultantsWithoutName = [...this.consultantsWithoutName, ...result];
      this.consultants = this.consultantsWithoutName;
    } catch (error) {
      console.log("Error loading more data: ", error);
      this.loadMoreStatus = "Error loading more data";
    } finally {
      this.isLoading = false;
      this.loadMoreStatus = "";
    }
  }
}
