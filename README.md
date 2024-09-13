# Crud Ecommerce Software

es una aplicación completa diseñada para gestionar productos y usuarios con un sistema robusto de roles y administración. Este proyecto incluye tanto un frontend interactivo como un backend sólido, junto con una base de datos no relacional para almacenar y manipular datos de manera eficiente.

## Descripción

El proyecto está compuesto por:

- **Frontend**: Desarrollado en React con Tailwind CSS para una experiencia de usuario moderna y receptiva. Utiliza `useContext` para gestionar el estado global de la aplicación, permitiendo una interacción fluida y una actualización en tiempo real de los datos mostrados.

- **Backend**: Construido con Express para manejar las solicitudes del cliente y gestionar la lógica del servidor. La base de datos no relacional MongoDB se utiliza para almacenar información sobre usuarios, productos y categorías de manera eficiente y flexible.

### Principales Funcionalidades

- **Sistema de Inicio y Registro**: Los usuarios pueden crear cuentas y acceder a la aplicación de manera segura.
- **Validación en Tiempo Real**: Los formularios se validan en tiempo real para garantizar la precisión de los datos ingresados.
- **Gestión de Productos**: Los productos pueden ser creados, eliminados y filtrados por categorías.
- **Sistema de Categorías**: Permite la creación y eliminación de categorías de productos.
- **Control de Accesos y Roles**: Implementa un sistema de roles que define los permisos y accesos de los usuarios.
- **Administración de Usuarios**: Facilita la creación, eliminación y edición de usuarios, lo que permite una administración eficiente.

## Tecnologías Utilizadas

- **Frontend**: React, Tailwind CSS
- **Backend**: Express
- **Base de Datos**: MongoDB

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14.x o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (opcional, si estás ejecutando una instancia local)

## Instalación y Configuración

### 1. Clonar el Repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio```

### 2. Ingresa a las carpetas
Ingresa en la carpetas por separado CytBackend, CytFrontend e instala las dependencias en cada una dellas


### 3. Configura tu entorno
En la carpeta CytBackend deberas crear un archivo .env en la raiz dobde deberas definir estas 3 variables
PORT=
MONGODB_URI=
JWT_SECRET=

En la carpeta CytFrontend dentro de la carpeta API deberás colocar la url de tu endopoint del backend

### 5. Listo! ahora lo puedes iniciar correctamente!



