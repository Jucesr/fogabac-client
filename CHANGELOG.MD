## 0.0.17 (1H)
  Fecha: 25 Septiembre 2019
  * [FIX]
    * El total de porcentaje de cada scoring se calcula en el server. 

## 0.0.16 (4H)
  Fecha: 24 Septiembre 2019
  * [NEW]
    * Funcionalidad para capturar Scoring (4/6)
      * Fogabac
      * Gob BC
      * Solvencia Moral
      * Proyecto Estrategico
    * Formato Percentage para el metodo util formatColumn
  * [FIX]
    * Crash cuando options estaba vacio en componente Field


## 0.0.15 (3H)
  Fecha: 19 Septiembre 2019
  * [NEW]
    * Funcionalidad para generar tarjeta ejecutiva (parcial)
    * Funcionalidad para administrar Ingresos y Egresos en estados financieros
    * Funciones Utils para validar campos de un formulario
  * [FIX]
    * Las lineas disponibles en el formulario de credito son en funcion de la actividad
    * En el formulario de Garantias se cambio el texto datos de terreno por colindancia de terreno

## 0.0.14 (1H)
  Fecha: 08 Septiembre 2019
  * [NEW]
    * Funcionalidad ABC para lugares de inversión
    * Funcionalidad ABC para garantias usufurctarias
  * [FIX]
    * Formulario par garantias ususfructarias y hipotecarias se separó en 2 tabs


## 0.0.14 (8H)
  Fecha: 05 Septiembre 2019
  * [FIX]
    * El Header tiene solo elementos que funcionan y se marca como activado cuando esta seleccionado
    * Se agregó comision por apertura al estado de cuenta
    * Validación de los inputs para capturar pagares y recuperaciones.
    * El metodo onUpdate del crud de reducers manda el item anterior.
  * [NEW]
    * Ruta de Settings para configuraciones generales del sistema.
      * Se agregó sección de directores
    * Al calcular una recuperación ahora se muestra un resumen del estado de cuenta para ver el total que debe del credito.
    * Archivo Bussines Util para agregar funciones que se usarán para hacer calculos
      * Función para calcular el interes y los totales.
    

## 0.0.13 (8H)
  Fecha: 26 Agosto 2019
  * [NEW]
    * Tab para ver el estado de cuenta (Lo que falta de pagar en un credito)
    * Se puede ver el desglose de una recuperación
    * Funcion util para pasar a mayusculas
  * [UPDATE]
    * El Field tipo currency y percentage ahora toma 4 decimales
    * El formulario de solicitud no lleva Extra, Datos Personales II
    * Se puede pasar el texto y longitud de la columna Acciones en el componente Tabla
    * Se cambia el formato del renglon tipo total en el componente Tabla
    * Se cambió a mayusculas los datos de informacion de solicitante y credito
    * Se cambió las activiades del formulario de credito
    * Tab de pagares solo incluye el monto.
  * [FIX]
    * Acciones para solicitante usan el archivo crud

## 0.0.12 (8H)
  Fecha: 30 Julio 2019
  * [NEW]
    * Funcionalidad para agregar Estados financieros (Activos y Pasivos)
    * Se valida que el monto del credito no sea mayor al maximo permitido por la Bolsa
    * Estilos para el grid que muestra estados financieros
  * [UPDATE]
    * El componente Field ahora muestra el mensaje de error abajo del Label para mejor lectura
    * En el formulario de solicitante NO se puede modificar el nombre
  * [FIX]
    * El destino del credito ya no muestra el guion bajo
    * El texto de gantias prendarias y recuperaciones se actualizó al correcto.

## 0.0.11 (3H)
  Fecha: 28 Julio 2019
  * [NEW]
    * Se agregó el logo y se mejoró usuario en el Header
    * Funcionalidad para administrar garantias prendarias
  * [UPDATE]
    * Se agregó datos bancarios al formulario de solicitante y se separó en tabs

## 0.0.10 (5H)
  Fecha: 26 Julio 2019
  * [NEW]
    * Mensaje de carga en un Dimmer dentro del componente Notification
    * Credito Index
      * Funcionalidad para cambiar de estado un credito
      * Funcionalidad para generar solicitud de credito
      * Botones de Tarjeta Ejecutiva y Generacion de contrato (No se han implementado aun)
  * [UPDATE]
    * Reducer de credito ahora usa operaciones CRUD y se le agregó una nueva para generar reporte de solictud de credito
    * Handler para actualizar crédito.
  * [FIX]
    * Se puede modificar la entidad padre de donde se hará el fetch de los sub elementos ejemplo 'padre/id/hijos' en el crud de actions

## 0.0.9 (4H)
  Fecha: 24 Julio 2019
  * [NEW]
    * Funcionalidad para administrar Recuperaciones
    * Columnas para ver recuperaciones de capital e interes en pagares
  * [FIX]
    * El total de garantia hipotecaria tiene formato de moneda.

## 0.0.8 (2H)
  Fecha: 04 Julio 2019
  * [NEW]
    * Funcionalidad para administrar Pagarés.
    * Función en reducer de Credito para generar manejadores de acciones muy similares y ahorrar código.
  * [FIX] 
    * Bug que no dejaba editar Fields que usan Cleave, Se agregó la propiedad value 
    * El método update del crud de store/actions no tenia el dispatch de error cuando el request fallaba.
    * El método formatColumn de utils ahora regresa 0 o $0 cuando el valor no es numerico.

## 0.0.8 (3H)
  Fecha: 30 Junio 2019
  * [NEW] Funcionalidad para agregar Garantias Hipotecarias a un credito
  * [UPDATE] Referencias personales pertenecen a un credito y no a un solicitante.
  * [UPDATE] Creditos tiene su propia prop en Redux
  * [FIX] Tiee a Tasa Ordinaria

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

## 0.0.6 (3H)
  Fecha: 24 Junio 2019
  * [UPDATE] Se cambió el orden de las acciones en la tabla, Delete va al último.
  * [FIX] Se limpiaron los eslint warnings.
  * [NEW] campo de telefono para formulario de referencias
  * [NEW] acción para descargar archivos de referencias.
  * [NEW] util para llamar el API.

## 0.0.5
  Fecha: 23 Junio 2019
  * [NEW] Acciones para borrar y editar referencias.
  * [NEW] Se modificó la accción para agregar referencia para que tambien agrege el archivo.

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

## 0.0.3
  Date: June 16, 2019
  * [FIX] split route Solicitnates in 2 routes.

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

## 0.0.1
  Date: June 04, 2019
  * [ADD] First realese version.