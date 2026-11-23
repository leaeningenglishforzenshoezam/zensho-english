(function(){
  function updateVisibleViewport(){
    const v=window.visualViewport;
    const w=v?.width||document.documentElement.clientWidth;
    const h=v?.height||window.innerHeight;
    const root=document.documentElement.style;
    root.setProperty('--visible-width',`${Math.max(1,w)}px`);
    root.setProperty('--visible-height',`${Math.max(1,h)}px`);
    root.setProperty('--visible-left',`${v?.offsetLeft||0}px`);
    root.setProperty('--visible-top',`${v?.offsetTop||0}px`);
  }
  updateVisibleViewport();
  window.addEventListener('resize',updateVisibleViewport,{passive:true});
  window.addEventListener('orientationchange',updateVisibleViewport,{passive:true});
  window.visualViewport?.addEventListener('resize',updateVisibleViewport,{passive:true});
  window.visualViewport?.addEventListener('scroll',updateVisibleViewport,{passive:true});
})();
