// TODO stop the scroll on hover
// TODO show a loading spinner
// TODO fix the messed up characters
// TODO remove the merchant count from the image & create a bend and vancouver images

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
			$(".list-container.fundraiser a.list-item").each(function(i){
				var name = this.innerText.replace(/ /g,'').toLowerCase();
				$(this).attr("href", baseUrl + name);
			});
		};
		
		/*
		 *	Turn the Merchant Names into list items.
		 */
		this.initMerchantList = function(speed) {
			var baseUrl = "http://talool.com/fundraiser/payback/colorado/";
			$(".merchant-list div").each(function(i){
				var name = this.innerText;
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