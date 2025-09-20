(function(){
  const navbar = document.querySelector('.navbar-mobile');
  const svg = navbar.querySelector('svg.cut');
  const cut = svg.querySelector('#cutCircle');
  const maskRect = svg.querySelector('#maskRect');
  const bgRect = svg.querySelector('#bgRect');
  const items = Array.from(navbar.querySelectorAll('.nav-item'));

  function refreshSVGSize(){
    // set SVG viewBox to actual pixel width/height so cx coordinates match pixel values
    const w = navbar.clientWidth;
    const h = navbar.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    // keep rects sized to viewbox
    maskRect.setAttribute('width', w);
    maskRect.setAttribute('height', h);
    maskRect.setAttribute('rx', h/2);
    bgRect.setAttribute('width', w);
    bgRect.setAttribute('height', h);
    bgRect.setAttribute('rx', h/2);

    // if an item is active, re-center notch
    const active = navbar.querySelector('.nav-item.active');
    if (active) moveNotchTo(active, false);
  }

  function getCenterRelativeToNavbar(el){
    const itemRect = el.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    // center x relative to navbar coordinate system
    return (itemRect.left + itemRect.width/2) - navRect.left;
  }

  function moveNotchTo(el, animate = true){
    const cx = getCenterRelativeToNavbar(el);
    // keep notch at top edge (cy=0) so a semicircle cuts into the bar.
    cut.setAttribute('cy', 0);
    // update with CSS transition if requested
    if(animate){
      cut.style.transition = 'cx 0.28s cubic-bezier(.2,.9,.2,1)';
    } else {
      cut.style.transition = 'none';
    }
    cut.setAttribute('cx', cx);
  }

  // click behavior: set active and move notch
  items.forEach(item=>{
    item.addEventListener('click', (e)=>{
      // keep normal anchor navigation behavior; just toggle active class and move notch
      items.forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      moveNotchTo(item, true);
    });
  });

  // init + on resize
  window.addEventListener('load', refreshSVGSize);
  window.addEventListener('resize', refreshSVGSize);

  // also reposition on orientation change / safe-area changes
  window.addEventListener('orientationchange', () => setTimeout(refreshSVGSize, 200));

  // initialize with the active item
  refreshSVGSize();
})();