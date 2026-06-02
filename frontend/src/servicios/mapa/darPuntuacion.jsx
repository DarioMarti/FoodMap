import React from 'react';
import * as lucideIcons from 'lucide-react';

export const darPuntuacion = (puntuacion) => {
    let estrellas = [];
    for (let i = 1; i <= puntuacion; i++) {
        estrellas.push(<lucideIcons.Star className="w-5 h-5 fill-current" key={i} />);
    }
    return estrellas;
};
