/* Enhance Constant Contact's asynchronously rendered footer signup form. */
(function(){
  function enhance(){
    document.querySelectorAll('.footer-subscribe').forEach(function(footer){
      var form=footer.querySelector('form');
      var email=footer.querySelector('input[type="email"], input[name="email"]');
      if(email){
        if(email.placeholder!=='YOUR EMAIL ADDRESS')email.placeholder='YOUR EMAIL ADDRESS';
        if(email.getAttribute('aria-label')!=='Your email address')email.setAttribute('aria-label','Your email address');
      }
      /* Hide the redundant widget description, keeping our heading copy above. */
      var repeated='Receive our bi-monthly newsletters exploring biblical manuscripts, the remarkable history of God';
      footer.querySelectorAll('.ctct-inline-form p, .ctct-inline-form div, .ctct-inline-form span').forEach(function(el){
        var txt=(el.textContent||'').trim();
        if(txt.startsWith(repeated) && !Array.from(el.children).some(function(child){return (child.textContent||'').trim().startsWith(repeated);})){
          if(el.style.display!=='none')el.style.display='none';
        }
      });
      if(!form)return;
      var button=form.querySelector('button[type="submit"], input[type="submit"], .ctct-form-button');
      if(!button)return;
      /* Find the consent notice by its text, not a vendor-specific class. */
      var notice=Array.from(form.querySelectorAll('p, div, small, span')).find(function(el){
        return el.textContent.includes('By submitting this form') &&
          !Array.from(el.children).some(function(child){return child.textContent.includes('By submitting this form');});
      });
      if(!notice)return;
      var buttonNode=button, noticeNode=notice;
      while(buttonNode.parentElement && buttonNode.parentElement!==form)buttonNode=buttonNode.parentElement;
      while(noticeNode.parentElement && noticeNode.parentElement!==form)noticeNode=noticeNode.parentElement;
      if(buttonNode===noticeNode){
        var common=button.parentElement;
        while(common && !common.contains(notice))common=common.parentElement;
        if(!common)return;
        buttonNode=button;
        noticeNode=notice;
        while(buttonNode.parentElement!==common && buttonNode.parentElement)buttonNode=buttonNode.parentElement;
        while(noticeNode.parentElement!==common && noticeNode.parentElement)noticeNode=noticeNode.parentElement;
      }
      if(buttonNode!==noticeNode && buttonNode.parentElement===noticeNode.parentElement && buttonNode.nextElementSibling!==noticeNode){
        buttonNode.insertAdjacentElement('afterend',noticeNode);
      }
    });
  }
  function start(){
    var footer=document.querySelector('.footer-subscribe');
    if(!footer)return;
    enhance();
    var observer=new MutationObserver(enhance);
    observer.observe(footer,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
