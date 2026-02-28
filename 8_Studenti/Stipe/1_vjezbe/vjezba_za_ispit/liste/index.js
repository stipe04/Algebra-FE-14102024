const article = document.querySelector('article');

document.getElementById('pauseBtn').addEventListener('click', () => {
  article.style.animationPlayState = 'paused';
});
document.getElementById('playBtn').addEventListener('click', () => {
  article.style.animationPlayState = 'running';
});
document.getElementById('speedBtn').addEventListener('click', () => {
  article.style.animationDuration = '2s';
});
document.getElementById('reverseBtn').addEventListener('click', () => {
  article.style.animationDirection = 'alternate-reverse';
});