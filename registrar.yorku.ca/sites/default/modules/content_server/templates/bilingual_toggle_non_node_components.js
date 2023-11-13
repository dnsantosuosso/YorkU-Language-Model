jQuery( document ).ready(function() {
      var url = window.location.pathname;
    var language = localStorage.getItem('bilingual-toggle');
    if (language === null)
        language = "english";
    if (window.location.hostname ==="nsse.students.yorku.ca") {
      
        
        // added to solve display French by default. 
        if(window.location.hash && window.location.hash == "#fr") {
            // Fragment exists
            language = "french";
            var target_toggle = 		jQuery('york-paper-toggle-button-bilingual');
	
            var initial = true;
            if(target_toggle.length > 0){
                
                target_toggle.each(function(){
                    this.checked = initial;
                });
            }
            jQuery('.cs-bilingual-toggle').each(function(){
                jQuery(this).find('iron-pages')[0].selected = (initial ? 1 : 0);
            });
            
          }
          
          
            
        if (url.startsWith("/nsse-eligibility-tool") || url === "/nsse/feadback" ) {
            var target_toggle = 		jQuery('york-paper-toggle-button-bilingual');
            
            if(target_toggle.length > 0){
                var initial = (localStorage.getItem('bilingual-toggle') == 'french' ? true : false);
                target_toggle.each(function(){
                    this.checked = initial;
                });
                
                jQuery('.cs-bilingual-toggle').each(function(){
                    jQuery(this).find('iron-pages')[0].selected = (initial ? 1 : 0);
                });
                
                target_toggle.change(function(event){
                    let target_toggle = this;
                    
                    jQuery('.cs-bilingual-toggle').each(function(){
                        jQuery(this).find('iron-pages')[0].selected = (target_toggle.checked ? 1 : 0);
                    });
                    
                    var event = new CustomEvent('bilingual-toggle', {detail:{language:(target_toggle.checked ? 'french' : 'english')}});//https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
                    document.dispatchEvent(event);
                    
                    localStorage.setItem('bilingual-toggle', (target_toggle.checked ? 'french' : 'english'));
                });		
            }
            
            // switch language for result message
            switchResultMessage(language);
            
        }
        
        
        
        // convert the site name 
        switchSiteNameTextFromSelectedLanguage(language);
        
        // convert the page title
        jQuery('#block-pagetitle').find('h1').find('span').text(
                    switchPageTitleTextFromSelectedLanguage(language,
                    jQuery('#block-pagetitle').find('h1').find('span').text()));
        
        // for menu navigation
        switchMainNavFromSelectedLanguage(language);
        // for banner
        switchBannerTextFromSelectedLanguage(language);
    }
    
    else if (window.location.hostname ==="vp.students.yorku.ca" && window.location.pathname.startsWith("/town-hall")) {
        switchBannerTextFromSelectedLanguage(language);
    }
    else if ((window.location.hostname ==="currentstudents.yorku.ca" || window.location.hostname ==="current.students.yorku.ca") && window.location.pathname.startsWith("/latest")) {
        switchBannerTextFromSelectedLanguage(language);
    }
    
});


document.addEventListener('bilingual-toggle', function(event){
    if (window.location.hostname ==="nsse.students.yorku.ca") {
        
        // convert the site name 
        switchSiteNameTextFromSelectedLanguage(event.detail.language);
    
        // convert the page title
        jQuery('#block-pagetitle').find('h1').find('span').text(
                switchPageTitleTextFromSelectedLanguage(event.detail.language,
                jQuery('#block-pagetitle').find('h1').find('span').text()));
        
        // for menu navigation
        switchMainNavFromSelectedLanguage(event.detail.language);
        
         // for banner
        switchBannerTextFromSelectedLanguage(localStorage.getItem('bilingual-toggle'));
        
        switchResultMessage(event.detail.language);
    }
    else if (window.location.hostname ==="vp.students.yorku.ca" && window.location.pathname === '/town-hall/questions') {
        if (event.detail.language === 'french') {
            window.location.replace("https://vp.students.yorku.ca/town-hall/questions/fr");    
        }
        
    }
    else if (window.location.hostname ==="vp.students.yorku.ca" && window.location.pathname.startsWith("/town-hall")) {
        switchBannerTextFromSelectedLanguage(localStorage.getItem('bilingual-toggle'));
    }
    else if ((window.location.hostname ==="currentstudents.yorku.ca" || window.location.hostname ==="current.students.yorku.ca") && window.location.pathname.startsWith("/latest")) {
        switchBannerTextFromSelectedLanguage(localStorage.getItem('bilingual-toggle'));
    }
    
});

function switchResultMessage(language) {
    var url = window.location.pathname;
    
    
    
    if (url === "/nsse-eligibility-tool") {
         var divid= window.location.hash; 
        divid = divid.replace("#", "");
        divid = atob(divid);
        
        var parts;
        if (divid.includes("@#$") === true) {
            parts = divid.split("@#$");
            divid = parts[0];
            survey_link = parts[1];
        }
    }
    else if (url.startsWith("/nsse-eligibility-tool/result") || url.startsWith("/nsse-eligibility-tool/test")) {
        var parts = url.split("/");
        divid =  parts[parts.length -1];
        divid = atob(divid);
    }
    
    if (url === "/nsse/feedback") {
        divid ="not_undergrad_student";
    }
    
    if (divid !== undefined && divid !== '' && divid !== 'not_available') {
        
        
        if (language === "french") {
            // hide the english one
            var x = document.getElementById(divid);
            x.style.display = "none";
             
            //display the french one
            divid += "_fr";
            var x = document.getElementById(divid);
            x.style.display = "block";
             
            
        }else {
            var x = document.getElementById(divid + "_fr");
            x.style.display = "none";
    
    
            // hide the english one
            var x = document.getElementById(divid);
            x.style.display = "block";
             
        }
    }
    
    
   
}


function switchBannerTextFromSelectedLanguage(language) {
    if (window.location.hostname ==="nsse.students.yorku.ca") {
         if (language === "french") {
            jQuery("#banner-header").text("VOTRE OPINION");
            jQuery("#banner-subheader").text("ENTRAÎNE DES RÉSULTATS");
            jQuery("#banner-subheader2").text("RÉPONDEZ AU SONDAGE NSSE ET OBTENEZ UN LATTE GRATUIT");
            jQuery("#banner-body").text("Étudiantes et étudiants de 1re et de 4e année, dites-nous comment nous pouvons améliorer l’expérience des étudiants à York."); 
        }
        else {
            jQuery("#banner-header").text("YOUR OPINION");
            jQuery("#banner-subheader").text("CREATES CHANGE");
            jQuery("#banner-subheader2").text("GET A FREE LATTE WHEN YOU DO THE NSSE SURVEY");
            jQuery("#banner-body").text("First- and fourth-year students, tell us how we can improve the York U student experience.");               
        }
    }
    else if (window.location.hostname ==="vp.students.yorku.ca" && window.location.pathname.startsWith("/town-hall")) {
        if (language === "french") {
            jQuery("#banner-header").html("A CONVERSATION COMMUNAUTAIRE VIRTUELLE");
            jQuery("#banner-subheader").html("ÉTUDIANTS ACTUELS");
            jQuery("#timeslot").html("30 avril 2020 <br /> 14 h 30 à 15 h 30 ");
            
        }
        else {
            jQuery("#banner-header").html("VIRTUAL TOWN HALL");
            jQuery("#banner-subheader").html("CURRENT STUDENTS");
             jQuery("#timeslot").html("April 30, 2020<br>2:30 p.m. to 3:30 p.m");
        }
        
    }
    else if ((window.location.hostname ==="currentstudents.yorku.ca" || window.location.hostname ==="current.students.yorku.ca") && window.location.pathname.startsWith("/latest")) {
         if (language === "french") {
            jQuery("#banner-header").html("MISES À JOUR DE YORK");
            jQuery("#banner-subheader").html("NOUVELLES, MISES À JOUR, NOTIFICATIONS");
            jQuery("#banner-desc").html("Dernières mises à jour de la Division des étudiants de l’Université York");
            
            
        }
        else {
            jQuery("#banner-header").html("UPDATES FROM YORK");
            jQuery("#banner-subheader").html("NEWS, UPDATES, NOTIFICATIONS");
            jQuery("#banner-desc").html("The latest updates from York University's Division of Students");
            
        }
    }
    
}

function switchMainNavFromSelectedLanguage(language) {
    
    if (language === "french") {
        jQuery("#block-nsseprimarymenufrench").show();
        jQuery("#block-nssemenu").hide();
        
        // for staff
        jQuery("#block-nssestaffmenufrench").show();
        jQuery("#block-nssestaffmenu").hide();
    }
    else if (language === "english") {
        jQuery("#block-nsseprimarymenufrench").hide();
        jQuery("#block-nssemenu").show();
        
        // staff
        jQuery("#block-nssestaffmenufrench").hide();
        jQuery("#block-nssestaffmenu").show();
    }
    else {
        jQuery("#block-nssemenu").show();
        jQuery("#block-nssestaffmenu").show();
    }
    
}

function switchSiteNameTextFromSelectedLanguage(language) {
     if (language === "french") {
            jQuery('#site-name').text("Sondage national sur la participation des étudiants");
            
            // include the tab in the home page
            jQuery(".section-title-fr").show();
            jQuery(".section-title-en").hide();
        }
        else {
            jQuery('#site-name').text("National Survey of Student Engagement");
            // include the tab in the home page
            jQuery(".section-title-fr").hide();
            jQuery(".section-title-en").show();
        }
}

function switchPageTitleTextFromSelectedLanguage(language = "english", text = "") {
    if (language === "french") {
        switch(text) {
            case "We're Listening": {
                 text = "Nous sommes à l’écoute";
                break;
            }
            case "Incentives & Prizes": {
                text = "Mesures d’incitation et prix";
                break;
            }
            case "NSSE Student Frequently Asked Questions": {
                text = "FAQ à l’intention des étudiantes et des étudiants";
                break;
            }
            case "Staff and Faculty": {
                text = "Membres du personnel et du corps enseignant";
                break;
            }
            case "NSSE Privacy Statement": {
                text = "Déclaration de confidentialité du sondage NSSE";
                break;
            }
            case "About NSSE": {
                text = "À propos du sondage NSSE";
                break;
            }
            case "NSSE Staff Frequently Asked Questions": {
                text = "FAQ à l’intention du personnel";
                break;
            }
           
            case "Contact Us": {
                text = "Contactez-nous";
                break;
            }
            case "NSSE toolkit" :{
                text = "Boîte à outils du sondage NSSE";
                break;
            }
            case "NSSE Eligibility Tool" :{
                text = "Outil d’admissibilité";
                break;
            }
            case "NSSE Champion Cup": {
                text = "Coupe du Champion NSSE"
                break;
            }
            default:{
                
                break; 
            }
        }
    }
    else {
        switch(text) {
            case "Nous sommes à l’écoute": {
                 text = "We're Listening";
                break;
            }
            case "Mesures d’incitation et prix": {
                text = "Incentives & Prizes";
                break;
            }
            case "FAQ à l’intention des étudiantes et des étudiants": {
                text = "NSSE Student Frequently Asked Questions";
                break;
            }
            case "Membres du personnel et du corps enseignant": {
                text = "Staff and Faculty";
                break;
            }
            case "Déclaration de confidentialité du sondage NSSE": {
                text = "NSSE Privacy Statement";
                break;
            }
           case "À propos du sondage NSSE": {
                text = "About NSSE";
                break;
           }
           case "FAQ à l’intention du personnel": {
                text = "NSSE Staff Frequently Asked Questions"
                break;
           }
           case "Contactez-nous": {
                text = "Contact Us";
                break;
            
           }
            case "Boîte à outils du sondage NSSE" :{
                text = "NSSE toolkit";
                break;
            }
            case "Outil d’admissibilité": {
                text = "NSSE Eligibility Tool";
                break;
            }
             case "Coupe du Champion NSSE": {
                text = "NSSE Champion Cup"
                break;
            }
            default:{
                
                break; 
            }
        }
    }
    
    return text; 
}
