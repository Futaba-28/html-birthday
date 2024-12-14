document.querySelector(".PlayButton").addEventListener("click", function(){
  buttonAnimation();
  var audio = new Audio("./media/sounds/HappyBirthdayRehormonize.mp3");
  audio.play();
  
  //if ended set
  //add class and change it to next button
  audio.onended = (event) => {
    var activeButton = document.querySelector(".PlayButton");
    activeButton.disabled = false;
    activeButton.innerHTML = "Next";
    activeButton.classList.remove("PlayButton");
    activeButton.classList.add("NextButton");
    gotoNext();
    console.log(
      "動画は再生が完了したか、それ以上のデータが利用できないために停止しました。",
    );
  };
});
function gotoNext(){
  document.querySelector(".NextButton").addEventListener("click", function(){
    window.location.href = './celebrate.html'; // 通常の遷移
  })
}



function buttonAnimation(){
  var activeButton = document.querySelector(".PlayButton");
  activeButton.classList.add("pressed");
  setTimeout(function(){
    activeButton.classList.remove("pressed");
  }, 100);
  //disable button
  activeButton.disabled = true;
}

function toggleButton(bool){
  var activeButton = document.querySelector(".PlayButton");
  if (bool == true){
    activeButton.classList.add("disable");
  }else{
    activeButton.classList.remove("disable");
  }
}

