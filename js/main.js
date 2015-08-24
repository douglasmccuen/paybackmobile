// TODO fix the messed up characters

window.payback = null;

$(function() {
	var Payback = function() {
		
		this.method = {merchantList:"ml", fundraiserList:"fl"};
		
		this.init = function(cfg) {
			
			this.config = cfg;
			
			if (cfg.method)
			{
				if (cfg.method == this.method.merchantList)
				{
					this.initMerchantList(cfg.id, cfg.speed);
				}
				else
				{
					this.initFundraiserList(cfg.cobrand);
				}
			}
			

		};
		
		/*
		 *	Turn the Fundraiser Names into URLs.
		 */
		this.initFundraiserList = function(cobrand) {
			var baseUrl = "http://talool.com/fundraiser/payback/"+cobrand+"/";
			var list = $(".list-container.fundraiser");
			$.getJSON('/js/fundraisers.json',function(data) {
				var fundraisers = data[cobrand].sort();
				$.each(fundraisers, function(i,item){
					var nm = item.replace(/ /g,'').toLowerCase();
					var link = "<a class='list-item' href='"+ baseUrl + nm + "'>" + item + "</a>";
					list.append(link);
				});
			});
		};
		
		/*
		 *	Turn the Merchant Names into list items.
		 *  http://www.talool.com/api/merchants/book/1b3ec086-d697-4b67-9192-40c38a96b0e7
		 */
		this.initMerchantList = function(id, speed) {
            var url = "http://www.talool.com/api/merchants/book/"+id;
            var list = $(".merchant-list");
			$.getJSON(url, function(data) {
				var count = data.length;
                $(data).each(function(i,merchant){
                    var color, icon, elem;
                    if (merchant.category == 'Food')
                    {
                        color = "teal";
                        icon = "food";
                    }
                    else if (merchant.category == 'Shopping Services')
                    {
                        color = "orange";
                        icon = "shopping-cart";
                    }
                    else
                    {
                        color = "green";
                        icon = "ticket";
                    }
                    elem = (i+1==count)?"<div id='last-item' class='list-item'>":"<div class='list-item'>";
                    elem += "<div class='category'><div class='circle "+color+"-bg'><i class='icon icon-"+icon+"'></i></div></div>"
                        + "<div class='title'>"+ merchant.name+"</div></div>";
                    list.append(elem);
                });
                //console.log(list.html());

                // start scrolling
                var iSelector = "#last-item";
                $(iSelector).animatescroll({element: '.merchant-list', scrollSpeed:speed, easing:'linear'});

                var mSelector = ".merchant-list";
                $(mSelector).mouseenter(function(){
                    $(mSelector).stop(true);
                });
			});
		}

	};

	window.payback = new Payback();
	
});