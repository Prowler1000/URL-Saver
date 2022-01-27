let urls = [];
var refined_urls = [];
let prev_regex_len = 0;

function update_urls(tabs){
    for (const tab of tabs){
        urls.push(tab.url);
    }
    refined_urls = urls;
}

function handle_regex_update(event){
    if (!event.target.classList.contains("regex-input")){
        return;
    }
    
    if (!(event.target.value.length > prev_regex_len)){
        reset_refined_urls();
    }

    refine_urls(event.target.value);
    prev_regex_len = event.target.value.length;

    //Update number indicator
}

function reset_refined_urls(){
    refined_urls = urls.slice(0);
}

function refine_urls(regex_string){
    let tmpArray = [];
    let regex = new RegExp(regex_string);
    for (const url of refined_urls){
        if (regex.test(url))
            tmpArray.push(url);
    }
    refined_urls = tmpArray;
}

function handleClick(e){
    if (!e.target.classList.contains("save-button"))
        return;
    
    save_urls();
    e.preventDefault();
}


function save_urls(){
    if (refined_urls.length === 0){
        //Do more later
        return;
    }

    let text = "";
    let filename = "urls.txt";
    for (const url of refined_urls){
        text += url + "\n";
    }

    var pawn = document.createElement('a');
    pawn.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pawn.setAttribute('download', filename);
    pawn.click();
}

browser.tabs.query({ currentWindow: true }).then(update_urls);
document.addEventListener("input", handle_regex_update);
document.addEventListener("click", handleClick);
const input = document.getElementById("regex-input");
input.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        event.preventDefault;
        document.getElementById("save-button").click();
    }
});
input.focus();