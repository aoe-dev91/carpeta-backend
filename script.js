
let estructuraTemas = {};
let contenidos = {};

Promise.all([
  fetch("temas.json").then(r => r.json()),
  fetch("contenidos.json").then(r => r.json())
]).then(([temasData, contenidosData]) => {
  estructuraTemas = temasData;
  contenidos = contenidosData;
  mostrarMenuPrincipal();
});

function mostrarMenuPrincipal() {
  const app = document.getElementById("app");
  app.innerHTML = "<h1>Temas</h1>";
  estructuraTemas.temas.forEach(tema => {
    const btn = document.createElement("button");
    btn.innerHTML = `<img src="${tema.imagen}" alt=""><div>${tema.nombre}</div>`;
    btn.onclick = () => mostrarSubtemas(tema);
    app.appendChild(btn);
  });
}

function mostrarSubtemas(tema) {
  const app = document.getElementById("app");
  app.innerHTML = `<h2>${tema.nombre}</h2>`;
  tema.subtemas.forEach(sub => {
    const btn = document.createElement("button");
    btn.innerHTML = `<img src="${sub.imagen}" alt=""><div>${sub.nombre}</div>`;
    btn.onclick = () => mostrarContenido(sub.codigo);
    app.appendChild(btn);
  });
  const volver = document.createElement("button");
  volver.textContent = "Volver al inicio";
  volver.onclick = mostrarMenuPrincipal;
  app.appendChild(volver);
}

function mostrarContenido(codigo) {
  const subtema = contenidos[codigo];
  const app = document.getElementById("app");
  app.innerHTML = `<h2>${subtema.titulo}</h2>`;
  subtema.contenido.forEach(bloque => {
    if (bloque.tipo === "p") {
      const p = document.createElement("p");
      p.textContent = bloque.texto;
      app.appendChild(p);
    } else if (bloque.tipo === "img") {
      const img = document.createElement("img");
      img.src = bloque.src;
      app.appendChild(img);
    } else if (bloque.tipo === "h3") {
      const h3 = document.createElement("h3");
      h3.textContent = bloque.texto;
      app.appendChild(h3);
    } else if (bloque.tipo === "ul") {
          const ul = document.createElement("ul");
          bloque.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          app.appendChild(ul);
    } else if (bloque.tipo === "ol") {
          const ol = document.createElement("ol");
          bloque.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ol.appendChild(li);
          });
          app.appendChild(ol);
    } else if (bloque.tipo === "code") {
          const pre = document.createElement("pre");
          pre.textContent = bloque.texto;
          app.appendChild(pre);
    } else if (bloque.tipo === "quote") {
          const blockquote = document.createElement("blockquote");
          blockquote.textContent = bloque.texto;
          app.appendChild(blockquote);
    }
  });
  const volver = document.createElement("button");
  volver.textContent = "Volver a subtemas";
  volver.onclick = () => {
    const tema = estructuraTemas.temas.find(t => t.subtemas.some(s => s.codigo === codigo));
    mostrarSubtemas(tema);
  };
  app.appendChild(volver);
}
