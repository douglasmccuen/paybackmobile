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
					this.initMerchantList(cfg.speed);
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
			
			// TODO fundraisers need to pulled apart by state
			$.getJSON('http://dev-www.talool.com/api/merchants/publisher/17907b38-9ce4-4fcd-afff-85ac009b2117/fundraisers', function(data) {
				var count = data.length;
				alert("got talool data for "+count+" fundraisers.");
			});
			
		};
		
		/*
		 *	Turn the Merchant Names into list items.
		 */
		this.initMerchantList = function(speed) {
			// TODO each book has a different url
			$.getJSON('http://dev-www.talool.com/api/merchants/book/1b3ec086-d697-4b67-9192-40c38a96b0e7', function(data) {
				var count = data.length;
				alert("got talool data for "+count+" merchants.");
			});
			
			var baseUrl = "http://talool.com/fundraiser/payback/colorado/";
			$(".merchant-list div").each(function(i){
				var name = this.innerHTML;
				var category = $(this).data('category');
				var color, icon, elem;
				if (category == 'food')
				{
					color = "teal";
					icon = "food";
				}
				else if (category == 'shopping')
				{
					color = "orange";
					icon = "shopping-cart";
				}
				else
				{
					color = "green";
					icon = "ticket";
				}
				elem = "<div class='category'><div class='circle "+color+"-bg'><i class='icon icon-"+icon+"'></i></div></div>"
					 + "<div class='title'>"+name+"</div>";
				this.innerHTML = elem;
				$(this).addClass("list-item");
			});
			
			var mSelector = ".merchant-list";
			var iSelector = "#last-item";
			$(mSelector).toggleClass("hide");
			$(iSelector).animatescroll({element: '.merchant-list', scrollSpeed:speed, easing:'linear'});
			$(mSelector).mouseenter(function(){
				$(mSelector).stop(true);
			});
			
		}

	};

	window.payback = new Payback();
	
});