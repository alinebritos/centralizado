// sidebar
document.addEventListener("DOMContentLoaded", () => {
    const toggleDropdown = (dropdown, menu, forceOpen = null) => {
        const isOpen = forceOpen !== null ? forceOpen : !dropdown.classList.contains("open");
        
        dropdown.classList.toggle("open", isOpen);
        menu.style.height = isOpen ? `${menu.scrollHeight}px` : "0px";
    };
    
    const ativarMenuAutomaticamente = () => {
        const urlCompleta = window.location.href; 
        
        document.querySelectorAll(".nav-link, .dropdown-toggle").forEach(el => {
            el.classList.remove("active");
        });

        const linksDeNavegacao = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

        linksDeNavegacao.forEach(link => {
            const linkHref = link.getAttribute("href"); 

            if (!linkHref || linkHref === "#") return;

            if (urlCompleta.endsWith(linkHref)) {
 
                link.classList.add("active");

                const containerDropdown = link.closest(".dropdown-container");
                
                if (containerDropdown) {

                    const menu = containerDropdown.querySelector(".dropdown-menu");
                    toggleDropdown(containerDropdown, menu, true);

                    const botaoPai = containerDropdown.querySelector(".dropdown-toggle");
                    if (botaoPai) {
                        botaoPai.classList.add("active");
                    }
                }
            }
        });
    };

    document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            const container = toggle.closest(".dropdown-container");
            const menu = container.querySelector(".dropdown-menu");

            toggleDropdown(container, menu, null); 
        });
    });

    const togglers = document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button");
    togglers.forEach(btn => {
        btn.addEventListener("click", () => {
             document.querySelector(".sidebar").classList.toggle("collapsed");
        });
    });

    ativarMenuAutomaticamente();
});

// script da paginação
document.addEventListener('DOMContentLoaded', () => {
  const rowsPerPage = 6; 
  const tableBodyElement = document.getElementById('tableBody'); 

  if (!tableBodyElement) return; 

  const allRows = Array.from(tableBodyElement.querySelectorAll('tr'));
  
  const pageCount = Math.ceil(allRows.length / rowsPerPage);
  let currentPage = 1;

  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const pagesContainer = document.getElementById('pages');

  function displayPage(page) {
    currentPage = page;
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    allRows.forEach(row => row.style.display = 'none');

    allRows.slice(start, end).forEach(row => row.style.display = ''); 

    prevButton.disabled = page === 1;
    nextButton.disabled = page === pageCount;

    pagesContainer.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('active');
      if (parseInt(btn.dataset.page) === currentPage) {
        btn.classList.add('active');
      }
    });
  }

  function setupPagination() {
    pagesContainer.innerHTML = ''; 
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement('button');
      btn.innerText = i;
      btn.dataset.page = i; 
      btn.addEventListener('click', () => displayPage(i));
      pagesContainer.appendChild(btn);
    }
  }

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) displayPage(currentPage - 1);
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < pageCount) displayPage(currentPage + 1);
  });

  if(allRows.length > 0) {
    setupPagination();
    displayPage(1);
  } else {
      document.getElementById('pagination').style.display = 'none'; 
  }
});

// Efeito do tab dos editores de texto

const menu = document.querySelector(".menu");

if (menu) {
"use strict"; 

const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

function clickItem(item, index) {

    menu.style.removeProperty("--timeOut");
    
    if (activeItem == item) return;
    
    if (activeItem) {
        activeItem.classList.remove("active");
    }

    
    item.classList.add("active");
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder);
    
    
}

function offsetMenuBorder(element, menuBorder) {

    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {

    item.addEventListener("click", () => clickItem(item, index));
    
})

window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});

const btnLogout = document.getElementById('btn-logout');

if (btnLogout) {
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault(); 

    const confirmExit = confirm("Tem certeza que deseja sair do sistema?");

    if (confirmExit) {

      window.location.href = 'index.html';
    }
  });
}
}