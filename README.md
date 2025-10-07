##  1. Documentación del Proceso de Gestión de Secretos

###  Objetivo
Garantizar que las claves privadas, tokens y credenciales sensibles se gestionen de forma segura, evitando su exposición en el código fuente y manteniendo la integridad de los entornos durante todo el ciclo CI/CD.

###  Implementación

#### 🔸 a) Definición de Secrets en GitHub
Las credenciales sensibles se almacenaron en **GitHub Secrets**, accesibles solo para los flujos de trabajo del pipeline:
- `API_KEY` → Clave real para consumir la API de clima (OpenWeatherMap).  
- `RENDER_API_KEY` → Token de autenticación para el despliegue en Render.  
- `RENDER_SERVICE_ID` → Identificador del servicio Render.

Esto asegura que las claves estén cifradas, no visibles en los logs, y disponibles únicamente en tiempo de ejecución.

#### 🔸 b) Uso de Secrets en el Workflow (`.github/workflows/ci-cd.yml`)
Los Secrets se inyectan temporalmente en los pasos que los requieren:
```yaml
env:
  API_KEY: ${{ secrets.API_KEY }} 
```
De esta manera, la aplicación puede acceder a los valores sensibles sin exponerlos en el código ni en el repositorio.

#### c) Configuración de Secrets en Render

La variable API_KEY también fue definida en el entorno de Render (pestaña Environment) para que la aplicación pueda ejecutarse correctamente una vez desplegada.

#### d) Rotación Simulada de Claves

Se implementó un script (rotate_key_sim/rotate-key.js) que simula la rotación automática de credenciales, generando una nueva API Key ficticia cada vez que se ejecuta el pipeline.
Esto demuestra la posibilidad de integrar políticas de renovación periódica de claves como parte de un proceso CI/CD seguro.

## 2. Prácticas de Seguridad Implementadas
### 🔹 Gestión Segura de Credenciales

 Ninguna clave se almacena en el código fuente.

 Uso de GitHub Secrets y Render Environment Variables para credenciales.

 Rotación simulada de claves en cada ejecución del pipeline.

 Separación de entornos (GitHub Actions → CI / Render → CD).

### 🔹 Control de Código y Dependencias

Archivo .gitignore configurado para excluir:

- node_modules/

- Archivos temporales o con claves generadas.

Dependencias instaladas mediante npm install, verificadas con package-lock.json.

Uso de Node.js (v18) para garantizar compatibilidad y soporte de seguridad.

### 🔹 Buenas Prácticas en CI/CD

Pipeline CI/CD automatizado que incluye:

- Build

- Test unitarios (Jest)

- Ejecución temporal con Secrets

- Despliegue automático a Render

- Rotación simulada de claves

Detención controlada del servidor Express durante el pipeline.

Uso de variables de entorno temporales y logs controlados sin exposición de datos sensibles.

## 3. Herramientas Profesionales de Gestión de Claves Privadas

Si bien en este proyecto se utilizó la funcionalidad de GitHub Secrets y Render Environment Variables, en una implementación profesional de rotación de claves podrían integrarse herramientas específicas para la gestión centralizada y automatizada de secretos, tales como HashiCorp Vault, AWS Key Management Service (KMS), Azure Key Vault, GitGuardian y Doppler.

En un entorno real, el script de rotación podría conectarse con alguno de estos sistemas para revocar y reemplazar claves reales automáticamente, garantizando una política de seguridad dinámica y auditable.

## 4. Resumen del Flujo Seguro CI/CD
  [Desarrollador]
     ↓ (commit/push)
  GitHub Actions:
  → Construcción y pruebas automatizadas
  → Ejecución temporal de la app con Secrets
  → Despliegue automático en Render
  → Rotación simulada de claves
     ↓
  Render:
  → Aplicación desplegada
  → API_KEY segura almacenada en entorno









