function load_json() {
    $.getJSON("/data/unread.json", function(data) {
            $.each(data["statuses"], function(key1, val1) {
                //            document.write(key1+"\t"+val1["text"]);
                $("#unread-content").append("<article>"+val1["text"]);

                if ("retweeted_status" in val1) {
                $("#unread-content").append("<span>Repost: "+val1["retweeted_status"]["text"]);
                } else {
                $("#unread-content").append("</article>");
                }
                })
            })

    $.getJSON("/data/read.json", function(data) {
            $.each(data["statuses"], function(key1, val1) {
                //            document.write(key1+"\t"+val1["text"]);
                $("#read-content").append("<article><p>"+val1["text"]+"</p></article>");
                if ("retweeted_status" in val1) {
                $("#read-content").append("<span>Repost: "+val1["retweeted_status"]["text"]);
                } else {
                $("#read-content").append("</article>");
                }
                })
            })

}
