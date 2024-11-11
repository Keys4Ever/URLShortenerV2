# URLShortenerV2
Second version of my URL Shortener. This one will have a frontend with React, and a backend with Node.



##TODO
- [ ] Hacer que el input del longurl no sea type url, si no que añada el https:// o http:// si no los tiene
- [ ] Cambiar todos los Href por navigate (Siempre y cuando sean dentro del front)
- [ ] Quick shorten en el home
- [ ] Forma de agregar un quickshortened a tu perfil (Con botón de confirmar y un secret censurado, guardar en bdd)
- [ ] Tags guardarlas en localstorage, así cuando se hace el edit se llena el formulario mas rápido y no tiene que estar recuperando del back, o añadir preloaders, lo que diga nuestro todo poderoso dios https://wheelofnames.com/
- [ ] Fixear el overflow del dropdown menú del perfil. 
- [ ] En vez del svg usar la foto de perfil del usuario
- [ ] Skeleton loaders para cuando se estén cargando las urls

### Settings
- [ ] Cambiar foto


### Refactors
- [ ] Cambiar base de datos a postgresql (render) o mongodb
- [ ] Arquitectura frontend: Screaming arq
- [ ] Quizás refactorizar el dashboard -> dejar de usar las actualizaciones en el front, podemos permitirnos hacer llamadas al backend
