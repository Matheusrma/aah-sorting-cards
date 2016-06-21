
/*
{ Template Results Format
  
  #Random Id
  id: int,

  #TODO: Add user details
  user : User,

  #Template Id
  templateId: int,

  #Cards Hummand Readable Mapping
  cardsMapping: [{
    cardName : string,
    bucketText: string
  }]
}
*/


StorageCtrl = function(){}

ProgressBar.LOCAL_STORAGE_KEY_ = 'template_results';

StorageCtrl.prototype = {

  generateRandomId: function(){
    return Math.round(Math.random() * 10000000)
  },

  saveTemplateResult:function(templateId, buckets){

    var template_results = this.recoverAllTemplateResults()

    new_template_result = {};
    new_template_result.id = this.generateRandomId();
    new_template_result.templateId = templateId;
    new_template_result.user = {}

    new_template_result.cardsMapping = [];

    buckets.forEach(function (bucket){
      var cardIds = bucket.getCardIds();
      var bucketText = bucket.getText();

      cardIds.forEach(function(cardId){
        new_template_result.cardsMapping.push({
          cardId    :cardId,
          bucketText:bucketText
        });
      });
    });

    template_results.push(new_template_result);
    localStorage.setItem(ProgressBar.LOCAL_STORAGE_KEY_, JSON.stringify(template_results));
  },

  recoverAllTemplateResults:function(){
    var template_results = localStorage.getItem(ProgressBar.LOCAL_STORAGE_KEY_)

    if (!template_results) return []

    return JSON.parse(template_results);
  }

}