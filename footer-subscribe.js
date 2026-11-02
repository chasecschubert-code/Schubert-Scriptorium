/* Set an accessible placeholder on the Constant Contact-generated email field. */
(function(){
  function enhance(){
    document.querySelectorAll('.footer-subscribe input[type="email"], .footer-subscribe input[name="email"]').forEach(function(input){
      input.setAttribute('placeholder','YOUR EMAIL ADDRESS');
      input.setAttribute('aria-label','Your email address');
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
  function start(){
    enhance();
    var footer=document.querySelector('.footer-subscribe');
    if(!footer)return;
    var observer=new MutationObserver(enhance);
    observer.observe(footer,{childList:true,subtree:true});
  }
})();
