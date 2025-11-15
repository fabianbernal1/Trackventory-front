import { Component } from '@angular/core';

interface HelpItem {
  title: string;
  description: string;
  expanded: boolean;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  
  helpItems: HelpItem[] = [
    {
      title: "Olvidé mi contraseña",
      expanded: false,
      description: `
        Si no recuerdas tu contraseña, debes ponerte en contacto con un miembro autorizado del personal
        o con el administrador del sistema, quienes verificarán tu identidad y realizarán el restablecimiento
        de forma segura.`,
    },
    {
      title: "Cambiar mi información personal",
      expanded: false,
      description: `
        Haz clic en tu nombre de usuario ubicado en la esquina superior derecha y selecciona
        la opción <strong>Configuración</strong>. Allí podrás editar tu información personal y guardar los cambios.`,
    },
    {
      title: "Cambiar mi contraseña",
      expanded: false,
      description: `
        Ingresa al menú de <strong>Configuración</strong>, desplázate hasta la sección inferior donde encontrarás la
        opción <strong>Cambiar Contraseña</strong>. Ingresa la nueva clave, confírmala y selecciona <strong>Guardar</strong>.`,
    },
    {
      title: "¿Cómo realizar una compra?",
      expanded: false,
      description: `
        Las compras únicamente pueden ser gestionadas por personal autorizado perteneciente a la empresa.
        Comunícate con ellos por los canales oficiales (presencial, telefónico o digital) para solicitar el producto
        y se registrará una transacción válida en el sistema.`,
    }
  ];

  toggleFAQ(item: HelpItem) {
    item.expanded = !item.expanded;
  }
}
