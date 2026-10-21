import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// =============================================================================
// CONFIGURACIÓN
// =============================================================================
const config = new pulumi.Config();
const keyName = config.get("keyName") || "lab3-key";
const myIp = config.get("myIp") || "0.0.0.0/0";
const amiId = config.get("amiId") || "ami-065cd998ed8162897";
const instanceType = config.get("instanceType") || "t3.micro";

// =============================================================================
// SECURITY GROUP: FRONTEND
// =============================================================================
const frontendSg = new aws.ec2.SecurityGroup("frontend-sg-pulumi", {
  description: "SG para el Frontend en Pulumi",
  ingress: [
    // Permite HTTP (la web normal) desde cualquier lugar
    { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: ["0.0.0.0/0"] },
    //Permite HTTPS (la web segura) desde cualquier lugar
    { protocol: "tcp", fromPort: 443, toPort: 443, cidrBlocks: ["0.0.0.0/0"] },
    //Permite SSH (para que tú te conectes) solo desde tu IP
    { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: [myIp] },
  ],
  egress: [
    //damos permiso al servidor de navegar a internet libremente
    { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] },
  ],
  tags: { Name: "frontend-sg-pulumi" },
});

// =============================================================================
// SECURITY GROUP: BACKEND
// =============================================================================
const backendSg = new aws.ec2.SecurityGroup("backend-sg-pulumi", {
  description: "SG para el Backend en Pulumi",
  ingress: [
    //servidor Frontend  se conecte al puerto 3000 del Backend
    {
      protocol: "tcp",
      fromPort: 3000,
      toPort: 3000,
      securityGroups: [frontendSg.id],
    },
    //cualquier persona en Internet se conecte al puerto 3000.
    {
      protocol: "tcp",
      fromPort: 3000,
      toPort: 3000,
      cidrBlocks: ["0.0.0.0/0"],
    },
    //backend navegue libremente - para instalar paquetes con npm
    { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: [myIp] },
  ],
  egress: [
    { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] },
  ],
  tags: { Name: "backend-sg-pulumi" },
});

// =============================================================================
// INSTANCIA: FRONTEND-serveVirtual
// =============================================================================
const frontendServer = new aws.ec2.Instance("frontend-server-pulumi", {
  instanceType: instanceType, //t3.micro
  ami: amiId,
  keyName: keyName,
  vpcSecurityGroupIds: [frontendSg.id],
  tags: { Name: "servidor-frontend-pulumi" },
});

// =============================================================================
// INSTANCIA: BACKEND
// =============================================================================
const backendServer = new aws.ec2.Instance("backend-server-pulumi", {
  instanceType: instanceType,
  ami: amiId,
  keyName: keyName,
  vpcSecurityGroupIds: [backendSg.id],
  tags: { Name: "servidor-backend-pulumi" },
});

// =============================================================================
// OUTPUTS
// =============================================================================
export const frontendPublicIp = frontendServer.publicIp;
export const frontendPrivateIp = frontendServer.privateIp;
export const backendPublicIp = backendServer.publicIp;
export const backendPrivateIp = backendServer.privateIp;
