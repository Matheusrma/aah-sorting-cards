
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

StorageCtrl.USER_ID = -1;

StorageCtrl.prototype = {

  generateRandomId: function(){
    return Math.round(Math.random() * 10000000)
  },

  generateNewUserId: function(){
    StorageCtrl.USER_ID = this.generateRandomId()
  },

  saveTemplateResult:function(templateId, buckets){
    var template_results = this.recoverAllTemplateResults();
    
    if (template_results.length > 0)
      template_results = JSON.parse(JSON.parse(template_results));

    new_template_result = {};
    new_template_result.id = this.generateRandomId();
    new_template_result.templateId = templateId;
    new_template_result.user = {
      id: StorageCtrl.USER_ID
    }

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
    localStorage.setItem(StorageCtrl.LOCAL_STORAGE_KEY_+templateId, JSON.stringify(new_template_result));
    localStorage.setItem(StorageCtrl.LOCAL_STORAGE_KEY_, JSON.stringify(template_results));
  },

  recoverAllTemplateResults:function(){
    var template_results = localStorage.getItem(StorageCtrl.LOCAL_STORAGE_KEY_)

    if (!template_results) return []

    return JSON.stringify(template_results);
  },

  clearTemplateResults:function(){
    localStorage.removeItem(StorageCtrl.LOCAL_STORAGE_KEY_);
    for (i = 0; i < Config.TEMPLATES.length; i++) {
      localStorage.removeItem(StorageCtrl.LOCAL_STORAGE_KEY_+i);
    }
  },
  rebuildCardsFromLocalStorage: function() {

  }
}