## 0.0.1
  Date: June 04, 2019
  * [ADD] First realese version.

## 0.0.2
  Date: June 10, 2019
  * [NEW] Install Cleave.js
  * [NEW] Row in table will change color when hover
  * [NEW] New Currency type in Field component. 
  * [FIX] Header problem with rendering 'a' tag inside 'a'
  * [NEW] Tipo de Creditos entity. Will be load them when an Apoyo is selected
  * [DELETE] Creditos reducer. creditos will be store in solicitante
  * Solicitantes Route
    * [NEW] Creditos will be load when a solicitante is selected
    * CreditoForm 
      * [NEW] uses external data to load options for its selects.
      * [NEW] uses redux store directly
      * [FIX] uses real tipo de credito and bolsas de credito
      * [FIX] change names of Field name to match API names
    * [FIX] column format in CreditoList

## 0.0.3
  Date: June 16, 2019
  * [FIX] split route Solicitnates in 2 routes.

## 0.0.4
  Date: June 17, 2019
  * [NEW] Install Hot Loader for development mode.
  * [NEW] Kind for Field component => Input File
  * [NEW] Table component. It includes a column for CRUD actions and spanish messages
  * [NEW] Credito Info component.
  * [NEW] Tabs for Credito Route
  * [NEW] Referencias personales Tab
    * [NEW] Add item
    * [NEW] Form to add RP
  * [STORE] Update solicitante reducer to include hanldlers for Referencias personales 

## 0.0.5
  Fecha: 23 Junio 2019
  * [NEW] Acciones para borrar y editar referencias.
  * [NEW] Se modificó la accción para agregar referencia para que tambien agrege el archivo.

## 0.0.6 (3H)
  Fecha: 24 Junio 2019
  * [UPDATE] Se cambió el orden de las acciones en la tabla, Delete va al último.
  * [FIX] Se limpiaron los eslint warnings.
  * [NEW] campo de telefono para formulario de referencias
  * [NEW] acción para descargar archivos de referencias.
  * [NEW] util para llamar el API.

## 0.0.7 (2H)
  Fecha: 25 Junio 2019
  * [ADD] Se agregarón dos tipos en componente Field (Porcentaje, Numerico)
  * [NEW] Componente para notificaciones de error.
  * [FIX] Acciones de Creditos y Referencias personales tienen validado los errores.
  * [FIX] CreditoPage
    * El formulario ahora se cierra cuando se le da submit
    * Se validaron que los campos no esten vacios y sean del tipo que corresponde
    * La lista ahora muestra el folio correcto
  * [FIX] ReferenciasPersonales
    * Se hizo obligatorio el nombre

## 0.0.8 (3H)
  Fecha: 30 Junio 2019
  * [NEW] Funcionalidad para agregar Garantias Hipotecarias a un credito
  * [UPDATE] Referencias personales pertenecen a un credito y no a un solicitante.
  * [UPDATE] Creditos tiene su propia prop en Redux
  * [FIX] Tiee a Tasa Ordinaria
