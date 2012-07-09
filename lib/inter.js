function load_json() {
    // Load the data from local files
    $.getJSON("./data/unread.json", function(data) {
            $.each(data["statuses"], function(key1, val1) {
                create_conversation(val1, "#unread-content");
                })
            });

    $.getJSON("./data/read.json", function(data) {
            $.each(data["statuses"], function(key1, val1) {
                create_conversation(val1, "#read-content");
                });
                hide_show($("#read-content"), $("#read-content").parent().children("div").children("a"));
            });

            $("#unread-content").before("<div style=\"text-align:center\"><a href=\"javascript:void(0);\" class=\"hide_show\">Hide conversations</a></div>");
            $("#read-content").before("<div style=\"text-align:center\"><a href=\"javascript:void(0);\" class=\"hide_show\">Show conversations</a></div>");

}

// Take conversation data and create conversation
function create_conversation(data, tag) {
    if ("retweeted_status" in data) {
        if (tag == "#unread-content") {
            $(tag).append(create_message_util(data["retweeted_status"], 1));
            $(tag).children("div:last").children("article").children("section:nth-child(2)").append(create_message_util(data,0));
        } else {
            $(tag).append(create_message_util(data["retweeted_status"], 0));
            $(tag).children("div:last").children("article").children("section:nth-child(2)").append(create_message_util(data,0));
        }
    } else {
        if (tag == "#unread-content") {
            $(tag).append(create_message_util(data,1));
        } else {
            $(tag).append(create_message_util(data,0));
        }
    }
}

function create_message_util(data, is_archive) {
    conversation_content = "<div style=\"padding-left:5px; padding-right:5px\">";

    conversation_content += "   <article style=\"display:table; \">";
    conversation_content += "       <section class=\"\" style=\"display:table-cell; width:30px; vertical-align:top;\">";
    conversation_content += "           <img style=\"vertical-align:text-top;\" src=\""+data["user"]["profile_image_url"]+"\" />";
    conversation_content += "       </section>";
    conversation_content += "       <section class=\"pull-right\" style=\"display:table-cell; padding-left:5px\">";
    conversation_content += "           <span class=\"pull-left\" style=\"font-weight:bold; padding-right:3px\">"+data["user"]["screen_name"]+"</span><i class=\"vline\"></i>";
    conversation_content += "           <span>"+String(data["text"])+"</span>";
    conversation_content += "           <div>";//+String(data["created_at"]).substring(0,16);
    if (is_archive) {
        conversation_content += "               <span style=\"margin-right:0px\" class=\"\">";
    } else {
        conversation_content += "               <span style=\"margin-right:0px\" class=\"\">";
    }
    //conversation_content += "<span style=\"padding:5px; position:relative; margin-right:0px; float:right\">";
    //conversation_content += "<span style=\"padding:5px;\">";
    conversation_content += "                   <a class=\"repost\" href=\"javascript:void(0);\">Repost</a><i class=\"vline\">|</i>";
    conversation_content += "                   <a class=\"comment\" href=\"javascript:void(0);\">Comment</a><i class=\"vline\">|</i>";
    conversation_content += "                   <a class=\"forward\" href=\"javascript:void(0);\">Forward</a>";
    if (is_archive)
        conversation_content += "               <i class=\"archive vline\">|</i><a class=\"archive\" href=\"javascript:void(0);\">Archive</a>";
    
    conversation_content += "               </span></div></section></article><p></p>";

    
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

    // Add event for "Hide/show" button
    $("section").parent().on("click", ".hide_show", hide_show_event);
}

function hide_show_event() {
   section_handler = $(this).parent().parent().children("section");
   hide_show(section_handler, $(this));
}

function hide_show(section_handler, tag_handler) {
   fade_seconds = 0;
   if (section_handler.data("show") === "undefined") {
        hide(section_handler, tag_handler);
   } else if (section_handler.data("show") == 0) {
        show(section_handler, tag_handler);
    } else {
        hide(section_handler, tag_handler);
    }
}

function hide(section_handler) {
       tag_handler = section_handler.parent().children("div").children("a");
       section_handler.hide(fade_seconds);
       section_handler.data("show", 0);
       tag_handler.text("Show conversations");
}

function hide(section_handler, tag_handler) {
       section_handler.hide(fade_seconds);
       section_handler.data("show", 0);
       tag_handler.text("Show conversations");
}

function show(section_handler, tag_handler) {
       section_handler.show(fade_seconds);
       section_handler.data("show", 1);
       tag_handler.text("Hide conversations");
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
                $("#read-content").prepend(create_message_util(input_data, 0));
                event.preventDefault();
                show($("#read-content"),$("#read-content").parent().children("div").children("a"));
            }
        });
}

function remove_all_forms() {
    remove_repost_btns();
    remove_comment_btns();
    remove_forward_btns();
}

function remove_repost_btns() {
    $(".repost_input").remove();
    $(".repost_button").remove();
}

function remove_comment_btns() {
    $(".comment_input").remove();
    $(".comment_button").remove();
}

function remove_forward_btns() {
    $(".forward_form").remove();
    $(".forward_address").remove();
    $(".forward_content").remove();
    $(".forward_button").remove();
}

function repost_event() {
    remove_all_forms();

    section_handle = $(this).parent().parent().parent();  

    if ($(section_handle).data("show") == undefined) {
        $(section_handle).data("show",1);
    } else if ($(section_handle).data("show") == 1){
        $(section_handle).data("show",0);

        event.preventDefault();
        return;
    } else if ($(section_handle).data("show") != 1){
        $(section_handle).data("show",1);
    }

    section_handle.append("<textarea class=\"input-medium repost_input\"></textarea>");
    section_handle.append("<a href=\"javascript:void(0)\" class=\"repost_button btn btn-small btn-info\">Repost</a>");

    $(".repost_button").click(function(event) {
        if ($(".repost_input").attr("value") != "") {
            input_data = {};
            input_data["user"] = {};
            input_data["user"]["profile_image_url"] = "http://tp4.sinaimg.cn/1893801487/50/1292405227/1";
            input_data["user"]["screen_name"] = "user1";
            input_data["text"]=$(".repost_input").attr("value");
            input_data["created_at"] = new Date();
            section_handle.append(create_message_util(input_data, 0));
        } 
            
            remove_repost_btns();
            event.preventDefault();
            });
    event.preventDefault();
}

function comment_event() {
    remove_all_forms();

    section_handle = $(this).parent().parent().parent();  

    if ($(section_handle).data("show") == undefined) {
        $(section_handle).data("show",2);
    } else if ($(section_handle).data("show") == 2){
        $(section_handle).data("show",0);

        event.preventDefault();
        return;
    } else if ($(section_handle).data("show") != 2){
        $(section_handle).data("show",2);
    }

    section_handle.append("<textarea class=\"input-medium comment_input\"></textarea>");
    section_handle.append("<a href=\"javascript:void(0)\" class=\"comment_button btn btn-info btn-small\">Comment</a>");

    $(".comment_button").click(function(event) {
        if ($(".comment_input").attr("value") != "") {
            input_data = {};
            input_data["user"] = {};
            input_data["user"]["profile_image_url"] = "http://tp4.sinaimg.cn/1893801487/50/1292405227/1";
            input_data["user"]["screen_name"] = "user1";
            input_data["text"]=$(".comment_input").attr("value");
            input_data["created_at"] = new Date();
            section_handle.append(create_message_util(input_data, 0));
            } 
            remove_comment_btns();
            event.preventDefault();
        });
    event.preventDefault();
}

function forward_event() {
    remove_all_forms();
    
    section_handle = $(this).parent().parent().parent();

    if ($(section_handle).data("show") == undefined) {
        $(section_handle).data("show",3);
    } else if ($(section_handle).data("show") == 3){
        $(section_handle).data("show",0);

        event.preventDefault();
        return;
    } else if ($(section_handle).data("show") != 3){
        $(section_handle).data("show",3);
    }

    section_handle.append("<div class=\"forward_form row\"><form class=\"well\"><fieldset><div class=\"control-group\"><div class=\"controls\"><input type=\"text\" class=\"forward_address input-medium\" placeholder=\"Email\"></div><div class=\"controls\"><textarea type=\"text\" class=\"forward_content input-large\">"+section_handle.children("span").text()+"</textarea></div>");
    section_handle.append("<a href=\"javascript(void(0));\" class=\"forward_button btn btn-small btn-info\">Forward</a>");
    section_handle.append("</div></div></fieldset></form>");
/*
    section_handler.append("<p class=\"forward_address\">Email Address: <input type=\"text\"></p></input>");
    section_handler.append("<p class=\"forward_content\"> Text: <textarea>"+section_handler.children()[2].textContent+"</textarea></p>");
*/
    
    $(".forward_button").click(function(event){
        alert("Message Sent!");

        remove_forward_btns();
        event.preventDefault();
    });
   event.preventDefault(); 
}

function archive_event() {
   article_handle = $(this).parent().parent().parent().parent().parent();  
   $(this).parent().children(".archive").remove();
   $("#read-content").prepend(article_handle);
}

