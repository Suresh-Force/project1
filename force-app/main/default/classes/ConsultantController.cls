public with sharing class ConsultantController {
  /* Apex controler method to return List of Consultant record with name containing the passed string
   and with specified Limit and Offset */
  @AuraEnabled(cacheable=true)
  public static List<Consultant__c> getConsultantListWithName(
    String name,
    Integer pageSize,
    Integer offset
  ) {
    String strNameLike = '%' + name + '%';
    return [
      SELECT Id, Name, Type__c, Status__c, Email__c, Phone__c, Supervisor__c
      FROM Consultant__c
      WHERE Name LIKE :strNameLike
      ORDER BY Name
      LIMIT :pageSize
      OFFSET :offset
    ];
  }

  /* Apex controller method to return List of Consultant records with specified LIMIT and OFFSET */
  @AuraEnabled(cacheable=true)
  public static List<Consultant__c> getConsultantList(
    Integer pageSize,
    Integer offset
  ) {
    return [
      SELECT Id, Name, Type__c, Status__c, Email__c, Phone__c
      FROM Consultant__c
      ORDER BY Name
      LIMIT :pageSize
      OFFSET :offset
    ];
  }
}
