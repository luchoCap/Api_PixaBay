import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListaImagenes from './components/ListaImagenes'


function App() {

  const [busqueda, guardarBusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])
  const [paginaactual, guardarPaginaActual] = useState(6);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPi = async () => {
      if (busqueda === '') return;

      const imagesPorPagina = 30;
      const url = `https://pixabay.com/api/?key=${process.env.REACT_APP_API_PIXABAY}&q=${busqueda}&per_page=${imagesPorPagina}&page=${paginaactual}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits)

      //calcular el total de paginas

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas)

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }

    consultarAPi()
  }, [busqueda, paginaactual])

  //definir pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1

    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual)
  }

  //pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1
    if (nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual)
  }
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListaImagenes imagenes={imagenes} />
        {(paginaactual === 1) ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Anterior </button>

        )}
        {(paginaactual === totalpaginas) ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
