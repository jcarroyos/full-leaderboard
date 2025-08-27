# Reglas para el Agente Copilot en VSCode
## Conversión de Diseño Figma a HTML + CSS + JS

Este documento establece las **reglas y directrices** para guiar al agente Copilot integrado en Visual Studio Code en la tarea de convertir diseños visuales creados en Figma a aplicaciones web sencillas utilizando HTML, CSS y JavaScript "vanilla".

---

## 1. Principios Generales

- **Código limpio y legible:** Priorizar claridad y simplicidad en la escritura del código.  
- **Mínima cantidad de líneas:** Evitar redundancias y sobrecarga. Código conciso sin sacrificar legibilidad.  
- **Sin sobreingeniería:** No incorporar patrones, frameworks o abstracciones complejas innecesarias.  
- **Vanilla JS exclusivamente:** No utilizar bibliotecas ni frameworks externos.  
- **Semántica HTML estricta:** Usar etiquetas HTML5 semánticas adecuadas para contenido y estructura.  
- **Separación estricta de intereses:** Mantener separado el HTML, CSS y JS con archivos o bloques diferenciados.

---

## 2. HTML

- Generar estructura limpia y semántica con etiquetas HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, etc.) según corresponda.  
- Evitar etiquetas genéricas `<div>` cuando exista una opción semántica mejor.  
- Usar atributos `id` y `class` descriptivos y relevantes para estilos y manipulación JS.  
- Incluir siempre atributos necesarios para accesibilidad (`alt`, `aria-*`, roles).  
- Documentar con comentarios breves solo si es necesario para comprensión inmediata.

---

## 3. CSS

- Preferir CSS modular, reutilizable y con nombres de clases claros y consistentes (prefijo si es necesario para evitar conflictos).  
- Evitar estilos inline, concentrar reglas en hojas de estilo externas o bloques `<style>`.  
- Usar la metodología de cascada y herencia propia de CSS, evitando estilos duplicados o complicados.  
- Utilizar variables CSS para colores, tipografía y otros valores constantes para facilitar mantenimiento.  
- Priorizar estilos responsivos con media queries simples cuando sea relevante.  
- No incorporar preprocesadores ni CSS-in-JS.

---

## 4. JavaScript

- Usar solo JavaScript nativo (vanilla JS), sin frameworks ni librerías.  
- Mantener la lógica simple, clara y directa, centrada en la funcionalidad mínima para la interacción del diseño.  
- Declarar funciones y variables con nombres claros y evitar funciones anidadas complejas.  
- Manipular el DOM directamente con métodos estándar (`querySelector`, `addEventListener`, etc.) sin abstracciones.  
- Documentar con comentarios breves únicamente cuando la lógica no sea obvia.  
- Evitar patrones avanzados o arquitecturas modulares complejas.

---

## 5. Evitar

- Uso de frameworks o librerías externas (React, Vue, Angular, jQuery, etc.).  
- Uso de componentes o plantillas JSX, JSX sintaxis o sistemas de renderizado dinámico avanzados.  
- Sobrediseño, sobreingeniería o introducción innecesaria de capas o abstracciones.  
- Código repetitivo sin uso de buenas prácticas como funciones reutilizables o variables.  
- Código difícil de leer o entender para otro desarrollador.

---

## 6. Estilo y Formato

- Seguir convenciones de estilo comunes: indentación de 2 espacios, comillas dobles para HTML y CSS, comillas simples para JS salvo casos especiales.  
- Mantener consistencia en nomenclatura y formato en todo el código generado.  
- Priorizar claridad y fácil seguimiento del flujo de código para futuros mantenimientos o extensiones.

---

## 7. Resultados Esperados

El agente Copilot debe entregar una solución web:

- Fácil de entender y mantener  
- Minimalista en estructura y funcionalidad  
- Totalmente funcional respetando el diseño de Figma  
- Código semántico y accesible  
- Sin dependencias externas  
- Modularidad conceptual aunque sin usar componentes o frameworks  
