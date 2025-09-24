const hideVideoFallbackImage = (fallbackElement: HTMLImageElement): void => {
  setTimeout(() => {
    fallbackElement.style.opacity = '0';
  }, 500);
};

export const handleVideoFallback = (videoElement: HTMLVideoElement, fallbackElement: HTMLImageElement): void => {
  if (videoElement.readyState >= 2) {
    hideVideoFallbackImage(fallbackElement);
  } else {
    videoElement.addEventListener('loadeddata', () => {
      hideVideoFallbackImage(fallbackElement);
    });
  }
};

export const handleVideoPause = (videoElement: HTMLVideoElement): void => {
  videoElement.addEventListener('ended', () => {
    setTimeout(() => {
      videoElement.currentTime = 0;
      void videoElement.play();
    }, 2000);
  });
};
