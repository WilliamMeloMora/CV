//  ====  Este código es un plugin de jQuery llamado "Typewriter.js". El plugin crea un efecto de "escritura a máquina" en un elemento HTML específico. La función typer() se encarga de hacer que los caracteres aparezcan uno a uno como si alguien estuviera escribiendo en un teclado. ====

!(function (a) {
  "use strict";
  a.fn.typer = function (b) {
    function c(a, b) {
      k < b.length
        ? ((g = b[k].split("")),
          (h = g.length),
          setTimeout(function () {
            a.append(g[j]),
              j++,
              j < h
                ? c(a, b)
                : ((j = 0),
                  k++,
                  setTimeout(function () {
                    e(a, function () {
                      c(a, b);
                    });
                  }, i.backspaceDelay));
          }, i.typeSpeed))
        : i.repeat && d(a, b);
    }
    function d(a, b) {
      (k = 0),
        setTimeout(function () {
          c(a, b);
        }, i.repeatDelay);
    }
    function e(a, b) {
      setTimeout(function () {
        a.text(a.text().slice(0, -1)),
          a.text().length > 0 ? e(a, b) : "function" == typeof b && b();
      }, i.backspaceSpeed);
    }
    function f(a) {
      setInterval(function () {
        a.fadeOut(400).fadeIn(400);
      }, 900);
    }
    var g,
      h,
      i = a.extend(
        {
          typeSpeed: 60,
          backspaceSpeed: 20,
          backspaceDelay: 800,
          repeatDelay: 1e3,
          repeat: !0,
          autoStart: !0,
          startDelay: 100,
          useCursor: !0,
          strings: ["Typer.js plugin"],
        },
        b
      ),
      j = 0,
      k = 0;
    return this.each(function () {
      var b,
        d,
        e = a(this);
      i.autoStart &&
        (e.append('<span class="typed"></span>'),
        i.useCursor &&
          (e.append('<span class="typed_cursor">&#x7c;</span>'),
          (d = e.children(".typed_cursor")),
          f(d)),
        (b = e.children(".typed")),
        setTimeout(function () {
          c(b, i.strings);
        }, i.startDelay));
    });
  };
})(jQuery);

$("#example").typer({
  strings: [
    "Desarrollador Web...",
    "Bases de Datos...",
    "Informática...",
    "Educación... ",
    "Electrónica...",
  ],
  typeSpeed: 200,
  backspaceSpeed: 20,
  backspaceDelay: 800,
  repeatDelay: 1000,
  repeat: true,
  autoStart: true,
  startDelay: 100,
});
