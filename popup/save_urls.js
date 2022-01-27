function handleClick(e){
    if (!e.target.classList.contains("save-button"))
        return;
    
    browser.tabs.query({ currentWindow: true }).then(processTabs, tabsError);
}

function processTabs(tabs){
    let urlArray = []
    let regex = new RegExp(document.getElementById('regex-input').value);
    for (const tab of tabs){
        let url = tab.url;
        if (regex.test(url)){
            urlArray.push(url);
        }
    }
    writeArrayToFile(urlArray);
}

function tabsError(error){
    console.log(error);
}

function writeArrayToFile(array){
    if (array.length === 0){
        return;
    }

    let text = "";
    let filename = "urls.txt";
    for (const url of array){
        text += url + "\n";
    }

    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=urt-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
}

document.addEventListener("click", handleClick);
const input = document.getElementById("regex-input");
input.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        event.preventDefault;
        document.getElementById("save-button").click();
    }
});
input.focus();