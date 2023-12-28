# HR Management Application Project 👨‍💼🖥️

---

## Project Overview

Welcome to the HR Management Application on Salesforce! This project is a comprehensive solution for managing HR-related tasks, leveraging the power of Salesforce CRM. It includes custom objects, triggers, Lightning web components (LWC), and more to streamline HR processes.

## Project Structure

### Custom Objects 🛠️

1. **Consultant Object**

   - Fields: Consultant Name, Type, Date of Joining, Street Address, City, State, Experience, Date of Birth, Postal Code, Phone, Aadhar Number, PAN, Email, Supervisor, Status.

2. **Project Object**

   - Fields: Project Name, Start Date, End Date, Client, Duration, Estimate Budget.

3. **Client Object**

   - Fields: Client Name, Company Name, Website, Street Address, State, City, Postal Code, Phone, Fax.

4. **Training Object**

   - Fields: Training ID, Start Date, End Date, Technology, Training, Status, Training Co-ordinator.

5. **Past Information Object**
   - Fields: Past Information Name, Consultant, Start Date, End Date, Feedback, Eligible to Hire, Company Name.

### Project Implementation Highlights ✨

1. **Data Model and Layouts**

   - Created a data model with five objects (Consultant, Past Information, Client, Project, Training) with custom fields inside each object.
   - Designed compact layouts and page layouts for each object's record detail page.

2. **Data Import**

   - Utilized Salesforce Data Loader to import data into the Salesforce org.

3. **Custom App and Page**

   - Created a custom app using App Manager and designed a custom app page using Lightning App Builder.

4. **Triggers**

   - Implemented triggers on the Consultant and Past Information objects.
   - Trigger on Consultant: Creates a Past Information record when a consultant with type as an employee is inserted. Prevents deletion of a consultant record with type as an employee and status as approved.
   - Trigger on Past Information: Throws an error when attempting to delete a Past Information record related to a consultant with type as an employee and status as approved.

5. **Test Classes**

   - Developed test classes for triggers, and Apex Controllers with 100% code coverage.
   - Created a Test Utility class containing methods to create test data for testing purposes.

6. **Lightning Web Components (LWC)**

   - Developed 2 LWC components to display related Consultant and Client information on the Past Information and Project record detail page respectively using `lightning-record-form`
   - Developed 4 LWC components to display and search Consultant, Client, Project, and Training records using `lightning-datatable` and by fetching data using Apex Controllers using the modern `async await` JavaScript Syntax instead of using `@wire` adapter.
   - Implemented infinite scrolling to efficiently load and display all records using the `enable-infinite-loading` attribute of `lightning-datatable` base component.
   - Integrated `lightning-modal` components released in Winter'23 which are triggered by action buttons on the above 4 LWC components to create new records.

7. **LWC Modal Components**
   - Created modal components for Consultant, Client, Project, and Training records using `lightning-modal` base component which contained `lightning-record-edit-form` to create records.
   - Enabled the Save button to save records efficiently using `createRecord(recordInput)` method from `lightning/uiRecordApi`.
   - Enabled the Cancel button to close the Modal component.

## Getting Started

To set up and run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/khushal-ganani/hr-management-app.git`

2. Deploy the project to your Salesforce environment using your preferred deployment tool or Salesforce CLI.

## Contact 📬

Connect with me on my socials:-

LinkedIn: [LinkedIn](www.linkedin.com/in/khushal-ganani) <br>
Gmail: [khushal.ganani@gmail.com](mailto:khushal.ganani@example.com)<br>
Trailhead: [Trailhead](https://www.salesforce.com/trailblazer/khushalg)

