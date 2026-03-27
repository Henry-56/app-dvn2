# FlotSim AI - Simulador Inteligente de Flotación Minera

**FlotSim AI** es un prototipo funcional de un "Gemelo Digital" diseñado para la optimización multivariable del proceso de flotación en el sector minero. El sistema integra sensores IoT simulados, lógica metalúrgica avanzada y un motor de analítica predictiva.

## 🚀 Características Principales

- **Simulación en Tiempo Real**: Modelado dinámico de variables críticas como pH, flujo de aire, dosificación de reactivos y nivel de pulpa.
- **Gemelo Digital**: Representación visual interactiva de la celda de flotación que reacciona a los cambios en los parámetros de operación.
- **Analítica Predictiva**: Motor de recomendaciones basado en reglas heurísticas que ayuda a maximizar la recuperación de mineral.
- **IoT Simulado**: Generación de datos sintéticos con ruido estadístico y detección automática de anomalías en sensores.
- **Persistencia Local**: Almacenamiento de históricos y configuraciones mediante IndexedDB (sin necesidad de bases de datos externas).

## 🏗️ Arquitectura

El proyecto sigue una **Arquitectura Hexagonal (Ports and Adapters)** para garantizar la modularidad y facilidad de mantenimiento:

- `src/domain`: Entidades, tipos y lógica central de negocio (fórmulas de flotación).
- `src/application`: Casos de uso y servicios de alto nivel (motor predictivo).
- `src/infrastructure`: Adaptadores para persistencia local y generadores de datos IoT.
- `src/presentation`: Componentes de UI, hooks y gestión de estado con React y Tailwind CSS.

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: Zustand
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Base de Datos**: IndexedDB (vía `idb`)

## 📦 Instalación y Uso

1.  **Clonar/Descargar el repositorio.**
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Ejecutar en modo desarrollo**:
    ```bash
    npm run dev
    ```
4.  **Abrir en el navegador**: [http://localhost:3000](http://localhost:3000)

## 📄 Documentación Adicional

- [Manual de Usuario](file:///C:/Users/HENRY/.gemini/antigravity/brain/d3d8d1c6-1561-4fe9-b2c9-ebed0b4a13fe/manual_usuario.md)
- [Plan de Implementación](file:///C:/Users/HENRY/.gemini/antigravity/brain/d3d8d1c6-1561-4fe9-b2c9-ebed0b4a13fe/implementation_plan.md)
- [Resumen de Cambios (Walkthrough)](file:///C:/Users/HENRY/.gemini/antigravity/brain/d3d8d1c6-1561-4fe9-b2c9-ebed0b4a13fe/walkthrough.md)

---
*Desarrollado para el sector minero como prototipo de ingeniería avanzada.*
