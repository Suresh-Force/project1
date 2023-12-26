public with sharing class ClientController {
  /* Apex controler method to return List of Client record with name containing the passed string
   and with specified Limit and Offset */
  @AuraEnabled(cacheable=true)
  public static List<Client__c> getClientListWithName(
    String name,
    Integer pageSize,
    Integer offset
  ) {
    String strNameLike = '%' + name + '%';
    return [
      SELECT Id, Name, Company_Name__c, Website__c, Phone__c
      FROM Client__c
      WHERE Name LIKE :strNameLike
      ORDER BY Name
      LIMIT :pageSize
      OFFSET :offset
    ];
  }

  /* Apex controller method to return List of Client records with specified LIMIT and OFFSET */
  @AuraEnabled(cacheable=true)
  public static List<Client__c> getClientList(
    Integer pageSize,
    Integer offset
  ) {
    return [
      SELECT Id, Name, Company_Name__c, Website__c, Phone__c
      FROM Client__c
      ORDER BY Name
      LIMIT :pageSize
      OFFSET :offset
    ];
  }
}
