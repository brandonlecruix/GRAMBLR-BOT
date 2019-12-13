let GRAMBLR_UI = {
	like_button: "",
	unpause_likes_button: "",
	send_client_likes_button: "",
	send_client_likes_url_field: "",
	send_client_likes_qty_field: "",
	account_options_button: "",
	switch_account_button: "",
	switch_account_list: "",
	switch_user_row: "",
	switch_button: ""
}

let GRAMBLR_STATES = {
	url_state: "",
	liked_images: 0,
	current_user_account: 0,
	clock_count: 0,
	coins_mined: 10000,
	mine_like_attemp: 0,
	post_data: {
	    user_pk: "",
	    media_pk: ""
	},
	switch_is_activated : false,
	call_api_is_activated: false
}

const PARAMETERS = {
	mining_time: 1500,
	limit_user_account: 16
}

let CLOCK_TIMER = {
	limit: 1500,
	clock_task: "",
	stopped: false,
	start: function() {
		CLOCK_TIMER.clock_task = setInterval(function() {
			CLOCK_TIMER.stopped = false;
			GRAMBLR_STATES.clock_count += 1; 
			//console.log(GRAMBLR_STATES.clock_count);
			if (GRAMBLR_STATES.clock_count === 2) {
				console.log('Clock timer started')
			}
			if (GRAMBLR_STATES.clock_count === CLOCK_TIMER.limit) {
				console.log('Clock timer ended')
				GRAMBLR_METHODS.reset_variable();
				clearInterval(CLOCK_TIMER.clock_task);
				CLOCK_TIMER.stopped = true;

				GRAMBLR_METHODS.switch_account.start();
			}
		}, 1000);
	}
}

let TASKS = {
	mine_likes: "",
	unpause_likes: "",
	send_likes: ""
}

let GRAMBLR_METHODS = {
	define_variable: function() { 																	//IMPORTANT !!!! 
		GRAMBLR_STATES.url_state = location.href;
																									/*
																										MINE LIKES SECTION
																									*/
		if(
			GRAMBLR_STATES.url_state==="http://localhost:4343/#/ratings" ||
			GRAMBLR_STATES.url_state==="http://localhost.gramblr.com:4343/#/ratings"
		) {
			GRAMBLR_UI.like_button = document.getElementsByClassName("btn btn-large")[0];
			GRAMBLR_UI.unpause_likes_button = document.getElementsByClassName("btn btn-sm btmn")[0];
		}
	},
	reset_variable: function() {
		GRAMBLR_STATES.liked_images = 0;
		GRAMBLR_STATES.clock_count = 0;

		if (GRAMBLR_STATES.current_user_account > PARAMETERS.limit_user_account) {
			GRAMBLR_STATES.current_user_account = 0;
		}
	},
	remove_post: function() {
		var original_photo = document.getElementById("original_image");
		var magnified_photo = document.getElementById("magnified_image");
	 		original_photo.src = ""; 
	 		magnified_photo.src  =""; 
	},
	mine_like: function() {
		GRAMBLR_METHODS.define_variable();
		var media_box = document.getElementsByClassName("media-box")[0]; 							//Post - Photo

		if (GRAMBLR_STATES.call_api_is_activated === false) {										//do not mine while mediasfollower api is being called
			if (media_box.offsetWidth > 0) { 															//<- if photo is showed
				if (GRAMBLR_STATES.liked_images < 100) { 												//not all photos are liked.
					GRAMBLR_UI.like_button.click();
					GRAMBLR_STATES.liked_images += 1;
					GRAMBLR_STATES.mine_like_attemp = 0;                                                //Reset failed mine like attemps 
					GRAMBLR_METHODS.remove_post();
				} else { 																				// all photos were liked
					clearInterval(TASKS.mine_likes);
					GRAMBLR_STATES.liked_images = 0;
					TASKS.unpause_likes = setInterval(GRAMBLR_METHODS.unpause_likes, 5800);				//unpause added likes
				}
			} else {
				clearInterval(TASKS.mine_likes); 
				TASKS.unpause_likes = setInterval(GRAMBLR_METHODS.unpause_likes, 5800);
			}
		}
	},
	switch_account: { 																				//ALERT CALLBACK HELL !
		account_options_button_click: function() {
			GRAMBLR_UI.switch_account_button = document.getElementsByClassName("dropdown-menu with-arrow pull-right")[0].children[2].children[0];
			GRAMBLR_UI.switch_account_button.setAttribute("onclick", "setTimeout(GRAMBLR_METHODS.switch_account.switch_account_button_click ,6000);");	
			
			GRAMBLR_UI.switch_account_button.focus();
			GRAMBLR_UI.switch_account_button.click();
			//console.log('1')
		},
		switch_account_button_click: function() {
			GRAMBLR_UI.switch_account_list = document.getElementsByClassName("caret pull-right")[0];
			GRAMBLR_UI.switch_account_list.setAttribute("onclick", "setTimeout(GRAMBLR_METHODS.switch_account.select_user ,4500);");

			GRAMBLR_UI.switch_account_list.focus();
			GRAMBLR_UI.switch_account_list.click();
			//console.log('2')
		},
		select_user: function() {
			GRAMBLR_UI.switch_user_row = document.getElementsByClassName("ui-select-choices-row-inner");
			GRAMBLR_UI.switch_user_row[GRAMBLR_STATES.current_user_account].setAttribute("onclick", "setTimeout(GRAMBLR_METHODS.switch_account.switch_now, 3500);");

			GRAMBLR_UI.switch_user_row[GRAMBLR_STATES.current_user_account].focus();
			GRAMBLR_UI.switch_user_row[GRAMBLR_STATES.current_user_account].click();
			//console.log('3')
		},
		switch_now: function() {
			GRAMBLR_UI.switch_button = document.getElementsByClassName("btn btn-success btn-block text-center")[0];
			GRAMBLR_UI.switch_button.focus();
			GRAMBLR_UI.switch_button.click();	

			TASKS.mine_likes = setInterval(GRAMBLR_METHODS.mine_like, PARAMETERS.mining_time);
			GRAMBLR_STATES.switch_is_activated = false;
			//console.log('4')
		},
		start: function() {
			GRAMBLR_STATES.switch_is_activated = true;
			GRAMBLR_UI.account_options_button = document.getElementsByClassName("dropdown text-normal nav-profile")[0].children[0];
			GRAMBLR_UI.account_options_button.setAttribute("onclick", "setTimeout(GRAMBLR_METHODS.switch_account.account_options_button_click, 2000);");
			GRAMBLR_UI.account_options_button.focus();
			GRAMBLR_UI.account_options_button.click();
			//console.log('0')
		}
	},
	send_client_likes: { 
	    query_data_1: ["coins", 0],
   		query_data_2: ["key", "Colila**21"],
   		likes_qty: 0,
   		post_to_be_liked: "",
   		api_response_length: 0,
		get_post_data: function(post_token) {
		    let main_location = "";
		    let xhr = new XMLHttpRequest()
		    let response;

		    if(location.href === "http://localhost:4343/#/add_likes" || location.href === "http://localhost:4343/#/ratings") {
		        main_location = "http://localhost:4343";
		    }
		    if(location.href === "http://localhost.gramblr.com:4343/#/add_likes" || location.href === "http://localhost.gramblr.com:4343/#/ratings") {
		        main_location = "http://localhost.gramblr.com";
		    }
		    
		    xhr.open("get", `${main_location}/img_url/${post_token}`, false);
		    xhr.send();

		    function return_post_data() {
		        response = JSON.parse(xhr.response);
		        GRAMBLR_STATES.post_data.user_pk = response.user_pk;
		        GRAMBLR_STATES.post_data.media_pk = response.media_pk;

		        //console.log(`\n MEDIA PK: ${GRAMBLR_STATES.post_data.media_pk}`);
		        //console.log(`\n USER PK: ${GRAMBLR_STATES.post_data.user_pk}`);
		    }

		    setTimeout(return_post_data(), 3000);
		},
		call_api_mediasfollowers: function() {
		    let api_url = "https://mediasfollowers.com/api/v2/vps.php";
		    let xhr = new XMLHttpRequest();
		    let api_response;
		    let send_likes_actions = {
		        done_actions: 0,
		        limit: 0
		    }

		    function get_coins() {
		        let base_uri = "";
		        let gramblr_api_path = "api/users/current_identity";
		        let xhr = new XMLHttpRequest();

		        switch (location.href) {
		            case "http://localhost:4343/#/add_likes":
		                base_uri = "http://localhost:4343"
		                break;
		            case "http://localhost:4343/#/ratings":
		                base_uri = "http://localhost:4343"
		                break;
		            case "http://localhost.gramblr.com:4343/#/add_likes":
		                base_uri = "http://localhost.gramblr.com:4343"
		                break;
		            case "http://localhost.gramblr.com:4343/#/ratings":
		                base_uri = "http://localhost.gramblr.com:4343"
		                break;
		        }

		        xhr.open("get", base_uri+"/"+gramblr_api_path, true);
		        xhr.send();

		        function trigger() {
		            if(xhr.readyState === 4 && xhr.status == 200) {
		                let response = JSON.parse(xhr.response);

		                GRAMBLR_METHODS.send_client_likes.query_data_1[1] = response.coins;
		                GRAMBLR_METHODS.send_client_likes.query_data_1[2] = response.ig_user;  
		            } else {
		                setTimeout(trigger, 7000);
		            }
		        }

		        setTimeout(trigger, 3000);
		    }
		    get_coins();

		    function trigger() {
		        xhr.open("post", `${api_url}?${GRAMBLR_METHODS.send_client_likes.query_data_1[0]}=${GRAMBLR_METHODS.send_client_likes.query_data_1[1]}&
		                            ${GRAMBLR_METHODS.send_client_likes.query_data_2[0]}=${GRAMBLR_METHODS.send_client_likes.query_data_2[1]}`, false);
		        xhr.send();

		        if(xhr.readyState === 4 && xhr.status == 200) {
		            api_response = JSON.parse(xhr.response);
		            api_response = eval(api_response);
		            send_likes_actions.limit = api_response.length;

		            if (send_likes_actions.limit === 0) {
		            	GRAMBLR_STATES.call_api_is_activated = false;
		            	console.log("NO DATA, empty array gotten")
		            	console.log(api_response)

		            } else {
		            	console.log("YES DATA, filled array gotten")
		            	console.log(api_response)

			            GRAMBLR_METHODS.send_client_likes.post_to_be_liked = api_response[send_likes_actions.done_actions].url;
			            GRAMBLR_METHODS.send_client_likes.likes_qty = api_response[send_likes_actions.done_actions].quantity;
		            	GRAMBLR_METHODS.send_client_likes.get_post_data(GRAMBLR_METHODS.send_client_likes.post_to_be_liked);
		            	TASKS.send_like = setInterval(send_likes_now, 5000);
		            }
		        } else {
		            setTimeout(trigger, 7000);
		        }
		    }
		    setTimeout(trigger, 7150);

		    function send_likes_now() {
		    	let current_gramblr_username = document.getElementsByClassName("hidden-xs")[0].children[0].innerText;

		    	GRAMBLR_METHODS.send_client_likes.post_to_be_liked = api_response[send_likes_actions.done_actions].url;
			    GRAMBLR_METHODS.send_client_likes.likes_qty = api_response[send_likes_actions.done_actions].quantity;
		        GRAMBLR_METHODS.send_client_likes.get_post_data(GRAMBLR_METHODS.send_client_likes.post_to_be_liked);
		        send_likes_actions.done_actions += 1;

		        if (send_likes_actions.done_actions === send_likes_actions.limit) {
		        	GRAMBLR_STATES.call_api_is_activated = false;
		        	clearInterval(TASKS.send_like);
		        	console.log(`likes sent to ${send_likes_actions.limit} accounts`);
		        }
		        
		        if(send_likes_actions.done_actions <= send_likes_actions.limit) {
		            //console.log(`URL post: ${GRAMBLR_METHODS.send_client_likes.post_to_be_liked} ***${send_likes_actions.done_actions}`);
		            //console.log(`QTY Likes: ${GRAMBLR_METHODS.send_client_likes.likes_qty}`);

						fetch("http://localhost:4343/api/add_likes", {
						    "credentials": "include",
						    "headers": {
						        "accept": "application/json, text/plain, */*",
						        "accept-language": "en-US,en;q=0.9",
						        "content-type": "application/json;charset=UTF-8"
						    },
						    "referrer": "http://localhost:4343/",
						    "referrerPolicy": "no-referrer-when-downgrade",
						    "body": `{\"ig_user\":\"${current_gramblr_username}\",\"likes_qty\":${GRAMBLR_METHODS.send_client_likes.likes_qty},\"local_likes\":false,\"media_pk\":\"${GRAMBLR_STATES.post_data.media_pk}\",\"user_pk\":${GRAMBLR_STATES.post_data.user_pk}}`,
						    "method": "POST",
						    "mode": "cors"
						});
		        } 
		    }
		}
	},
	unpause_likes: function() {
		let mine_like_attemps_limit = 5;
		var media_box = document.getElementsByClassName("media-box")[0]; 							//Post - Photo

		if (GRAMBLR_STATES.call_api_is_activated === false) {									//run unpasuse likes only when api is not called
			GRAMBLR_METHODS.define_variable();

			if (GRAMBLR_STATES.current_user_account > PARAMETERS.limit_user_account) {
				clearTimeout(TASKS.unpause_likes);
				CLOCK_TIMER.start();
			}

			if (media_box.offsetWidth > 0) { 															//<- if photo is showed
				clearTimeout(TASKS.unpause_likes);
				TASKS.mine_likes = setInterval(GRAMBLR_METHODS.mine_like, PARAMETERS.mining_time);
			} else {
				if (GRAMBLR_STATES.mine_like_attemp <= mine_like_attemps_limit) {			
					//console.log("no images")

					if (GRAMBLR_STATES.mine_like_attemp < mine_like_attemps_limit) {
						GRAMBLR_STATES.mine_like_attemp += 1;
					} else { 																			//all attemps were done
						GRAMBLR_STATES.mine_like_attemp = 0;
						GRAMBLR_STATES.liked_images = 0;
						clearTimeout(TASKS.unpause_likes);
						GRAMBLR_STATES.current_user_account += 1;
						GRAMBLR_METHODS.switch_account.start(); 										//change to next account
					}
				}

				let unpause_likes_box = document.getElementsByClassName("well")[0];

				if (unpause_likes_box.className === "well ng-hide") {
					unpause_likes_box.className = "well";
				}

				GRAMBLR_UI.unpause_likes_button.focus();
				GRAMBLR_UI.unpause_likes_button.click();
			}
		}
	}
}

function main() {
	let current_location = location.href;

	if(
		current_location === "http://localhost:4343/#/ratings" ||
		current_location === "http://localhost.gramblr.com:4343/#/ratings"
	) {
		console.log('running script')
		TASKS.mine_likes = setInterval(GRAMBLR_METHODS.mine_like, PARAMETERS.mining_time);
	}

	function call_api_parallel_process() {
		let count = 0; 
		const limit_count = 90;

		let a = setInterval(function() {
			count += 1;
			//console.log(`calling api in: ${count} of ${limit_count}`)
			if (count === limit_count && GRAMBLR_STATES.switch_is_activated === false) {
				console.log('api called')
				GRAMBLR_STATES.call_api_is_activated = true;
				GRAMBLR_METHODS.send_client_likes.call_api_mediasfollowers();
			}
			if (count === limit_count) {
				count = 0;
			}
		},1000);
	}
	call_api_parallel_process();

	let eraser = setInterval(function(){
		console.clear();
	}, 30000);
}
