$(document).ready(function(){
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

	//初始播放视频
	setTimeout(function (){
		$(".mask").fadeIn();
		$(".videoBox").fadeIn(function (){
			callFlash('video.flv');
		});
	}, 100);

	//活动规则按钮
	$(document).delegate(".ID .btn2", "click", function (){
		$(".ruleBox").fadeIn();
		$(".mask").fadeIn();
	});

	//点击上方观看视频
	$("#wrapper").find(".txt .btn").on("click", function (){
		$(".mask").fadeIn();
		$(".videoBox").fadeIn(function (){
			callFlash('video.flv');
		});
	});

	//关闭竞赛规则
	$(".ruleBox .btn").on("click", function(){
		$(".ruleBox").fadeOut();
		$(".mask").fadeOut();
	});

	//关闭视频播放窗口
	$(".videoBox .close").on("click", function(){
		$(".mask").fadeOut();
		$(".videoBox").removeData("id").fadeOut();
		$(".videoDiscuss").fadeOut();
	});

	//首页数据展示
	$.ajax({
		//url: "BarbieHandler.ashx?op= GetUsers",
		url: "js/index.json",
		type: "POST",
		data: {
			pageindex: 1,
			Countperpage: 28
		},
		dataType:"json",
		success: function (res){
			if (res.status) {
				var result = res.data;
				var phtoLeft = '';
				var phtoCenter = '';
				var phtoRight = '';

				//左边内容
				for(var i = 0; i < 9; i++){
					var msg = result[i];

					if(i == 6) {
						phtoLeft += '<li class="bigLI" data-id="'+msg.ID+'"'
							 + 'data-count="'+msg.count+'"'
							 + 'data-name="'+msg.name+'"'
							 + 'data-mobile="'+msg.mobile+'"'
							 + 'data-description="'+msg.Description+'">'
							 + '<img src="'+msg.imgurl+'"/>'
							 + '<span class="share"></span>'
							 + '<span class="play"></span></li>';
					} else {
						phtoLeft += '<li data-id="'+msg.ID+'"'
								 + 'data-count="'+msg.count+'"'
								 + 'data-name="'+msg.name+'"'
								 + 'data-mobile="'+msg.mobile+'"'
								 + 'data-description="'+msg.Description+'">'
								 + '<img src="'+msg.imgurl+'"/>'
								 + '<span class="share"></span>'
								 + '<span class="play"></span></li>';
					 }
				}

				//中间内容
				for(var i = 9; i <= 19; i++){
					var msg = result[i];

					if (i == 9) {
						phtoCenter += '<li class="bigLI" data-id="'+msg.ID+'"'
							 	   + 'data-count="'+msg.count+'"'
								   + 'data-name="'+msg.name+'"'
								   + 'data-mobile="'+msg.mobile+'"'
								   + 'data-description="'+msg.Description+'">'
								   + '<img src="'+msg.imgurl+'"/>'
								   + '<span class="share"></span>'
								   + '<span class="play"></span></li>';
					} else if (i == 15) {
						phtoCenter += '<li class="bigLI" style="float:right"'
						           + 'data-id="'+msg.ID+'"'
							 	   + 'data-count="'+msg.count+'"'
								   + 'data-name="'+msg.name+'"'
								   + 'data-mobile="'+msg.mobile+'"'
								   + 'data-description="'+msg.Description+'">'
								   + '<img src="'+msg.imgurl+'"/>'
								   + '<span class="share"></span>'
								   + '<span class="play"></span></li>';	
					} else if (i == 14) {
						phtoCenter += '<li class="ID"><img src="images/images/ID.jpg"><a href="Show.html" class="btn1"></a><span class="btn2"></span></li>';
					} else {
						phtoCenter += '<li data-id="'+msg.ID+'"'
							 	   + 'data-count="'+msg.count+'"'
								   + 'data-name="'+msg.name+'"'
								   + 'data-mobile="'+msg.mobile+'"'
								   + 'data-description="'+msg.Description+'">'
								   + '<img src="'+msg.imgurl+'"/>'
								   + '<span class="share"></span>'
								   + '<span class="play"></span></li>';
					}
				}

				//右边内容
				for(var i = 20; i < 29; i++){
					var msg = result[i];

					if (i == 22) {
						phtoRight += '<li class="bigLI" data-id="'+msg.ID+'"'
							 	  + 'data-count="'+msg.count+'"'
								  + 'data-name="'+msg.name+'"'
								  + 'data-mobile="'+msg.mobile+'"'
								  + 'data-description="'+msg.Description+'">'
								  + '<img src="'+msg.imgurl+'"/>'
								  + '<span class="share"></span>'
								  + '<span class="play"></span></li>';
					} else {
						phtoRight += '<li data-id="'+msg.ID+'"'
							 	  + 'data-count="'+msg.count+'"'
								  + 'data-name="'+msg.name+'"'
								  + 'data-mobile="'+msg.mobile+'"'
								  + 'data-description="'+msg.Description+'">'
								  + '<img src="'+msg.imgurl+'"/>'
								  + '<span class="share"></span>'
								  + '<span class="play"></span></li>';
				    }
				}

				$(".phtoLeft").html(phtoLeft);	
				$(".phtoCenter").html(phtoCenter);
				$(".phtoRight").html(phtoRight);

				videoPlay();
			}
		}
	});

	function videoPlay(){
		//点击单个用户
		$(document).delegate(".photoWall .play", "click", function (){
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
				url: "BarbieHandler.ashx?op=AddVote",
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


