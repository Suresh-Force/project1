import { LightningElement, track } from "lwc";
import createClientModal from "c/createClient";

import getClientListWithName from "@salesforce/apex/ClientController.getClientListWithName";
import getClientList from "@salesforce/apex/ClientController.getClientList";

import CLIENT_NAME_FIELD from "@salesforce/schema/Client__c.Name";
import CLIENT_COMPANY_NAME_FIELD from "@salesforce/schema/Client__c.Company_Name__c";
import CLIENT_WEBSITE_FIELD from "@salesforce/schema/Client__c.Website__c";
import CLIENT_PHONE_FIELD from "@salesforce/schema/Client__c.Phone__c";
const COLUMNS = [
  {
    label: "Name",
    fieldName: CLIENT_NAME_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Company Name",
    fieldName: CLIENT_COMPANY_NAME_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Website",
    fieldName: CLIENT_WEBSITE_FIELD.fieldApiName,
    type: "url"
  },
  {
    label: "Phone",
    fieldName: CLIENT_PHONE_FIELD.fieldApiName,
    type: "phone"
  }
];

const PAGE_SIZE = 10;

export default class SearchClient extends LightningElement {
  columns = COLUMNS;
  searchText;
  @track clients = [];
  @track clientsWithName = [];
  @track clientsWithoutName = [];
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

  async handleClick() {
    //TODO: handle click event on action button to display modal component
    const result = await createClientModal.open({
      label: "Create Client",
      size: "medium"
    });
    console.log(result);
  }

  // async function to laod initial data or data when Search input is Empty
  async loadData() {
    this.isLoading = true;
    this.loadMoreStatus = "Loading some Data ...";
    try {
      const result = await getClientList({
        pageSize: PAGE_SIZE,
        offset: 0
      });
      console.log("Initial loaded data", result);
      this.clientsWithoutName = result;
      this.clients = this.clientsWithoutName;
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
      const result = await getClientListWithName({
        name: this.searchText,
        pageSize: PAGE_SIZE,
        offset: 0
      });
      console.log("Loaded data with name:", result);
      this.clientsWithName = result;
      this.clients = this.clientsWithName;
      if (result.length < PAGE_SIZE) {
        this.loadExtraData = false;
      } else {
        this.loadExtraData = true;
      }
    } catch (error) {
      console.error(
        "Error while loading initial data with name " +
          this.searchText +
          ": " +
          error
      );
      this.loadMoreStatus =
        "Error while loading initial data with name: " + this.searchText;
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
      const result = await getClientList({
        name: this.searchText,
        pageSize: PAGE_SIZE,
        offset: this.clients.length
      });
      this.clientsWithName = [...this.clientsWithName, ...result];
      this.clients = this.clientsWithName;
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
      const result = await getClientList({
        pageSize: PAGE_SIZE,
        offset: this.clients.length
      });
      this.clientsWithoutName = [...this.clientsWithoutName, ...result];
      this.clients = this.clientsWithoutName;
    } catch (error) {
      console.log("Error loading more data: ", error);
      this.loadMoreStatus = "Error loading more data";
    } finally {
      this.isLoading = false;
      this.loadMoreStatus = "";
    }
  }
}
