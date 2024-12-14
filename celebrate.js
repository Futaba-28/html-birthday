function handleMotionEvent(event) {
  const x = event.accelerationIncludingGravity.x;
  const y = event.accelerationIncludingGravity.y;
  const z = event.accelerationIncludingGravity.z;
console.log(x,y,z);
  window.location.href = "make-a-wish.html"
  
}

window.addEventListener("devicemotion", handleMotionEvent, true);
