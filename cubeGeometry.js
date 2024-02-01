function getCubeGeometry() {
    return [
            // face avant : tuile verticale
            -15,   0,  15,
             15,   0,  15,
            -15, 30,  15,
            -15, 30,  15,
             15,   0,  15,
             15, 30,  15,
  
            // face arrière : tuile verticale
            -15,   0, -15,
            -15, 30, -15,
             15,   0, -15,
            -15, 30, -15,
             15, 30, -15,
             15,   0, -15,
  
            // face séparant les deux barres horizontales
            15,  0,  15,
            15,  0, -15,
            15, 30,  15,
            15, 30,  15,
            15,  0, -15,
            15, 30, -15,
  
            // grande face latérale de la barre verticale
            -15,   0, -15,
            -15,   0,  15,
            -15, 30, -15,
            -15, 30, -15,
            -15,   0,  15,
            -15, 30,  15,
  
            // face inférieure de la barre verticale
            -15,   0,  15,
            -15,   0, -15,
              15,   0,  15,
              15,   0,  15,
            -15,   0, -15,
              15,   0, -15,
  
            // face supérieure de la barre verticale
            -15, 30,  15,
              15, 30,  15,
            -15, 30, -15,
            -15, 30, -15,
              15, 30,  15,
              15, 30, -15,
              
          ];
  }
 