function smoothScroll(element){
    // let currPos = window.pageYOffset; 
    
    var scrollInterval= setInterval(function(){

        let item = element.getAttribute("data-value");
        let rect = document.getElementById(item).getBoundingClientRect();
        if (rect.top<=0||(window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
            
                clearInterval(scrollInterval);
                return;
        }
    
        
        window.scrollBy(0,30);
          
      },5); 
}
let items = document.getElementsByClassName("nav-items");
for(let item of items)
{
    
    item.addEventListener("click",function(){
        smoothScroll(item);
    });
}
function progressFiller(){
    let skillBars = document.querySelectorAll(".skill-progress > div");
    for(let skillProgress of skillBars)
    {
        let progress = skillProgress.getAttribute("data-value");
        let currProgress = 0;
        var progressFill = setInterval(function(){
            if(currProgress>=progress)
            {
                clearInterval(progressFill);
                return;
            }
            currProgress+=1;
            skillProgress.style.width=currProgress+"%";
        },10)
    }
}
var flag=0;
var skillContainer = document.querySelector("#skills > div");
window.addEventListener("scroll",function(){
    var coordinates = skillContainer.getBoundingClientRect();
    if(flag==0 && window.innerHeight>=coordinates.top)
    {
        progressFiller();
        flag=1;
    }
    else if(this.window.innerHeight<coordinates.top){
        flag=0;
    }
});



