# =====================================================================
# GUÍA RÁPIDA DE COMANDOS DE PULUMI (TypeScript)
# =====================================================================

# 1. INICIAR SESIÓN (Solo se hace una vez por computadora si usas backend local)
# Sirve para decirle a Pulumi que guarde el estado en tu disco duro y no en la nube.
pulumi login --local

# 2. CREAR UN PROYECTO NUEVO (Solo se hace la primera vez)
# Inicializa la carpeta con los archivos básicos (index.ts, package.json, etc.).
pulumi new typescript -y

# 3. INSTALAR EL PROVEEDOR DE AWS (Solo se hace una vez por proyecto)
# Descarga el SDK para que Pulumi pueda hablar con AWS.
npm install @pulumi/aws

# 4. CONFIGURAR VARIABLES (Se hace antes de crear la infraestructura)
# Guarda valores como tu IP o el tipo de instancia en un archivo de configuración.
pulumi config set keyName lab3-key
pulumi config set myIp 181.28.72.160/32
pulumi config set amiId ami-065cd998ed.........
pulumi config set instanceType t3.micro

# 5. VER EL PLAN (Opcional, pero muy recomendado)
# Te muestra qué recursos se van a crear, modificar o destruir SIN hacer cambios reales.
pulumi preview

# 6. CREAR O ACTUALIZAR LA INFRAESTRUCTURA (El comando principal)
# Lee tu código TypeScript, se conecta a AWS y crea las instancias y Security Groups.
# Te pedirá confirmación (selecciona 'yes') y tu contraseña (passphrase) si es la primera vez.
pulumi up

# 7. VER LAS IPs PÚBLICAS (Para conectarte por SSH)
# Muestra los "outputs" que definiste en el código (ej. las IPs de frontend y backend).
pulumi stack output


# 8. DESTRUIR LA INFRAESTRUCTURA (¡MUY IMPORTANTE PARA NO PAGAR!)
# Elimina todos los recursos creados por Pulumi en AWS. Te pedirá confirmación ('yes').
pulumi destroy

# 10. VER EL HISTORIAL DE CAMBIOS (Opcional)
# Muestra una lista de todas las veces que has hecho 'pulumi up' o 'destroy'.
pulumi stack history

# 11. BORRAR EL STACK (Opcional)
# Elimina el registro del stack de tu disco local (útil si quieres empezar de cero).
pulumi stack rm dev
