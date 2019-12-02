/***
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 ***/
if (!CQ_Analytics.YodaStoreMgr) {    
    CQ_Analytics.ClientContextUtils.onStoreRegistered("yoda", function(store) {
    });
    
    /**
     * Yoda JSON store. Gets the userinformation of the current loaded user and renders them.
     * @singleton
     */
    CQ_Analytics.YodaStoreMgr = CQ_Analytics.PersistedJSONStore.registerNewInstance("yoda", {});
    
    CQ_Analytics.YodaStoreMgr.loadData = function (obj) {
        if(!this.data){
            this.data = {};
        }
        for(var key in obj) {
            this.data[key] = obj[key];
        }
       this.fireEvent("update");        
    }
    
    CQ_Analytics.YodaStoreMgr.flushData = function () {
        var store = new CQ_Analytics.SessionPersistence();
        store.remove("yoda");        
        this.data = {};
        this.initProperty = {};
        this.fireEvent("update");
    }

    CQ_Analytics.YodaStoreMgr.init = function () {
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    }
}
