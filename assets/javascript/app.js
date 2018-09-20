$(document).ready(function() {
    $(document).on("click", ".createGif", createGifs);
    $(document).on("click", ".gif", clickGif);
    $(document).on("click", ".btn-secondary", function(){
        console.log("hi")
        download($(this).attr("download") , "text.gif");
    });

    var characters = ["Tangled", "Snow White", "Frozen", "Mickey Mouse", "Cinderella", "The Lion King", "Pocahontas"];
    var apiKey = "edVrCjaiJ8xBv6zOO9y82OmXAhSfFJ98";
    var responses = [];
    var limit = 10;

    

    function createButtons() {
        console.log("creating buttons")
        $(".buttons").unbind().empty();
        for (var i = 0; i < characters.length; i++) {
            var button = $("<button>");
            button.attr({"type":"button", "class":"btn btn-primary createGif" });
            button.attr("id",characters[i]);
            button.text(characters[i]);
            //console.log(button);
            $(".buttons").append(button);
        }
    }   
      

   
    function createGifs(){
        
        $("#gifs").empty();
        
        
        var q = $(this).attr("id");

        var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key="+ apiKey +"&limit=" + limit;
        console.log(queryURL);
        
        
        $.ajax({
            
            url: queryURL,
            method: 'GET',
        }).then(function(response) {
            responses = response.data;
            //console.log(response);
            //console.log(response);

            for(var i = 0; i < responses.length; i++) {
                console.log(responses[i]);
                var characterDiv = $("<div>");
                var characterGif = $("<img>");
                //console.log(responses[i].images.fixed_height_still.url);
                characterGif.attr("stillLink",responses[i].images.fixed_height_still.url);
                //console.log(responses[i].bitly_gif_url);
                characterGif.attr("activeLink", responses[i].images.fixed_height.url);
                characterGif.attr("src", characterGif.attr("stillLink"));

                console.log(characterGif.attr("activeLink"));
                
                var rating = $("<p>");
                rating.text("Rating: " + responses[i].rating);
                
                characterDiv.append(characterGif);
                characterDiv.append(rating);
                characterDiv.css("margin", "20px");
                characterGif.attr("still", "true");
                characterGif.attr("class", "gif");
                var download = $("<button>");
                download.attr("class", "btn btn-secondary");
                download.attr("download", characterGif.attr("activeLink"));
                download.text("Download Gif");
                // download.html("<a href = '" + responses[i].images.original.url + "' download = 'asset.zip'> <button class = 'btn btn-secondary'> Download </button> </a>");
                //download.attr("download", characterGif.attr("activeLink"));
                characterDiv.append(download);
                $("#gifs").append(characterDiv);
                    
            }
        });

        var t = $(this).attr("id");
        var queryURL = "https://www.omdbapi.com/?t=" + t + "&y=&plot=short&apikey=trilogy";

        $.ajax({
            url: queryURL,
            method: 'GET',

        }).then(function(response) {
            $("#movieFacts").empty();
            console.log(response)
            var title = $("#movieFacts");
            title.text(response.Title);
            title.append("<p> Released: " +response.Released + "</p> <p>IMDB Rating: " + response.imdbRating + "</p>")
            //title.append("<p> ");
            
            
            title.css("margin-top" , "25px");
            console.log(response.Title);
            
            $(".form-group").append(title);



        });

    }
            
        
    function clickGif() {
        
        //console.log($(this).attr("still"));
        
        if($(this).attr("still") === "true") {
            console.log("making image move")
            console.log($(this).attr("activeLink"))
            $(this).attr("src", $(this).attr("activeLink"));
            $(this).attr("still", "false");
        } else {
            //console.log("making image still")
            $(this).attr("src", $(this).attr("stillLink"));
            $(this).attr("still", "true");
            
        }
    }   

    // function downloadGif() {
    //     console.log($(this).attr("download"));
    //     download($(this).attr("download"), "test.gif");
    // }
    


    $("#addChar").on("click", function(event) {
        //console.log($(this))
        event.preventDefault();
        
        var newCharacter = $("#inputCharacter").val().trim();
        //console.log(newCharacter);
        characters.push(newCharacter);
        createButtons();

    });
    
    $("#addMoreGifs").on("click" , function() {
        console.log("gifs added")
        limit+=10;


    });
    createButtons();

    





    function download(data, strFileName, strMimeType) {
	
        var self = window, // this script is only for browsers anyway...
            u = "application/octet-stream", // this default mime also triggers iframe downloads
            m = strMimeType || u, 
            x = data,
            D = document,
            a = D.createElement("a"),
            z = function(a){return String(a);},
            
            
            B = self.Blob || self.MozBlob || self.WebKitBlob || z,
            BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
            fn = strFileName || "download",
            blob, 
            b,
            ua,
            fr;
    
        //if(typeof B.bind === 'function' ){ B=B.bind(self); }
        
        if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
            x=[x, m];
            m=x[0];
            x=x[1]; 
        }
        
        
        
        //go ahead and download dataURLs right away
        if(String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)){
            return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                navigator.msSaveBlob(d2b(x), fn) : 
                saver(x) ; // everyone else can save dataURLs un-processed
        }//end if dataURL passed?
        
        try{
        
            blob = x instanceof B ? 
                x : 
                new B([x], {type: m}) ;
        }catch(y){
            if(BB){
                b = new BB();
                b.append([x]);
                blob = b.getBlob(m); // the blob
            }
            
        }
        
        
        
        function d2b(u) {
            var p= u.split(/[:;,]/),
            t= p[1],
            dec= p[2] == "base64" ? atob : decodeURIComponent,
            bin= dec(p.pop()),
            mx= bin.length,
            i= 0,
            uia= new Uint8Array(mx);
    
            for(i;i<mx;++i) uia[i]= bin.charCodeAt(i);
    
            return new B([uia], {type: t});
         }
          
        function saver(url, winMode){
            
            
            if ('download' in a) { //html5 A[download] 			
                a.href = url;
                a.setAttribute("download", fn);
                a.innerHTML = "downloading...";
                D.body.appendChild(a);
                setTimeout(function() {
                    a.click();
                    D.body.removeChild(a);
                    if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(a.href);}, 250 );}
                }, 66);
                return true;
            }
            
            //do iframe dataURL download (old ch+FF):
            var f = D.createElement("iframe");
            D.body.appendChild(f);
            if(!winMode){ // force a mime that will download:
                url="data:"+url.replace(/^data:([\w\/\-\+]+)/, u);
            }
             
        
            f.src = url;
            setTimeout(function(){ D.body.removeChild(f); }, 333);
            
        }//end saver 
            
    
        if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
            return navigator.msSaveBlob(blob, fn);
        } 	
        
        if(self.URL){ // simple fast and modern way using Blob and URL:
            saver(self.URL.createObjectURL(blob), true);
        }else{
            // handle non-Blob()+non-URL browsers:
            if(typeof blob === "string" || blob.constructor===z ){
                try{
                    return saver( "data:" +  m   + ";base64,"  +  self.btoa(blob)  ); 
                }catch(y){
                    return saver( "data:" +  m   + "," + encodeURIComponent(blob)  ); 
                }
            }
            
            // Blob but not URL:
            fr=new FileReader();
            fr.onload=function(e){
                saver(this.result); 
            };
            fr.readAsDataURL(blob);
        }	
        return true;
    } /* end download() */
    
    
});