if ( 'serviceWorker' in navigator ){
    navigator.serviceWorker.register('./SW.js')
        .then( resolve => console.log('SW registrado correctamente') )
        .catch( error  => console.log('No se pudo registrar el SW') )
} else {
    console.log('Service Worker no soportado en el navegador');
}