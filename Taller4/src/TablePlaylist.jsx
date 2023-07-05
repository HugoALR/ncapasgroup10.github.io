import React, { useState, useEffect } from 'react';

function TablePlaylist() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/users/playlists') // Reemplaza la URL con la ruta correcta de tu API de Spring
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
return (
    <div>
      <h1>Tabla de Datos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr>
              <td>{item.title}</td>
              <td>{item.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePlaylist;