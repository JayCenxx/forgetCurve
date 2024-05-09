

function getCardSet(id){
 //check if this cardSet exist, 
 let cardSet = localStorage.getItem(id);
 //  if dataTimeID exist, we want to get the inner HashMap to cardSet from Outer Hashmap, else set it as an empty map , also gotta convert to JS string
 return cardSet ? new Map(JSON.parse(cardSet)) : new Map();
}

function updateCardSet(id, cardSet){
    try{
  // Update localStorage/outer-HashMap with the new set  ,  also gotta convert to JSON when u set
  localStorage.setItem(id, JSON.stringify([...cardSet]));
    }
    catch(e){
        if(isLocalStorageFull(e)){
            clearOldKeys();  //clear old data and try again 
            localStorage.setItem(id, JSON.stringify([...cardSet]));
        }else{
            throw e;  // re-throw error, if the first error caught from catch() is not related to full storage
        }
    } 
} 

function isLocalStorageFull(e){
    return e instanceof DOMException && (e.code===22 || e.code===1014 || e.name==="LocalStorage/quota limit is full ")
}

function clearOldKeys(){
    let items=[];
    for(let i=0;i<localStorage.length; i++){
        const key=localStorage.key(i);
        const value=localStorage.getItem(key);
        const item=JSON.parse(value);
        items.push({key,timestamp:item.timestamp});
    }

    items.sort((a,b)=>a.timestamp-b.timestamp);

    for(let i=0; i<Math.floor(localStorage.length/10);i++){
        localStorage.removeItem(items[i].key);
    }
}

module.exports = {
  getCardSet,
updateCardSet
}