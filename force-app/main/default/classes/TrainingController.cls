public with sharing class TrainingController {
  /* Apex controler method to return List of Training record with name containing the passed string
   and with specified Limit and Offset */
  @AuraEnabled(cacheable=true)
  public static List<Training__c> getTrainingListWithName(
    String name,
    Integer pageSize,
    Integer offset
  ) {
    String strNameLike = '%' + name + '%';
    return [
      SELECT
        Id,
        Name,
        Training_Co_ordinator__c,
        Training__c,
        Start_Date__c,
        End_Date__c
      FROM Training__c
      WHERE Name LIKE :strNameLike
      ORDER BY Name
      LIMIT :pageSize
      OFFSET :offset
    ];
  }

  /* Apex controller method to return List of Training records with specified LIMIT and OFFSET */
  @AuraEnabled(cacheable=true)
  public static List<Training__c> getTrainingList(
    Integer pageSize,
    Integer offset
  ) {
    return [
      SELECT
        Id,
        Name,
        Training_Co_ordinator__c,
        Training__c,
        Start_Date__c,
        End_Date__c
      FROM Training__c
      ORDER BY Name
      LIMIT :pageSize
      OFFSET :offset
    ];
  }
}
