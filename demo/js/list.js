$(function (){

	var iNow = 1;

	function showMsg(iNow){
		//数据展示
		$.ajax({
			//url: "BarbieHandler.ashx?op= GetUsers",
			url: "js/list.json",
			type: "POST",
			data: {
				pageindex: iNow,
				Countperpage: 24
			},
			dataType:"json",
			success: function (res){
				if(res.status){
					var html = '';
					var result = res.data;
					var li;

					if(!result.length) {
						$(".photoList").find(".upBtn").hide();
						return;
					}

					for(var i = 0, len = result.length; i < len; i++){
						li = $('<li data-id="'+result[i].ID+'">'
							   +'<img src="'+result[i].imgurl+'">'
							   + '<span class="share"></span>'
							   + '<span class="txt">'+result[i].name+'</span></li>');

					   $(".photoList ul").append(li);	  
					}
				}
			}
		});
	}

	showMsg(iNow);

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

	$(".photoList").find(".upBtn").on("click", function (){
		iNow++;

		showMsg(iNow);
	});

	$(".banner3").find(".video").on("click", function (){
		$(".mask").fadeIn();
		$(".listPopBox").fadeIn();
	});

	$(".mask").on("click", function (){
		$(this).fadeOut();
		$(".listPopBox").fadeOut();
		return;
	});

	$(document).delegate(".photoList li", "click", function (){
		var id = $(this).data("id");
		var scrollT = $('body').scrollTop();

		$(".mask").fadeIn();
		$(".videoBox").css("top", scrollT + 30).data("id", id).fadeIn(function (){
			callFlash('video.flv');
		});
	});

	//关闭视频播放窗口
	$(".videoBox .close").on("click", function(){
		$(".mask").fadeOut();
		$(".videoBox").removeData("id").fadeOut();
		$(".videoDiscuss").fadeOut();
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
		sendInfo(id);
	});

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

	//立即参与
	$(".photoList").find(".oper .btn1").on("click", function (){
		var scrollT = $('body').scrollTop();

		$(".videoUp").css("top", scrollT - 110).fadeIn();
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

	$(".videoUp").find(".close").on("click", function (){
		$(".videoUp").fadeOut();
	});

	$(".photoList").find(".oper .btn2").on("click", function (){
		var scrollT = $('body').scrollTop();

		$(".ruleBox").css("top", scrollT - 1400).fadeIn();
	});

	//关闭竞赛规则
	$(".ruleBox .btn").on("click", function(){
		$(".ruleBox").fadeOut();
		$(".mask").fadeOut();
	});
});