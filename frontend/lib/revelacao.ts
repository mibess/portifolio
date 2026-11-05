/**
 * Script inline (no <head>) das revelações ao rolar. Roda antes do React, sem depender dos chunks do Next:
 * - marca o <html> com `js`, o que liga o estado inicial escondido no CSS;
 * - observa [data-reveal] e [data-reveal-grupo] e marca `data-visivel` uma única vez ao entrar na tela;
 * - num grupo, numera os itens (--revelar-i) para o escalonamento;
 * - acompanha elementos que o React montar depois (MutationObserver).
 * Navegadores sem IntersectionObserver ficam sem a classe `js` e mostram tudo direto.
 */
export const scriptRevelacao = `(function(){
var d=document,h=d.documentElement;
if(!("IntersectionObserver" in window)||!("MutationObserver" in window))return;
h.classList.add("js");
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(!e.isIntersecting)return;
    var el=e.target;io.unobserve(el);
    if(el.hasAttribute("data-reveal-grupo")){
      var i=0;
      el.querySelectorAll("[data-reveal]").forEach(function(it){
        if(it.parentElement&&it.parentElement.closest("[data-reveal-grupo]")===el)it.style.setProperty("--revelar-i",String(i++));
      });
    }
    el.setAttribute("data-visivel","");
  });
},{rootMargin:"0px 0px -8% 0px"});
function talvez(el){
  if(el.__revelar)return;
  var grupo=el.hasAttribute("data-reveal-grupo");
  if(!grupo&&el.parentElement&&el.parentElement.closest("[data-reveal-grupo]"))return;
  el.__revelar=1;io.observe(el);
}
function varrer(raiz){
  if(raiz.matches&&raiz.matches("[data-reveal],[data-reveal-grupo]"))talvez(raiz);
  if(raiz.querySelectorAll)raiz.querySelectorAll("[data-reveal],[data-reveal-grupo]").forEach(talvez);
}
function iniciar(){
  varrer(d);
  new MutationObserver(function(ms){
    ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)varrer(n);});});
  }).observe(d.body,{childList:true,subtree:true});
}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",iniciar);else iniciar();
})();`;
