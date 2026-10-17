(function(){'use strict';
  const p=new URLSearchParams(location.search);
  // Deliberately accept only the local quest prototype, never an arbitrary redirect URL.
  if(p.get('returnTo')!=='quest_test.html')return;
  const link=document.createElement('a');
  const destination=new URL('quest_test.html',document.baseURI);
  const stage=Number(p.get('returnStage'));
  if(Number.isInteger(stage)&&stage>=1&&stage<=5)destination.searchParams.set('returnStage',String(stage));
  link.href=destination.href;
  link.textContent='← GOIMON QUESTに戻る（もう一度挑戦）';
  link.style.cssText='display:block;margin:1rem auto;padding:.9rem 1rem;border:2px solid currentColor;border-radius:12px;max-width:34rem;text-align:center;font-weight:700;';
  document.body.prepend(link);
})();
