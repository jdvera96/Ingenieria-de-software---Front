import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

  db_base=[{'id':1,'titulo':'Programación orientada a objetos con JavaScript','short':'Aprende el lenguaje de scripts y crea paginas dinamicas.','descripcion':'La programación orientada a objetos es un paradigma que desde la versión ES6 puede usarse en JavaScript a través de clases. Los temas a tratar son: Clases, Objetos, tipos de objetos, constructores, métodos, propiedades, herencia y mucho mas.','imagen':'https://drupal.ed.team/sites/default/files/styles/16_9_medium/public/imagenes-cdn-edteam/2019-11/js-poo.png','num_sesiones':15,'precio':20},
      {'id':2,'titulo':'Google Analytics Desde Cero','short':'Aprende a analizar las visitas a tu sitio y el comportamiento de tus usuarios.','descripcion':'Google Analytics es el compañero ideal de todo profesional del SEO, desarrollador web o emprendedor porque te da información importante de las visitas a tu sitio. No solo la cantidad sino su comportamiento, búsquedas, horarios, fuentes de tráfico, etc. Comprender esa información te ayudará a transformar a tus usuarios en clientes.','imagen':'https://drupal.ed.team/sites/default/files/styles/16_9_medium/public/imagenes-cdn-edteam/2019-10/Google-Analytics.png','num_sesiones':10,'precio':30},
      {'id':3,'titulo':'Business Intelligence','short':'Aprenda las bases del análisis de información para la toma de decisiones en el entorno empresarial','descripcion':'La inteligencia de negocios o BI (Business Intelligence) es la base a partir de la cual las compañías toman sus decisiones y soportan el día a día operacional mediante el uso de herramientas que implementan reportes con gráficos variados, tablas de datos dinámicas, indicadores y datos agregados a distinto nivel que permiten consultar el estado del negocio, su ejecución frente a lo planeado, la medición de los indicadores de desempeño y en general, toda la analítica descriptiva requerida para conocer y analizar todo hecho relevante que impacta la planificación y operación táctica de una compañía.','imagen':'https://res.cloudinary.com/edteam/image/upload/w_400/v1573259688/courses/bi-poster.png','num_sesiones':12,'precio':25},
      {'id':4,'titulo':'Fundamentos de Redes','short':'Comprende cómo funcionan las direcciones IP y los protocolos de red.','descripcion':'Las redes permiten que las computadoras envíen y reciban datos. Internet, y otras tecnologías, existen gracias a ellas. En este curso aprenderás cómo funcionan las redes, los componentes, dispositivos, protocolos y capas.','imagen':'https://drupal.ed.team/sites/default/files/imagenes-cdn-edteam/2019-03/Redes%20Fundamentos.png','num_sesiones':15,'precio':40}
  ]

  db_calificaciones = [{'id':1,'materia':"Diseño de Software",'titulo':"Diagrama de clases","calificacion":100},
                        {'id':2,'materia':"Diseño de Software",'titulo':"Diagrama de casos de uso","calificacion":66},
                        {'id':4,'materia':"Diseño de Software",'titulo':"Diagrama de secuencias","calificacion":40},
                        {'id':5,'materia':"Diseño de Software",'titulo':"Pruebas unitarias","calificacion":40},
                        {'id':6,'materia':"Diseño de Software",'titulo':"Patrones de diseño","calificacion":40},
                        {'id':7,'materia':"Diseño de Software",'titulo':"Diagrama de actividades","calificacion":40},
                        {'id':8,'materia':"Diseño de Software",'titulo':"Diagrama de despliegue","calificacion":30},
                        {'id':9,'materia':"Diseño de Software",'titulo':"Proyecto final","calificacion":100},
                        {'id':10,'materia':"Diseño de Software",'titulo':"Estimación de costos","calificacion":75},
                        {'id':11,'materia':"Diseño de Software",'titulo':"Diagrama de secuncias","calificacion":90},
                    ]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  obtenerCursos(){
      return this.db_base;
  }

  obtenerCalificaciones(){
    return this.db_calificaciones;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  obtenerCursobyId(id: number){
      for(let i=0;i<this.db_base.length;i++){
          if(this.db_base[i]['id']==id){
              return this.db_base[i];
          }
      }
      return -1;
  }

}

