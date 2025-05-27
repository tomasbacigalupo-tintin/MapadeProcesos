# Flujo Vehicular por Fases 1-12 (Notion Friendly)

**Sugerencias de mejora:**

* Uniformizar nombres de nodos `start` y `fin` con sufijos claros (`FaseX_start`, `FaseX_fin`).
* Usar `classDef fin_exito` y `fin_error` para distinguir cierres exitosos o con incidente.
* Mantener coherencia en formatos de decisiones `{"¿…?"}`.
* Opcional: agregar enlaces entre fases críticas si se desea flujo continuo.

```mermaid
flowchart TD
  classDef fin_exito fill:#c8e6c9,stroke:#2e7d32;
  classDef fin_error fill:#ffcdd2,stroke:#c62828;

  %% Fase 1: Recepción y evaluación inicial
  subgraph F1["Fase 1: Recepción y evaluación inicial del vehículo"]
    F1_start(["Inicio Fase 1"])
    F1_start --> F1_eval["Recepción y evaluación visual/técnica"]
    F1_eval --> F1_datosOK{"¿Datos completos y estado evaluable?"}
    F1_datosOK -- No --> F1_rechazo["Rechazo o reclamo por ingreso incompleto"]
    F1_rechazo --> F1_finErr(["Fin Fase 1 (error)"])
    class F1_finErr fin_error;
    F1_datosOK -- Sí --> F1_carga["Carga de datos en sistema de peritaje"]
    F1_carga --> F1_cargaOK{"¿Carga exitosa?"}
    F1_cargaOK -- No --> F1_retryCarga["Reintentar carga de datos"]
    F1_retryCarga -.-> F1_carga
    F1_cargaOK -- Sí --> F1_com["Comunicación a encargados comerciales"]
    F1_com --> F1_comOK{"¿Comunicación exitosa?"}
    F1_comOK -- No --> F1_retryCom["Reintentar comunicación"]
    F1_retryCom -.-> F1_com
    F1_comOK -- Sí --> F1_ingreso["Ingreso físico al stock"]
    F1_ingreso --> F1_valid["Validación en canal general"]
    F1_valid --> F1_finSuc(["Fin Fase 1: Vehículo listo para planificación"])
    class F1_finSuc fin_exito;
  end

  %% Fase 2: Planificación e intervenciones
  subgraph F2["Fase 2: Planificación y alistamiento de intervenciones"]
    F2_start(["Inicio Fase 2: Validación de peritajes"])
    F2_start --> F2_valid["Validación en sistema de peritajes"]
    F2_valid --> F2_plan["Planificación y priorización de tareas"]
    F2_plan --> F2_checkProv["Verificación de disponibilidad de proveedor"]
    F2_checkProv --> F2_provOK{"¿Proveedor disponible?"}
    F2_provOK -- No --> F2_taller["Intervención en taller propio"]
    F2_taller --> F2_notifInt["Notificación al preparador interno"]
    F2_notifInt --> F2_prepInt["Preparación y reparación en taller"]
    F2_prepInt --> F2_updInt["Actualización de seguimiento interno"]
    F2_updInt --> F2_confInt{"¿Trabajo finalizado?"}
    F2_confInt -- No --> F2_retryInt["Esperar y reintentar"]
    F2_retryInt -.-> F2_confInt
    F2_confInt -- Sí --> F2_updSys1["Actualizar sistema"]
    F2_provOK -- Sí --> F2_reqProv["Solicitud de turno al proveedor"]
    F2_reqProv --> F2_notifProv["Notificación al proveedor"]
    F2_notifProv --> F2_prepVeh["Preparación para traslado"]
    F2_prepVeh --> F2_envio["Envío al proveedor"]
    F2_envio --> F2_confEnt["Confirmación de entrega"]
    F2_confEnt --> F2_updProv["Actualización de seguimiento proveedor"]
    F2_updProv --> F2_confProv{"¿Trabajo finalizado?"}
    F2_confProv -- No --> F2_retryProv["Esperar y reintentar"]
    F2_retryProv -.-> F2_confProv
    F2_confProv -- Sí --> F2_updSys2["Actualizar sistema"]
    F2_updSys1 --> F2_finSuc(["Fin Fase 2: Inspección final solicitada"])
    F2_updSys2 --> F2_finSuc
    class F2_finSuc fin_exito;
  end

  %% Fase 3: Pedido de repuestos
  subgraph F3["Fase 3: Pedido de repuestos"]
    F3_start(["Inicio Fase 3: Pedido de repuestos"])
    F3_start --> F3_recep["Recepción del pedido"]
    F3_recep --> F3_valInv["Validar inventario"]
    F3_valInv --> F3_stockOK{"¿Hay stock disponible?"}
    F3_stockOK -- Sí --> F3_notifPrep["Notificar al preparador"]
    F3_notifPrep --> F3_ctrlCal["Control de calidad"]
    F3_ctrlCal --> F3_comTaller["Comunicar a administrador de turnos"]
    F3_comTaller --> F3_verUso["Verificar instalación"]
    F3_verUso --> F3_instOK{"¿Instalado?"}
    F3_instOK -- No --> F3_alertRobo["Alerta posible desvío"]
    F3_alertRobo --> F3_finErr(["Fin Fase 3 (incidente)"])
    class F3_finErr fin_error;
    F3_instOK -- Sí --> F3_finSuc(["Fin Fase 3: Repuesto instalado"])
    class F3_finSuc fin_exito;
    F3_stockOK -- No --> F3_verProv["Verificar proveedor"]
    F3_verProv --> F3_genPedido["Generar pedido"]
    F3_genPedido --> F3_seg["Seguimiento a proveedor"]
    F3_seg --> F3_recibido{"¿Repuesto en condiciones?"}
    F3_recibido -- No --> F3_reclamo["Reclamar a proveedor"]
    F3_reclamo --> F3_seg
    F3_recibido -- Sí --> F3_notifPrep
  end

  %% Fase 4: Recepción de mercancías
  subgraph F4["Fase 4: Recepción de mercancías"]
    F4_start(["Inicio Fase 4: Recepción de mercancías"])
    F4_start --> F4_inventario["Gestionar inventario"]
    F4_inventario --> F4_suministro["Suministrar al taller"]
    F4_suministro --> F4_devoluciones{"¿Hubo devoluciones?"}
    F4_devoluciones -- Sí --> F4_gestDev["Gestionar devoluciones"]
    F4_gestDev --> F4_updProv["Actualizar proveedor"]
    F4_updProv --> F4_reportes["Analizar y generar reportes"]
    F4_reportes --> F4_finSuc(["Fin Fase 4"])
    class F4_finSuc fin_exito;
    F4_devoluciones -- No --> F4_updProv
  end

  %% Fase 5: Vehículo recibido desde intervención o gestión vehicular
  subgraph F5["Fase 5: Vehículo recibido desde intervención o gestión vehicular"]
    F5_start(["Inicio Fase 5: Vehículo recibido desde intervención o gestión vehicular"])
    F5_start --> F5_rentable{"¿En condiciones de venta sin intervención?"}
    F5_rentable -- Sí --> F5_revBas["Revisión básica (limpieza, estética y documentos)"]
    F5_revBas --> F5_aprDirect["Aprobación para venta sin intervención"]
    F5_aprDirect --> F5_transferir["Transferir a área de ventas"]
    F5_transferir --> F5_registrar["Registrar vehículo en sistema comercial"]
    F5_registrar --> F5_finSuc(["Fin Fase 5"])
    class F5_finSuc fin_exito;
    F5_rentable -- No --> F5_verInter["Verificar intervenciones realizadas"]
    F5_verInter --> F5_checklist["Completar checklist de control de calidad"]
    F5_checklist --> F5_prueba["Realizar prueba final (si aplica)"]
    F5_prueba --> F5_cumple{"¿Cumple criterios técnicos y estéticos?"}
    F5_cumple -- No --> F5_regFallas["Registrar fallas o desvíos"]
    F5_regFallas --> F5_notifTall["Notificar al taller para corrección"]
    F5_notifTall --> F5_verInter
    F5_cumple -- Sí --> F5_aprTrans["Autorizar traspaso a venta"]
    F5_aprTrans --> F5_transferir
  end

  %% Fase 6: Evaluación técnica inicial
  subgraph F6["Fase 6: Evaluación técnica inicial"]
    F6_start(["Inicio Fase 6: Evaluación técnica inicial"])
    F6_start --> F6_peritaje["Revisión del peritaje"]
    F6_peritaje --> F6_costos["Estimación de costos base"]
    F6_costos --> F6_criterios["Aplicación de precios y márgenes"]
    F6_criterios --> F6_precot["Emisión de pre-cotización"]
    F6_precot --> F6_valida{"¿Rentable intervenir?"}
    F6_valida -- No --> F6_ventaDirecta["Enviar a venta sin intervención"]
    F6_ventaDirecta --> F6_comunica["Comunicar pre-cotización a responsable"]
    F6_comunica --> F6_finSuc(["Fin Fase 6"])
    class F6_finSuc fin_exito;
    F6_valida -- Sí --> F6_cont["Continuar planificación de intervención"]
    F6_cont --> F2_start
  end

  %% Fase 7: Aprobación de trabajos
  subgraph F7["Fase 7: Aprobación de trabajos"]
    F7_start(["Inicio Fase 7: Aprobación de trabajos"])
    F7_start --> F7_recibe["Recepción de orden de intervención"]
    F7_recibe --> F7_asigna["Asignación de tareas al equipo"]
    F7_asigna --> F7_ejecuta["Ejecución técnica en taller"]
    F7_ejecuta --> F7_ctrlCal{"¿Control interno de calidad aprobado?"}
    F7_ctrlCal -- No --> F7_corrige["Realizar correcciones"]
    F7_corrige --> F7_ejecuta
    F7_ctrlCal -- Sí --> F7_informe["Generar informe de avances"]
    F7_informe --> F7_fin(["Fin Fase 7"])
    class F7_fin fin_exito;
  end

  %% Fase 8: Consolidar datos técnicos
  subgraph F8["Fase 8: Consolidar datos técnicos"]
    F8_start(["Inicio Fase 8: Consolidar datos técnicos"])
    F8_start --> F8_consolidar["Consolidar costos finales"]
    F8_consolidar --> F8_aplicar["Precios y márgenes"]
    F8_aplicar --> F8_revision["Aprobación de costo comercial"]
    F8_revision --> F8_emision["Emitir cotización formal"]
    F8_emision --> F8_comunicar["Comunicar cotización al cliente"]
    F8_comunicar --> F8_cliAprueba{"¿Cliente aprueba la cotización?"}
    F8_cliAprueba -- No --> F8_ajusta["Ajustar cotización"]
    F8_ajusta --> F8_emision
    F8_cliAprueba -- Sí --> F8_fin(["Fin Fase 8: Vehículo señado"])
    class F8_fin fin_exito;
  end

  %% Fase 9: Cliente confirma compra
  subgraph F9["Fase 9: Cliente confirma compra"]
    F9_start(["Inicio Fase 9: Cliente confirma compra"])
    F9_start --> F9_prepDoc["Preparar documentación de venta"]
    F9_prepDoc --> F9_firma["Firma del contrato"]
    F9_firma --> F9_tramites["Gestionar trámites legales"]
    F9_tramites --> F9_cargaSis["Cargar información en sistema"]
    F9_cargaSis --> F9_valida["¿Validación final de gestoría aprobada?"]
    F9_valida -- Sí --> F9_finSuc(["Fin Fase 9"])
    class F9_finSuc fin_exito;
    F9_valida -- No --> F9_finErr(["Fin Fase 9 (incidente)"])
    class F9_finErr fin_error;
  end
```
