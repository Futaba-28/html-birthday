let lastAcceleration = { x: 0, y: 0, z: 0 };
let shakeThreshold = 15; // 振動の感度
let shakeTimeout = false; // 短時間で多重判定を防ぐ

// デバイスの振動を検知
function handleMotion(event) {
  const acceleration = event.accelerationIncludingGravity;

  if (!acceleration.x || !acceleration.y || !acceleration.z) return;

  const deltaX = Math.abs(acceleration.x - lastAcceleration.x);
  const deltaY = Math.abs(acceleration.y - lastAcceleration.y);
  const deltaZ = Math.abs(acceleration.z - lastAcceleration.z);

  if (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) {
    if (!shakeTimeout) {
      shakeTimeout = true;

      // 振られた際のアクション
      window.location.href = "make-a-wish.html"; // 次のページに遷移

      setTimeout(() => (shakeTimeout = false), 1000); // 1秒間感度を無効化
    }
  }

  lastAcceleration = { x: acceleration.x, y: acceleration.y, z: acceleration.z };
}

// イベントリスナーを登録
function startListening() {
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", handleMotion, false);
  } else {
    console.error("DeviceMotion is not supported on this device.");
  }
}

// センサー使用の許可をリクエスト（iOS 13以降用）
async function requestPermission() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    try {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission === "granted") {
        startListening();
      } else {
        console.error("Motion detection permission denied.");
      }
    } catch (e) {
      console.error("Permission request failed:", e);
    }
  } else {
    // 権限リクエスト不要なデバイスの場合
    startListening();
  }
}

// ページ読み込み後にセンサーの許可をリクエスト
document.addEventListener("DOMContentLoaded", requestPermission);