// マイクの音を検出して次のページにリダイレクトするコード
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    analyser.fftSize = 256; // FFTサイズ
    microphone.connect(analyser);

    // 音量をチェックする関数
    const checkVolume = () => {
      analyser.getByteFrequencyData(dataArray); // 音データを取得
      const volume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length; // 平均音量

      console.log("Volume:", volume); // 音量ログ（確認用）

      // 音量が閾値を超えたらページ遷移
      const threshold = 8; // 閾値（調整可能）
      if (volume > threshold) {
        console.log("Sound detected! Redirecting...");
        window.location.href = "make-a-wish.html"; // 次のページへのリダイレクト
      } else {
        requestAnimationFrame(checkVolume); // 音量を継続的にチェック
      }
    };

    checkVolume(); // 音量チェック開始
  })
  .catch(error => {
    console.error("Microphone access denied or error:", error);
  });
