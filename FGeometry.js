function getTourGeometry() {
  return [
          // face avant : tuile verticale
          -30,   0,  30,
           30,   0,  30,
          -30, 300,  30,
          -30, 300,  30,
           30,   0,  30,
           30, 300,  30,

          // face arrière : tuile verticale
          -30,   0, -30,
          -30, 300, -30,
           30,   0, -30,
          -30, 300, -30,
           30, 300, -30,
           30,   0, -30,

          // face séparant les deux barres horizontales
          30,  0,  30,
          30,  0, -30,
          30, 300,  30,
          30, 300,  30,
          30,  0, -30,
          30, 300, -30,

          // grande face latérale de la barre verticale
          -30,   0, -30,
          -30,   0,  30,
          -30, 300, -30,
          -30, 300, -30,
          -30,   0,  30,
          -30, 300,  30,

          // face inférieure de la barre verticale
          -30,   0,  30,
          -30,   0, -30,
            30,   0,  30,
            30,   0,  30,
          -30,   0, -30,
            30,   0, -30,

          // face supérieure de la barre verticale
          -30, 300,  30,
            30, 300,  30,
          -30, 300, -30,
          -30, 300, -30,
            30, 300,  30,
            30, 300, -30,
            
        ];
}
