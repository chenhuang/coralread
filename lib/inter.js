function load_json() {
    // Load the data from local files
    $.getJSON("/data/unread.json", function(data) {
            $.each(data["statuses"], function(key1, val1) {
                create_conversation(val1, "#unread-content");
                
/*
                if ("retweeted_status" in val1) {
                    $("#unread-content").append("<article> Repost: "+val1["text"]+"</article><hr />");
                    $("#unread-content article:last").append("<br><span style=\"position:relative; left:10px\">"+val1["retweeted_status"]["text"]+"</span>");
                } else {
                    $("#unread-content").append("<article>"+val1["text"]+"</article><hr />");
                }
*/
             })

            $("#unread-content").addClass("unread-content");
            })

    $.getJSON("/data/read.json", function(data) {
            $.each(data["statuses"], function(key1, val1) {

                create_conversation(val1, "#read-content");
/*
                if ("retweeted_status" in val1) {
                    $("#read-content").append("<article> Repost: "+val1["text"]+"</article><hr />");
                    $("#read-content article:last").append("<br><span style=\"position:relative; left:10px\">"+val1["retweeted_status"]["text"]+"</span>");
                } else {
                    $("#read-content").append("<article>"+val1["text"]+"</article><hr />");
                }
*/
             })

            $("#read-content").addClass("read-content");
            })
}

// Take conversation data and create conversation
function create_conversation(data, tag) {
        if ("retweeted_status" in data) {
            //$(tag).append("<article style=\"display:table\"> Repost: "+data["text"]+"<br><span style=\"position:relative; left:10px\">"+data["retweeted_status"]["text"]+"</span>"+"</article><hr />");
            //$(tag+" article:last").append("<br><span style=\"position:relative; left:10px\">"+data["retweeted_status"]["text"]+"</span>");
            $(tag).append(create_message(data)+"<hr/>");
        } else {
            $(tag).append(create_message(data)+"<hr/>");
        }
}

function create_message(data) {
    conversation_content = "<article style=\"display:table\">";
    conversation_content += "<section style=\"display:table-cell\">";
    conversation_content += "<img src=\""+data["user"]["profile_image_url"]+"\" />";
    conversation_content += "</section>";

    conversation_content += "<section style=\"display:table-cell; padding:5px 5px 5px 5px\">";
    conversation_content += "<span style=\"font-weight:bold;\">"+data["user"]["screen_name"]+"</span>";
    conversation_content += data["text"];
    conversation_content += "<p>"+data["created_at"];
    conversation_content += "<span style=\"position:relative; left:80px\">Repost<i class=\"vline\">|</i>Comment<i class=\"vline\">|</i>Forward<i class=\"vline\">|</i>Archive</span>";
    if ("retweeted_status" in data) {
        conversation_content += create_message(data["retweeted_status"]);
    }
    conversation_content += "</p></article>";

    return conversation_content;
}

function add_events() {
    // Add event function for "SEND" button
    $("#send-button").click(function(event) {
            if ($("#input-area").attr("value") != "") {
            $("#read-content").prepend("<article>"+$("#input-area").attr("value")+"</article><hr />");
            event.preventDefault();
            }
    });
}
