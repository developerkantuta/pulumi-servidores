# 🚀 Guía Rápida de Comandos de Pulumi (TypeScript)

Esta guía contiene los comandos esenciales para gestionar tu infraestructura como código con Pulumi y AWS.

## 1. Iniciar sesión localmente
*Solo se hace una vez por computadora si usas backend local.*
Sirve para decirle a Pulumi que guarde el estado en tu disco duro y no en la nube.
```bash
pulumi login --local
2. Crear un proyecto nuevo
Solo se hace la primera vez.
Inicializa la carpeta con los archivos básicos (index.ts, package.json, etc.).

bash
pulumi new typescript -y
3. Instalar el proveedor de AWS
Solo se hace una vez por proyecto.
Descarga el SDK para que Pulumi pueda comunicarse con AWS.

bash
npm install @pulumi/aws
4. Configurar variables
Se hace antes de crear la infraestructura.
Guarda valores como tu IP o el tipo de instancia en un archivo de configuración.

bash
pulumi config set keyName lab3-key
pulumi config set myIp 181.28.72.160/32
pulumi config set amiId ami-065cd998ed.........
pulumi config set instanceType t3.micro
5. Ver el plan
Opcional, pero muy recomendado.
Te muestra qué recursos se van a crear, modificar o destruir SIN hacer cambios reales.

bash
pulumi preview
6. Crear o actualizar la infraestructura
El comando principal.
Lee tu código TypeScript, se conecta a AWS y crea las instancias y Security Groups.
Te pedirá confirmación (selecciona yes) y tu contraseña (passphrase) si es la primera vez.

bash
pulumi up
7. Ver las IPs públicas
Para conectarte por SSH.
Muestra los "outputs" que definiste en el código (ej. las IPs de frontend y backend).

bash
pulumi stack output
8. Destruir la infraestructura
¡MUY IMPORTANTE PARA NO PAGAR!
Elimina todos los recursos creados por Pulumi en AWS. Te pedirá confirmación (yes).

bash
pulumi destroy
9. Ver el historial de cambios
Opcional.
Muestra una lista de todas las veces que has hecho pulumi up o destroy.

bash
pulumi stack history
10. Borrar el stack
Opcional.
Elimina el registro del stack de tu disco local (útil si quieres empezar de cero).

bash
pulumi stack rm dev
