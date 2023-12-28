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
   - Enabled Cancel button to close the Modal component.

## Getting Started

To set up and run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/khushal-ganani/hr-management-app.git`

2. Deploy the project to your Salesforce environment using your preferred deployment tool or Salesforce CLI.

## Contact 📬

Connect with me on my socials :-

<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDUlEQVR4AWP4////gOLB44D6nTcsGIo33QHi/zTGd0B2YTiAPpYjHIHNAf/piQk6wGPW8f/rLz8HYRCbXg5AWI4GQGJ0cwDY12gAJDbcHUA4CkZAIqQUK7Ts/m/SfxBMs5RupswBaACr+P47b/5zlG/5DyzZ/r/+8hNF7vuvP//nn3r0X6JhJ+0ccPrR+/+H7735jw9cf/n5v0D1Nuo5gBxQve06zR0AjoL7b7/+//zjN4bc+ScfaOeA33///k9Yfg4mDw7u/Xdeo6uhnQP6D93FMNxlxjF0ZbRzgMXEQ9iyI90cALIMJoccDXRzAK6CZog6YNQBow6gIx54Bwx4x2RAu2bAysoEZu9o7xgAQrvkxt3WZi0AAAAASUVORK5CYII=" alt="LinkedIn" href="www.linkedin.com/in/khushal-ganani" style="margin-right: 14px;"> [LinkedIn](www.linkedin.com/in/khushal-ganani) <br>
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAV1BMVEVHcEzZUUXXd2/z9PTeU0fZbmbo5+f0+vrx8vLbQjPaSz7WTkHotLHBOyzDTkPAOCjhhX7ZeHHEo6DqzMrFxcS8cGrae3Ti4uLMdm/p6urQ1NS8OSrl5eWBeqqfAAAAHXRSTlMAc5qd//z//////6Pxof3//+n////y6P/z//9ysazRhhoAAADtSURBVHgB1ZJXgoMwDERTXEUH7wo5uf85Y4mOyQEyCXXevC9uP5L74/klj7v0SmljXRZrtAcmCqWULzPClt4DFDOgIEmyeUrFQM0ES85zgEYAqGtgonUzYp3Mfd3MAHQ9OwAGIewgNYS/FfjHMC4S61rpx4A7gDD0MEkG4B76iDRugEEMQXuWeFDgdYhoTgCG2INYeJ76DEhEksA0R5MbmIi99zxHk+I2oJsAjDEGnvPekMsMTMiF97Qz+MWAfJ33RDlgnKNZQFcAOWJC/FdAaoWQPgcM1zNBR+DFgHTLfwe85KMsHu/LPCrufyEfyewjNsxN1fgAAAAASUVORK5CYII=" alt="Gmail" href="khushal.ganani@gmail.com" style="margin-right: 14px;"> [khushal.ganani@gmail.com](mailto:khushal.ganani@example.com) <br>
<img src="data:image/png;base64,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" alt="Trailhead" href="https://www.salesforce.com/trailblazer/khushalg" style="margin-right: 14px;"> [Trailhead](https://www.salesforce.com/trailblazer/khushalg)
