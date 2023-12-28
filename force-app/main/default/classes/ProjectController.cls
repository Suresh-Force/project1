public with sharing class ProjectController {
  /* Apex controler method to return List of Project record with name containing the passed string
   and with specified Limit and Offset */
  @AuraEnabled(cacheable=true)
  public static List<Project__c> getProjectListWithName(
    String name,
    Integer pageSize,
    Integer offset
  ) {
    String strNameLike = '%' + name + '%';
    return [
      SELECT Id, Name, Estimate_Budget__c, Start_Date__c, End_Date__c
      FROM Project__c
      WHERE Name LIKE :strNameLike
      ORDER BY Name
      LIMIT :pageSize
      OFFSET :offset
    ];
  }

  /* Apex controller method to return List of Project records with specified LIMIT and OFFSET */
  @AuraEnabled(cacheable=true)
  public static List<Project__c> getProjectList(
    Integer pageSize,
    Integer offset
  ) {
    return [
      SELECT Id, Name, Estimate_Budget__c, Start_Date__c, End_Date__c
      FROM Project__c
      ORDER BY Name
      LIMIT :pageSize
      OFFSET :offset
    ];
  }
}
