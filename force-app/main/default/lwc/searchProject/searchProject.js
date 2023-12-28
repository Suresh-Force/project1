import { LightningElement, track } from "lwc";
import createProjectModal from "c/createProject";

import getProjectListWithName from "@salesforce/apex/ProjectController.getProjectListWithName";
import getProjectList from "@salesforce/apex/ProjectController.getProjectList";

import PROJECT_NAME_FIELD from "@salesforce/schema/Project__c.Name";
import PROJECT_ESTIMATE_BUDGET_FIELD from "@salesforce/schema/Project__c.Estimate_Budget__c";
import PROJECT_START_DATE_FIELD from "@salesforce/schema/Project__c.Start_Date__c";
import PROJECT_END_DATE_FIELD from "@salesforce/schema/Project__c.End_Date__c";
const COLUMNS = [
  {
    label: "Name",
    fieldName: PROJECT_NAME_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Estimate Budget",
    fieldName: PROJECT_ESTIMATE_BUDGET_FIELD.fieldApiName,
    type: "currency"
  },
  {
    label: "Start Date",
    fieldName: PROJECT_START_DATE_FIELD.fieldApiName,
    type: "date"
  },
  {
    label: "End Date",
    fieldName: PROJECT_END_DATE_FIELD.fieldApiName,
    type: "date"
  }
];

const PAGE_SIZE = 10;

export default class SearchProject extends LightningElement {
  columns = COLUMNS;
  searchText;
  @track projects = [];
  @track projectsWithName = [];
  @track projectsWithoutName = [];
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
    const result = await createProjectModal.open({
      label: "Create Project",
      size: "medium"
    });
    console.log(result);
  }

  // async function to laod initial data or data when Search input is Empty
  async loadData() {
    this.isLoading = true;
    this.loadMoreStatus = "Loading some Data ...";
    try {
      const result = await getProjectList({
        pageSize: PAGE_SIZE,
        offset: 0
      });
      console.log("Initial loaded data", result);
      this.projectsWithoutName = result;
      this.projects = this.projectsWithoutName;
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
      const result = await getProjectListWithName({
        name: this.searchText,
        pageSize: PAGE_SIZE,
        offset: 0
      });
      console.log("Loaded data with name:", result);
      this.projectsWithName = result;
      this.projects = this.projectsWithName;
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
      const result = await getProjectList({
        name: this.searchText,
        pageSize: PAGE_SIZE,
        offset: this.projects.length
      });
      this.projectsWithName = [...this.projectsWithName, ...result];
      this.projects = this.projectsWithName;
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
      const result = await getProjectList({
        pageSize: PAGE_SIZE,
        offset: this.projects.length
      });
      this.projectsWithoutName = [...this.projectsWithoutName, ...result];
      this.projects = this.projectsWithoutName;
    } catch (error) {
      console.log("Error loading more data: ", error);
      this.loadMoreStatus = "Error loading more data";
    } finally {
      this.isLoading = false;
      this.loadMoreStatus = "";
    }
  }
}
