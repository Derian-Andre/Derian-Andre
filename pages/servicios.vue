<template>
   <div>
      <h2>Diseño</h2>
      <ul>
         <li>Branding 
            <ul>
               <li>Naming</li>
               <li>Branding</li>
               <li>Rediseño</li>
               <li>Asesoramiento de Imagen</li>
               <li>Papelería</li>
            </ul>
         </li>
         <li>Diseño UI (Interfaz de usuario)</li>
         <li>Diseño UX (Experiencia de usuario)</li>
      </ul>
      
      <hr>

      <h2>Desarrollo</h2>
      <ul>
         <li>Páginas: Landings, Tiendas, Portafolios, Galerías, etc.</li>
         <li>Maquetación</li>
         <li>WordPress Themes</li>
      </ul>
      <hr>

      <h2>Fotografía</h2>
      <ul>
         <li>Retratos</li>
         <li>Bodas</li>
         <li>Productos</li>
         <li>Manipulación/retoque digital</li>
      </ul>

      <hr>

      <p> 
         <a href="mailto:hola@derianandre.com" class="btn btn-outline-link">
            ¡Hagamos algo chingón!
         </a>
      </p>
   </div>
</template>

<script>
   export default {
      layout: 'page',
      created() {
         this.$store.commit('page/setName', 'Servicios')
      },
   }
</script>