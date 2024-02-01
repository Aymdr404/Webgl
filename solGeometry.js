const size = 500;

function getSol() {

    return [
          // face avant : tuile verticale
          -500,   0,  500,
           500,   0,  500,
          -500, 10,  500,
          -500, 10,  500,
           500,   0,  500,
           500, 10,  500,

          // face arrière : tuile verticale
          -500,   0, -500,
          -500, 10, -500,
           500,   0, -500,
          -500, 10, -500,
           500, 10, -500,
           500,   0, -500,

          // face séparant les deux barres horizontales
          500,  0,  500,
          500,  0, -500,
          500, 10,  500,
          500, 10,  500,
          500,  0, -500,
          500, 10, -500,

          // grande face latérale de la barre verticale
          -500,   0, -500,
          -500,   0,  500,
          -500, 10, -500,
          -500, 10, -500,
          -500,   0,  500,
          -500, 10,  500,

          // face inférieure de la barre verticale
          -500,   0,  500,
          -500,   0, -500,
          500,   0,  500,
            500,   0,  500,
          -500,   0, -500,
          500,   0, -500,

          // face supérieure de la barre verticale
          -500, 10,  500,
            500, 10,  500,
          -500, 10, -500,
          -500, 10, -500,
            500, 10,  500,
            500, 10, -500,


    ];

}

