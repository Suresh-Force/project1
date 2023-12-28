import { LightningElement, track } from "lwc";
import createTrainingModal from "c/createTraining";

import getTrainingListWithName from "@salesforce/apex/TrainingController.getTrainingListWithName";
import getTrainingList from "@salesforce/apex/TrainingController.getTrainingList";

import TRAINING_NAME_FIELD from "@salesforce/schema/Training__c.Name";
import TRAINING_TRAINING_CO_ORDINATOR_FIELD from "@salesforce/schema/Training__c.Training_Co_ordinator__c";
import TRAINING_TRAINING_FIELD from "@salesforce/schema/Training__c.Training__c";
import TRAINING_START_DATE_FIELD from "@salesforce/schema/Training__c.Start_Date__c";
import TRAINING_END_DATE_FIELD from "@salesforce/schema/Training__c.End_Date__c";
const COLUMNS = [
  {
    label: "Name",
    fieldName: TRAINING_NAME_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Training Co-ordinator",
    fieldName: TRAINING_TRAINING_CO_ORDINATOR_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Training",
    fieldName: TRAINING_TRAINING_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Start Date",
    fieldName: TRAINING_START_DATE_FIELD.fieldApiName,
    type: "date"
  },
  {
    label: "End Date",
    fieldName: TRAINING_END_DATE_FIELD.fieldApiName,
    type: "date"
  }
];

const PAGE_SIZE = 10;

export default class SearchTraining extends LightningElement {
  columns = COLUMNS;
  searchText;
  @track trainings = [];
  @track trainingsWithName = [];
  @track trainingsWithoutName = [];
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
    const result = await createTrainingModal.open({
      label: "Create Training",
      size: "medium"
    });
    console.log(result);
  }

  // async function to laod initial data or data when Search input is Empty
  async loadData() {
    this.isLoading = true;
    this.loadMoreStatus = "Loading some Data ...";
    try {
      const result = await getTrainingList({
        pageSize: PAGE_SIZE,
        offset: 0
      });
      console.log("Initial loaded data", result);
      this.trainingsWithoutName = result;
      this.trainings = this.trainingsWithoutName;
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
      const result = await getTrainingListWithName({
        name: this.searchText,
        pageSize: PAGE_SIZE,
        offset: 0
      });
      console.log("Loaded data with name:", result);
      this.trainingsWithName = result;
      this.trainings = this.trainingsWithName;
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
      const result = await getTrainingList({
        name: this.searchText,
        pageSize: PAGE_SIZE,
        offset: this.trainings.length
      });
      this.trainingsWithName = [...this.trainingsWithName, ...result];
      this.trainings = this.trainingsWithName;
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
      const result = await getTrainingList({
        pageSize: PAGE_SIZE,
        offset: this.trainings.length
      });
      this.trainingsWithoutName = [...this.trainingsWithoutName, ...result];
      this.trainings = this.trainingsWithoutName;
    } catch (error) {
      console.log("Error loading more data: ", error);
      this.loadMoreStatus = "Error loading more data";
    } finally {
      this.isLoading = false;
      this.loadMoreStatus = "";
    }
  }
}
