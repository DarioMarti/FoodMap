import React from 'react';
import * as lucideIcons from 'lucide-react';
import * as tbIcons from 'react-icons/tb';
import * as biIcons from 'react-icons/bi';
import * as mdIcons from 'react-icons/md';
import * as giIcons from 'react-icons/gi';
import * as piIcons from 'react-icons/pi';

export const IconoDinamico = ({ nombre, ...props }) => {
    if (!nombre) return <lucideIcons.MapPin {...props} />;

    let nombreBase = nombre.split(/[-_ ]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    if (nombreBase === "Hamburger") nombreBase = "Burger";

    let IconoComponente = lucideIcons[nombre] || lucideIcons[nombreBase];

    if (!IconoComponente) {
        if (nombre.startsWith('Tb') || nombreBase.startsWith('Tb')) IconoComponente = tbIcons[nombre] || tbIcons[nombreBase];
        else if (nombre.startsWith('Bi') || nombreBase.startsWith('Bi')) IconoComponente = biIcons[nombre] || biIcons[nombreBase];
        else if (nombre.startsWith('Md') || nombreBase.startsWith('Md')) IconoComponente = mdIcons[nombre] || mdIcons[nombreBase];
        else if (nombre.startsWith('Gi') || nombreBase.startsWith('Gi')) IconoComponente = giIcons[nombre] || giIcons[nombreBase];
        else if (nombre.startsWith('Pi') || nombreBase.startsWith('Pi')) IconoComponente = piIcons[nombre] || piIcons[nombreBase];
    }

    if (!IconoComponente) {
        IconoComponente = tbIcons[`Tb${nombreBase}`] || biIcons[`Bi${nombreBase}`] || mdIcons[`Md${nombreBase}`] || giIcons[`Gi${nombreBase}`] || piIcons[`Pi${nombreBase}`];
    }

    if (!IconoComponente) return <lucideIcons.MapPin {...props} />;
    return <IconoComponente {...props} />;
};
