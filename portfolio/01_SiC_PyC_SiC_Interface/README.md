# SiC/PyC/SiC Interface Mechanics and Irradiation

## Engineering Question
How do interfacial structure, irradiation-induced defects, local PyC layer evolution, and mechanical loading influence adhesion, debonding, and structural integrity in SiC/PyC/SiC composite interfaces?

## My Contribution
Developed atomistic workflows for planar SiC/PyC/SiC interfaces, structural relaxation, thermal equilibration, controlled mechanical loading, indentation/contact analysis, irradiation-damage simulations, and post-processing of interfacial morphology and defect evolution.

## Methods
- Molecular dynamics using LAMMPS
- SiC/PyC/SiC interface construction and relaxation
- Thermal equilibration and constituent-temperature validation
- Controlled indentation/contact simulations
- Loading-rate sensitivity analysis
- Interatomic-potential validation
- Layer-resolved PyC/SiC contact analysis
- Primary knock-on atom irradiation simulations
- OVITO visualization and Python post-processing

## Engineering Outputs
- Thermally equilibrated and mechanically stable interface models
- Loading-rate-dependent force and contact response
- Progressive PyC deformation and local interface morphology
- Layer-resolved contact evolution at left and right SiC/PyC interfaces
- Validation of short-range and interlayer interaction descriptions
- Traction/debonding and irradiation-ready atomistic workflows

---

## Selected Results

### 1. SiC/PyC/SiC model geometry and indentation configuration
![SiC PyC SiC model geometry](./Screenshot%202026-09-15%20165340.png)

Representative atomistic configurations of the SiC/PyC/SiC system and spherical indenter. The model illustrates the multilayer PyC region confined between SiC blocks and the loading configuration used to probe local mechanical response.

### 2. Thermal equilibration and constituent-temperature validation
![Thermal equilibration validation](./Screenshot%202026-09-15%20165401.png)

Thermal preparation of the SiC/PyC/SiC model showing the staged equilibration protocol and the temperature balance between the PyC and SiC constituents before mechanical loading.

### 3. Loading-rate dependence of force and interface contact
![Loading rate contact response](./Screenshot%202026-09-15%20165419.png)

Comparison of indentation response at multiple loading rates. The analysis tracks normal load, normalized right-interface contact fraction, and persistent contact-loss depth to quantify rate-sensitive interface response.

### 4. Progressive indentation morphology
![Indentation morphology sequence](./Screenshot%202026-09-15%20165435.png)

Atomic configurations at increasing indentation depth illustrate progressive bending and local distortion of the PyC layers beneath the spherical indenter, including the onset of strongly localized deformation at larger penetration depth.

### 5. Interatomic-potential validation
![Interatomic potential validation](./Screenshot%202026-09-15%20165458.png)

Interaction-energy checks used to validate the force-field treatment. The plots compare short-range interactions and interlayer binding behavior, including PyC/SiC interactions, diamond/PyC separation, carbon interlayer binding, and the Tersoff/ZBL short-range overlay.

### 6. Layer-resolved SiC/PyC interface contacts
![Layer resolved interface contacts](./Screenshot%202026-09-15%20165551.png)

Layer-resolved contact maps quantify the absolute and incremental contact population at the left and right SiC/PyC interfaces as indentation progresses. This analysis identifies which PyC layers retain, gain, or lose interfacial contact during deformation.

---

## Current Research Direction
The next stages extend the validated mechanical model toward controlled interface separation/debonding and irradiation-damage calculations. The objective is to determine how defect production, local contact loss, layer topology, and interfacial morphology modify mechanical integrity under extreme-environment conditions.

> **Public portfolio note:** Only selected public-facing results are presented here. Active-manuscript production data, collaborator-owned information, and unpublished detailed simulation files are intentionally excluded.
