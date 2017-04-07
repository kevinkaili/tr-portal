require.config({
   baseUrl: '../../scripts/libs',
});
require(['keyDefine', 'global', 'JAlex', 'GKey', 'myajax', 'util', 'component'], function(keyDefine, global, JAlex, GKey, myajax, util, component){
      keyDefine = keyDefine;
      global = keyDefine ;
      JAlex = JAlex;
      GKey = GKey;
      myajax = myajax;
      util = util;
      component = component;


      var SERVER_PATH = global.SERVER_PATH;

      var createHtmlFactory =  component.createHtmlFactory;

      var createObjFactory = component.createObjFactory;

      var reqPath = SERVER_PATH + 'GetPageList';

      var ajax = myajax.ajax;

      var getByClass =  util.getByClass;
      var getClientInfo = util.getClientInfo;
      var getParam = util.getParam;

      var reqPath = SERVER_PATH + 'GetColumnList';
      var url = '../../testData/focus.json';
      //页面配置参数
      var GLOBAL_CONFIG = {
          pageInitParam: {
             url: url,
             data: {
                client: getClientInfo().smartNo,
                parentId: getParam('parentId'),
                reginCode: getClientInfo().reginCode,
                pageType: 1,
                parentType: 1,
                startPage: 1,
                pageSize: 8,
                exds: ''
             },
             method: 'GET',
             success: function(data) {
                 data = eval('('+ data +')');
                 render(data['plateList']);
             }
          }
      };
      var lstCompt = null, pageNationCompt = null;
      function render(data, domNode) {
          domNode = domNode || getByClass('txt-list');
          tpl = '<li class="txt-list-item" data-plateid="{{plateId}}">{{plateTitle}}</li>';
          // 构建DOM节点
          createHtmlFactory(tpl, data, domNode);

          var config = {
          	 nodes: getByClass('txt-list-item'),
             css: {borderColor: '#f60'},
             oldStyle: {borderColor: "#110f7c"},
             up: function() {
             	var self = this;
	            if (self.nowIndex > 0) {
	                self.blur();
	                self.nowIndex --;
	                self.focus();
	            }
	         },
	         down: function() {
	         	 var self = this;
	             if (self.nowIndex < self.itemSize - 1) {
	                self.blur();
	                self.nowIndex ++;
	                self.focus();
	             } else {
	                self.blur();
	                self.showHighLight = false;
	                pageNationCompt.show();
	             }
	         },
	         href: function() {
	         	var self = this,
                 nowNode = self.aItems[self.nowIndex],
                 plateId = nowNode.getAttribute('data-plateid');
	             if (plateId.length) {
	                location.href = './focusDesc.html?plateId=' + plateId;
	             }
	         }

          };
          // 创建组件对象
          lstCompt = createObjFactory(config);
      }

      var config = {
      	 nodes: getByClass('pagenation-btn'),
         css: {backgroundColor: '#f60'},
         up: function() {
         	var self = this;
            if (lstCompt) {
              self.blur();
              self.showHighLight = false;
              lstCompt.show();
            }
         },
         right: function() {
         	var self = this;
	        if (self.nowIndex < self.itemSize - 1) {
              self.blur();
              self.nowIndex ++;
              self.focus();
	        }
	     },
	     left: function() {
	     	 var self = this;
	         if (self.nowIndex > 0) {
	            self.blur();
	            self.nowIndex --;
	            self.focus();
	         }
	     },
	     href: function() {
	     	 history.go(-1);
	     }
      }
      pageNationCompt = createObjFactory(config);
      pageNationCompt.init(1);

      //页面初始化
      ajax(GLOBAL_CONFIG.pageInitParam);
});
