
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

StorageCtrl.LOCAL_STORAGE_KEY_ = 'template_results';

StorageCtrl.SESSION_ID = -1;

StorageCtrl.prototype = {

  generateRandomId: function(){
    return Math.round(Math.random() * 10000000)
  },

  generateNewUserId: function(){
    StorageCtrl.SESSION_ID = this.generateRandomId()
  },

  saveTemplateResult:function(all_buckets){
    var template_results = this.recoverAllTemplateResults();
    if (template_results.length > 0) {
      template_results = JSON.parse(JSON.parse(template_results));
    }

    for (var i in all_buckets) {
      var buckets = all_buckets[i];
      new_template_result = {};
      new_template_result.id = this.generateRandomId();
      new_template_result.timestamp = new Date();
      new_template_result.templateId = i;
      new_template_result.session_id = StorageCtrl.SESSION_ID
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
    }
    localStorage.setItem(StorageCtrl.LOCAL_STORAGE_KEY_, JSON.stringify(template_results));
  },

  recoverAllTemplateResults:function(){
    var template_results = localStorage.getItem(StorageCtrl.LOCAL_STORAGE_KEY_)

    if (!template_results) return []

    return JSON.stringify(template_results);
  },

  clearTemplateResults:function(){
    localStorage.removeItem(StorageCtrl.LOCAL_STORAGE_KEY_);
  }
}