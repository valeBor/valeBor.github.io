'use strict';

document.documentElement.classList.add('js');
document.querySelector('#year').textContent = new Date().getFullYear();

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
});

const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('.project[data-category]')];
filters.hidden = false;
filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  const category = button.dataset.filter;
  filters.querySelectorAll('button').forEach((filter) => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  projects.forEach((project) => {
    const visible = category === 'all' || project.dataset.category === category;
    project.hidden = !visible;
    if (visible) count += 1;
  });
  document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'proyecto visible' : 'proyectos visibles'}.`;
});

// Editá aquí los detalles de tus proyectos. Los enlaces privados no se publican.
const details = {
  worktrack: {
    title: 'WorkTrack',
    category: 'DESARROLLO WEB · PROYECTO EN EQUIPO',
    summary: 'Una aplicación para organizar la asistencia y acompañar la gestión diaria de una organización.',
    sections: [
      { title: 'El problema', text: 'Centralizar las marcaciones, los horarios y las incidencias para que empleados, supervisores, RR. HH. y administradores trabajen con la misma información.' },
      { title: 'Qué permite hacer', items: ['Registrar entradas y salidas con un QR dinámico generado desde el panel del administrador.', 'Validar el horario y la red LOCAL o VPN al registrar la asistencia.', 'Gestionar horarios, modalidades y solicitudes de cambio.', 'Consultar reportes, alertas y notificaciones.', 'Registrar asistencia manual desde los perfiles de Supervisor y RR. HH., con auditoría.'] },
      { title: 'Desarrollo técnico', text: 'Angular, Node.js con Express y MariaDB. Autenticación con JWT, contraseñas con bcrypt, migraciones con Flyway y pruebas de API con Supertest.' },
      { title: 'Contexto', text: 'Proyecto académico desarrollado en equipo para Prácticas Profesionalizantes III del Instituto Beltrán.' }
    ],
    note: 'El repositorio de este proyecto es privado.'
  },
  delishey: {
    title: 'DeliShey',
    category: 'E-COMMERCE · PROYECTO COLABORATIVO',
    summary: 'Una tienda online que conecta el catálogo de productos con la gestión de los pedidos.',
    sections: [
      { title: 'Qué permite hacer', items: ['Explorar productos por categoría y agregarlos al carrito.', 'Crear una cuenta e iniciar sesión.', 'Administrar productos desde un perfil con permisos específicos.', 'Registrar pedidos y consultar valoraciones.'] },
      { title: 'Desarrollo técnico', text: 'Frontend con Angular, API con Node.js y Express, y almacenamiento en MySQL. Separación entre rutas, lógica y acceso a datos; autenticación y control de permisos.' },
      { title: 'Contexto', text: 'Proyecto colaborativo de desarrollo web.' }
    ],
    link: { label: 'Ver repositorio en GitHub', href: 'https://github.com/YeilaInsaurralde/DeliShey' }
  },
  faunasur: {
    title: 'Centro de Rescate FaunaSur',
    category: 'JAVA · PROGRAMACIÓN ORIENTADA A OBJETOS',
    summary: 'Un sistema de consola para administrar animales en un centro de rescate y practicar un diseño orientado a objetos.',
    sections: [
      { title: 'Qué permite hacer', items: ['Registrar aves, mamíferos y reptiles con sus atributos particulares.', 'Consultar y filtrar animales por estado de salud.', 'Calcular el costo diario de cada animal.', 'Detectar registros duplicados y comunicar el error mediante una excepción personalizada.'] },
      { title: 'Conceptos aplicados', text: 'Clase abstracta Animal, herencia, encapsulamiento, polimorfismo, interfaces, enumerados, colecciones y excepciones chequeadas. Diseño documentado con UML.' },
      { title: 'Contexto', text: 'Proyecto académico de Programación II.' }
    ]
  }
};

const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
const dialogLinks = document.querySelector('#dialog-links');
const projectButtons = document.querySelectorAll('[data-project]');

if (typeof dialog.showModal === 'function') {
  projectButtons.forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const project = details[button.dataset.project];
      document.querySelector('#dialog-title').textContent = project.title;
      document.querySelector('#dialog-category').textContent = project.category;
      document.querySelector('#dialog-summary').textContent = project.summary;
      dialogContent.replaceChildren();
      dialogLinks.replaceChildren();
      project.sections.forEach((section) => {
        const heading = document.createElement('h3');
        heading.textContent = section.title;
        dialogContent.append(heading);
        if (section.text) {
          const paragraph = document.createElement('p');
          paragraph.textContent = section.text;
          dialogContent.append(paragraph);
        }
        if (section.items) {
          const list = document.createElement('ul');
          section.items.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            list.append(li);
          });
          dialogContent.append(list);
        }
      });
      if (project.link) {
        const link = document.createElement('a');
        link.className = 'button button-dark';
        link.href = project.link.href;
        link.textContent = project.link.label;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        dialogLinks.append(link);
      }
      if (project.note) {
        const note = document.createElement('p');
        note.textContent = project.note;
        dialogLinks.append(note);
      }
      document.body.classList.add('dialog-open');
      dialog.showModal();
      dialog.scrollTop = 0;
    });
  });
}
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
