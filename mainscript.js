    $(document).ready(function(){  
        
        $.getJSON("http://localhost/MariaDB-with-PHP---PDO-Version/handling.php?formmethod=GET&name=&lastname=", function(data){
         console.log(data);
        
        
        $.each(data, function(index,value){            
            $(".flexcontainer").append("<div class='index" + value.id + "'>" + "Voornaam: " + value.name + "<br/>Achternaam: " + value.lastname + "<br/>E-mail: " + value.email + "<br/><span>ID: " + 
            value.id + "</span><br/><button id='" + value.id + "'>DELETE</button><button id='edit" + value.id + "'  class='edit'>EDIT</button></div>");
             });
        });  

        
        $(document).on('click','button',function(){
            let btnid = this.id;
            if(btnid == "create") {
                console.log("CREATE!");
                let createurl = "http://localhost/MariaDB-with-PHP---PDO-Version/handling.php?formmethod=CREATE";                
                $.ajax({
                type: "GET",
                url: createurl, 
                async: true, 
                success: function(data){
                    console.log(data);
                    $.each(data, function(index,value){            
                    $(".flexcontainer").append("<div class='index" + value.id +
                     "'><input id='inputname" + value.id + "'" + "type='text' name='naam' placeholder='Voornaam' required><br/><input id='inputlastname" + value.id + "'" + "type='text' name='achternaam' placeholder='Achternaam'><br/><input id='inputemail" + value.id + "'" + " type='text' name='email' placeholder='E-mailadres'><input type='hidden' name='id' value='" + value.id + "'>" 
                     + "<br/> <span>ID: " + 
                    value.id + "</span><br/><button id='" + value.id + "' class='save'><img class='saveicon' src='saveicon.png' alt='#'><br/><button class='delete'  id='" + value.id + "'><img src='deleteicon.png' alt='#'></div>");
                    $("#succes").html("Item succesvol aagemaakt!");
             });
            },
                error: function(r, e){
                    console.log("error" + e);   
                }   
            });
            }
            else if((btnid == this.id)&&(this.className == "save")){        
                let indexid = this.id;
                console.log(indexid);
                let naam = $("#inputname" + indexid).val();
                let achternaam =  $("#inputlastname" + indexid).val();
                let email =  $("#inputemail" + indexid).val();
                let updateurl = "http://localhost/MariaDB-with-PHP---PDO-Version/handling.php?formmethod=UPDATE&naam=" + naam + "&achternaam=" + achternaam + "&email=" + email + "&id=" + indexid;
                console.log(updateurl);
                $.ajax({
                type: "GET",
                url: updateurl, 
                async: true, 
                success: function(data){
                console.log("update gelukt!");            
                $(".index" + indexid).replaceWith("<div class='index" + indexid + "'>" + "Voornaam: " + naam + "<br/>Achternaam: " + achternaam + "<br/>E-mail: " + email + "<br/> <span>ID: " + 
                indexid + "</span><br/><button id='" + indexid + "'>DELETE</button></button><button id='edit" + indexid + "' class='edit'>EDIT</button></div>");
                $("#succes").html("Item succesvol opgeslagen!");
            }});                         
            }
            else if(this.className == "searchbutton"){
                let searchfor = $("#searchinput").val(); 
                let searchurl = "http://localhost/MariaDB-with-PHP---PDO-Version/handling.php?formmethod=GET&name=" + searchfor + "&lastname=" + searchfor;  
                console.log(searchurl);
                $.ajax({
                type: "GET",
                url: searchurl, 
                async: true, 
                success: function(data){
                    console.log(data, "succes!");
                    $(".flexcontainer").empty();
                    $.each(data, function(index,value){            
                    $(".flexcontainer").append("<div class='index" + value.id + "'>" + "Voornaam: " 
                    + value.name + "<br/>Achternaam: " + value.lastname + "<br/>E-mail: " + value.email 
                    + "<br/><span>ID: " + 
                    value.id + "</span><br/><button id='" + value.id + "'>DELETE</button><button id='edit" + value.id + "'  class='edit'>EDIT</button></div>");
                    $("#succes").html("Zoekopdracht succesvol!");
             });
                },
                error: function(e, data) {
                    console.log("error" + e + data);
                }
                
                
                });        
            }
            else if(this.className == "edit") {
                let upindex = this.id.replace( /^\D+/g, '');
                let upurl = "http://localhost/MariaDB-with-PHP---PDO-Version/handling.php?formmethod=EDIT&id=" + upindex;
                console.log(upurl);  
                console.log("edit button");   
                $.getJSON(upurl, function(data){
                console.log(data); 
                console.log(data.name);
                $(".index" + upindex).replaceWith("<div class='index" + upindex +
                     "'><input id='inputname" + upindex + "'" + "type='text' name='naam' value='" + data.name + "' required><br/><input id='inputlastname" + upindex + "'" + "type='text' name='achternaam' value='" + data.lastname + "'><br/><input id='inputemail" + upindex + "'" + " type='text' name='email' value='" + data.email + "'><input type='hidden' name='id' value='" + upindex + "'>" 
                     + "<br/> <span>ID: " + 
                    upindex + "</span><br/><button id='" + upindex 
                    + "' class='save'><img class='saveicon' src='saveicon.png' alt='#'><br/><button class='delete'  id='" 
                    + upindex + "'><img src='deleteicon.png' alt='#'></div>"); 
                    $("#succes").html("Item succesvol aangepast!");
                });     
            }
            else{
            // let btnid = this.id;
            let delurl = "http://localhost/MariaDB-with-PHP---PDO-Version/handling.php?formmethod=DELETE&id=" + btnid;
            console.log(delurl);
            $.ajax({
                type: "GET",
                url: delurl, 
                async: true, 
                success: function(result){
                if(result == 1){
                    $("#succes").html("Item succesvol verwijderd uit database!");
                    $(".index" + btnid).remove();
                }
                else{
                    $("#error").html("Item niet succesvol verwijderd uit database!");
                }
            }});
        }
        });        
    });