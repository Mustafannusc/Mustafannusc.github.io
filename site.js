/* Shared site utilities: renders the sidebar navigation and footer
   on every page so they are defined in one place. */
(function () {
  var SITE_NAME = "Dr. M. Mustafa Azeem";

  var NAV_LINKS = [
    ["index.html", "Homepage"],
    ["biography.html", "Biography"],
    ["research.html", "Research Interests"],
    ["publications.html", "Publications"],
    ["projects.html", "Projects"],
    ["teaching.html", "Teaching"],
    ["grants.html", "Grants & Funding"],
    ["code.html", "Code & Tools"],
    ["references.html", "References & Service"],
    ["gallery.html", "Gallery"],
    ["contact.html", "Contact"],
    ["services.html", "Services"],
    ["misc.html", "Misc"]
  ];

  function currentPage() {
    var page = window.location.pathname.split("/").pop();
    return page === "" ? "index.html" : page;
  }

  function renderSidebar(el) {
    var page = currentPage();
    var html = "<h2>" + SITE_NAME + "</h2>\n<ul class=\"nav\">\n";
    NAV_LINKS.forEach(function (link) {
      var cls = link[0] === page ? " class=\"active\"" : "";
      html += "  <li><a" + cls + " href=\"" + link[0] + "\">" + link[1] + "</a></li>\n";
    });
    html += "</ul>";
    el.innerHTML = html;
  }

  function renderFooter(el) {
    var counter = "";
    if (el.hasAttribute("data-visitor-counter")) {
      counter =
        "<div class=\"visitor-counter\">" +
        "\uD83D\uDC41\uFE0F <span id=\"busuanzi_value_site_uv\">0</span>" +
        "&nbsp;|&nbsp;" +
        "\uD83D\uDCC4 <span id=\"busuanzi_value_site_pv\">0</span>" +
        "</div>";
      var script = document.createElement("script");
      script.async = true;
      script.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
      document.body.appendChild(script);
    }
    el.innerHTML =
      counter + "<hr><p>\u00A9 2026 Mustafa Azeem. All rights reserved.</p>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-site-sidebar]").forEach(renderSidebar);
    document.querySelectorAll("[data-site-footer]").forEach(renderFooter);
  });
})();
