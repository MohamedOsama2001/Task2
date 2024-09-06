var img = document.querySelector(".img");
var nextBtn = document.querySelector(".next-btn");
var backBtn = document.querySelector(".back-btn");
var dots=document.querySelector('.dots')
var imagesSrc = ["images/1.jpg", "images/2.jpg","images/3.jpg"];
let i = 0;
let interval;
let intervalTime=5000;
img.src = imagesSrc[i];
const changeImage = (newIndex) => {
  img.classList.add("hidden");
  setTimeout(() => {
    i = newIndex;
    img.src = imagesSrc[i];
    img.classList.remove("hidden");
    updateDots();
  }, 500);
};
function createDots() {
  dots.innerHTML = '';
  imagesSrc.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === i) {
      dot.classList.add("active");
    }
    dot.dataset.index = index;
    dot.addEventListener("click", function() {
      clearInterval(interval);
      //i = parseInt(this.dataset.index);
      //img.src = imagesSrc[i];
      //updateDots();
      changeImage(parseInt(this.dataset.index))
      autoNext();
    });
    dots.appendChild(dot);
  });
}
function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === i);
  });
}
const nextFun = () => {
  //i++;
  let newIndex = i + 1;
  if (newIndex >= imagesSrc.length) {
    //i = 0
    newIndex=0
  }
  //img.src = imagesSrc[i];
  //updateDots();
  changeImage(newIndex)
};
const backFun = () => {
  //i--;
  let newIndex=i-1
  if (newIndex < 0) {
    //i = imagesSrc.length-1;
    newIndex= imagesSrc.length-1
  }
  //img.src = imagesSrc[i];
  //updateDots();
  changeImage(newIndex)
};
nextBtn.addEventListener("click",function(){
    clearInterval(interval)
    nextFun()
    autoNext()
});
backBtn.addEventListener("click",function(){
    clearInterval(interval)
    backFun()
    autoBack()
});
function autoNext(){
    interval=setInterval(function(){
        nextFun()
    },intervalTime)
}
function autoBack(){
    interval=setInterval(function(){
        backFun()
    },intervalTime)
}
img.addEventListener('mouseover',function(){
  clearInterval(interval)
})
img.addEventListener('mouseout',function(){
  autoNext()
})
createDots();
/*        touch screen         */
let touchStart = 0;
let touchEnd = 0;
img.addEventListener("touchstart", function (e) {
  touchStart = e.changedTouches[0].screenX;
});
img.addEventListener("touchmove", function (e) {
  touchEnd = e.changedTouches[0].screenX;
});
img.addEventListener("touchend", function () {
  if (touchEnd < touchStart) {
    clearInterval(interval);
    nextFun();
    autoNext();
  }
  if (touchEnd > touchStart) {
    clearInterval(interval);
    backFun();
    autoNext();
  }
});

