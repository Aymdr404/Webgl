const size = 200;

function getSol() {

    return [
          // face avant : tuile verticale
          -200,   0,  200,
           200,   0,  200,
          -200, 10,  200,
          -200, 10,  200,
           200,   0,  200,
           200, 10,  200,

          // face arrière : tuile verticale
          -200,   0, -200,
          -200, 10, -200,
           200,   0, -200,
          -200, 10, -200,
           200, 10, -200,
           200,   0, -200,

          // face séparant les deux barres horizontales
          200,  0,  200,
          200,  0, -200,
          200, 10,  200,
          200, 10,  200,
          200,  0, -200,
          200, 10, -200,

          // grande face latérale de la barre verticale
          -200,   0, -200,
          -200,   0,  200,
          -200, 10, -200,
          -200, 10, -200,
          -200,   0,  200,
          -200, 10,  200,

          // face inférieure de la barre verticale
          -200,   0,  200,
          -200,   0, -200,
          200,   0,  200,
            200,   0,  200,
          -200,   0, -200,
          200,   0, -200,

          // face supérieure de la barre verticale
          -200, 10,  200,
            200, 10,  200,
          -200, 10, -200,
          -200, 10, -200,
            200, 10,  200,
            200, 10, -200,


    ];

}

