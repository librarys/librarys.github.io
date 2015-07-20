$(function (){
	$(".videoBox .close").on("click", function(){
		$(".mask").fadeOut();
		$(".videoBox").removeData("id").fadeOut();
		$(".videoDiscuss").fadeOut();
	});

	$(".banner4").find(".btn1").on("click", function (){
		$(".videoUp").fadeIn();
		$(".mask").fadeIn();
	});

	$(".videoUp").find(".close").on("click", function (){
		$(".videoUp").fadeOut();
		$(".mask").fadeOut();
	});

	//活动规则按钮
	$(document).delegate(".banner4 .btn2", "click", function (){
		$(".ruleBox").css("top", "-500px").fadeIn();
		$(".mask").fadeIn();
	});

	//关闭竞赛规则
	$(".ruleBox .btn").on("click", function(){
		$(".ruleBox").fadeOut();
		$(".mask").fadeOut();
	});

	//首页数据展示
	$.ajax({
		//url: "BarbieHandler.ashx?op= GetUsers",
		url: "js/show.json",
		type: "POST",
		data: {
			pageindex: 1,
			Countperpage: 6
		},
		dataType:"json",
		success: function (res){
			if(res.status){
				var result = res.data;
				var phtoLeft = '';

				for(var i = 0, len = result.length; i < len; i++){
					if(i%2 != 0){
						phtoLeft += '<dl class="no-pr" data-id="'+result[i].ID+'">'
	               				 +'<dt><img src="'+result[i].imgurl+'">'
	               				 +'<span class="share"></span>'
	               				 +'<span class="play"></span></dt>'
	               				 +'<dd class="name">'+result[i].name+'</dd>'
	               				 +'<dd><img src="images/icon3.png"/></dd>'
	               				 +'<dd class="txt"><label>妆容描述：</label>'
	               				 + result[i].Description +'</dd><dd class="oper">'
	                  			 +'<span class="btn dz">'+result[i].count+'</span>'
	                  			 +'<span class="btn pl">0</span></dd></dl>';
					} else {
						phtoLeft += '<dl data-id="'+result[i].ID+'">'
	               				 +'<dt><img src="'+result[i].imgurl+'">'
	               				 +'<span class="share"></span>'
	               				 +'<span class="play"></span></dt>'
	               				 +'<dd class="name">'+result[i].name+'</dd>'
	               				 +'<dd><img src="images/icon3.png"/></dd>'
	               				 +'<dd class="txt"><label>妆容描述：</label>'
	               				 + result[i].Description +'</dd><dd class="oper">'
	                  			 +'<span class="btn dz">'+result[i].count+'</span>'
	                  			 +'<span class="btn pl">0</span></dd></dl>';
					}
				}

				$(".photoShow").html(phtoLeft);

				viewVedio();
			}
		}
	});

	//用户信息上传
	$(".videoUp").find(".cqBtn").on("click", function (){
		var $parent = $(this).parents(".videoUp");
		var name = $parent.find(".iptBox:eq(0)").val();
		var phone = $parent.find(".iptBox:eq(1)").val();
		var textVal = $parent.find("textarea").val();

		$.ajax({
			url: "BarbieHandler.ashx?op=uploadUserInfo",
			type: "POST",
			data: {
				mobile: phone,
				name: name,
				description: textVal 
			},
			dataType: "json",
			success: function (res){
				if(data.status){
					alert("上传成功");
					$(".videoBox").fadeOut();
				}
			}	
		});
	});

	function thisMovie(movieName) {
         if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
         } else {
             return document[movieName];
         }
     }
     
     function callFlash(value) {
    	 thisMovie("videoID").callFlash(value);
     }

	function viewVedio(){
		$(document).delegate(".photoShow dt", "click", function (){
			var id = $(this).parent().data("id");

			$(".mask").fadeIn();
			$(".videoBox").data("id", id).fadeIn(function (){
				callFlash('video.flv');
			});
		});

		//点赞
		$(document).delegate(".oper .dz", "click", function (){
			var id = $(this).parents(".videoBox").data("id");
			var _this = $(this);
			var num = parseInt($(this).html());

			$.ajax({
				//url: "BarbieHandler.ashx?op=AddVote",
				url: "js/data.json",
				type: "POST",
				data: {
					userID: id
				},
				dataType: "json",
				success: function (res){
					if(res.status){
						num++;
						_this.html(num);
					}
				}
			})
		});

		//评论
		$(document).delegate(".oper .pl", "click", function (){
			$(".videoDiscuss").fadeIn();

			var id = $(this).parents(".videoBox").data("id");

			$(".mask").fadeIn();
			$(".videoBox").data("id", id).fadeIn();
			sendInfo(id);
		});
	}

	function sendInfo(id){
		$(".videoDiscuss").find(".tjBtn").on("click", function (){
			var inputVla = $(".videoDiscuss").find("textarea");
			var inputName = $(".iptBox").find("input");

			$.ajax({
				//url: "BarbieHandler.ashx?op=Review",
				url: "js/data.json",
				type: "POST",
				data: {
					userID: id,
					reviewContent: inputVla.val()
				},
				dataType: "json",
				success: function (res){
					if(res.status){
						var dt = '<dt>'+inputName.val()
							   + '<span class="oper"><a href="#">回复</a>|'
							   + '<a href="#">赞同</a>(0)</span></dt>'
               				   + '<dd>'+inputVla.val()+'</dd>';

               			var dl = $("<dl></dl>");
               			dl.html(dt);

               			$(".list").append(dl);	
               			inputName.val(''); 
               			inputVla.val('');  
					}
				}
			})
		});
	}
});