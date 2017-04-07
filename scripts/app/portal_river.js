require.config({
   baseUrl: '../../scripts/libs'
});
require(['keyDefine', 'global', 'JAlex', 'GKey', 'myajax', 'util', 'component'], function(){
	//视频播放
      //Video.stop();
      var reqPath = SERVER_PATH + 'GetColumnList';
      var url = '../testData/focus.json';
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
      var lstCompt = null;

      function render(data, domNode) {
          domNode = domNode || getByClass('txt-list');
          var tpl = '<li class="txt-list-item" data-plateid="{{plateId}}">{{plateTitle}}</li>';

          // 构建DOM结构
          createHtmlFactory(tpl, data, domNode);

          // 组件参数配置
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
	                location.href = './riverDesc.html?plateId=' + plateId;
	             }
             }
          };

          // 创建组件
          lstCompt = createObjFactory(config);

      }

      // 分页组件参数配置
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

      // 分页组件的创建
 	  pageNationCompt = createObjFactory(config);
      pageNationCompt.init(1);

      // 页面初始化操作
      ajax(GLOBAL_CONFIG.pageInitParam);
});
