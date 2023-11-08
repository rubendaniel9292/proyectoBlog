**Proyecto de un blog con MERN Stack**

NOTA:

En la rama main estará todo la api del backend, para el fontend se usará la rama frontend y gh-pages para su respectivo deploy.

**CONSIDERACIONES**

1: Se recomienda tener conocimientos básicos de git y GitHub.

2: El proyecto está hecho con TypeScritp con módulos del ES, para ello se instalaron dependencias compatibles con TS. Revisar cuáles son en el package.json.

3: Al compilar el TS se genera el JS del tipo CommonJS que es más compatible con entornos realizados con node, por eso el curso está hecho con este tipo de modulo.

4: Hacer git colne y para copiar el repositorio y luego npm i para instalar las dependencias necesarias y poder ejecutar el proyecto. Ya está configurado y listo para arrancar.

5: Para los diferentes métodos, las nuevas versiones de mongo ya no admiten el uso de callbacks dentro de los mismos, de ahí que se use try catch y función asíncrona en los métodos de guardar y eliminar, y los then y catch que remplazan a algunos if en los métodos de filtrar y listar.

6: He añadido funcionalidades adicionales en el metodo se subir imagen, por ejemplo que al borrar un ariticulo se eliminte la imagen del articulo y de igual manera al actualizar la iamgen del articulo, se elimine la anterior

