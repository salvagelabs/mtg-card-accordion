const container = document.getElementById('cards');

let data = new XMLHttpRequest();

data.open('GET', 'https://mtgjson.com/json/SOI-x.json');
data.send();

data.onreadystatechange = function() {
  if (data.readyState === 4 && data.status === 200) {
    
    let cardData = JSON.parse(data.responseText);
    let set = (cardData.code);
    let drawn = getRandom(cardData.cards, 7);
    let cardHTML = '';
    
    for (let i = 0; i < drawn.length; i++) {
      
      if(i === 0) {
        cardHTML += '<div class="card-content expanded">';
      } else {
        cardHTML += '<div class="card-content">';
      }
      
      cardHTML += '<div class="card"></div>';
      cardHTML += '<p class="name">' + drawn[i].name + '</p>';
      cardHTML += '<p>' + drawn[i].type + '</p>';
      
      if (drawn[i].manaCost) {
        let mc = drawn[i].manaCost;
        cardHTML += '<p>' + mc.replace(/{/g, '').replace(/}/g, '') + '</p>';
      }
      
      if (drawn[i].power && drawn[i].toughness) {
        cardHTML += '<p>' + drawn[i].power + '/' + drawn[i].toughness + '</p>';
      }

      cardHTML += '<p><i class="ss ss-fw ss-' + set.toLowerCase() + '"></i> ' + set + '</p>';
      
      cardHTML += '</div>';
      cardHTML += '</div>';
    }
    container.innerHTML = cardHTML;
  }
}

container.addEventListener('click', (event) => {
  
    let elem = event.target;
  
    if(elem.classList.contains('card')) {
      expand(elem.parentNode); 
    }
});

function expand(target) {
 
  const all = target.parentNode.childNodes;
  
  all.forEach( (elem) => {
    elem.classList.remove('expanded');
  })
  
  target.classList.add('expanded');
}

function getRandom(data, amount) {
  
  let max = data.length;
  let selected = []; 
  
  for (let r = 0; r < amount; r++) {
    let rand = Math.floor( Math.random() * max );
    selected.push(data[rand]); 
  }
  
  return selected;
}