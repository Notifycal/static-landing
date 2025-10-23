---
title: Les limitacions que fan inviable WhatsApp per a la majoria de negocis
image: '/images/posts/whatsapp-lock.webp'
author: Equip Notifycal
date: 2024-11-02T10:00:00Z
categories: ['technology', 'communication']
draft: false
---

WhatsApp és l'aplicació de missatgeria més popular del món. Amb milers de milions d'usuaris actius, sembla l'opció òbvia per a qualsevol servei de recordatoris automatitzats. Aleshores, per què Notifycal no ofereix integració amb WhatsApp? La resposta té a veure amb com Meta ha dissenyat WhatsApp Business Platform.

### El problema principal: el teu número queda segrestat

Per enviar missatges automatitzats a través de WhatsApp, les empreses han d'utilitzar **WhatsApp Business Platform** (l'API empresarial), que és completament diferent de l'aplicació WhatsApp Business que pots descarregar al teu mòbil.

Aquí ve el problema més greu: **quan registres un número de telèfon a WhatsApp Business Platform, aquest número queda completament bloquejat per a ús normal**.

Una vegada registrat:
- No pots utilitzar aquest número a WhatsApp personal
- No pots utilitzar aquest número a l'aplicació WhatsApp Business
- No pots accedir des de WhatsApp Web
- No pots veure ni respondre missatges des del teu telèfon

El número queda literalment segrestat. L'única forma d'interactuar amb ell és a través de sistemes CRM o aplicacions de tercers. Meta no proporciona cap interfície nativa, la qual cosa significa que si un client et respon a un recordatori, no veuràs aquest missatge al teu WhatsApp. Necessites contractar un CRM addicional només per poder llegir les respostes.

### Els costos són significatius

Encara que WhatsApp Business Platform ofereix 1.000 converses gratuïtes al mes, després els costos s'acumulen. Des del juliol de 2025, WhatsApp cobra per missatge enviat, amb preus que varien segons:

- **La categoria del missatge**: Màrqueting, utilitat o autenticació
- **El país del destinatari**: Les diferències són enormes

Per exemple, enviar missatges de màrqueting a l'Índia costa aproximadament €0.01 per missatge, mentre que enviar-los a Alemanya costa aproximadament €0.13, gairebé 13 vegades més. Per a un servei que envia milers de recordatoris diaris, aquests costos es multipliquen exponencialment.

Pots consultar els <a href="https://business.whatsapp.com/products/platform-pricing?country=Espa%C3%B1a&currency=Euro%20(EUR)&category=Utilidad" target="_blank" rel="noopener noreferrer">preus oficials de WhatsApp Business Platform a Espanya</a> per veure les tarifes detallades per país i categoria. Per a informació tècnica més detallada, revisa la <a href="https://developers.facebook.com/docs/whatsapp/pricing/?translation&locale=es_ES" target="_blank" rel="noopener noreferrer">documentació per a desenvolupadors</a>.

### Altres limitacions importants

**Límits de missatgeria**: Els comptes no verificats estan limitats a 250 converses en 24 hores. Després de verificar-se, pots arribar fins a 1.000 clients únics per dia.

**Aprovació de plantilles**: Tots els missatges han de seguir plantilles pre-aprovades per Meta. No pots enviar text lliure, cada plantilla ha de passar per un procés de revisió.

**Verificació empresarial**: Per escalar necessites verificar el teu negoci amb Meta, un procés que pot tardar de minuts a 14 dies.

### Per a qui funciona WhatsApp Business Platform?

Aquesta plataforma té sentit per a:

- Grans empreses amb equips dedicats que ja utilitzen CRMs sofisticats
- Organitzacions que poden dedicar números de telèfon exclusivament per a la plataforma
- Empreses amb pressupostos de comunicació de diversos milers d'euros mensuals
- Corporacions amb equips tècnics capaços de gestionar la integració

Per a petites i mitjanes empreses, les barreres són massa altes.

### Per què Notifycal tria SMS i RCS

A Notifycal apostem per canals que:
- Funcionen amb qualsevol número de telèfon sense segrestar-lo
- No requereixen apps específiques instal·lades
- Tenen preus predictibles i transparents
- Permeten respostes bidireccionals sense sistemes intermediaris
- Donen control real a l'usuari

WhatsApp Business Platform requereix que els nostres usuaris aconsegueixin un número addicional, perdin l'accés a aquest número des dels seus dispositius, contractin CRMs addicionals només per veure respostes, i paguin costos variables segons el país de destinació. No volem imposar aquestes limitacions.

### Conclusió

La decisió de no integrar WhatsApp Business Platform no és per falta de capacitat tècnica. És una decisió conscient basada en oferir solucions accessibles per a la majoria dels nostres usuaris.

Dit això, si la teva organització té les necessitats i recursos per aprofitar WhatsApp Business Platform, i estàs interessat que implementem aquesta integració, <a href="mailto:info@notifycal.com">contacta'ns per a més informació</a> i ho estudiem. Cada cas és diferent, i estarem encantats d'avaluar si té sentit per a la teva situació específica.
