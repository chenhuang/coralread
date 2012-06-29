function load_json() {
    // Load the data from local files
    $.getJSON("./data/unread.json", function(data) {
            $.each(data["statuses"], function(key1, val1) {
                create_conversation(val1, "#unread-content");
                })

            $("#unread-content").addClass("unread-content");

            })

    $.getJSON("./data/read.json", function(data) {
            $.each(data["statuses"], function(key1, val1) {
                create_conversation(val1, "#read-content");
                })

            $("#read-content").addClass("read-content");

            })
}

// Take conversation data and create conversation
function create_conversation(data, tag) {
    if ("retweeted_status" in data) {
        $(tag).append(create_message(data,tag));
    } else {
        $(tag).append(create_message(data,tag));
    }
}

function create_message(data,tag) {
    conversation_content = "<article style=\"display:table; vertical-align:text-top;\">";
    conversation_content += "<section style=\"display:table-cell\">";
    conversation_content += "<img style=\"vertical-align:text-top;\" src=\""+data["user"]["profile_image_url"]+"\" />";
    conversation_content += "</section>";

    conversation_content += "<section style=\"display:table-cell; padding:5px 5px 5px 5px\">";
    conversation_content += "<span style=\"font-weight:bold;\">"+data["user"]["screen_name"]+"</span><i class=\"vline\"></i>";
    conversation_content += "<span>"+data["text"]+"</span>";
    conversation_content += "<p>"+data["created_at"];
    conversation_content += "<span style=\"position:relative; left:80px\">"
        conversation_content += "<a class=\"repost\" href=\"javascript:void(0);\">Repost</a><i class=\"vline\">|</i>"
        conversation_content += "<a class=\"comment\" href=\"javascript:void(0);\">Comment</a><i class=\"vline\">|</i>"
        conversation_content += "<a class=\"forward\" href=\"javascript:void(0);\">Forward</a>"
        if (tag != "#read-content")
            conversation_content += "<i class=\"vline\">|</i><a class=\"archive\" href=\"javascript:void(0);\">Archive</a>"
        conversation_content += "</span>";

    if ("retweeted_status" in data) {
        conversation_content += create_message(data["retweeted_status"]);
    }
    conversation_content += "</p></article>";

    return conversation_content;
}

function add_events() {
    // Add event function for "SEND" button
    send_event();

    // Add event for "REPOST" button
    $("section").on("click", ".repost", repost_event);

    // Add event for "Comment" button
    $("section").on("click", ".comment", comment_event);

    // Add event for "Forward" button
    $("section").on("click", ".forward", forward_event);

    // Add event for "Archive" button
    $("section").on("click", ".archive", archive_event);

    $("section").on("click", ".hide_show", hide_show_event);
}

function hide_show_event() {
   section_handler = $(this).parent().parent();
   fade_seconds = 0;
   if (section_handler.data("show") === "undefined") {
       section_handler.children("article").hide(fade_seconds);
       section_handler.data("show", 0);
       $(this).text("Show column");
   } else if (section_handler.data("show") == 0) {
       section_handler.children("article").show(fade_seconds);
       section_handler.data("show", 1);
       $(this).text("Hide column");
    } else {
       section_handler.children("article").hide(fade_seconds);
       section_handler.data("show", 0);
       $(this).text("Show column");
    }
}

function send_event() {
    $("#send-button").click(function(event) {
            if ($("#input-area").attr("value") != "") {
            input_data = {};
            input_data["user"] = {};
            input_data["user"]["profile_image_url"] = "http://tp4.sinaimg.cn/1893801487/50/1292405227/1";
            input_data["user"]["screen_name"] = "user1";
            input_data["text"]=$("#input-area").attr("value");
            input_data["created_at"] = new Date();
            $("#read-content").prepend(create_message(input_data));
            event.preventDefault();
            }
            });
}

function repost_event() {
    $(".repost_input").remove();
    $(".repost_button").remove();

    section_handle = $(this).parent().parent().parent();  
    section_handle.append("<textarea class=\"repost_input\"></textarea>");
    section_handle.append("<a href=\"javascript:void(0)\" class=\"repost_button\">Send</a>");

    $(".repost_button").click(function(event) {
            if ($(".repost_input").attr("value") != "") {
            input_data = {};
            input_data["user"] = {};
            input_data["user"]["profile_image_url"] = "http://tp4.sinaimg.cn/1893801487/50/1292405227/1";
            input_data["user"]["screen_name"] = "user1";
            input_data["text"]=$(".repost_input").attr("value");
            input_data["created_at"] = new Date();
            section_handle.append(create_message(input_data));
            } 
            $(".repost_input").remove();
            $(".repost_button").remove();
            event.preventDefault();
            });
    event.preventDefault();
}

function comment_event() {
    $(".comment_input").remove();
    $(".comment_button").remove();

    section_handle = $(this).parent().parent().parent();  
    section_handle.append("<textarea class=\"comment_input\"></textarea>");
    section_handle.append("<a href=\"javascript:void(0)\" class=\"comment_button\">Send</a>");

    $(".comment_button").click(function(event) {
            if ($(".comment_input").attr("value") != "") {
            input_data = {};
            input_data["user"] = {};
            input_data["user"]["profile_image_url"] = "http://tp4.sinaimg.cn/1893801487/50/1292405227/1";
            input_data["user"]["screen_name"] = "user1";
            input_data["text"]=$(".comment_input").attr("value");
            input_data["created_at"] = new Date();
            section_handle.append(create_message(input_data));
            } 
            $(".comment_input").remove();
            $(".comment_button").remove();
            event.preventDefault();
            });
    event.preventDefault();
}

function forward_event() {
    section_handler = $(this).parent().parent().parent();
    section_handler.append("<p class=\"forward_address\">Email Address: <input type=\"text\"></p></input>");
    section_handler.append("<p class=\"forward_content\"> Text: <textarea>"+section_handler.children()[2].textContent+"</textarea></p>");
    section_handler.append("<a href=\"javascript(void(0));\" class=\"forward_button\">Send</a>");
    
    $(".forward_button").click(function(event){
        alert("Message Sent!");

        $(".forward_address").remove();
        $(".forward_content").remove();
        $(".forward_button").remove();
        event.preventDefault();
    });
   event.preventDefault(); 
}

function archive_event() {
   article_handle = $(this).parent().parent().parent().parent();  
   $("#read-content").prepend(article_handle);
}

