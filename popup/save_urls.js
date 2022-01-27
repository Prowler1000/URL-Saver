function handleClick(e){
    if (!e.target.classList.contains("save-button"))
        return;
    
    browser.tabs.query({ currentWindow: true }).then(processTabs, tabsError);
}

function processTabs(tabs){
    let validArrays = []
    let regex = new RegExp(document.getElementById('regex-input').value);
    for (const tab of tabs){
        let url = tab.url;
        if (regex.test(url)){
            validArrays.push(url);
        }
    }
    for (const tab of validArrays){
        console.log(tab);
    }
}

function tabsError(error){
    console.log(error);
}

document.addEventListener("click", handleClick);
document.getElementById("regex-input").focus();